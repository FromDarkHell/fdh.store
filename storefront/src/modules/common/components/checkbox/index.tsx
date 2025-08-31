import { Checkbox, Label } from "@medusajs/ui"
import React from "react"

type CheckboxProps = {
  checked?: boolean
  onChange?: () => void
  label: string
  name?: string
  'data-testid'?: string
}

const CheckboxWithLabel: React.FC<CheckboxProps> = ({
  checked = true,
  onChange,
  label,
  name,
  'data-testid': dataTestId
}) => {
  return (
    <div className="flex items-center space-x-3 font-mono group">
      {/* Custom checkbox container */}
      <div className="relative">
        <Checkbox
          className="appearance-none w-5 h-5 border-2 border-green-400/50 bg-gray-800/50 rounded-none cursor-pointer transition-all duration-200 hover:border-blue-400/70 focus:outline-none focus:ring-0 checked:bg-blue-400 checked:border-blue-400"
          id={`checkbox-${name}`}
          role="checkbox"
          type="button"
          checked={checked}
          aria-checked={checked}
          onClick={onChange}
          name={name}
          data-testid={dataTestId}
        />
        
        {/* Custom checkmark */}
        {checked && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <svg 
              width="12" 
              height="12" 
              viewBox="0 0 12 12" 
              fill="none" 
              className="text-gray-900"
            >
              <path
                d="M2 6L4.5 8.5L10 3"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        )}

        {/* Terminal-style border effect */}
        <div className={`
          absolute inset-0 border-2 rounded-none transition-all duration-200 pointer-events-none
          ${checked 
            ? 'border-blue-400 shadow-[0_0_10px_rgba(0,191,255,0.4)]' 
            : 'border-transparent group-hover:border-green-400/30'
          }
        `} />
      </div>

      <Label
        htmlFor={`checkbox-${name}`}
        className="text-sm text-green-100 cursor-pointer transition-colors duration-200 hover:text-blue-400 uppercase tracking-wide"
        size="large"
      >
        &gt; {label}
      </Label>

      {/* Status indicator */}
      <div className="flex items-center gap-1">
        <div className={`
          w-1.5 h-1.5 rounded-full transition-all duration-200
          ${checked ? 'bg-green-400 ' : 'bg-gray-600'}
        `} />
      </div>
    </div>
  )
}

export default CheckboxWithLabel