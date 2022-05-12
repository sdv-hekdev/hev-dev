import classNames from "classnames"

const btn =
  "relative flex w-full my-2 justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-500 active:bg-emerald-700 "

const variants = {
  sign: `${btn}`,
}
const Button = (props) => {
  const { className, title, variant, ...otherProps } = props

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
