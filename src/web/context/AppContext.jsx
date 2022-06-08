import { createContext, useState } from "react"

export const AppContext = createContext()

export const AppContextProvider = (props) => {
  const { ...otherProps } = props
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const context = {
    user,
    setUser,
    error,
    setError,
  }

  return <AppContext.Provider {...otherProps} value={context} />
}
