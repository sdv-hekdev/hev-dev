export const up = async (knex) => {
  await knex.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("email").notNullable().unique()
    table.text("password").notNullable()
    table.text("DisplayName")
    table.timestamp(true, true, true).notNullable()
  })
}

export const down = async (knex) => {
  await knex.schema.dropTable("users")
}
