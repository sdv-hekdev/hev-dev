import classNames from "classnames"

const btn =
  "uppercase justify-center rounded-md border border-transparent py-2 px-4 text-sm font-medium text-white"

const variants = {
  primary:
    "bg-emerald-600 hover:ring hover:bg-emerald-500 active:bg-emerald-700",
  danger: "bg-red-600 hover:ring hover:bg-red-500 active:bg-red-700",
  info: "bg-blue-600 hover:ring hover:bg-blue-500 active:bg-blue-700",
}
const Button = (props) => {
  const { className, title, variant = "primary", ...otherProps } = props

  return (
    <button
      {...otherProps}
      className={classNames(btn, className, variants[variant])}
    >
      {title}
    </button>
  )
}
export default Button
