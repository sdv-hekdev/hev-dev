import FormField from "@/web/components/FormField"

const PasswordFormField = (props) => (
  <FormField
    name="password"
    type="password"
    label="Password"
    placeholder="Enter your password"
    {...props}
  />
)

export default PasswordFormField
