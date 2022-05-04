import {
  ArrowCircleLeftIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/outline"
import { useRouter } from "next/router"
import { useCallback } from "react"
import Link from "next/link"

const BackButton = (props) => {
  const router = useRouter()

  const handleClick = useCallback(() => router.back(), [router])

  return (
    <ArrowCircleLeftIcon
      className="h-8 w-8 text-white"
      onClick={handleClick}
      {...props}
    />
  )
}

const Header = (props) => {
  const { title, counter } = props

  return (
    <>
      <div className="flex w-full items-center justify-between bg-emerald-600 py-2 px-4">
        <BackButton />
        <h1 className="flex-grow-1 flex text-lg text-white md:text-2xl">
          {title}
        </h1>

        <UserCircleIcon className="h-8 w-8 text-white md:hidden" />
        <div className="hidden space-x-2 md:flex">
          <Link href="/sign">
            <a className="text-lg text-white">Sign in</a>
          </Link>
          <Link href="/sign">
            <a className="text-lg text-white">Create account</a>
          </Link>
        </div>
      </div>

      <div className="flex items-center">
        <Link href="/">
          <a className="flex-grow-1">
            <img
              className=" mx-3 h-14 w-auto"
              src="/assets/baka-bird.jpg"
              alt="logo-md"
            />
          </a>
        </Link>

        <div className="flex items-center justify-self-end">
          <SearchIcon className="mr-3 h-8 w-8 text-gray-400" />

          <Link href="/cart">
            <a className="flex items-center p-2">
              <ShoppingBagIcon className="h-8 w-8 text-gray-400" />
              <span className="ml-2 text-lg font-medium text-gray-700">
                {counter} 0
              </span>
            </a>
          </Link>
        </div>
      </div>
    </>
  )
}

export default Header
