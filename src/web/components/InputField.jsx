import { Field } from "formik";

import Input from "./components/Input";

const InputField = (props) => {
  const { input, label, ...otherProps } = props;

  return (
    <Field {...input}>
      {({ field, meta: { error } }) => (
        <div {...otherProps}>
          <label className="font-medium">
            <span className="block mb-1">{label}</span>
            <Input {...field} className="w-full" />
          </label>
          {error ? <p className="text-danger">{error}</p> : null}
        </div>
      )}
    </Field>
  );
};

export default InputField;
