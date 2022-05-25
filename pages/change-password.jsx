import FormField from "@/web/components/FormField"
import Page from "@/web/components/Page"
import { Formik } from "formik"

const message = "To recover your password, enter your email address:"
const ChangePasswordPage = () => {
  return (
    <Page title="Did you forget your password?">
      <Formik>
        <div className="mx-2 w-1/3">
          <FormField
            name="email"
            type="text"
            label={message}
            placeholder="Enter your email address"
          />
        </div>
      </Formik>
    </Page>
  )
}

export default ChangePasswordPage
