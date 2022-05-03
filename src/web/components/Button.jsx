import cn from "@/web/cn"

const btn =
  "text-white bg-emerald-600 rounded-md py-1 hover:bg-emerald-500 active:bg-emerald-700"

const variants = {
  xs: `${btn} px-2.5 py-1.5 text-xs rounded`,
  sm: `${btn} px-3 py-2 text-sm leading-4 font-medium rounded-md`,
  md: `${btn} px-4 py-2 text-sm font-medium rounded-md`,
  lg: `${btn} px-4 py-2 text-base font-medium rounded-md`,
  xl: `${btn} px-6 py-3 text-base font-medium rounded-md`,
  signin: `${btn} px-6 py-3 text-base font-medium rounded-md`,
}

const Button = (props) => {
  const { title, variant, className = "btn" } = props

  return (
    <button {...props} className={cn(btn, className, variants[variant])}>
      {title}
    </button>
  )
}
export default Button
