import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
} from "react"
import makeApiClient, { API_STATUS_OK } from "@/web/services/makeApiClient"
import deepmerge from "deepmerge"

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

  const signUp = useCallback(
    async ({ email, password }) => {
      try {
        const { data } = await api.post("/sign-up", { email, password })

        if (data.status !== API_STATUS_OK) {
          throw new Error("Something went wrong.")
        }

        router.push("/sign-in")
      } catch (err) {
        const error = err?.response?.data?.error

        return error || "Something went wrong."
      }
    },
    [router]
  )

  const signIn = useCallback(
    async ({ email, password }) => {
      try {
        const { data } = await api.post("/sign-in", { email, password })

        if (data.status !== API_STATUS_OK || !data.data) {
          throw new Error("Something went wrong.")
        }

        const { payload } = JSON.parse(
          Buffer.from(data.data.split(".")[1], "base64").toString("utf-8")
        )

        localStorage.setItem(tokenSession, data.data)

        updateState({ session: payload })

        router.push("/")
      } catch (err) {
        const error = err?.response?.data?.error

        return error || "Something went wrong."
      }
    },
    [router, updateState]
  )
  // Redirect if no session.
  // Keep session open on refresh.
  useEffect(() => {
    const session = getSessionFromJWT(localStorage.getItem(tokenSession))
    updateState({ session })

    if (!session && !page.isPublic) {
      router.push("/sign-in")
    }
  }, [router, page, updateState])

  const context = { signUp, signIn, state, session }

  if (!session && !page.isPublic) {
    return null
  }

  return <AppContext.Provider {...props} value={context} />
}
