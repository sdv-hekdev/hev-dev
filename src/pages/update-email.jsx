import Button from "@/web/components/Button"
import BannerMessage from "@/web/components/Error"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import { Formik } from "formik"
import { useState, useCallback } from "react"

const initialValues = { email: "" }
const credentialSchema = ""

const UpdateEmailPage = () => {
  const [error, setError] = useState(null)

  const handleFormSubmit = useCallback(async () => {
    console.log("toto")
  }, [])

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
            {error ? <BannerMessage message={error} /> : null}

            <FormField
              name="email"
              type="text"
              label="New email"
              placeholder="Type your new email"
              autoComplete="email"
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
