import Link from "next/link"

import SignBar from "@/web/components/SignBar"
import NavStore from "@/web/components/NavStore"

const Header = () => {
  return (
    <nav aria-label="Top">
      <SignBar />
      <NavStore />

      <Link href="/">
        <a className="lg:hidden">
          <span className="sr-only">Workflow</span>
          <img
            className="h-14 w-auto"
            src="/assets/baka-bird.jpg"
            alt="logo-md"
          />
        </a>
      </Link>
    </nav>
  )
}

export default Header
