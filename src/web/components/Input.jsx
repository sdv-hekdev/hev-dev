import classNames from "classnames"

const defaultInput =
  "rounded w-full border-2 border-gray-300 px-2 hover:bg-gray-200"

const Input = (props) => {
  const { className, ...otherProps } = props

  return (
    <input {...otherProps} className={classNames(defaultInput, className)} />
  )
}

export default Input
