const Radio = ({ checked, 'data-testid': dataTestId }: { checked: boolean, 'data-testid'?: string }) => {
  return (
    <div className="relative group">
      <button
        type="button"
        role="radio"
        aria-checked={checked}
        data-state={checked ? "checked" : "unchecked"}
        className="group relative flex h-5 w-5 items-center justify-center outline-none cursor-pointer"
        data-testid={dataTestId || 'radio-button'}
      >
        {/* Outer ring */}
        <div className={`
          flex h-5 w-5 items-center justify-center rounded-full transition-all duration-300
          border-2 bg-gray-800/50
          ${checked 
            ? 'border-blue-400 shadow-[0_0_10px_rgba(0,191,255,0.4)]' 
            : 'border-green-400/50 group-hover:border-green-400/70'
          }
        `}>
          {/* Inner dot */}
          {checked && (
            <span
              data-state={checked ? "checked" : "unchecked"}
              className="group flex items-center justify-center"
            >
              <div className="bg-blue-400 rounded-full h-2 w-2 "></div>
            </span>
          )}
        </div>

        {/* Terminal-style scanning ring */}
        <div className={`
          absolute inset-0 rounded-full border-2 transition-all duration-300 pointer-events-none
          ${checked 
            ? 'border-green-400/30 ' 
            : 'border-transparent group-hover:border-blue-400/20'
          }
        `} style={{ 
          transform: 'scale(1.2)',
        }} />
      </button>
    </div>
  )
}

export default Radio