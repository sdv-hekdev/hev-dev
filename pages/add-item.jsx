import { useCallback, useState } from "react"
import { Formik } from "formik"

import Page from "@/web/components/Page"
import FormField from "@/web/components/FormField"
import Button from "@/web/components/Button"
import { credentialSchema } from "@/validator/validator"

const initialValues = { label: "" }

const AddItemPage = () => {
  const [error, setError] = useState(null)
  const handleFormSubmit = useCallback(() => {
    try {
      console.log("TOTO")
    } catch (error) {
      setError("Something went wrong")
    }
  }, [])

  return (
    <Page title="Add a new item?">
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
              name="title"
              type="text"
              label="Title:"
              placeholder="title"
              className="lg:w-1/3 my-2"
              autoComplete="title"
            />
            <FormField
              name="description"
              type="text"
              label="Description:"
              placeholder="Add a description"
              className="lg:w-1/3 my-2"
              autoComplete="add-item"
            />
            <FormField
              name="Quantity"
              type="number"
              label="Quantity:"
              placeholder="Quantity"
            />
            <FormField
              name="Price"
              type="number"
              label="Price"
              placeholder="Price"
            />
            <FormField name="picture" type="file" label="Add pictures" />

            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              title="Add item"
              className="w-full my-3 uppercase lg:w-1/3"
            />
          </form>
        )}
      </Formik>
    </Page>
  )
}

export default AddItemPage
