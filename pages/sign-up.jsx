import { useCallback, useState, useContext } from "react"
import { Formik } from "formik"
import Link from "next/link"

import { credentialSchema } from "@/back/validator/validator"
import { AppContext } from "@/web/context/AppContext"
import FormField from "@/web/components/FormField"
import Button from "@/web/components/Button"
import Page from "@/web/components/Page"

const initialValues = { email: "toto@toto.fr", password: "12345678" }

const SignUpPage = () => {
  const [error, setError] = useState(null)
  const {
    context: { signUp, router },
  } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ email, password }) => {
      try {
        await signUp(email, password)

        router.push("/")
      } catch (err) {
        setError(error)
      }
    },
    [signUp, router, error]
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
                {error ? <p>{error}</p> : null}
                <FormField
                  name="email"
                  type="text"
                  label="Email"
                  placeholder="Enter your email address"
                />
                <FormField
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                />
                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  title="Create an account"
                  variant="primary"
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
