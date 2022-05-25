import Page from "@/web/components/Page"
import Link from "next/link"

import Trending from "@/web/components/Trending"

const LandingPage = () => {
  return (
    <Page title="Welcome to HEK.dev" noBack>
      <div className="flex flex-col">
        <img src="/assets/landing-page-cover.png" alt="cover" />
        <div className="mt-1 flex justify-center md:hidden">
          <Link href="/shopping">
            <a className="w-1/3 rounded-md bg-emerald-600 py-1 text-center text-lg font-light text-white hover:bg-emerald-500 active:bg-emerald-700">
              Shop Now
            </a>
          </Link>
        </div>

        <Trending />

        <div className="mx-3 hidden py-8 text-sm md:flex">
          <Link href="/shopping">
            <a className="font-medium text-lg text-indigo-600 hover:text-indigo-400">
              Shop the collection<span>&rarr;</span>
            </a>
          </Link>
        </div>
      </div>
    </Page>
  )
}

export default LandingPage
