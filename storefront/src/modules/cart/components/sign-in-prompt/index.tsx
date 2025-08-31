import { Button, Heading, Text } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

const SignInPrompt = () => {
  return (
    <div className="bg-gray-800/40 border border-blue-400/30 p-6 flex items-center justify-between relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0, 191, 255, 0.3) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0, 191, 255, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '30px 30px'
          }}
        ></div>
      </div>

      {/* Terminal header strip */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex-1">
        {/* Status indicator */}
        <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-3">
          <div className="w-1.5 h-1.5 bg-blue-400 rounded-full "></div>
          <span>AUTHENTICATION_AVAILABLE</span>
        </div>

        {/* Main heading */}
        <Heading 
          level="h2" 
          className="text-2xl font-bold font-mono uppercase tracking-wider text-blue-400 mb-2 relative group"
        >
          <span className="relative z-10">[SIGN IN AVAILABLE]</span>
          {/* Subtle glow effect */}
          <span className="absolute inset-0 text-blue-400/50 opacity-0 group-hover:opacity-100 transition-opacity duration-150 blur-sm">
            [SIGN IN AVAILABLE]
          </span>
        </Heading>

        {/* Description */}
        <Text className="text-sm text-gray-300 font-mono leading-relaxed">
          <span className="text-green-400">&gt;</span> Enhanced user experience available
          <br />
          <span className="text-blue-400">&gt;</span> Authenticate for advanced features
        </Text>
      </div>

      {/* Sign in button */}
      <div className="relative z-10">
        <LocalizedClientLink href="/account">
          <Button 
            variant="secondary" 
            className="h-12 bg-transparent border-2 border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 font-mono uppercase tracking-wider transition-all duration-300 px-6 relative overflow-hidden group"
            data-testid="sign-in-button"
          >
            <span className="relative z-10 flex items-center gap-2">
              [Sign In]
            </span>
          </Button>
        </LocalizedClientLink>
      </div>
    </div>
  )
}

export default SignInPrompt