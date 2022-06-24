import { useCallback, useState } from "react"
import { Formik } from "formik"

import Button from "@/web/components/Button"
import DescriptionFormField from "@/web/components/DescriptionFormField"
import FormErrorMessage from "@/web/components/FormErrorMessage"
import Page from "@/web/components/Page"
import PriceFormField from "@/web/components/PriceFormField"
import TitleFormField from "@/web/components/TitleFormField"
import { useAppContext } from "@/web/context/AppContext"

const initialValues = { title: "", description: "", price: 0 }

const AddItemPage = () => {
  const { addProduct } = useAppContext()
  const [error, setError] = useState(null)

  const handleFormSubmit = useCallback(
    async ({ title, description, price }) => {
      setError(null)
      const error = await addProduct({ title, description, price })

      if (error) {
        setError(error)
      }
    },
    [addProduct, setError]
  )

  return (
    <Page title="Add new item">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
        Add a new product
      </h2>
      <Formik onSubmit={handleFormSubmit} initialValues={initialValues}>
        {({ handleSubmit, isValid, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <FormErrorMessage>{error}</FormErrorMessage>
            <TitleFormField />
            <DescriptionFormField />
            <PriceFormField />
            <Button
              type="submit"
              disabled={!isValid || isSubmitting}
              title="add to list"
              className="mt-4 w-full md:w-fit"
            />
          </form>
        )}
      </Formik>
    </Page>
  )
}

export default AddItemPage
