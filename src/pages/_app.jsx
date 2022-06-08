import { AppContextProvider } from "@/web/context/AppContext"

import "@/web/styles/tailwind.css"

const App = ({ Component, pageProps, router, ...otherProps }) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} router={router} {...otherProps} />
    </AppContextProvider>
  )
}

export default App
