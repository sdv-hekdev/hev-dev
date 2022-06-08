import axios from "axios"

const makeApiClient = (jwt) =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  })

export default makeApiClient
