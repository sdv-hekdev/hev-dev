import { string } from "yup"

export const emailValidator = string()
  .label("E-mail")
  .email("Must be a valid email")
  .trim()
export const passwordValidator = string()
  .label("Password")
  .min(8, "Password must contain 8 characters")
  .matches(/[a-zA-Z1-9]/, "Password can only contain letters or numbers")
  .trim()

export const firstNameValidator = string().label("First name").min(1).trim()
export const lastNameValidator = string().label("Last name").min(1).trim()
