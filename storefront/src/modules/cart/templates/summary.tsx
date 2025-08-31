"use client"

import { Button, Heading } from "@medusajs/ui"

import CartTotals from "@modules/common/components/cart-totals"
import Divider from "@modules/common/components/divider"
import DiscountCode from "@modules/checkout/components/discount-code"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import { HttpTypes } from "@medusajs/types"

type SummaryProps = {
  cart: HttpTypes.StoreCart & {
    promotions: HttpTypes.StorePromotion[]
  }
}

function getCheckoutStep(cart: HttpTypes.StoreCart) {
  if (!cart?.shipping_address?.address_1 || !cart.email) {
    return "address"
  } else if (cart?.shipping_methods?.length === 0) {
    return "delivery"
  } else {
    return "payment"
  }
}

const Summary = ({ cart }: SummaryProps) => {
  const step = getCheckoutStep(cart)

  return (
    <div className="flex flex-col gap-y-6 relative">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0, 191, 255, 0.2) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0, 191, 255, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        ></div>
      </div>

      {/* Terminal-style container */}
      <div className="bg-gray-800/40 border border-blue-400/30 relative z-10 overflow-hidden">
        {/* Terminal header */}
        <div className="bg-gray-800/80 border-b border-blue-400/30 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-xs text-gray-400 ml-2 font-mono">cart_summary.exe</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full "></div>
            <span className="text-blue-400">CALCULATING</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Summary heading */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <span className="text-blue-400">&gt;</span>
              <span>CHECKOUT_SUMMARY_LOADED</span>
            </div>
            <Heading 
              level="h2" 
              className="text-3xl font-bold font-mono uppercase tracking-wider text-blue-400 relative group"
            >
              <span className="relative z-10">[Order Summary]</span>
              {/* Subtle glow effect */}
              <span className="absolute inset-0 text-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 blur-sm">
                [Order Summary]
              </span>
            </Heading>
          </div>

          {/* Discount code section with terminal styling */}
          <div className="space-y-3">
            <div className="text-sm font-mono text-green-400 uppercase tracking-wide">
              [Discount Codes]
            </div>
            <div className="bg-gray-800/50 border border-green-400/20 p-3">
              <DiscountCode cart={cart} />
            </div>
          </div>

          {/* Cart totals with enhanced styling */}
          <CartTotals totals={cart} />

          {/* Checkout button with cyber styling */}
          <LocalizedClientLink
            href={"/checkout?step=" + step}
            data-testid="checkout-button"
            className="block"
          >
            <Button 
              className="w-full h-12 bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 font-mono uppercase tracking-wider transition-all duration-300 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>[Proceed to Checkout]</span>
                <span className="text-lg">→</span>
              </span>
            </Button>
          </LocalizedClientLink>
        </div>

        {/* Terminal footer */}
        <div className="bg-gray-800/80 border-t border-blue-400/30 px-4 py-2">
          <div className="text-xs font-mono text-gray-400 flex items-center justify-between">
            <span>
              <span className="text-blue-400">&gt;</span> Ready for checkout
            </span>
            <span className="text-green-400">
              STATUS: READY
            </span>
          </div>
        </div>
      </div>

      {/* Floating elements for visual interest */}
      <div className="absolute top-4 right-4 w-1 h-1 bg-blue-400 rounded-full  opacity-50"></div>
      <div className="absolute bottom-8 left-4 w-1 h-1 bg-green-400 rounded-full  opacity-50" style={{ animationDelay: '1s' }}></div>
    </div>
  )
}

export default Summary