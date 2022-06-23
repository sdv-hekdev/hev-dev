const BaseModel = require("./BaseModel")

class User extends BaseModel {
  static tableName = "users"

  static relationMappings() {
    return {}
  }
}

module.exports = User
