import FormField from "@/web/components/FormField"

const EmailFormField = (props) => (
  <FormField
    name="email"
    type="text"
    label="Email"
    placeholder="Enter your email address"
    {...props}
  />
)

export default EmailFormField
