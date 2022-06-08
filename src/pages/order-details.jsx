import Page from "@/web/components/Page"
import getRandomNumber from "@/web/helper/getRandomNumber"
import products from "@/mock/products"
import Image from "next/image"

const OrderDetailsPage = () => {
  return (
    <Page title="Order details">
      <main className="bg-white p-4 pt lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="max-w-xl">
            <h1 className="text-sm font-semibold uppercase tracking-wide text-indigo-600">
              Thank you!
            </h1>
            <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
              It's on the way!
            </p>
            <p className="mt-2 text-base text-gray-500">
              Your order #14034056 has shipped and will be with you soon.
            </p>

            <dl className="mt-12 text-sm font-medium">
              <dt className="text-gray-900">Tracking number</dt>
              <dd className="mt-2 text-indigo-600">51547878755545848512</dd>
            </dl>
          </div>

          <section
            aria-labelledby="order-heading"
            className="mt-10 border-t border-gray-200"
          >
            <h3>Items</h3>
            {products.map((product) => (
              <div
                key="{product.id}"
                className="flex space-x-6 border-b border-gray-200 py-10"
              >
                <Image
                  src={product.imageSrc}
                  alt={product.imageAlt}
                  width={100}
                  height={100}
                  className="h-20 w-20 flex-none rounded-lg bg-gray-100 object-cover object-center sm:h-40 sm:w-40"
                />
                <div className="flex flex-auto flex-col">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      <a href="{product.href}">{product.name}</a>
                    </h4>
                    <p className="mt-2 text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 flex flex-1 items-end">
                    <dl className="flex space-x-4 divide-x divide-gray-200 text-sm sm:space-x-6">
                      <div className="flex">
                        <dt className="font-medium text-gray-900">Quantity</dt>
                        <dd className="ml-2 text-gray-700">
                          {getRandomNumber(1, 3)}
                        </dd>
                      </div>
                      <div className="flex pl-4 sm:pl-6">
                        <dt className="font-medium text-gray-900">Price</dt>
                        <dd className="ml-2 text-gray-700">{product.price}</dd>
                      </div>
                    </dl>
                  </div>
                </div>
              </div>
            ))}

            <div className=" my-1 sm:ml-40 sm:pl-6">
              <h3>Your information</h3>

              <h4>Addresses</h4>
              <dl className="grid grid-cols-2 gap-x-6 py-10 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">
                    Shipping address
                  </dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">Sup de Vinci</span>
                      <span className="block">
                        6-12 Avenue Léonard de Vinci
                      </span>
                      <span className="block">92400 Courbevoie</span>
                    </address>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Billing address</dt>
                  <dd className="mt-2 text-gray-700">
                    <address className="not-italic">
                      <span className="block">Sup de Vinci</span>
                      <span className="block">
                        6-12 Avenue Léonard de Vinci
                      </span>
                      <span className="block">92400 Courbevoie</span>
                    </address>
                  </dd>
                </div>
              </dl>

              <h4>Payment</h4>
              <dl className="grid grid-cols-2 gap-x-6 border-t border-gray-200 py-10 text-sm">
                <div>
                  <dt className="font-medium text-gray-900">Payment method</dt>
                  <dd className="mt-2 text-gray-700">
                    <p>Apple Pay</p>
                    <p>Mastercard</p>
                    <p>
                      <span aria-hidden="true">•••• </span>
                      <span>Ending in </span>1545
                    </p>
                  </dd>
                </div>
                <div>
                  <dt className="font-medium text-gray-900">Shipping method</dt>
                  <dd className="mt-2 text-gray-700">
                    <p>DHL</p>
                    <p>Takes up to 3 working days</p>
                  </dd>
                </div>
              </dl>

              <h3>Summary</h3>

              <dl className="space-y-6 border-t border-gray-200 pt-10 text-sm">
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Subtotal</dt>
                  <dd className="text-gray-700">$36.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="flex font-medium text-gray-900">
                    Discount
                    <span className="ml-2 rounded-full bg-gray-200 py-0.5 px-2 text-xs text-gray-600">
                      STUDENT50
                    </span>
                  </dt>
                  <dd className="text-gray-700">-$18.00 (50%)</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Shipping</dt>
                  <dd className="text-gray-700">$5.00</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="font-medium text-gray-900">Total</dt>
                  <dd className="text-gray-900">$23.00</dd>
                </div>
              </dl>
            </div>
          </section>
        </div>
      </main>
    </Page>
  )
}
export default OrderDetailsPage
