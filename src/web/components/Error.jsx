const BannerMessage = (props) => {
  const { message } = props

  return (
    <p className="bg-red-500 px-4 py-2 mb-3 font-bold text-white rounded-md">
      {message}
    </p>
  )
}

export default BannerMessage
