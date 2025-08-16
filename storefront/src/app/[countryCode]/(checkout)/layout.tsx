import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ChevronDown from "@modules/common/icons/chevron-down"

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="w-full relative small:min-h-screen">
      <div className="h-16 border-b ">
        <nav className="flex h-full items-center content-container justify-between">
          <LocalizedClientLink
            href="/cart"
            className="text-small-semi flex items-center gap-x-2 uppercase flex-1 basis-0"
            data-testid="back-to-cart-link"
          >
            <ChevronDown className="rotate-90" size={16} />
            <span className="mt-px hidden small:block txt-compact-plus">
              Back To Shopping Cart
            </span>
            <span className="mt-px block small:hidden txt-compact-plus">
              Back
            </span>
          </LocalizedClientLink>

          <LocalizedClientLink
            href="/"
            className="text-xl font-bold hover:text-blue-400 uppercase tracking-wider transition-all duration-300 relative group"
            data-testid="nav-store-link"
          >
            <span className="relative z-10">fdh Systems</span>
            {/* Subtle glitch effect on hover */}
            <span className="absolute inset-0 text-blue-400 opacity-0 group-hover:opacity-70 transition-opacity duration-150 transform group-hover:translate-x-0.5">
              fdh Systems
            </span>
            <span className="absolute inset-0 text-red-400 opacity-0 group-hover:opacity-50 transition-opacity duration-150 transform group-hover:-translate-x-0.5">
              fdh Systems
            </span>
          </LocalizedClientLink>
            
          <div className="flex-1 basis-0" />
        </nav>
      </div>
      <div className="relative" data-testid="checkout-container">{children}</div>
    </div>
  )
}
