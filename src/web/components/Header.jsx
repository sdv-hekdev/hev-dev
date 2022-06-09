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
import Button from "@/web/components/Button"
import Navbar from "@/web/components/Navbar"
import Input from "@/web/components/Input"

const BackButton = (props) => {
  const handleClick = useCallback(() => {}, [])

  return (
    <ArrowCircleLeftIcon
      className="h-8 w-8 text-white"
      onClick={handleClick}
      {...props}
    />
  )
}

const Header = (props) => {
  const { title, counter, noBack, noMenu } = props
  const { user } = useAppContext()

  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => setOpen(!open), [open])

  const signOut = useCallback(() => {}, [])

  return (
    <div className="bg-white top-0">
      <div className="flex w-full items-center justify-between bg-gradient-to-r from-emerald-600 to-emerald-900 py-2 px-4">
        {noBack ? null : <BackButton />}
        <h1 className="font-light text-white text-2xl lg:text-center">
          {title}
        </h1>
        <div
          className="flex
         items-center justify-end space-x-2"
        >
          {!user ? null : (
            <Button title="Sign out" variant="danger" onClick={signOut} />
          )}
          {user ? (
            <Link href="/profile" passHref>
              <a>
                <UserCircleIcon className="h-8 w-8 text-white" />
              </a>
            </Link>
          ) : (
            <Link href="/sign-up" passHref>
              <a>
                <UserCircleIcon className="h-8 w-8 text-white" />
              </a>
            </Link>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" passHref>
            <img
              className="h-20 w-25 cursor-pointer"
              src="/assets/logo-header.png"
              alt="logo-md"
            />
          </Link>
          {noMenu ? null : (
            <div>
              {open ? (
                <MenuIcon
                  className="flex h-8 w-8 text-gray-400"
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
