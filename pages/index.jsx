import Link from "next/link"
import Image from "next/image"

import Header from "../src/web/components/Header"
import Footer from "../src/web/components/Footer"

const LandingPage = () => {
  return (
    <div className="bg-white">
      <Header />

      <main>
        {/* Hero section */}
        <div className="relative">
          {/* Background image and overlap */}
          <div
            aria-hidden="true"
            className="hidden absolute inset-0 sm:flex sm:flex-col"
          >
            <div className="flex-1 relative w-full bg-gray-600">
              <div className="absolute inset-0 overflow-hidden">
                <Image
                  src="/assets/landing-page-cover.png"
                  alt="lg-cover"
                  className="bg-cover bg-center"
                  layout="fill"
                />
              </div>
            </div>
          </div>

          <div className="relative max-w-3xl mx-auto pb-96 px-4 text-center sm:pb-0 sm:px-6 lg:px-8">
            {/* Background image and overlap */}
            <div
              aria-hidden="true"
              className="absolute inset-0 flex flex-col sm:hidden"
            >
              <div className="flex-1 w-full bg-gray-800">
                <div className="inset-0 overflow-hidden">
                  <Image
                    src="/assets/landing-page-cover.png"
                    alt="sm-cover"
                    className="object-center object-cover"
                    layout="fill"
                  />
                </div>
              </div>
            </div>
            <div className="relative py-32">
              <h1 className="text-4xl outline-2 text-white sm:text-5xl md:text-6xl">
                HEK.dev
              </h1>
              <div className="mt-4 sm:mt-6">
                <Link href="/shopping">
                  <a className="inline-block bg-emerald-600 border border-transparent rounded-md py-3 px-8 font-medium text-white hover:bg-emerald-700">
                    Shop Collection
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* <Trending /> */}
      <Footer />
    </div>
  )
}

export default LandingPage
