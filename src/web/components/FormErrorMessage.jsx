import { ExclamationIcon } from "@heroicons/react/solid"
import classNames from "classnames"

const FormErrorMessage = (props) => {
  const { className, children, ...otherprops } = props

  if (!children) {
    return null
  }

  return (
    <div
      {...otherprops}
      className={classNames(
        "flex items-center gap-3 text-white bg-red-600 p-3 rounded-md",
        className
      )}
    >
      <ExclamationIcon className="w-6 h-6" />
      {children}
    </div>
  )
}

export default FormErrorMessage
