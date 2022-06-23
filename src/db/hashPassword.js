const { pbkdf2Sync } = require("crypto")

const {
  security: {
    password: { iteration, keylen, digest },
  },
} = require("./config")

const hashPassword = (password, salt) =>
  pbkdf2Sync(password, salt, iteration, keylen, digest).toString("hex")

module.exports = hashPassword
