import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react"
import makeApiClient, { API_STATUS_OK } from "@/web/services/makeApiClient"
import deepmerge from "deepmerge"
import {
  NO_DATA_RETRIEVED,
  SOMETHING_WENT_WRONG,
} from "@/db/routes/ErrorMessage"

const AppContext = createContext()
export const useAppContext = () => useContext(AppContext)

const tokenSession = "hekdev_jwt_session"

const getSessionFromJWT = (jwt) =>
  jwt
    ? JSON.parse(Buffer.from(jwt.split(".")[1], "base64").toString("utf-8"))
        .payload
    : null

const initialState = {
  session: null,
}

const api = makeApiClient()

export const AppContextProvider = (props) => {
  const { router, page } = props
  const [state, setState] = useState(initialState)
  const { session } = state

  const updateState = useCallback(
    (newstate) => setState((prevState) => deepmerge(prevState, newstate)),
    []
  )

  //HANDLE SESSION
  const signUp = useCallback(
    async ({ email, password }) => {
      try {
        const { data } = await api.post("/sign-up", { email, password })

        if (data.status !== API_STATUS_OK) {
          throw new Error(SOMETHING_WENT_WRONG)
        }

        router.push("/sign-in")
      } catch (err) {
        const error = err?.response?.data?.error

        return error || SOMETHING_WENT_WRONG
      }
    },
    [router]
  )

  const signIn = useCallback(
    async ({ email, password }) => {
      try {
        const { data } = await api.post("/sign-in", { email, password })

        if (data.status !== API_STATUS_OK || !data.data) {
          throw new Error(SOMETHING_WENT_WRONG)
        }

        const { payload } = JSON.parse(
          Buffer.from(data.data.split(".")[1], "base64").toString("utf-8")
        )

        localStorage.setItem(tokenSession, data.data)

        updateState({ session: payload })

        router.push("/")
      } catch (err) {
        const error = err?.response?.data?.error

        return error || SOMETHING_WENT_WRONG
      }
    },
    [router, updateState]
  )

  const signOut = useCallback(() => {
    localStorage.removeItem(tokenSession)
  }, [])

  // Redirect if no session.
  // Keep session open on refresh.
  useEffect(() => {
    const session = getSessionFromJWT(localStorage.getItem(tokenSession))
    updateState({ session })

    if (!session && !page.isPublic) {
      router.push("/sign-in")
    }
  }, [router, page, updateState])

  //HANDLE PRODUCTS
  const getProducts = useCallback(async () => {
    try {
      const { data } = await api.get("/products")

      if (!data) {
        throw new Error(NO_DATA_RETRIEVED)
      }

      return data
    } catch (err) {
      const error = err?.response?.data?.error

      return error || SOMETHING_WENT_WRONG
    }
  }, [])

  const addProduct = useCallback(async ({ title, description, price }) => {
    try {
      const { data } = await api.post(`/products`, {
        title,
        description,
        price,
      })

      if (data.status !== API_STATUS_OK) {
        throw new Error(SOMETHING_WENT_WRONG)
      }

      return API_STATUS_OK
    } catch (err) {
      const error = err?.response?.data?.error

      return error || SOMETHING_WENT_WRONG
    }
  }, [])

  //TO DO REORGANIZE CONTEXT
  const context = {
    signUp,
    signIn,
    signOut,
    state,
    session,
    addProduct,
    getProducts,
  }

  if (!session && !page.isPublic) {
    //TO DO ADD LOADER
    return null
  }

  return <AppContext.Provider {...props} value={context} />
}
