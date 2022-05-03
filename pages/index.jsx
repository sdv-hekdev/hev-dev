import Page from "@/web/components/Page"
import Link from "next/link"

// import Trending from "@/web/components/Trending"

const LandingPage = () => {
  return (
    <Page>
      <div className="flex flex-col">
        {/* <img src="/assets/landing-page-cover.png" alt="cover" /> */}
        <div className="mt-1 flex justify-center lg:hidden">
          <Link href="/shopping">
            <a className=" w-1/2 rounded-md bg-emerald-600 py-3 text-center font-medium text-white hover:bg-emerald-500 active:bg-emerald-700">
              Shop Now
            </a>
          </Link>
        </div>

        {/* <Trending /> */}

        <div className="mx-3 hidden py-8 text-sm lg:flex">
          <Link href="/shopping">
            <a className="font-medium text-indigo-600 hover:text-indigo-400">
              Shop the collection<span>&rarr;</span>
            </a>
          </Link>
        </div>
      </div>
    </Page>
  )
}

export default LandingPage
