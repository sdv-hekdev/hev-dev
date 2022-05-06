const Input = (props) => {
  return (
    <input
      {...props}
      className="rounded border mx-1 w-96 border-gray-400 px-1 hover:bg-gray-200"
      autoComplete="off"
    />
  )
}

export default Input
