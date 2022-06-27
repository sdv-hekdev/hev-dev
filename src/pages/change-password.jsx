import { useCallback } from "react"
import { Formik } from "formik"

import FormField from "@/web/components/FormField"
import Button from "@/web/components/Button"
import Page from "@/web/components/Page"
import { useAppContext } from "@/web/context/AppContext"
import FormErrorMessage from "@/web/components/FormErrorMessage"

const message = "Type your new password"
const initialValues = { password: "87654321" }
const credentialSchema = ""

const ChangePasswordPage = () => {
  const { error } = useAppContext()
  const handleFormSubmit = useCallback(async () => {}, [])

  return (
    <Page title="Did you forget your password">
      {error ? <FormErrorMessage message={error} /> : null}
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
