import { useCallback } from "react"
import { Formik } from "formik"

import Button from "@/web/components/Button"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import { useAppContext } from "@/web/context/AppContext"
import FormErrorMessage from "@/web/components/FormErrorMessage"

const initialValues = { email: "" }
const credentialSchema = ""

const UpdateEmailPage = () => {
  const { error } = useAppContext()
  const handleFormSubmit = useCallback(async () => {}, [])

  return (
    <Page title="update your email">
      <p>Current email:</p>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={credentialSchema}
      >
        {({ handleSubmit, isValid, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            {error ? <FormErrorMessage message={error} /> : null}

            <FormField
              name="email"
              type="text"
              label="New email"
              placeholder="Type your new email"
            />
            <Button
              type="submit"
              title="Submit"
              disabled={isValid || isSubmitting}
            />
          </form>
        )}
      </Formik>
    </Page>
  )
}

export default UpdateEmailPage
