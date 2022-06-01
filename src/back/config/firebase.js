import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyCqZrdNaKAgJBgb5hcEcCKGXzmNiAEu8IM",
  authDomain: "hekdev-ecommerce.firebaseapp.com",
  databaseURL:
    "https://hekdev-ecommerce-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "hekdev-ecommerce",
  storageBucket: "hekdev-ecommerce.appspot.com",
  messagingSenderId: "1004225497182",
  appId: "1:1004225497182:web:ceac3d7cd7832ee1fc8ccf",
  measurementId: "G-NJE1B216SM",
}

export const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
