const { SOMETHING_WENT_WRONG } = require("./ErrorMessage")
const ProductModel = require("../models/Product")
const {
  HTTP_NOT_FOUND,
  HTTP_INTERNAL_ERROR,
} = require("../routes/httpStatusCode")

const makeProductRoutes = ({ app }) => {
  app.get("/products", async (req, res) => {
    try {
      const product = await ProductModel.query().select("*")

      if (!product) {
        res.status(HTTP_NOT_FOUND).send({ error: "Not found." })

        return
      }

      res.send(product)
    } catch (error) {
      //console.log(error)
      res.status(HTTP_INTERNAL_ERROR).send({ error: SOMETHING_WENT_WRONG })
    }
  })

  app.post("/users/:userId/products", async (req, res) => {
    const {
      params: { userId },
      body: { title, description, price },
    } = req

    try {
      await ProductModel.query()
        .insertAndFetch({
          userId,
          title,
          description,
          price,
        })
        .returning("*")

      res.send({ status: "Ok" })
    } catch (error) {
      // console.log(error)
      res.status(HTTP_INTERNAL_ERROR).send({ error: SOMETHING_WENT_WRONG })
    }
  })
}

module.exports = makeProductRoutes
