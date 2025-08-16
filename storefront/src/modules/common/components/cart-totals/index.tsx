"use client"

import { convertToLocale } from "@lib/util/money"
import React from "react"

type CartTotalsProps = {
  totals: {
    total?: number | null
    subtotal?: number | null
    tax_total?: number | null
    shipping_total?: number | null
    discount_total?: number | null
    gift_card_total?: number | null
    currency_code: string
    shipping_subtotal?: number | null
  }
}

const CartTotals: React.FC<CartTotalsProps> = ({ totals }) => {
  const {
    currency_code,
    total,
    subtotal,
    tax_total,
    discount_total,
    gift_card_total,
    shipping_subtotal,
  } = totals

  return (
    <div className="bg-gray-800/50 border border-green-400/30 p-6 font-mono">
      {/* Terminal header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-green-400/20">
        <div className="w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-xs text-gray-400 ml-2">cart_totals.exe</span>
      </div>

      <div className="flex flex-col gap-y-3 text-sm text-green-100">
        {/* Subtotal */}
        <div className="flex items-center justify-between">
          <span className="flex gap-x-1 items-center text-gray-300">
            <span className="text-blue-400">&gt;</span>
            Subtotal (excl. shipping and taxes)
          </span>
          <span 
            data-testid="cart-subtotal" 
            data-value={subtotal || 0}
            className="text-green-400 font-bold"
          >
            {convertToLocale({ amount: subtotal ?? 0, currency_code })}
          </span>
        </div>

        {/* Discount */}
        {!!discount_total && (
          <div className="flex items-center justify-between">
            <span className="text-gray-300">
              <span className="text-blue-400">&gt;</span>
              Discount
            </span>
            <span
              className="text-lime-400 font-bold"
              data-testid="cart-discount"
              data-value={discount_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: discount_total ?? 0, currency_code })}
            </span>
          </div>
        )}

        {/* Shipping */}
        <div className="flex items-center justify-between">
          <span className="text-gray-300">
            <span className="text-blue-400">&gt;</span>
            Shipping
          </span>
          <span 
            data-testid="cart-shipping" 
            data-value={shipping_subtotal || 0}
            className="text-green-400 font-bold"
          >
            {convertToLocale({ amount: shipping_subtotal ?? 0, currency_code })}
          </span>
        </div>

        {/* Taxes */}
        <div className="flex justify-between">
          <span className="flex gap-x-1 items-center text-gray-300">
            <span className="text-blue-400">&gt;</span>
            Taxes
          </span>
          <span 
            data-testid="cart-taxes" 
            data-value={tax_total || 0}
            className="text-green-400 font-bold"
          >
            {convertToLocale({ amount: tax_total ?? 0, currency_code })}
          </span>
        </div>

        {/* Gift Card */}
        {!!gift_card_total && (
          <div className="flex items-center justify-between">
            <span className="text-gray-300">
              <span className="text-blue-400">&gt;</span>
              Gift card
            </span>
            <span
              className="text-lime-400 font-bold"
              data-testid="cart-gift-card-amount"
              data-value={gift_card_total || 0}
            >
              -{" "}
              {convertToLocale({ amount: gift_card_total ?? 0, currency_code })}
            </span>
          </div>
        )}
      </div>

      {/* Separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-green-400/50 to-transparent my-4" />
      
      {/* Total */}
      <div className="flex items-center justify-between text-green-100 mb-2 relative">
        <span className="text-lg font-bold uppercase tracking-wider text-green-400">
          [Total]
        </span>
        <span
          className="text-2xl font-bold text-blue-400 neon-blue"
          data-testid="cart-total"
          data-value={total || 0}
        >
          {convertToLocale({ amount: total ?? 0, currency_code })}
        </span>
      </div>
      
      {/* Bottom separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-blue-400/50 to-transparent mt-4" />

      {/* Status indicator */}
      <div className="flex items-center justify-center gap-2 mt-3 text-xs text-gray-400">
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
        <span>CALCULATIONS_COMPLETE</span>
      </div>
    </div>
  )
}

export default CartTotals