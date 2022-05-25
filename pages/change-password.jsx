import { useCallback, useContext, useState } from "react"
import { Formik } from "formik"

import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import Button from "@/web/components/Button"
import { AppContext } from "@/web/context/AppContext"

const message = "Type your new password"

const ChangePasswordPage = () => {
  const [error, setError] = useState(null)

  const {
    context: { router, updatePassword },
  } = useContext(AppContext)

  const handleSubmit = useCallback(async () => {
    try {
      updatePassword()
      router.push("/profile")

      setError("Password Updated")
    } catch (err) {
      setError(error)
    }
  }, [updatePassword, setError, router, error])

  return (
    <Page title="Did you forget your password?">
      <Formik>
        <div className="mx-2 w-1/3">
          <FormField
            name="password"
            type="password"
            label={message}
            placeholder="New password"
            className="m-2"
          />
        </div>
      </Formik>
      <Button
        title="Submit"
        variant="primary"
        className="mx-4"
        onClick={handleSubmit}
      />
    </Page>
  )
}

export default ChangePasswordPage
