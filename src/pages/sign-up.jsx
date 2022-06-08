import { useCallback, useState, useContext } from "react"
import { Formik } from "formik"
import Link from "next/link"
import { object } from "yup"
import { emailValidator, passwordValidator } from "@/db/validator/validator"
import makeApiClient from "@/web/services/makeApiClient"
import Page from "@/web/components/Page"
import BannerMessage from "@/web/components/Error"
import EmailFormField from "@/web/components/EmailFormField"
import PasswordFormField from "@/web/components/PasswordFormField"
import Button from "@/web/components/Button"

const credentialSchema = object().shape({
  email: emailValidator.required("Must be a valid e-mail."),
  password: passwordValidator.required("No password provided."),
})

const initialValues = { email: "toto@toto.fr", password: "12345678" }

const SignUpPage = (props) => {
  const { router } = props

  const handleFormSubmit = useCallback(async ({ email, password }) => {
    const api = makeApiClient()

    try {
      const { data } = await api.post("/sign-up", { email, password })
    } catch (err) {
      console.log(err)
    }
  }, [])

  return (
    <Page title="Let's create an account">
      <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-black">
              Sign to your account
            </h2>
          </div>

          <Formik
            onSubmit={handleFormSubmit}
            initialValues={initialValues}
            validationSchema={credentialSchema}
          >
            {({ handleSubmit, isValid, isSubmitting }) => (
              <form onSubmit={handleSubmit}>
                {error ? <BannerMessage message={error} /> : null}
                <EmailFormField />
                <PasswordFormField />
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  title="Create an account"
                  className="mt-4 w-full"
                />
                <Link href="/sign-in" passHref>
                  <a className="block text-center text-sm font-medium text-emerald-600 hover:text-emerald-500 active:text-blue-500">
                    Already have an account?
                  </a>
                </Link>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Page>
  )
}

export default SignUpPage
