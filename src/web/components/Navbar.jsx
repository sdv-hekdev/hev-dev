import { useCallback, useState } from "react"
import { MenuIcon } from "@heroicons/react/outline"

import navigation from "@/mock/navigation"
import Link from "next/link"

const Navbar = () => {
  const [open, setOpen] = useState()
  const handleClick = useCallback(() => setOpen(!open), [open])

  return (
    <>
      <MenuIcon
        className="flex h-8 w-8 text-gray-400 md:hidden"
        onClick={handleClick}
      />
      <div className="hidden md:flex">
        <ul className="flex space-x-3 text-sm">
          {navigation.categories.map(({ name }) => (
            <li key={name} onClick={handleClick} className="focus:ring-2">
              <Link href="/" passHref>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
export default Navbar
