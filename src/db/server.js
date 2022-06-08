const express = require("express")
const knex = require("knex")
const cors = require("cors")
const config = require("./config.js")
const makeSessionRoutes = require("./routes/makeSessionRoutes")
const BaseModel = require("./models/BaseModel")

const db = knex(config.db)
const app = express()
const PORT = config.port

BaseModel.knex(db)

app.use(express.json())
app.use(
  cors({
    origin: config.services.webApp.baseUrl,
  })
)

makeSessionRoutes({ app })

// eslint-disable-next-line no-console
app.listen(PORT, () => console.log(`Listning on port: ${PORT}`))
