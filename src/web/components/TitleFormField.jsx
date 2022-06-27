import FormField from "@/web/components/FormField"

const TitleFormField = (props) => (
  <FormField
    name="title"
    type="type"
    label="Title"
    placeholder="Enter title"
    className="h-10"
    {...props}
  />
)

export default TitleFormField
