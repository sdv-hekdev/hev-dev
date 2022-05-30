import { useRouter } from "next/router"
import { createContext, useState, useEffect } from "react"
import {
  createUserWithEmailAndPassword,
  deleteUser,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
} from "firebase/auth"

import { auth } from "@/back/config/firebase"

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

  const updateCurrentEmail = async (email) => {
    await updateEmail(currentUser, email)
  }

  const updateCurrentPassword = async (password) => {
    updatePassword(currentUser, password)
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
  }

  return <AppContext.Provider {...otherProps} value={{ context }} />
}
