import * as yup from "yup"

export const credentialSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .label("Email")
    .required("Email must be valid"),
  password: yup
    .string()
    .label("Password")
    .required("No password provided")
    .min(8, "Password must contain 8 characters")
    .matches(/[a-zA-Z1-9]/, "Password can only contain letters or numbers"),
})

export const passwordSchema = yup.object().shape({
  password: yup
    .string()
    .label("Password")
    .required("No password provided")
    .min(8, "Password must contain 8 characters")
    .matches(/[a-zA-Z1-9]/, "Password can only contain letters or numbers"),
})
