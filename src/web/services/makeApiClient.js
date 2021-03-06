import axios from "axios"

export const API_STATUS_OK = "Ok"

const makeApiClient = () =>
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  })

export default makeApiClient
