const Input = (props) => {
  return (
    <input
      {...props}
      className="rounded w-full border border-gray-300 px-1 hover:bg-gray-200"
      autoComplete="current-password"
    />
  )
}

export default Input
