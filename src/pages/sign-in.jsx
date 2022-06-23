import { useCallback, useState } from "react"
import { Formik } from "formik"
import Link from "next/link"
import { credentialSchema } from "@/db/validator/validator"
import Page from "@/web/components/Page"
import EmailFormField from "@/web/components/EmailFormField"
import PasswordFormField from "@/web/components/PasswordFormField"
import Button from "@/web/components/Button"
import { useAppContext } from "@/web/context/AppContext"
import FormErrorMessage from "@/web/components/FormFieldError"

const initialValues = { email: "toto@toto.fr", password: "12345678" }

const SignInPage = () => {
  const { signIn } = useAppContext()
  const [error, setError] = useState(null)

  const handleFormSubmit = useCallback(
    async ({ email, password }) => {
      setError(null)

      const error = await signIn({ email, password })

      if (error) {
        setError(error)
      }
    },
    [signIn]
  )

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
                <FormErrorMessage>{error}</FormErrorMessage>
                <EmailFormField />
                <PasswordFormField />
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  title="sign in"
                  className="mt-4 w-full"
                />
                <div className="flex justify-between">
                  <Link href="/sign-up" passHref>
                    <a className="block text-center text-sm font-medium text-emerald-600 hover:text-emerald-500 active:text-blue-500">
                      Create account?
                    </a>
                  </Link>
                  <Link href="/sign-in" passHref>
                    <a className="block text-center text-sm font-medium text-emerald-600 hover:text-emerald-500 active:text-blue-500">
                      forget your password?
                    </a>
                  </Link>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </Page>
  )
}
SignInPage.isPublic = true

export default SignInPage
