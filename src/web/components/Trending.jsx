import Link from "next/link"

import Card from "@/web/components/Card"
import trendingProducts from "mock/trendingProducts"

const Trending = () => {
  return (
    <section>
      <div className="mx-auto my-2 max-w-7xl px-4 sm:px-6 sm:py-3 lg:px-8 lg:pt-3">
        <h2 className="my-2 text-2xl font-extrabold text-gray-900">
          Trending Products
        </h2>
        <div className="flex flex-wrap justify-center gap-5 ">
          {trendingProducts.map(
            ({ id, imageAlt, imageSrc, name, price, color }) => (
              <Link key={id} href="/product-page" passHref>
                <Card
                  src={imageSrc}
                  alt={imageAlt}
                  name={name}
                  price={price}
                  color={color}
                  grade="⭐️⭐️⭐️⭐️⭐️"
                />
              </Link>
            )
          )}
        </div>
      </div>
    </section>
  )
}

export default Trending
