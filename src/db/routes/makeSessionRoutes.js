const { randomBytes } = require("crypto")
const jsonwebtoken = require("jsonwebtoken")
const config = require("../config")
const hashPassword = require("../hashPassword")
const User = require("../models/User")
const {
  HTTP_USER_INVALID_INPUT,
  HTTP_UNAUTHORIZED,
} = require("../routes/httpStatusCode")

const makeSessionRoutes = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const existingUSer = await User.query().findOne({ email })

    if (existingUSer) {
      res
        .status(HTTP_USER_INVALID_INPUT)
        .send({ error: "E-mail already used." })

      return
    }

    const salt = randomBytes(config.security.password.keylen).toString("hex")

    const hash = hashPassword(password, salt)

    await User.query().insert({
      email,
      passwordHash: hash,
      passwordSalt: salt,
    })

    res.send({ status: "Ok" })
  })

  app.post("/sign-in", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const user = await User.query().findOne({ email })

    const hash = user ? hashPassword(password, user.passwordSalt) : null

    if (!user || !hash || user.passwordHash !== hash) {
      res.status(HTTP_UNAUTHORIZED).send({ error: "Invalid credentials." })
    }

    const jwt = jsonwebtoken.sign(
      {
        payload: {
          user: user.id,
        },
      },
      config.security.session.jwtSecret,
      { expiresIn: config.security.session.expiresIn }
    )

    res.send({ status: "Ok", data: jwt })
  })
}

module.exports = makeSessionRoutes
