import { useCallback, useState } from "react"
import {
  ArrowCircleLeftIcon,
  MenuIcon,
  SearchIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  XIcon,
} from "@heroicons/react/outline"
import Link from "next/link"

import { useAppContext } from "@/web/context/AppContext"
import Navbar from "@/web/components/Navbar"
import Input from "@/web/components/Input"
import { useRouter } from "next/router"

const BackButton = (props) => {
  const router = useRouter()
  const handleClick = useCallback(() => router.back(), [router])

  return (
    <ArrowCircleLeftIcon
      className="h-8 w-8 text-white hover:cursor-pointer"
      onClick={handleClick}
      {...props}
    />
  )
}

const Header = (props) => {
  const { title, counter, noBack, noMenu } = props
  const { session } = useAppContext()
  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => setOpen(!open), [open])

  return (
    <div className="bg-white top-0 items-center ">
      <div className="flex w-full items-center justify-between bg-gradient-to-r from-emerald-600 to-emerald-900 py-2 px-4">
        {noBack ? null : <BackButton />}
        <h1 className="font-light text-white text-2xl lg:text-center">
          {title}
        </h1>
        <div
          className="flex
         items-center justify-end space-x-2"
        >
          {session ? (
            <Link href="/profile">
              <UserCircleIcon className="h-8 w-8 text-white hover:cursor-pointer" />
            </Link>
          ) : (
            <div className="flex gap-2 text-sm  underline text-white">
              <Link href="/sign-up">
                <a>
                  <p>Create an account</p>
                </a>
              </Link>
              <Link href="/sign-in">
                <a>Access your account</a>
              </Link>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <a>
              <img
                className="h-20 w-25 cursor-pointer"
                src="/assets/logo-header.png"
                alt="logo-md"
              />
            </a>
          </Link>
          {noMenu ? null : (
            <div>
              {open ? (
                <MenuIcon
                  className="flex h-8 w-8 text-gray-400 hover:cursor-pointer"
                  onClick={handleClick}
                />
              ) : (
                <>
                  <Navbar />
                </>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end w-1/3 mx-6">
          {open === false ? null : <Input />}
          {open === false ? (
            <SearchIcon
              className="h-8 w-8 text-gray-400 hover:cursor-pointer"
              onClick={handleClick}
            />
          ) : (
            <XIcon className="h-8 w-8 text-gray-400" onClick={handleClick} />
          )}

          <Link href="/cart">
            <a className="flex items-center mx-2">
              <ShoppingBagIcon className="h-8 w-8 text-gray-400" />
              <span className="text-lg font-medium text-gray-700">
                {counter} 99
              </span>
            </a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
