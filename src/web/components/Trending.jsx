import trendingProducts from "./mock/trendingProducts"

const Trending = () => {
  return (
    <section aria-labelledby="trending-heading">
      <div className="max-w-7xl mx-auto my-2 px-4 sm:px-6 sm:py-3 lg:pt-3 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <h2
            id="favorites-heading"
            className="text-2xl font-extrabold tracking-tight text-gray-900"
          >
            Trending Products
          </h2>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
          {trendingProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80">
                <img
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  className="w-full h-1 object-center object-cover"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">
                <a href={product.href}>
                  <span className="absolute inset-0" />
                  {product.name}
                </a>
              </h3>
              <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              <p className="mt-1 text-sm font-medium text-gray-900">
                {product.price}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 text-sm md:hidden">
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Shop the collection<span aria-hidden="true"> &rarr;</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Trending
