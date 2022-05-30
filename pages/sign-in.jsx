import { useCallback, useState, useContext } from "react"
import { Formik } from "formik"
import Link from "next/link"

import { credentialSchema } from "@/back/validator/validator"
import FormField from "@/web/components/FormField"
import Button from "@/web/components/Button"
import Page from "@/web/components/Page"
import { AppContext } from "@/web/context/AppContext"

const initialValues = { email: "toto@toto.fr", password: "12345678" }

const SignInPage = () => {
  const [error, setError] = useState(null)
  const {
    context: { signIn, router },
  } = useContext(AppContext)

  const handleFormSubmit = useCallback(
    async ({ email, password }) => {
      try {
        await signIn(email, password)

        if (!email) {
          throw new Error("User not found")
        }

        router.push("/")
      } catch (err) {
        //TO DO
        setError("Something went wrong")
      }
    },
    [signIn, router]
  )

  return (
    <Page title="Let's sign">
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
                {error ? (
                  <p className="bg-red-600 px-4 py-2 font-bold text-white rounded-md">
                    {error}
                  </p>
                ) : null}
                <FormField
                  name="email"
                  type="text"
                  label="Email"
                  placeholder="Enter your email address"
                  autoComplete="email"
                />
                <FormField
                  name="password"
                  type="password"
                  label="Password"
                  placeholder="Enter your password"
                  autoComplete="password"
                />
                <div className="flex items-center justify-between my-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                      autoComplete="remember-me"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>

                  <div className="text-sm">
                    <Link href="/change-password">
                      <a className="font-medium text-emerald-600 hover:text-emerald-500">
                        Forgot your password?
                      </a>
                    </Link>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={!isValid || isSubmitting}
                  title="Sign-in"
                  className="w-full"
                />
                <Link href="/sign-up" passHref>
                  <a className="block text-center text-sm font-medium text-emerald-600 hover:text-emerald-500 active:text-blue-500">
                    Create an account
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

export default SignInPage
