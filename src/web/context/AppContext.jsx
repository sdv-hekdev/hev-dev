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

const api = makeApiClient()

const getSessionFromJwt = (jwt) => {
  jwt ? JSON.parse(Buffer.from(jwt.split(".")[1])).payload : null
}
const initialState = {
  session: null,
}

const tokenSession = "hekdev_jwt_session"

export const AppContextProvider = (props) => {
  const { router, page } = props
  const [state, setState] = useState(initialState)
  const { session } = state
  const updateState = useCallback((newstate) => {
    setState((prevState) => deepmerge(prevState, newstate))
  }, [])
  const signUp = useCallback(
    async ({ email, password }) => {
      try {
        const { data } = await api.post("/sign-up", { email, password })

        if (data.status !== API_STATUS_OK) {
          //console.log()
          throw new Error("Something went wrong")
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
          //if problem : => console.log()
          throw new Error("Something went wrong")
        }

        localStorage.setItem(tokenSession, data.data)

        const { payload } = getSessionFromJwt(data.data)
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
    const session = getSessionFromJwt(localStorage.getItem(tokenSession))
    updateState({ session })

    if (!session && !page.isPublic) {
      router.push("/sign-in") || router.push("/sign-up")
    }
  }, [router, page, updateState])

  const context = { signUp, signIn, state }

  if (!session || page.isPublic) {
    return <AppContext.Provider {...props} value={context} />
  }
}
