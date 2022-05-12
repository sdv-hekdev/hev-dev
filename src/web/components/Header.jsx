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
import Navbar from "@/web/components/Navbar"
import { AppContext } from "@/web/context/AppContext"
import Button from "@/web/components/Button"

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
  const { title, counter, noBack, noMenu } = props
  const {
    context: { logout, router },
  } = useContext(AppContext)
  const [open, setOpen] = useState(false)

  const handleClick = useCallback(() => setOpen(!open), [open])

  const signOut = useCallback(() => {
    logout()

    router.push("/")
  }, [logout, router])

  return (
    <>
      <div className="flex w-full items-center justify-between bg-emerald-600 py-1 px-4">
        {noBack ? null : <BackButton />}
        <h1 className="font-light text-white text-2xl lg:text-center">
          {title}
        </h1>
        <div
          className="flex
         items-center justify-end space-x-2"
        >
          <Button
            title="Sign out"
            variant="signOut"
            className=""
            onClick={signOut}
          />
          <Link href="/sign-up" passHref>
            <a>
              <UserCircleIcon className="h-8 w-8 text-white" />
            </a>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/" passHref>
            <img
              className="mx-2 h-20 w-20 order-2 md:order-1"
              src="/assets/baka-bird.jpg"
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
                <div>
                  <Navbar />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-end w-1/2">
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
