const UserModel = require("@/db/Model/User")
const BaseModel = require("@/db/models/BaseModel")

class ProductModel extends BaseModel {
  static tableName = "products"

  static relationMappings() {
    return {
      users: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "posts.userId",
          to: "user.id",
        },
      },
    }
  }
}

module.exports = ProductModel
