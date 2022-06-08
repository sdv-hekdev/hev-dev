exports.up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("email").notNullable().unique()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.text("firstName")
    table.text("lastName")

    table.timestamps(true, true, true)
  })
  await knex.schema.createTable("products", (table) => {
    table.increments("id")
    table.text("title").notNullable()
    table.text("description").notNullable()
    table.integer("quantity").unsigned()
    table.integer("rate").unsigned()
    table.integer("price").unsigned().notNullable()
    table.timestamps(true, true, true)

    table.integer("userId").unsigned().notNullable()
    table.foreign("userId").references("id").inTable("users")
  })
  await knex.schema.createTable("addresses", (table) => {
    table.increments("id")
    table.integer("number").unsigned().notNullable()
    table.integer("street").notNullable()
    table.integer("unit")
    table.text("city").notNullable()
    table.text("district").notNullable()
    table.integer("postcode").unsigned().notNullable()

    table.integer("userId").unsigned().notNullable()
    table.foreign("userId").references("id").inTable("users")
  })
}

exports.down = async (knex) => {
  await knex.schema.dropTable("addresses")
  await knex.schema.dropTable("products")
  await knex.schema.dropTable("users")
}
