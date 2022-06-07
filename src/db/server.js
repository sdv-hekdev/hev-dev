const express = require("express")
const cors = require("cors")
const knex = require("knex")
const config = require("./config.js")
const { Model } = require("objection")

const db = knex(config.db)
const app = express()
const PORT = config.port

Model.knex(db)

app.use(
  cors({
    origin: config.cors,
  })
)

app.use(express.json())

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listning on port: ${PORT}`))
