import { useRouter } from "next/router"
import { createContext, useState } from "react"

export const AppContext = createContext()

export const AppContextProvider = (props) => {
  const { ...otherProps } = props
  const router = useRouter()
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const addItem = async () => {}

  const signIn = async () => {
    try {
      setUser(user)
      console.log("WELCOME BACK")
    } catch (e) {
      console.log(e)
    }
  }

  const signUp = async () => {
    try {
      setUser(user)
      console.log("WELCOME")
    } catch (e) {
      console.log(e)
    }
  }

  const logout = async () => {
    try {
      setUser(null)
      console.log("DISCONNECTED")
    } catch (e) {
      console.log(e)
    }
  }

  const deleteAccount = async () => {
    try {
      console.log("ACCOUNT_DELETED")
    } catch (e) {
      console.log(e)
    }
  }

  const updateCurrentEmail = async () => {
    try {
      console.log("EMAIL UPDATED")
    } catch (e) {
      setError(e)
    }
  }

  const updateCurrentPassword = async () => {
    try {
      console.log("PASSWORD UPDATED")
    } catch (e) {
      setError(e)
    }
  }

  const context = {
    router,
    user,
    currentUser,
    signIn,
    signUp,
    logout,
    deleteAccount,
    updateCurrentEmail,
    updateCurrentPassword,
    error,
    setError,
    addItem,
  }

  return <AppContext.Provider {...otherProps} value={{ context }} />
}
