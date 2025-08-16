import { Suspense } from "react"

import { listRegions } from "@lib/data/regions"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"
import SideMenu from "@modules/layout/components/side-menu"

export default async function Nav() {
  const regions = await listRegions().then((regions: StoreRegion[]) => regions)

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-gray-800/95 backdrop-blur-sm border-green-400/30">
        {/* Terminal-style header decoration */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent opacity-50"></div>
        
        <nav className="content-container txt-xsmall-plus text-green-300 flex items-center justify-between w-full h-full text-small-regular font-mono">
          {/* Center - Logo */}
          <div className="flex items-center h-full relative">
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
            
            {/* Terminal cursor */}
            <span className="ml-1 text-green-400 animate-pulse">_</span>
          </div>

          {/* Right side - Account & Cart */}
          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">

            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-blue-400 transition-colors duration-200 uppercase tracking-wide text-sm border border-transparent hover:border-blue-400/30 px-2 py-1"
                href="/categories/prebuilts"
                data-testid="nav-send-ins-link"
              >
                [Shop]
              </LocalizedClientLink>
            </div>

            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-blue-400 transition-colors duration-200 uppercase tracking-wide text-sm border border-transparent hover:border-blue-400/30 px-2 py-1"
                href="/categories/send-ins"
                data-testid="nav-send-ins-link"
              >
                [Services]
              </LocalizedClientLink>
            </div>

            <div className="hidden small:flex items-center gap-x-6 h-full">
              <LocalizedClientLink
                className="hover:text-blue-400 transition-colors duration-200 uppercase tracking-wide text-sm border border-transparent hover:border-blue-400/30 px-2 py-1"
                href="/account"
                data-testid="nav-account-link"
              >
                [Account]
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="hover:text-blue-400 flex gap-2 transition-colors duration-200 uppercase tracking-wide text-sm border border-transparent hover:border-blue-400/30 px-2 py-1"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  [Cart (0)]
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
        
        {/* Bottom decoration line */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400/50 to-transparent"></div>
      </header>
    </div>
  )
}