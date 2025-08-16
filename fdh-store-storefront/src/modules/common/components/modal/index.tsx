import { Dialog, Transition } from "@headlessui/react"
import { clx } from "@medusajs/ui"
import React, { Fragment } from "react"

import { ModalProvider, useModal } from "@lib/context/modal-context"
import X from "@modules/common/icons/x"

type ModalProps = {
  isOpen: boolean
  close: () => void
  size?: "small" | "medium" | "large"
  search?: boolean
  children: React.ReactNode
  'data-testid'?: string
}

const Modal = ({
  isOpen,
  close,
  size = "medium",
  search = false,
  children,
  'data-testid': dataTestId
}: ModalProps) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[75] font-mono" onClose={close}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-800/90 backdrop-blur-md h-screen" 
               style={{ 
                 backgroundImage: `
                   linear-gradient(90deg, rgba(0, 255, 127, 0.05) 1px, transparent 1px),
                   linear-gradient(180deg, rgba(0, 255, 127, 0.05) 1px, transparent 1px)
                 `,
                 backgroundSize: '40px 40px'
               }} 
          />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-hidden">
          <div
            className={clx(
              "flex min-h-full h-full justify-center p-4 text-center",
              {
                "items-center": !search,
                "items-start": search,
              }
            )}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                data-testid={dataTestId}
                className={clx(
                  "flex flex-col justify-start w-full transform p-6 text-left align-middle transition-all max-h-[75vh] h-fit relative overflow-hidden",
                  {
                    "max-w-md": size === "small",
                    "max-w-xl": size === "medium",
                    "max-w-3xl": size === "large",
                    "bg-transparent shadow-none": search,
                    "bg-gray-800 shadow-2xl border border-green-400/30 rounded-none": !search,
                  }
                )}
                style={!search ? {
                  boxShadow: '0 0 50px rgba(0, 255, 127, 0.2), inset 0 0 50px rgba(0, 0, 0, 0.5)'
                } : {}}
              >
                {/* Background grid effect */}
                {!search && (
                  <div className="absolute inset-0 opacity-10">
                    <div 
                      className="w-full h-full"
                      style={{
                        backgroundImage: `
                          linear-gradient(90deg, rgba(0, 255, 127, 0.2) 1px, transparent 1px),
                          linear-gradient(180deg, rgba(0, 255, 127, 0.2) 1px, transparent 1px)
                        `,
                        backgroundSize: '30px 30px'
                      }}
                    ></div>
                  </div>
                )}

                <ModalProvider close={close}>{children}</ModalProvider>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

const Title: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { close } = useModal()

  return (
    <Dialog.Title className="flex items-center justify-between relative z-10 mb-4 pb-4 border-b border-green-400/30">
      <div className="flex items-center gap-3">
        {/* Terminal-style dots */}
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-lg font-bold text-green-400 uppercase tracking-wider">
          {children}
        </div>
      </div>
      <div>
        <button 
          onClick={close} 
          data-testid="close-modal-button"
          className="text-red-400 hover:text-red-300 transition-colors duration-200 p-1 border border-red-400/30 hover:border-red-400/60 bg-red-400/10 hover:bg-red-400/20"
        >
          <X size={16} />
        </button>
      </div>
    </Dialog.Title>
  )
}

const Description: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Dialog.Description className="flex text-sm text-green-100 items-center justify-center pt-2 pb-4 h-full relative z-10 font-mono">
      {children}
    </Dialog.Description>
  )
}

const Body: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex justify-center relative z-10">
      {children}
    </div>
  )
}

const Footer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex items-center justify-end gap-x-4 relative z-10 pt-6 mt-6 border-t border-green-400/30">
      {children}
    </div>
  )
}

Modal.Title = Title
Modal.Description = Description
Modal.Body = Body
Modal.Footer = Footer

export default Modal