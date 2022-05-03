import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { SearchIcon, ShoppingBagIcon } from "@heroicons/react/outline"
import cn from "@/web/cn"
import Link from "next/link"
import navigation from "@/web/components/mock/navigation"

const NavStore = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="hidden lg:flex lg:flex-1 lg:items-center">
            <Link href="/">
              <a>
                <img
                  className="h-14 w-auto"
                  src="/assets/baka-bird.jpg"
                  alt="logo-lg"
                />
              </a>
            </Link>
          </div>

          {/* Flyout menus */}
          <Popover.Group className="absolute inset-x-0 bottom-0 sm:static sm:flex-1 sm:self-stretch">
            <div className="flex h-14 space-x-8 overflow-x-auto border-t px-4 pb-px sm:h-full sm:justify-center sm:overflow-visible sm:border-t-0 sm:pb-0">
              {navigation.categories.map((category, id) => (
                <Popover key={id} className="flex">
                  {({ open }) => (
                    <>
                      <div className="relative flex">
                        <Popover.Button
                          className={cn(
                            open
                              ? "border-indigo-600 text-indigo-600"
                              : "border-transparent text-gray-700 hover:text-gray-800",
                            "relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out"
                          )}
                        >
                          {category.name}
                        </Popover.Button>
                      </div>

                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                      >
                        <Popover.Panel className="float inset-x-0 top-full text-gray-500 sm:text-sm">
                          <div className=" border-2 border-black bg-white">
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                              <div className="grid grid-cols-1 gap-y-10 gap-x-6 lg:gap-x-8">
                                <div>
                                  <p
                                    id="clothing-heading"
                                    className="font-medium text-gray-900"
                                  >
                                    Clothing
                                  </p>
                                  <div className="mt-4 border-t border-gray-200 pt-6 sm:grid sm:grid-cols-2 sm:gap-x-6">
                                    <ul
                                      role="list"
                                      aria-labelledby="clothing-heading"
                                      className="space-y-6 sm:space-y-4"
                                    >
                                      {category.clothing[0].map((item) => (
                                        <li key={item.name} className="flex">
                                          <a
                                            href={item.href}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                    <ul
                                      role="list"
                                      aria-label="More clothing"
                                      className="mt-6 space-y-6 sm:mt-0 sm:space-y-4"
                                    >
                                      {category.clothing[1].map((item) => (
                                        <li key={item.name} className="flex">
                                          <a
                                            href={item.href}
                                            className="hover:text-gray-800"
                                          >
                                            {item.name}
                                          </a>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              ))}
            </div>
          </Popover.Group>

          <div className="flex flex-1 items-center justify-end">
            {/* Search */}
            <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
              <span className="sr-only">Search</span>
              <SearchIcon className="h-6 w-6" aria-hidden="true" />
            </a>

            {/* Cart */}
            <div className="ml-4 flow-root lg:ml-8">
              <a href="#" className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon
                  className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                  aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  0
                </span>
                <span className="sr-only">items in cart, view bag</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default NavStore
