const ProductModel = require("../models/Product")
const {
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_ERROR,
} = require("../routes/httpStatusCode")

const makeProductRoutes = ({ app }) => {
  app.get("/products", async (req, res) => {
    try {
      const product = await ProductModel.query()

      if (!product) {
        res.status(HTTP_NOT_FOUND).send({ error: "Not found." })

        return
      }
    } catch (error) {
      res.status(HTTP_INTERNAL_ERROR).send({ error: "Something went wrong" })
    }
  })

  app.post("/products", async (req, res) => {
    const {
      body: { title, description },
    } = req

    try {
    } catch (error) {}
  })
}

module.exports = makeProductRoutes
