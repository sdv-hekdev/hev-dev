import { credentialSchema } from "@/db/validator/validator"
import Button from "@/web/components/Button"
import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import { Formik } from "formik"

const initialValues = { title: "", description: "", quantity: "", price: "" }

const AddItemPage = () => {
  const handleFormSubmit = () => {}

  return (
    <Page title="Add new item">
      <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
        Sign to your account
      </h2>

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={credentialSchema}
      >
        {({ handleSubmit, isValid, isSubmitting }) => (
          <form onSubmit={handleSubmit}>
            <FormField title="item's title" />
            <FormField title="description" />
            <FormField title="quantity" type="number" />
            <FormField title="price" type="number" />
            <Button
              title="add to list"
              type="submit"
              disabled={!isValid || isSubmitting}
            />
          </form>
        )}
      </Formik>
    </Page>
  )
}

AddItemPage.isPublic = false

export default AddItemPage
