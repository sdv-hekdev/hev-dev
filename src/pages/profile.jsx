import Button from "@/web/components/Button"
import Page from "@/web/components/Page"
import { useAppContext } from "@/web/context/AppContext"
// import { useAppContext } from "@/web/context/AppContext"
import Link from "next/link"
import { useRouter } from "next/router"
import { useCallback } from "react"

const ProfilePage = () => {
  const { signOut } = useAppContext()
  const router = useRouter()

  const handleClick = useCallback(() => {
    signOut()
    router.push("/")
  }, [signOut, router])

  return (
    <Page title="Check your profile">
      <ul className="flex items-center  justify-center gap-5 mt-5 uppercase">
        <li className="my-5">
          <Link href="/add-item">
            <a className="rounded-md bg-emerald-600 py-2 border-2 border-emerald-600 hover:ring px-4 text-center text-sm font-medium text-white hover:bg-emerald-500 active:bg-emerald-700">
              Add item
            </a>
          </Link>
        </li>

        <li className="my-5">
          <Button title="logout" variant="danger" onClick={handleClick} />
        </li>
      </ul>
    </Page>
  )
}

export default ProfilePage
