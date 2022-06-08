require("dotenv").config()

const config = {
  port: process.env.PORT,
  db: {
    client: process.env.DB_CLIENT,
    connection: {
      database: process.env.DB_DATABASE,
      user: process.env.DB_USER,
    },
    migrations: {
      directory: "./src/db/migrations",
      tableName: "knex_migrations",
      stub: "./src/db/migrations.stub",
    },
  },
  security: {
    session: {
      jwtSecret: process.env.JWT_SECRET,
      expiresIn: "2 days",
    },
    password: {
      iteration: 100000,
      digest: "sha512",
      keylen: 256,
    },
  },
  services: {
    webApp: {
      baseUrl: process.env.WEB_APP_BASE_URL,
    },
  },
}

module.exports = config
