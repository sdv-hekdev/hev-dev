import { credentialSchema } from "@/db/validator/validator"
import Button from "@/web/components/Button"
import DescriptionFormField from "@/web/components/DescriptionFormField"
import FormErrorMessage from "@/web/components/FormErrorMessage"
import Page from "@/web/components/Page"
import TitleFormField from "@/web/components/TitleFormField"
import { useAppContext } from "@/web/context/AppContext"
import { Formik } from "formik"
import { useCallback } from "react"

const initialValues = {}

const AddItemPage = () => {
  const { error } = useAppContext()
  const handleFormSubmit = useCallback(() => {}, [])

  return (
    <Page title="Add new item">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
        Add a new item
      </h2>
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={credentialSchema}
      >
        {({ handleSubmit, isValid, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <FormErrorMessage>{error}</FormErrorMessage>
            <TitleFormField />
            <DescriptionFormField />
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              title="add to list"
              className="flex justify-center mt-4 w-full md:w-fit"
            />
          </form>
        )}
      </Formik>
    </Page>
  )
}

export default AddItemPage
