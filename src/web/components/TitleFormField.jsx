import FormField from "@/web/components/FormField"

const TitleFormField = (props) => (
  <FormField
    name="title"
    type="type"
    label="Title"
    placeholder="Enter title"
    {...props}
  />
)

export default TitleFormField
