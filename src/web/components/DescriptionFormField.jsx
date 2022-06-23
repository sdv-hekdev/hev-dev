import FormField from "@/web/components/FormField"

const DescriptionFormField = (props) => (
  <FormField
    name="description"
    type="text"
    label="Description"
    placeholder="Describe your item"
    {...props}
  />
)

export default DescriptionFormField
