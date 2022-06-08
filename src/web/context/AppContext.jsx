import { createContext, useState, useContext } from "react"

export const AppContext = createContext()

export const useAppContext = () => useContext(AppContext)

export const AppContextProvider = (props) => {
  const { ...otherProps } = props
  const [error, setError] = useState(null)
  const [user, setUser] = useState()

  const context = {
    error,
    setError,
    user,
    setUser,
  }

  return <AppContext.Provider {...otherProps} value={context} />
}
