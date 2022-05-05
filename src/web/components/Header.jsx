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
import NavStore from "@/web/components/NavStore"

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
              className="mx-2 h-20 w-20"
              src="/assets/baka-bird.jpg"
              alt="logo-md"
            />
          </a>
        </Link>

        <NavStore />

        <div className="flex items-center ">
          {open === false ? null : <Input />}
          <SearchIcon className="h-8 w-8 text-gray-400" onClick={handleClick} />

          <Link href="/cart">
            <a className="flex items-center mx-2">
              <ShoppingBagIcon className="h-8 w-8 text-gray-400" o />
              <span className="text-lg font-medium text-gray-700">
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
