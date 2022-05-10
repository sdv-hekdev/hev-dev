import { auth } from "@/back/config/firebase"
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth"
import { useRouter } from "next/router"
import { createContext, useContext, useEffect, useState } from "react"

export const AppContext = createContext()
export const useAuth = () => useContext(AppContext)

export const AppContextProvider = (props) => {
  const router = useRouter()
  const [user, setUser] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
        })
      } else {
        setUser(null)
      }

      setLoading(false)
    })

    return () => unsubscribe
  }, [])

  const signIn = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password)

  const signUp = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password)

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  const context = { router, signIn, logout, signUp, user, loading }

  return <AppContext.Provider {...props} value={{ context }} />
}
