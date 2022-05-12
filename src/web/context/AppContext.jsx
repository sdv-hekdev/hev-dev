import { auth } from "@/back/config/firebase"
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { useRouter } from "next/router"
import { createContext, useState, useEffect } from "react"

export const AppContext = createContext()

export const AppContextProvider = (props) => {
  const { ...otherProps } = props
  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email, password) =>
    signInWithEmailAndPassword(auth, email, password)

  const signUp = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  const context = { router, signIn, logout, signUp, user }

  return <AppContext.Provider {...otherProps} value={{ context }} />
}
