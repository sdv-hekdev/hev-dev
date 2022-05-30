import { useContext, useCallback, useState } from "react"

import Button from "@/web/components/Button"
import { AppContext } from "@/web/context/AppContext"
import Page from "@/web/components/Page"

const DeleteAccountPage = () => {
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
    <Page title="Delete your account">
      <div className="flex justify-center items-center">
        <Button
          variant="danger"
          title="Delete your account"
          onClick={handleClick}
        />
      </div>
    </Page>
  )
}

export default DeleteAccountPage
