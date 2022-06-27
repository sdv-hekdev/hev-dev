const {
  EMAIL_ALREADY_USED,
  INVALID_CREDENTIALS,
  SOMETHING_WENT_WRONG,
} = require("./ErrorMessage")
const { randomBytes } = require("crypto")
const jsonwebtoken = require("jsonwebtoken")
const config = require("../config")
const hashPassword = require("../hashPassword")
const User = require("../models/User")
const {
  HTTP_USER_INVALID_INPUT,
  HTTP_UNAUTHORIZED,
  HTTP_INTERNAL_ERROR,
  HTTP_OK,
} = require("../routes/httpStatusCode")

const makeSessionRoutes = ({ app }) => {
  app.post("/sign-up", async (req, res) => {
    const {
      body: { email, password },
    } = req

    const existingUSer = await User.query().findOne({ email })

    if (existingUSer) {
      res.status(HTTP_USER_INVALID_INPUT).send({ error: EMAIL_ALREADY_USED })

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
      res.status(HTTP_UNAUTHORIZED).send({ error: INVALID_CREDENTIALS })

      return
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
  app.delete("/delete-user/:userId", async (req, res) => {
    const {
      params: { userId },
    } = req

    try {
      await User.query().where({ id: userId }).delete()
      res.send({ status: HTTP_OK })
    } catch (error) {
      res.status(HTTP_INTERNAL_ERROR).send({ error: SOMETHING_WENT_WRONG })
    }
  })
}

module.exports = makeSessionRoutes
