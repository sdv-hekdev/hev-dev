const ProductModel = require("@/db/Model/Product")
const { Model } = require("objection")

module.exports = class UserModel extends Model {
  static tableName = "users"

  static relationMappings() {
    return {
      products: {
        relation: Model.HasManyRelation,
        modelClass: ProductModel,
        join: {
          from: "users.id",
          to: "products.userId",
        },
      },
    }
  }
}
