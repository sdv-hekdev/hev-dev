import { useCallback, useState } from "react"

import navigation from "@/web/components/mock/navigation"

const NavStore = () => {
  const [open, setOpen] = useState()
  const handleClick = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <div>
      <ul className="flex space-x-5 text-lg">
        {navigation.categories.map(({ name }) => (
          <li key={name} onClick={handleClick} className="focus:ring-2">
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default NavStore
