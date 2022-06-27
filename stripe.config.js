const stripe = require("stripe")
const stripeKey = stripe(process.env.STRIPE_API_KEY_TEST)

module.exports = stripeKey
