import { useCallback } from "react"

import Page from "@/web/components/Page"
import Button from "@/web/components/Button"

const DeleteAccountPage = () => {
  const handleClick = useCallback(async () => {}, [])

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
