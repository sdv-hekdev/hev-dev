import Header from "@/web/components/Header"
import socialNetwork from "@/web/components/socialNetwork"

const Page = (props) => {
  const { children, title, noFooter, ...otherProps } = props

  return (
    <div className="flex h-full flex-col">
      <main className="flex-grow scroll-auto" {...otherProps}>
        <Header title={title}>HEK.dev - {title}</Header>

        <section>{children}</section>
      </main>

      {noFooter ? null : (
        <footer className="w-full bg-gray-100 mt-5">
          <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 md:flex md:items-center md:justify-between lg:px-2">
            <div className="flex justify-center space-x-6  md:order-2">
              {socialNetwork.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <item.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className=" mt-3 md:order-1 md:mt-0">
              <p className="text-center text-base text-gray-400">
                &copy; 2022 Workflow, All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      )}
    </div>
  )
}

export default Page
