import { Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, topLabel, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full font-mono">
        {topLabel && (
          <Label className="mb-2 text-sm font-semibold text-green-400 uppercase tracking-wide">
            [{topLabel}]
          </Label>
        )}
        <div className="flex relative z-0 w-full">
          <input
            type={inputType}
            name={name}
            placeholder=" "
            required={required}
            className={`
              pt-4 pb-1 block w-full h-11 px-4 mt-0 
              bg-gray-800/50 border rounded-none appearance-none 
              focus:outline-none focus:ring-0 
              text-green-100 font-mono
              transition-all duration-300
              ${isFocused || inputRef.current?.value 
                ? 'border-blue-400 shadow-[0_0_10px_rgba(0,191,255,0.3)]' 
                : 'border-green-400/30 hover:border-green-400/50'
              }
            `}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            {...props}
            ref={inputRef}
          />
          <label
            htmlFor={name}
            onClick={() => inputRef.current?.focus()}
            className={`
              flex items-center justify-center mx-3 px-1 
              transition-all absolute duration-300 top-3 -z-1 origin-0 
              font-mono text-sm uppercase tracking-wide
              ${isFocused || inputRef.current?.value
                ? 'text-blue-400 -translate-y-3 scale-90'
                : 'text-gray-400'
              }
            `}
          >
            &gt; {label}
            {required && <span className="text-red-400 ml-1">*</span>}
          </label>
          
          {/* Password toggle */}
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-400 hover:text-blue-400 px-4 focus:outline-none transition-all duration-150 absolute right-0 top-3"
            >
              {showPassword ? <Eye color="currentColor" /> : <EyeOff color="currentColor" />}
            </button>
          )}

          {/* Focus indicator */}
          <div className={`
            absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-green-400 
            transition-all duration-300 origin-left
            ${isFocused ? 'w-full' : 'w-0'}
          `} />
        </div>

        {/* Terminal-style cursor indicator */}
        {isFocused && (
          <div className="flex items-center gap-1 mt-1 text-xs text-blue-400">
            <div className="w-1 h-1 bg-blue-400 rounded-full "></div>
            <span>INPUT_ACTIVE</span>
          </div>
        )}
      </div>
    )
  }
)

Input.displayName = "Input"

export default Input