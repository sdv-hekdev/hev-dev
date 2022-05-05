import {
  ArrowCircleLeftIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserCircleIcon,
} from "@heroicons/react/outline"
import { useRouter } from "next/router"
import { useCallback, useState } from "react"
import Link from "next/link"
import Input from "@/web/components/Input"

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
  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => setOpen(!open), [open])

  return (
    <>
      <div className="flex w-full items-center justify-between bg-emerald-600 py-2 px-4">
        <BackButton />
        <h1 className="flex-grow-1 flex text-lg font-bold text-white md:text-2xl">
          {title}
        </h1>
        <Link href="/sign" passHref>
          <UserCircleIcon className="h-8 w-8 text-white" />
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <Link href="/">
          <a className="flex-grow-1">
            <img
              className=" mx-3 h-14 w-auto"
              src="/assets/baka-bird.jpg"
              alt="logo-md"
            />
          </a>
        </Link>

        <div className="flex items-center ">
          {open === false ? null : <Input />}
          <SearchIcon
            className="mr-3 h-8 w-8 text-gray-400"
            onClick={handleClick}
          />

          <Link href="/cart">
            <a className="flex items-center p-2">
              <ShoppingBagIcon className="h-8 w-8 text-gray-400" o />
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
