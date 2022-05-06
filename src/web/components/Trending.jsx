import Link from "next/link"

import Card from "@/web/components/Card"
import trendingProducts from "@/web/components/mock/trendingProducts"

const Trending = () => {
  return (
    <section>
      <div className="mx-auto my-2 max-w-7xl px-4 sm:px-6 sm:py-3 lg:px-8 lg:pt-3">
        <h2 className="mb-1 text-2xl font-extrabold text-gray-900">
          Trending Products
        </h2>
        <div className="flex flex-wrap justify-center gap-5">
          {trendingProducts.map((product) => (
            <Link key={product.id} href={product.href} passHref>
              <Card
                src={product.imageSrc}
                alt={product.imageAlt}
                name={product.name}
                price={product.price}
                color={product.color}
                grade="⭐️⭐️⭐️"
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Trending
