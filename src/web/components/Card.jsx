import Button from "@/web/components/Button"

const Card = (props) => {
  const { price, name, color, src, rate, ...otherProps } = props

  return (
    <div
      className="flex h-72 w-56 flex-col rounded-sm border-black shadow-lg shadow-gray-300"
      {...otherProps}
    >
      <img src={src} alt={name} className="h-1/2 w-full" />
      <div className="my-2 mx-2 flex flex-col">
        <div className="text-lg font-bold uppercase">{name}</div>
        <div>${price}</div>
        <div className="flex justify-between">
          <div>{color}</div>
          <div className="mx-2 self-end">{rate}</div>
        </div>
        <Button type="submit" title="Add to cart" className="my-3" />
      </div>
    </div>
  )
}

export default Card
