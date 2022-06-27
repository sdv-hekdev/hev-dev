import FormField from "@/web/components/FormField"

const PriceFormField = (props) => (
  <FormField
    name="price"
    type="number"
    min="0"
    label="Price"
    {...props}
    className=" mx-1 w-20 h-8"
  />
)

export default PriceFormField
