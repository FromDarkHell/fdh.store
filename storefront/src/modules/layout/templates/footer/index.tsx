import { listCategories } from "@lib/data/categories"
import { listCollections } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"

import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default async function Footer() {
  const { collections } = await listCollections({
    fields: "*products",
  })
  const productCategories = await listCategories()

  return (
    <footer className="border-t border-green-400/30 w-full bg-gray-800 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0, 255, 127, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }}
        ></div>
      </div>
      
      {/* Top accent line */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
      
      <div className="content-container flex flex-col w-full relative z-10">
        <div className="flex flex-col gap-y-12 xsmall:flex-row items-start justify-between py-20">
          {/* Brand section */}
          <div className="space-y-4">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold text-green-400 hover:text-blue-400 uppercase tracking-wider font-mono transition-all duration-300 relative group"
            >
              <span className="relative z-10">fdh Systems</span>
              {/* Subtle glitch effect on hover */}
              <span className="absolute inset-0 text-blue-400 opacity-0 group-hover:opacity-50 transition-opacity duration-150 transform group-hover:translate-x-1">
                fdh Systems
              </span>
            </LocalizedClientLink>
            
            {/* Terminal-style info */}
            <div className="bg-gray-800/50 border border-green-400/30 p-3 font-mono text-xs max-w-xs">
              <div className="flex items-center gap-1 mb-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full "></div>
                <span className="text-green-400">STATUS: ONLINE</span>
              </div>
              <div className="text-gray-400">
                <span className="text-blue-400"></span>Specializing in repairs, refurbishes, and mods. 
              </div>
            </div>
          </div>

          {/* Links grid */}
          <div className="text-small-regular gap-12 md:gap-x-20 grid grid-cols-2 sm:grid-cols-3 font-mono">
            {/* Categories */}
            {productCategories && productCategories?.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-base font-bold text-green-400 uppercase tracking-wider border-b border-green-400/30 pb-2">
                  [Categories]
                </span>
                <ul
                  className="grid grid-cols-1 gap-3"
                  data-testid="footer-categories"
                >
                  {productCategories?.slice(0, 6).map((c) => {
                    if (c.parent_category) {
                      return
                    }

                    const children =
                      c.category_children?.map((child) => ({
                        name: child.name,
                        handle: child.handle,
                        id: child.id,
                      })) || null

                    return (
                      <li
                        className="flex flex-col gap-2 text-gray-400"
                        key={c.id}
                      >
                        <LocalizedClientLink
                          className={clx(
                            "hover:text-blue-400 transition-colors duration-200 text-sm",
                            children && "font-semibold text-green-300"
                          )}
                          href={`/categories/${c.handle}`}
                          data-testid="category-link"
                        >
                          {c.name}
                        </LocalizedClientLink>
                        {children && (
                          <ul className="grid grid-cols-1 ml-4 gap-2">
                            {children &&
                              children.map((child) => (
                                <li key={child.id}>
                                  <LocalizedClientLink
                                    className="hover:text-blue-400 transition-colors duration-200 text-xs text-gray-500"
                                    href={`/categories/${child.handle}`}
                                    data-testid="category-link"
                                  >
                                    - {child.name}
                                  </LocalizedClientLink>
                                </li>
                              ))}
                          </ul>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}

            {/* Collections */}
            {collections && collections.length > 0 && (
              <div className="flex flex-col gap-y-4">
                <span className="text-base font-bold text-green-400 uppercase tracking-wider border-b border-green-400/30 pb-2">
                  [Collections]
                </span>
                <ul
                  className={clx(
                    "grid grid-cols-1 gap-3 text-blue-300",
                    {
                      "grid-cols-1": (collections?.length || 0) > 3,
                    }
                  )}
                >
                  {collections?.slice(0, 6).map((c) => (
                    <li key={c.id}>
                      <LocalizedClientLink
                        className="hover:text-blue-600 transition-colors duration-200 text-sm"
                        href={`/collections/${c.handle}`}
                      >
                        {c.title}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* System Links */}
            <div className="flex flex-col gap-y-4">
              <span className="text-base font-bold text-green-400 uppercase tracking-wider border-b border-green-400/30 pb-2">
                [Social Media]
              </span>

                <ul className="grid grid-cols-1 gap-3 text-blue-400">
                    <li>
                      <a
                        className="hover:text-blue-600 transition-colors duration-200 text-sm"
                        href="https://www.facebook.com/profile.php?id=61579950630932"
                      >
                        Facebook
                      </a>
                    </li>

                    <li>
                      <a
                        className="hover:text-blue-600 transition-colors duration-200 text-sm"
                        href="tel:+15735699021"
                      >
                        Call Now
                      </a>
                    </li>
                </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-400/30 py-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <Text className="text-xs text-gray-500 font-mono">
              © {new Date().getFullYear()} fdh Systems. All rights reserved. | 
              <span className="text-green-400 ml-1">SECURE CONNECTION ESTABLISHED</span>
            </Text>
            
            {/* System status */}
            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full "></div>
                <span className="text-green-400">SYSTEMS OPERATIONAL</span>
              </div>
              <div className="text-gray-500">
                BUILD: v2.0.1
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>
    </footer>
  )
}