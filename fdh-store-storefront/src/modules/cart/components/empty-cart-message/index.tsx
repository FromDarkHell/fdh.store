import { Heading, Text } from "@medusajs/ui"

import InteractiveLink from "@modules/common/components/interactive-link"

const EmptyCartMessage = () => {
  return (
    <div className="py-24 px-6 flex flex-col justify-center items-center relative" data-testid="empty-cart-message">
      {/* Background grid effect */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0, 255, 127, 0.2) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0, 255, 127, 0.2) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px'
          }}
        ></div>
      </div>

      {/* Terminal-style container */}
      <div className="bg-gray-800/40 border border-green-400/30 p-8 max-w-2xl w-full relative z-10 overflow-hidden">
        {/* Terminal header */}
        <div className="bg-gray-900/50 border-b border-green-400/30 -mx-8 -mt-8 mb-8 px-6 py-3 flex items-center gap-2">
          <div className="w-2 h-2 bg-red-500 rounded-full"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-gray-400 ml-2 font-mono">cart_status.exe</span>
        </div>

        <div className="text-center space-y-6">
          {/* Empty state icon */}
          <div className="text-8xl text-gray-600 font-mono">
            ∅
          </div>

          {/* Status indicator */}
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-gray-400">
            <div className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse"></div>
            <span>CART_EMPTY</span>
          </div>

          {/* Main heading with glitch effect */}
          <Heading
            level="h1"
            className="text-4xl font-bold font-mono uppercase tracking-wider text-green-400 relative group"
          >
            <span className="relative z-10">[Cart Empty]</span>
            {/* Subtle glitch effect */}
            <span className="absolute inset-0 text-blue-400/70 opacity-0 group-hover:opacity-100 transition-opacity duration-150 transform group-hover:translate-x-0.5">
              [Cart Empty]
            </span>
          </Heading>

          {/* Terminal-style message */}
          <div className="bg-gray-900/50 border border-green-400/20 p-4 font-mono text-sm">
            <div className="space-y-2 text-left">
              <div className="text-gray-400">
                <span className="text-green-400">&gt;</span> No items detected in memory
              </div>
              <div className="text-gray-400">
                <span className="text-blue-400">&gt;</span> Cart buffer status: EMPTY
              </div>
              <div className="text-gray-400">
                <span className="text-green-400">&gt;</span> Ready to load products
              </div>
            </div>
          </div>

          {/* Description text */}
          <Text className="text-base text-gray-300 font-mono leading-relaxed max-w-md mx-auto">
            Your shopping cart is currently empty. Initialize shopping sequence by browsing our product catalog.
          </Text>

          {/* CTA Button */}
          <div className="pt-4">
            <InteractiveLink 
              href="/store"
              className="inline-block bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 font-mono uppercase tracking-wider transition-all duration-300 px-8 py-3 relative overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                [Initialize Shopping]
              </span>
            
            </InteractiveLink>
          </div>
        </div>

        {/* Terminal footer */}
        <div className="bg-gray-900/50 border-t border-green-400/30 -mx-8 -mb-8 mt-8 px-6 py-3">
          <div className="text-xs font-mono text-gray-400 flex items-center justify-between">
            <span>
              <span className="text-green-400">&gt;</span> Ready for input
            </span>
            <span className="text-blue-400">
              STATUS: STANDBY
            </span>
          </div>
        </div>
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-blue-400 rounded-full animate-pulse opacity-50"></div>
      <div className="absolute top-32 right-24 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-20 left-32 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-30" style={{ animationDelay: '2s' }}></div>
      <div className="absolute bottom-32 right-20 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
    </div>
  )
}

export default EmptyCartMessage