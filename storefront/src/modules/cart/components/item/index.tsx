"use client"

import { Table, Text, clx } from "@medusajs/ui"
import { updateLineItem } from "@lib/data/cart"
import { HttpTypes } from "@medusajs/types"
import CartItemSelect from "@modules/cart/components/cart-item-select"
import ErrorMessage from "@modules/checkout/components/error-message"
import DeleteButton from "@modules/common/components/delete-button"
import LineItemOptions from "@modules/common/components/line-item-options"
import LineItemPrice from "@modules/common/components/line-item-price"
import LineItemUnitPrice from "@modules/common/components/line-item-unit-price"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Spinner from "@modules/common/icons/spinner"
import Thumbnail from "@modules/products/components/thumbnail"
import { useState } from "react"

type ItemProps = {
  item: HttpTypes.StoreCartLineItem
  type?: "full" | "preview"
  currencyCode: string
}

const Item = ({ item, type = "full", currencyCode }: ItemProps) => {
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const changeQuantity = async (quantity: number) => {
    setError(null)
    setUpdating(true)

    await updateLineItem({
      lineId: item.id,
      quantity,
    })
      .catch((err) => {
        setError(err.message)
      })
      .finally(() => {
        setUpdating(false)
      })
  }

  // TODO: Update this to grab the actual max inventory
  const maxQtyFromInventory = 10
  const maxQuantity = item.variant?.manage_inventory ? 10 : maxQtyFromInventory

  return (
    <>
      {/* Product thumbnail */}
      <Table.Cell className="!pl-0 p-4 w-24">
        <LocalizedClientLink
          href={`/products/${item.product_handle}`}
          className={clx("flex relative group", {
            "w-16": type === "preview",
            "small:w-24 w-12": type === "full",
          })}
        >
          {/* Terminal-style image container */}
          <div className="relative border border-green-400/30 group-hover:border-blue-400/50 transition-colors duration-200 bg-gray-800/30">
            <Thumbnail
              thumbnail={item.thumbnail}
              images={item.variant?.product?.images}
              size="square"
            />
            {/* Status indicator overlay */}
            <div className="absolute top-1 right-1">
              <div className="w-2 h-2 bg-green-400 rounded-full opacity-70 group-hover:opacity-100 transition-opacity duration-200"></div>
            </div>
            {/* Hover scan line */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-200">
              <div className="w-full h-full bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"></div>
            </div>
          </div>
        </LocalizedClientLink>
      </Table.Cell>

      {/* Product details */}
      <Table.Cell className="text-left">
        <div className="space-y-2">
          {/* Product title */}
          <Text
            className="text-base font-semibold text-green-300 hover:text-blue-400 transition-colors duration-200 font-mono"
            data-testid="product-title"
          >
            <LocalizedClientLink
              href={`/products/${item.product_handle}`}
              className="relative group"
            >
              <span className="relative z-10">{item.product_title}</span>
              {/* Subtle glitch on hover */}
              <span className="absolute inset-0 text-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 transform group-hover:translate-x-0.5">
                {item.product_title}
              </span>
            </LocalizedClientLink>
          </Text>
          
          {/* Variant options with terminal styling */}
          <div className="text-sm text-gray-400 font-mono">
            <LineItemOptions variant={item.variant} data-testid="product-variant" />
          </div>

          {/* Product ID in terminal style */}
          <div className="text-xs font-mono text-gray-500">
            <span className="text-blue-400">ID:</span> {item.id.slice(-8)}
          </div>
        </div>
      </Table.Cell>

      {/* Quantity controls (full view only) */}
      {type === "full" && (
        <Table.Cell>
          <div className="flex flex-col gap-3 w-32">
            {/* Controls container */}
            <div className="flex flex-row gap-2 items-center">
              <div className="flex flex-col gap-2 items-center">
                {/* Quantity selector */}
                <div className="flex-1">
                  <CartItemSelect
                    value={item.quantity}
                    onChange={(value) => changeQuantity(parseInt(value.target.value))}
                    className="w-full h-10 mt-2"
                    data-testid="product-select-button"
                  >
                    {Array.from(
                      {
                        length: Math.min(maxQuantity, 10),
                      },
                      (_, i) => (
                        <option 
                          value={i + 1} 
                          key={i}
                          className="bg-gray-800 text-green-300"
                        >
                          {i + 1}
                        </option>
                      )
                    )}
                  </CartItemSelect>
                </div>

                {/* Delete button with terminal styling */}
                <DeleteButton 
                  id={item.id} 
                  data-testid="product-delete-button"
                  className="w-full bg-gray-800/50 py-1 font-mono text-xs uppercase tracking-wide transition-all duration-200 !gap-0"
                  buttonClassName="w-full"
                >
                  [DELETE]
                </DeleteButton>
              </div>

              {/* Loading spinner with terminal styling */}
              {updating && (
                <div className="flex items-center justify-center w-6 h-6">
                  <div className="w-4 h-4 border-2 border-green-400/30 border-t-green-400 rounded-full animate-spin"></div>
                </div>
              )}
            </div>

            { updating || error &&
            <div className="text-xs font-mono text-gray-400 flex items-center gap-2">
              <div className={clx("w-1.5 h-1.5 rounded-full", {
                "bg-yellow-400 ": updating,
                "bg-green-400": !updating && !error,
                "bg-red-400": error,
              })}></div>
              <span>
                {updating ? "UPDATING..." : error ? "ERROR" : "READY"}
              </span>
            </div> }

            {/* Error message with terminal styling */}
            <ErrorMessage 
              error={error} 
              data-testid="product-error-message"
            />
          </div>
        </Table.Cell>
      )}

      {/* Unit price (full view only) */}
      {type === "full" && (
        <Table.Cell className="hidden small:table-cell">
          <div className="text-left font-mono">
            <div className="text-xs text-gray-400 mb-1">UNIT PRICE</div>
            <div className="text-blue-400 font-semibold">
              <LineItemUnitPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
          </div>
        </Table.Cell>
      )}

      {/* Total price */}
      <Table.Cell className="!pr-0">
        <div
          className={clx("!pr-0 font-mono", {
            "flex flex-col items-end h-full justify-center": type === "preview",
          })}
        >
          {type === "preview" && (
            <div className="flex items-center gap-2 text-sm mb-1">
              <span className="text-gray-400">{item.quantity}x</span>
              <span className="text-blue-400">
                <LineItemUnitPrice
                  item={item}
                  style="tight"
                  currencyCode={currencyCode}
                />
              </span>
            </div>
          )}
          
          {/* Total price with terminal styling */}
          <div className="text-right">
            {type === "full" && (
              <div className="text-xs text-gray-400 mb-1">TOTAL</div>
            )}
            <div className="text-green-400 font-bold text-lg">
              <LineItemPrice
                item={item}
                style="tight"
                currencyCode={currencyCode}
              />
            </div>
          </div>
        </div>
      </Table.Cell>
    </>
  )
}

export default Item