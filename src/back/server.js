const express = require("express")
// const knex = require("knex")
const cors = require("cors")

const config = require("./config.js")
const app = express()
// const db = knex(config.db)
const PORT = config.port

app.use(
  cors({
    origin: config.cors,
  })
)

app.use(express.json())

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listning on port: ${PORT}`))
