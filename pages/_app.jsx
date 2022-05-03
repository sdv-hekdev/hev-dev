import Page from "../src/web/components/Page"
import "../src/web/styles/tailwind.css"

const App = ({ Component, pageProps }) => {
  return (
    <Page>
      <Component {...pageProps} />
    </Page>
  )
}

export default App
