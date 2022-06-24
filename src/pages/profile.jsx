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
      <h1>Welcome </h1>
      <div className="flex justify-center">
        <ul className="gap-y-5 mt-5 uppercase">
          <li className="my-5">
            <Link href="/update-email">
              <a className="rounded-md bg-emerald-600 py-2 px-4 text-center text-lg font-light text-white hover:bg-emerald-500 active:bg-emerald-700">
                Update Email
              </a>
            </Link>
          </li>
          <li className="my-5">
            <Link href="/change-password">
              <a className="rounded-md bg-emerald-600 py-2 px-4  text-center text-lg font-light text-white hover:bg-emerald-500 active:bg-emerald-700">
                Change password
              </a>
            </Link>
          </li>
          <li className="my-5">
            <Link href="/add-item">
              <a className="rounded-md bg-emerald-600 py-2 px-4  text-center text-lg font-light text-white hover:bg-emerald-500 active:bg-emerald-700">
                Add item
              </a>
            </Link>
          </li>
          <li className="my-5">
            <Link href="/delete-account">
              <a className="rounded-md bg-red-600 py-2 px-4 text-center text-lg font-light text-white hover:bg-red-500 active:bg-red-700">
                Delete account
              </a>
            </Link>
          </li>
          <li className="my-5">
            <Button title="logout" variant="danger" onClick={handleClick} />
          </li>
        </ul>
      </div>
    </Page>
  )
}

export default ProfilePage
