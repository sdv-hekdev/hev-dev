import * as yup from "yup"

export const credentialSchema = yup.object().shape({
  email: yup.string().email("Must be a valid email").label("Email"),
  password: yup
    .string()
    .label("Password")
    .required("No password provided")
    .min(8, "Password must contain 8 characters")
    .matches(/[a-zA-z1-9]/, "Password can only contain letter or number "),
})
