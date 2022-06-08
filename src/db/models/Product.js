const UserModel = require("@/db/Model/User")
const { Model } = require("objection")

module.exports = class ProductModel extends Model {
  static tableName = "products"

  static relationMappings() {
    return {
      users: {
        relation: Model.HasOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.userId",
          to: "user.id",
        },
      },
    }
  }
}
