import { useState, useContext, useCallback } from "react"

import Page from "@/web/components/Page"
import { AppContext } from "@/web/context/AppContext"
import { Formik } from "formik"
import { credentialSchema } from "@/back/validator/validator"
import FormField from "@/web/components/FormField"
import Button from "@/web/components/Button"

const initialValues = { email: "" }

const UpdateEmailPage = () => {
  const [error, setError] = useState(null)
  const {
    context: { updateCurrentEmail },
  } = useContext(AppContext)

  const handleFormSubmit = useCallback(async () => {
    try {
      await updateCurrentEmail()
    } catch (err) {
      setError("Something went wrong")
    }
  }, [updateCurrentEmail])

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
            {error ? (
              <p className="bg-red-600 px-4 py-2 font-bold text-white rounded-md">
                {error}
              </p>
            ) : null}
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
              variant="primary"
            />
          </form>
        )}
      </Formik>
    </Page>
  )
}

export default UpdateEmailPage
