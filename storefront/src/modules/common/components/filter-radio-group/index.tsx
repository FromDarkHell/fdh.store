import { EllipseMiniSolid } from "@medusajs/icons"
import { Label, RadioGroup, Text, clx } from "@medusajs/ui"

type FilterRadioGroupProps = {
  title: string
  items: {
    value: string
    label: string
  }[]
  value: any
  handleChange: (...args: any[]) => void
  "data-testid"?: string
}

const FilterRadioGroup = ({
  title,
  items,
  value,
  handleChange,
  "data-testid": dataTestId,
}: FilterRadioGroupProps) => {
  return (
    <div className="flex gap-x-3 flex-col gap-y-4 bg-gray-800/30 border border-green-400/20 p-4 font-mono">
      {/* Terminal header */}
      <div className="flex items-center gap-2 pb-2 border-b border-green-400/20">
        <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
        <Text className="text-sm font-bold text-green-400 uppercase tracking-wider">
          [{title}]
        </Text>
      </div>

      <RadioGroup data-testid={dataTestId} onValueChange={handleChange}>
        {items?.map((i, index) => (
          <div
            key={i.value}
            className={clx(
              "flex gap-x-3 items-center py-2 px-2 transition-all duration-200 hover:bg-gray-700/30 border border-transparent hover:border-green-400/20",
              {
                "bg-blue-400/10 border-blue-400/30": i.value === value,
              }
            )}
          >
            {/* Terminal prompt indicator */}
            <span className={clx(
              "text-xs transition-colors duration-200",
              {
                "text-blue-400": i.value === value,
                "text-green-400": i.value !== value,
              }
            )}>
              &gt;
            </span>

            {/* Active indicator */}
            {i.value === value && (
              <EllipseMiniSolid 
                className="text-blue-400 animate-pulse" 
              />
            )}
            
            <RadioGroup.Item
              checked={i.value === value}
              className="hidden peer"
              id={i.value}
              value={i.value}
            />
            
            <Label
              htmlFor={i.value}
              className={clx(
                "text-sm cursor-pointer transition-colors duration-200 uppercase tracking-wide flex-1",
                {
                  "text-blue-400 font-semibold": i.value === value,
                  "text-gray-300 hover:text-green-400": i.value !== value,
                }
              )}
              data-testid="radio-label"
              data-active={i.value === value}
            >
              {i.label}
            </Label>

            {/* Status LED */}
            <div className={clx(
              "w-2 h-2 rounded-full transition-all duration-200",
              {
                "bg-blue-400 animate-pulse": i.value === value,
                "bg-gray-600": i.value !== value,
              }
            )} />
          </div>
        ))}
      </RadioGroup>

      {/* Bottom status */}
      <div className="flex items-center justify-between pt-2 border-t border-green-400/20 text-xs text-gray-400">
        <span>OPTIONS: {items?.length || 0}</span>
        <span className="flex items-center gap-1">
          <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
          ACTIVE
        </span>
      </div>
    </div>
  )
}

export default FilterRadioGroup