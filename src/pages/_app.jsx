import { AppContextProvider } from "@/web/context/AppContext"

import "@/web/styles/tailwind.css"

const App = ({ Component, pageProps, ...otherProps }) => {
  return (
    <AppContextProvider>
      <Component {...pageProps} {...otherProps} />
    </AppContextProvider>
  )
}

export default App
