import Page from "@/web/components/Page"
import { StarIcon } from "@heroicons/react/solid"

import cn from "../src/web/cn"
import products from "../src/web/components/mock/products"

const ShoppingPage = () => {
  return (
    <Page title="Shopping">
      <div className="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="group relative border-r border-b border-gray-200 p-4 sm:p-6"
          >
            <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
              <img
                src={product.imageSrc}
                alt={product.imageAlt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="pt-10 pb-4 text-center">
              <h3 className="text-sm font-medium text-gray-900">
                <a href={product.href}>
                  <span aria-hidden="true" className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <div className="mt-3 flex flex-col items-center">
                <p className="sr-only">{product.rating} out of 5 stars</p>
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={cn(
                        product.rating > rating
                          ? "text-yellow-400"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {product.reviewCount} reviews
                </p>
              </div>
              <p className="mt-4 text-base font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Page>
  )
}

export default ShoppingPage
