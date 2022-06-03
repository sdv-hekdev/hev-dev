require("dotenv").config()

const config = {
  port: process.env.PORT,

  db: {
    client: process.env.DB_CLIENT,
    connection: { database: process.DB_DATABASE, user: process.env.DB_USER },
  },

  migrations: {
    stub: "",
  },
  cors: {
    origin: process.env.WEB_APP_ORIGIN,
  },

  session: { expiresIn: "2 days" },
}

module.exports = config
