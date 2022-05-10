import {
  ArrowCircleLeftIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XIcon,
} from "@heroicons/react/outline"
import { useCallback, useState, useContext } from "react"
import Link from "next/link"

import Input from "@/web/components/Input"
import NavStore from "@/web/components/NavStore"
import { AppContext } from "@/web/context/AppContext"

const BackButton = (props) => {
  const {
    context: { router },
  } = useContext(AppContext)

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
  const { title, counter, noMenu } = props
  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => setOpen(!open), [open])

  return (
    <>
      <div className="flex w-full items-center justify-between bg-emerald-600 py-2 px-4">
        <BackButton />

        <h1 className="flex-grow-1 flex text-lg font-light text-white md:text-2xl">
          {title}
        </h1>
        <Link href="/sign" passHref>
          <a>
            <UserCircleIcon className="h-8 w-8 text-white" />
          </a>
        </Link>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center">
          <Link href="/" passHref>
            <img
              className="mx-2 h-20 w-20"
              src="/assets/baka-bird.jpg"
              alt="logo-md"
            />
          </Link>

          {open === true ? (
            <MenuIcon className="h-8 w-8 text-gray-400" onClick={handleClick} />
          ) : (
            <div>{noMenu ? null : <NavStore />}</div>
          )}
        </div>

        <div className="flex items-center flex-shrink-1">
          {open === false ? null : <Input />}
          {open === false ? (
            <SearchIcon
              className="h-8 w-8 text-gray-400"
              onClick={handleClick}
            />
          ) : (
            <XIcon className="h-8 w-8 text-gray-400" onClick={handleClick} />
          )}

          <Link href="/cart">
            <a className="flex items-center mx-2">
              <ShoppingBagIcon className="h-8 w-8 text-gray-400" />
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
