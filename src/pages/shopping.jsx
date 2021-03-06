import { StarIcon } from "@heroicons/react/solid"
import { useEffect, useState } from "react"

import cn from "@/web/cn"
import Page from "@/web/components/Page"
import { useAppContext } from "@/web/context/AppContext"

const ShoppingPage = () => {
  const [products, setProducts] = useState([])
  const { getProducts } = useAppContext()

  useEffect(() => {
    ;(async () => {
      const products = await getProducts()
      setProducts(products)
    })()
  }, [getProducts])

  return (
    <Page title="What do you need?">
      <div className="grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {products.map(
          ({ id, imageSrc, imageAlt, title, reviewCount, price, inStock }) => (
            <div
              key={id}
              className="group border-r border-b border-gray-200 p-4 sm:p-6"
            >
              <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
                <img
                  src={imageSrc}
                  alt={imageAlt}
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="pt-10 pb-4 text-center">
                <h3 className="text-sm font-medium text-gray-900">
                  <a href="product">{title}</a>
                </h3>
                <div className="mt-3 flex flex-col items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rate) => (
                      <StarIcon
                        key={rate}
                        className={cn(
                          rate > rate ? "text-yellow-400" : "text-gray-200",
                          "h-5 w-5 flex-shrink-0"
                        )}
                      />
                    ))}
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {reviewCount} reviews
                  </p>
                </div>
                <p className="mt-4 text-base font-medium text-gray-900">
                  {price} $
                </p>
                {inStock ? (
                  <p className="mt-4 text-base font-medium text-emerald-600">
                    available
                  </p>
                ) : (
                  <p className="mt-4 text-base font-medium text-red-600">
                    sold out
                  </p>
                )}
              </div>
            </div>
          )
        )}
      </div>
    </Page>
  )
}

ShoppingPage.isPublic = true

export default ShoppingPage
