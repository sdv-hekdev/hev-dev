import { Fragment, useState, useContext, useCallback } from "react"
import { Dialog, Transition } from "@headlessui/react"

import Button from "@/web/components/Button"
import { AppContext } from "@/web/context/AppContext"

const Modal = () => {
  const [isOpen, setIsOpen] = useState(true)
  const {
    context: { deleteAccount, error, setError },
  } = useContext(AppContext)

  const closeModal = () => {
    setIsOpen(false)
  }

  const handleClick = useCallback(() => {}, [])
  const confirmDeletion = useCallback(() => {
    try {
      deleteAccount()
    } catch (e) {
      setError("Something went wront")
    }
  }, [deleteAccount, setError])

  return (
    <>
      {error ? (
        <p className="bg-red-500 px-4 py-2 mb-3 font-bold text-white rounded-md">
          Something went wrong
        </p>
      ) : null}
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirme Deletion
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete your account ?{" "}
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <Button
                      title="Confirm"
                      variant="danger"
                      onClick={confirmDeletion}
                    />
                    <Button title="Cancel" onClick={handleClick} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      x{" "}
    </>
  )
}
export default Modal
