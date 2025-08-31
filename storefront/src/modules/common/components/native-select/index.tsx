import { ChevronUpDown } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import {
  SelectHTMLAttributes,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react"

export type NativeSelectProps = {
  placeholder?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
} & SelectHTMLAttributes<HTMLSelectElement>

const NativeSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  (
    { placeholder = "Select...", defaultValue, className, children, ...props },
    ref
  ) => {
    const innerRef = useRef<HTMLSelectElement>(null)
    const [isPlaceholder, setIsPlaceholder] = useState(false)
    const [isFocused, setIsFocused] = useState(false)

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
      <div className="font-mono">
        <div
          onFocus={() => {
            innerRef.current?.focus()
            setIsFocused(true)
          }}
          onBlur={() => {
            innerRef.current?.blur()
            setIsFocused(false)
          }}
          className={clx(
            "relative flex items-center text-sm border bg-gray-800/50 rounded-none transition-all duration-300 cursor-pointer",
            className,
            {
              "text-gray-400": isPlaceholder,
              "text-green-100": !isPlaceholder,
              "border-blue-400 shadow-[0_0_10px_rgba(0,191,255,0.3)]": isFocused,
              "border-green-400/30 hover:border-green-400/50": !isFocused,
            }
          )}
        >
          {/* Terminal-style prompt */}
          <span className={`
            absolute left-3 text-xs transition-colors duration-300
            ${isFocused ? 'text-blue-400' : 'text-green-400'}
          `}>
            &gt;
          </span>

          <select
            ref={innerRef}
            defaultValue={defaultValue}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
            className="appearance-none flex-1 bg-transparent border-none pl-8 pr-12 py-3 transition-colors duration-150 outline-none text-green-100 font-mono cursor-pointer"
          >
            <option 
              disabled 
              value="" 
              className="bg-gray-800 text-gray-400"
            >
              {placeholder}
            </option>
            {children}
          </select>
          
          {/* Custom dropdown arrow */}
          <span className={`
            absolute right-4 inset-y-0 flex items-center pointer-events-none transition-colors duration-300
            ${isFocused ? 'text-blue-400' : 'text-green-400'}
          `}>
            <ChevronUpDown />
          </span>

          {/* Focus indicator */}
          <div className={`
            absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 
            transition-all duration-300 origin-left
            ${isFocused ? 'w-full' : 'w-0'}
          `} />
        </div>

        {/* Status indicator */}
        {isFocused && (
          <div className="flex items-center gap-1 mt-1 text-xs text-blue-400">
            <div className="w-1 h-1 bg-blue-400 rounded-full "></div>
            <span>SELECT_ACTIVE</span>
          </div>
        )}
      </div>
    )
  }
)

NativeSelect.displayName = "NativeSelect"

export default NativeSelect