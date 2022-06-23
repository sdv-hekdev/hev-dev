const { faker } = require("@faker-js/faker")

const rand = (min, max) => Math.floor(Math.random() * (max - min) + min)

exports.seed = async (knex) => {
  await knex("products").delete()
  await knex("users").delete()

  await knex("users").insert(
    [...new Array(10)].map(() => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      email: faker.internet.email(),
      passwordHash: faker.internet.password(),
      passwordSalt: faker.internet.password(),
    }))
  )

  const [{ min: minUserId, max: maxUserId }] = await knex("users")
    .min("id")
    .max("id")

  await knex("products").insert(
    [...new Array(200)].map(() => ({
      title: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: faker.commerce.price(1, 500),
      quantity: rand(1, 5),
      userId: rand(minUserId, maxUserId),
    }))
  )

  await knex("addresses").insert(
    [...new Array(10)].map(() => ({
      number: rand(1, 100),
      streetName: faker.address.streetName(),
      unit: rand(1, 5),
      city: faker.address.cityName(),
      country: faker.address.country(),
      district: faker.address.county(),
      zipCode: faker.address.zipCode(),
      userId: rand(minUserId, maxUserId),
    }))
  )
}
