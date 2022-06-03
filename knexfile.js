const config = require("./src/back/config.js")

module.exports = require("knex")(config.db)
