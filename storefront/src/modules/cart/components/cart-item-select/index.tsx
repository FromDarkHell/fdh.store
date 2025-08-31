"use client"

import { IconBadge, clx } from "@medusajs/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

import ChevronDown from "@modules/common/icons/chevron-down"

type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & Omit<SelectHTMLAttributes<HTMLSelectElement>, "size">

const CartItemSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = "Select...", className, children, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    useEffect(() => {
      if (innerRef.current && innerRef.current.value === "") {
        setIsPlaceholder(true)
      } else {
        setIsPlaceholder(false)
      }
    }, [innerRef.current?.value])

    return (
      <div className="relative">
        <div
          className={clx(
            "relative flex items-center bg-gray-800/50 border border-green-400/30 hover:border-blue-400/50 transition-all duration-200 font-mono text-sm group",
            className,
            {
              "text-gray-400": isPlaceholder,
              "text-green-300": !isPlaceholder,
            }
          )}
        >
          {/* Terminal-style indicator */}
          <div className="absolute left-2 top-1/2 transform -translate-y-1/2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full "></div>
          </div>

          <select
            ref={innerRef}
            {...props}
            className="appearance-none bg-transparent border-none pl-6 pr-8 py-2 transition-colors duration-150 focus:outline-none text-green-300 font-mono w-full h-full cursor-pointer hover:text-blue-400"
          >
            <option disabled value="" className="bg-gray-800 text-gray-400">
              {placeholder}
            </option>
            {children}
          </select>

          {/* Custom dropdown arrow */}
          <span className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none flex items-center justify-center text-green-400 group-hover:text-blue-400 transition-colors duration-200">
            <ChevronDown className="w-3 h-3" />
          </span>

          {/* Hover glow effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-200 pointer-events-none">
            <div className="w-full h-full bg-gradient-to-r from-blue-400/20 to-green-400/20"></div>
          </div>
        </div>
      </div>
    )
  }
)

CartItemSelect.displayName = "CartItemSelect"

export default CartItemSelect