import { useCallback, useContext, useState } from "react"
import { Formik } from "formik"

import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import Button from "@/web/components/Button"
import { AppContext } from "@/web/context/AppContext"
import { credentialSchema } from "@/back/validator/validator"

const message = "Type your new password"
const initialValues = { password: "87654321" }

const ChangePasswordPage = () => {
  const [error, setError] = useState(null)
  const {
    context: { router, updateCurrentPassword },
  } = useContext(AppContext)

  const handleFormSubmit = useCallback(async () => {
    try {
      await updateCurrentPassword()

      router.push("/profile")
    } catch (err) {
      setError("Something went wrong")
    }
  }, [updateCurrentPassword, setError, router])

  return (
    <Page title="Did you forget your password?">
      {error ? (
        <p className="bg-red-500 px-4 py-2 mb-3 font-bold text-white rounded-md">
          {error}
        </p>
      ) : null}
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={credentialSchema}
      >
        {({ handleSubmit, isValid, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <FormField
              name="password"
              type="password"
              label={message}
              placeholder="New password"
              className="w-full lg:w-1/3 my-2"
              autoComplete="password"
            />
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              title="update password"
              className="w-full uppercase lg:w-1/3"
            />
          </form>
        )}
      </Formik>
    </Page>
  )
}

export default ChangePasswordPage
