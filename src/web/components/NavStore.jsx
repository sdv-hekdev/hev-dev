import { useCallback, useState } from "react"

import navigation from "@/web/components/mock/navigation"

const NavStore = () => {
  const [open, setOpen] = useState()
  const handleClick = useCallback(() => {
    setOpen(!open)
  }, [open])

  return (
    <div>
      <ul className="flex space-x-5 text-lg text-gray-500 border-b border-gray-300">
        {navigation.categories.map(({ id, name }) => (
          <li key={id} onClick={handleClick}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  )
}
export default NavStore
