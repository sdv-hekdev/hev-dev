import Link from "next/link"

import Trending from "@/web/components/Trending"

const LandingPage = () => {
  return (
    <div className="flex flex-col">
      <img src="/assets/landing-page-cover.png" alt="cover" />
      <Trending />

      <div className="mx-3 py-8 text-sm md:hidden">
        <Link href="/shopping">
          <a className="font-medium text-indigo-600 hover:text-indigo-400">
            Shop the collection<span>&rarr;</span>
          </a>
        </Link>
      </div>
    </div>
  )
}

export default LandingPage
