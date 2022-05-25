import { auth } from "@/back/config/firebase"
import {
  createUserWithEmailAndPassword,
  deleteUser,
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

  const currentUser = auth.currentUser

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email,
        })
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  const signIn = async (email, password) => {
    setUser(user)
    await signInWithEmailAndPassword(auth, email, password)
  }

  const signUp = async (email, password) => {
    setUser(user)
    await createUserWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  const deleteAccount = async () => {
    await deleteUser(currentUser)
  }

  const updateEmail = async (newEmail) => {
    await updateEmail(currentUser, newEmail)
  }

  const updatePassword = async (newPassword) => {
    await updatePassword(currentUser, newPassword)
  }

  const context = {
    router,
    user,
    currentUser,
    signIn,
    signUp,
    logout,
    deleteAccount,
    updateEmail,
    updatePassword,
  }

  return <AppContext.Provider {...otherProps} value={{ context }} />
}
