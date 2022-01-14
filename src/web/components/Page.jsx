import Header from "./Header"
import Footer from "./Footer"

const Page = (props) => {
  const { children, title, noBack, noFooter, ...otherProps } = props

  return (
    <>
      <Header>{title}</Header>
      <main {...otherProps} className="h-screen">
        <section>{children}</section>
      </main>
      {noFooter ? null : <Footer />}
    </>
  )
}

export default Page
