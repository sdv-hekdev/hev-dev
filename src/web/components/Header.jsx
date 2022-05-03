import { Fragment, useState } from "react"
import { Popover, Transition } from "@headlessui/react"
import Link from "next/link"
import Image from "next/image"
import { MenuIcon, SearchIcon, ShoppingBagIcon } from "@heroicons/react/outline"

import navigation from "@/web/components/mock/navigation"
import cn from "@/web/cn"
import SignBar from "@/web/components/SignBar"

const Header = () => {
  const [open, setOpen] = useState(false)

  const handleToggleMenu = () => {
    setOpen(!open)
  }

  return (
    <nav aria-label="Top">
      <SignBar />

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

            <div className="hidden h-full lg:flex">
              <Popover.Group className="inset-x-0 bottom-0 px-4">
                <div className="flex h-full justify-center space-x-8">
                  {navigation.categories.map((category) => (
                    <Popover key={category.name} className="flex">
                      {({ open }) => (
                        <>
                          <div className="relative flex">
                            <Popover.Button
                              className={cn(
                                open
                                  ? "text-indigo-600"
                                  : "text-gray-700 hover:text-gray-800",
                                "relative flex items-center justify-center text-sm font-medium transition-colors duration-200 ease-out"
                              )}
                            >
                              {category.name}
                              <span
                                className={cn(
                                  open ? "bg-indigo-600" : "",
                                  "absolute inset-x-0 -bottom-px z-20 h-0.5 transition duration-200 ease-out"
                                )}
                                aria-hidden="true"
                              />
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
                            <Popover.Panel className="absolute inset-x-0 top-full z-10 bg-white text-sm text-gray-500">
                              <div
                                className="absolute inset-0 top-1/2 bg-white shadow"
                                aria-hidden="true"
                              />
                              {/* Fake border when menu is open */}
                              <div
                                className="absolute inset-0 top-0 mx-auto h-px max-w-7xl px-8"
                                aria-hidden="true"
                              >
                                <div
                                  className={cn(
                                    open ? "bg-gray-200" : "bg-transparent",
                                    "h-px w-full transition-colors duration-200 ease-out"
                                  )}
                                />
                              </div>

                              <div className="relative">
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                  <div className="grid grid-cols-4 gap-y-10 gap-x-8 py-16">
                                    {category.featured.map((item) => (
                                      <div
                                        key={item.name}
                                        className="group relative"
                                      >
                                        <div className="aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-100 group-hover:opacity-75">
                                          <Image
                                            src={item.imageSrc}
                                            alt={item.imageAlt}
                                            width={100}
                                            height={100}
                                            className="object-cover object-center"
                                          />
                                        </div>
                                        <a
                                          href={item.href}
                                          className="mt-4 block font-medium text-gray-900"
                                        >
                                          <span
                                            className="absolute inset-0 z-10"
                                            aria-hidden="true"
                                          />
                                          {item.name}
                                        </a>
                                        <p aria-hidden="true" className="mt-1">
                                          Shop now
                                        </p>
                                      </div>
                                    ))}
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
            </div>

            {/* Mobile menu and search (lg-) */}
            <div className="flex flex-1 items-center lg:hidden">
              <button
                type="button"
                className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                onClick={handleToggleMenu}
              >
                <span className="sr-only">Open menu</span>
                {open ? (
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                ) : null}
              </button>

              <a
                href="#"
                className="ml-2 p-2 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Search</span>
                <SearchIcon className="h-6 w-6" aria-hidden="true" />
              </a>
            </div>

            <Link href="/">
              <a className="lg:hidden">
                <span className="sr-only">Workflow</span>
                <img
                  className="w-quto h-14"
                  src="/assets/baka-bird.jpg"
                  alt="logo-md"
                />
              </a>
            </Link>

            <div className="flex flex-1 items-center justify-end">
              <a
                href="#"
                className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
              >
                Search
              </a>

              <div className="flex items-center lg:ml-8">
                <div className="ml-4 flow-root lg:ml-8">
                  <Link href="/cart">
                    <a className="group -m-2 flex items-center p-2">
                      <ShoppingBagIcon
                        className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                      <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                        0
                      </span>
                      <span className="sr-only">items in cart, view bag</span>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
