import { useCallback, useState } from "react"
import { Formik } from "formik"
import Link from "next/link"

import { credentialSchema } from "@/back/validator/validator"
import FormField from "@/web/components/FormField"
import Button from "@/web/components/Button"

const initialValues = { email: "", password: "" }

const RegistrationCard = () => {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(null)

  const handleFormSubmit = useCallback(async () => {}, [])

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
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
                label="E-mail"
                placeholder="Enter your email address"
              />
              <FormField
                name="password"
                type="password"
                label="Password"
                placeholder="Enter your password"
              />
              <div className="flex items-center justify-between my-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link href="#">
                    <a className="font-medium text-emerald-600 hover:text-emerald-500">
                      Forgot your password?
                    </a>
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                title="Sign"
                variant="signin"
              />
            </form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default RegistrationCard
