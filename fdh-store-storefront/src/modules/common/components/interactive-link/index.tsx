import { ArrowUpRightMini } from "@medusajs/icons"
import { Text } from "@medusajs/ui"
import LocalizedClientLink from "../localized-client-link"

type InteractiveLinkProps = {
  href: string
  children?: React.ReactNode
  onClick?: () => void
  className?: string
}

const InteractiveLink = ({
  href,
  children,
  onClick,
  className,
  ...props
}: InteractiveLinkProps) => {
  return (
    <LocalizedClientLink
      className={`
        flex gap-x-2 items-center group font-mono text-sm uppercase tracking-wide 
        transition-all duration-300 relative overflow-hidden
        hover:text-blue-400 border border-transparent hover:border-blue-400/30 
        px-3 py-2 bg-gray-800/30 hover:bg-gray-800/50
        ${className || ''}
      `}
      href={href}
      onClick={onClick}
      {...props}
    >
      {/* Terminal prompt */}
      <span className="text-green-400 group-hover:text-blue-400 transition-colors duration-300">
        &gt;
      </span>
      
      <Text className="text-green-300 group-hover:text-blue-400 transition-colors duration-300 relative z-10">
        {children}
      </Text>
      
      <ArrowUpRightMini
        className="group-hover:rotate-45 ease-in-out duration-300 text-green-400 group-hover:text-blue-400 transition-all"
        color="currentColor"
      />

      {/* Hover effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-400/10 to-green-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
      
      {/* Terminal-style scan line */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </LocalizedClientLink>
  )
}

export default InteractiveLink