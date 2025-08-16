"use client"

import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react"
import { convertToLocale } from "@lib/util/money"
import { HttpTypes } from "@medusajs/types"
import { Button } from "@medusajs/ui"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Thumbnail from "@modules/products/components/thumbnail"
import { usePathname } from "next/navigation"
import { Fragment, useEffect, useRef, useState } from "react"

const CartDropdown = ({
  cart: cartState,
}: {
  cart?: HttpTypes.StoreCart | null
}) => {
  const [activeTimer, setActiveTimer] = useState<NodeJS.Timer | undefined>(
    undefined
  )
  const [cartDropdownOpen, setCartDropdownOpen] = useState(false)

  const open = () => setCartDropdownOpen(true)
  const close = () => setCartDropdownOpen(false)

  const totalItems =
    cartState?.items?.reduce((acc, item) => {
      return acc + item.quantity
    }, 0) || 0

  const subtotal = cartState?.subtotal ?? 0
  const itemRef = useRef<number>(totalItems || 0)

  const timedOpen = () => {
    open()

    const timer = setTimeout(close, 5000)

    setActiveTimer(timer)
  }

  const openAndCancel = () => {
    if (activeTimer) {
      clearTimeout(activeTimer)
    }

    open()
  }

  // Clean up the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (activeTimer) {
        clearTimeout(activeTimer)
      }
    }
  }, [activeTimer])

  const pathname = usePathname()

  // open cart dropdown when modifying the cart items, but only if we're not on the cart page
  useEffect(() => {
    if (itemRef.current !== totalItems && !pathname.includes("/cart")) {
      timedOpen()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems, itemRef.current])

  return (
    <div
      className="h-full z-50"
      onMouseEnter={openAndCancel}
      onMouseLeave={close}
    >
      <Popover className="relative h-full">
        <PopoverButton className="h-full">
          <LocalizedClientLink
            className="hover:text-blue-400 transition-colors duration-200 uppercase tracking-wide text-sm border border-transparent hover:border-blue-400/30 px-2 py-1"
            href="/cart"
            data-testid="nav-cart-link"
          >{`[Cart (${totalItems})]`}</LocalizedClientLink>
        </PopoverButton>
        <Transition
          show={cartDropdownOpen}
          as={Fragment}
          enter="transition ease-out duration-200"
          enterFrom="opacity-0 translate-y-1"
          enterTo="opacity-100 translate-y-0"
          leave="transition ease-in duration-150"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 translate-y-1"
        >
          <PopoverPanel
            static
            className="hidden small:block absolute top-[calc(100%+1px)] right-0 bg-gray-800 border border-green-400/50 w-[420px] text-green-100 font-mono shadow-2xl"
            data-testid="nav-cart-dropdown"
            style={{
              boxShadow: '0 0 30px rgba(0, 255, 127, 0.2), inset 0 0 30px rgba(0, 0, 0, 0.3)'
            }}
          >
            {/* Terminal header */}
            <div className="bg-gray-800 border-b border-green-400/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-400 ml-2">cart.exe</span>
              </div>
              <h3 className="text-base font-bold uppercase tracking-wider text-green-400">[Shopping Cart]</h3>
            </div>

            {cartState && cartState.items?.length ? (
              <>
                <div className="overflow-y-scroll max-h-[402px] px-4 grid grid-cols-1 gap-y-6 no-scrollbar p-2 bg-gray-800/50">
                  {cartState.items
                    .sort((a, b) => {
                      return (a.created_at ?? "") > (b.created_at ?? "")
                        ? -1
                        : 1
                    })
                    .map((item) => (
                      <div
                        className="grid grid-cols-[122px_1fr] gap-x-4 p-3 bg-gray-800/50 border border-green-400/20 hover:border-blue-400/40 transition-colors duration-200"
                        key={item.id}
                        data-testid="cart-item"
                      >
                        <LocalizedClientLink
                          href={`/products/${item.product_handle}`}
                          className="w-24 relative group"
                        >
                          <div className="border border-green-400/30 group-hover:border-blue-400/50 transition-colors duration-200">
                            <Thumbnail
                              thumbnail={item.thumbnail}
                              images={item.variant?.product?.images}
                              size="square"
                            />
                          </div>
                        </LocalizedClientLink>
                        <div className="flex flex-col justify-between flex-1">
                          <div className="flex flex-col flex-1">
                            <div className="flex items-start justify-between">
                              <div className="flex flex-col overflow-ellipsis whitespace-nowrap mr-4">
                                <h3 className="text-sm font-semibold overflow-hidden text-ellipsis text-green-300 hover:text-blue-400 transition-colors duration-200">
                                  <LocalizedClientLink
                                    href={`/products/${item.product_handle}`}
                                    data-testid="product-link"
                                  >
                                    {item.title}
                                  </LocalizedClientLink>
                                </h3>
                                <div className="text-xs text-gray-400 mt-1">
                                  <LineItemOptions
                                    variant={item.variant}
                                    data-testid="cart-item-variant"
                                    data-value={item.variant}
                                  />
                                </div>
                                <span
                                  className="text-xs text-blue-400 mt-1"
                                  data-testid="cart-item-quantity"
                                  data-value={item.quantity}
                                >
                                  Qty: {item.quantity}
                                </span>
                              </div>
                              <div className="flex justify-start">
                                <div className="text-green-400 font-bold">
                                  <LineItemPrice
                                    item={item}
                                    style="tight"
                                    currencyCode={cartState.currency_code}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-2">
                            <DeleteButton
                              id={item.id}
                              className="text-xs text-red-400 hover:text-red-300 bg-transparent py-1 uppercase tracking-wide transition-colors duration-200"
                              data-testid="cart-item-remove-button"
                            >
                              [Remove]
                            </DeleteButton>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
                <div className="p-4 flex flex-col gap-y-4 bg-gray-800/30 border-t border-green-400/30">
                  <div className="flex items-center justify-between">
                    <span className="text-green-400 font-bold uppercase tracking-wide">
                      Subtotal{" "}
                      <span className="font-normal text-gray-400">(excl. taxes)</span>
                    </span>
                    <span
                      className="text-lg font-bold text-blue-400"
                      data-testid="cart-subtotal"
                      data-value={subtotal}
                    >
                      {convertToLocale({
                        amount: subtotal,
                        currency_code: cartState.currency_code,
                      })}
                    </span>
                  </div>
                  <LocalizedClientLink href="/cart" passHref>
                    <Button
                      className="w-full bg-transparent border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-gray-900 font-mono uppercase tracking-wider transition-all duration-300"
                      size="large"
                      data-testid="go-to-cart-button"
                    >
                      [Access Cart]
                    </Button>
                  </LocalizedClientLink>
                </div>
              </>
            ) : (
              <div className="bg-gray-800/30">
                <div className="flex py-16 flex-col gap-y-6 items-center justify-center">
                  <div className="bg-gray-700 border border-green-400/50 text-sm flex items-center justify-center w-12 h-12 font-mono text-green-400">
                    <span>0</span>
                  </div>
                  <span className="text-gray-300 font-mono">Your cart is empty.</span>
                  <span className="text-xs text-gray-500 font-mono">[No items detected]</span>
                  <div className="mt-4">
                    <LocalizedClientLink href="/store">
                      <Button 
                        onClick={close}
                        className="bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 font-mono uppercase tracking-wider transition-all duration-300 px-6 py-2"
                      >
                        [Explore Products]
                      </Button>
                    </LocalizedClientLink>
                  </div>
                </div>
              </div>
            )}
          </PopoverPanel>
        </Transition>
      </Popover>
    </div>
  )
}

export default CartDropdown