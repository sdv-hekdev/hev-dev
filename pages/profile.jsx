import { useContext, useCallback, useState } from "react"
import Link from "next/link"

import Page from "@/web/components/Page"
import Button from "@/web/components/Button"
import { AppContext } from "@/web/context/AppContext"

const ProfilePage = () => {
  const [error, setError] = useState(null)
  const {
    context: { deleteAccount, router },
  } = useContext(AppContext)

  const handleClick = useCallback(async () => {
    try {
      deleteAccount()

      router.push("/")
    } catch (err) {
      setError(error)
    }
  }, [deleteAccount, setError, error, router])

  return (
    <Page title="Check your profile">
      <Link href="/change-password">
        <a className="text-2xl mx-3 font-bold">Change you password</a>
      </Link>
      <div className="flex justify-center">
        <Button
          variant="danger"
          title="Delete your account"
          onClick={handleClick}
        />
      </div>
    </Page>
  )
}

export default ProfilePage
