import cn from "@/web/cn"

const btn =
  "relative flex w-full justify-center rounded-md border border-transparent bg-emerald-600 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-500 active:bg-emerald-700 "

const variants = {
  signin: `${btn}`,
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
