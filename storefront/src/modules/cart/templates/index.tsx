import ItemsTemplate from "./items"
import Summary from "./summary"
import EmptyCartMessage from "../components/empty-cart-message"
import SignInPrompt from "../components/sign-in-prompt"
import Divider from "@modules/common/components/divider"
import { HttpTypes } from "@medusajs/types"

const CartTemplate = ({
  cart,
  customer,
}: {
  cart: HttpTypes.StoreCart | null
  customer: HttpTypes.StoreCustomer | null
}) => {
  return (
    <div className="py-12 bg-gray-900 min-h-screen relative overflow-hidden">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0, 255, 127, 0.2) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0, 255, 127, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px'
          }}
        ></div>
      </div>

      {/* Main content */}
      <div className="content-container relative z-10" data-testid="cart-container">
        {cart?.items?.length ? (
          <div className="grid grid-cols-1 small:grid-cols-[1fr_360px] gap-x-12 gap-y-8">
            {/* Left column - Cart items */}
            <div className="flex flex-col gap-y-8">
              {/* Sign in prompt for non-authenticated users */}
              {!customer && (
                <>
                  <SignInPrompt />
                  {/* Custom terminal-style divider */}
                  <div className="flex items-center gap-4">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-green-400/50 to-green-400/20"></div>
                    <div className="bg-gray-800 border border-green-400/30 px-3 py-1">
                      <span className="text-xs font-mono text-green-400 uppercase tracking-wide">CART DATA</span>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-green-400/20 via-green-400/50 to-transparent"></div>
                  </div>
                </>
              )}

              {/* Cart items section */}
              <div className="bg-gray-800/30 border border-green-400/30 relative overflow-hidden">
                {/* Terminal scan lines effect */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="w-full h-full bg-gradient-to-b from-transparent via-green-400/10 to-transparent animate-pulse"></div>
                </div>
                
                <div className="p-6 relative z-10">
                  <ItemsTemplate cart={cart} />
                </div>
              </div>
            </div>

            {/* Right column - Summary (sticky) */}
            <div className="relative">
              <div className="flex flex-col gap-y-8 sticky top-12">
                {cart && cart.region && (
                  <Summary cart={cart as any} />
                )}

                {/* Additional system info */}
                <div className="bg-gray-800/30 border border-blue-400/30 p-4">
                  <div className="space-y-3">
                    {/* Header */}
                    <div className="flex items-center gap-2 text-xs font-mono text-gray-400 border-b border-blue-400/20 pb-2">
                      <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></div>
                      <span>SYSTEM_INFO</span>
                    </div>
                    
                    {/* Info grid */}
                    <div className="space-y-2 text-xs font-mono">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Cart ID:</span>
                        <span className="text-blue-400">{cart.id.slice(-8)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Items:</span>
                        <span className="text-green-400">{cart.items?.length || 0}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Region:</span>
                        <span className="text-blue-400">{cart.region?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Currency:</span>
                        <span className="text-green-400">{cart.currency_code?.toUpperCase()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Status:</span>
                        <span className="text-green-400">ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty cart state */
          <div className="relative">
            <EmptyCartMessage />
          </div>
        )}
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-24 left-20 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-30"></div>
      <div className="absolute top-40 right-32 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-32 left-24 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-40" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-20 right-20 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '0.5s' }}></div>
    </div>
  )
}

export default CartTemplate