import FormField from "@/web/components/FormField"

const EmailFormField = (props) => (
  <FormField
    name="email"
    type="text"
    label="Email"
    placeholder="Enter your email address"
    autoComplete="email"
    {...props}
  />
)

export default EmailFormField
