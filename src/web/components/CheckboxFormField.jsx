import { Field } from "formik"

import Input from "@/web/components/Input"

const CheckboxFormField = (props) => {
  const { as: Component = Input, name, label, ...otherProps } = props

  return (
    <Field name={name}>
      {({ field, meta: { touched, error } }) => (
        <label>
          <span className="mx-2 block">{label}</span>
          <Component type="checkbox" {...field} {...otherProps} />
          {touched && error ? (
            <span className="block text-red-600 basis-full">{error}</span>
          ) : null}
        </label>
      )}
    </Field>
  )
}

export default CheckboxFormField
