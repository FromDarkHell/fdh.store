import { HttpTypes } from "@medusajs/types"
import { Text } from "@medusajs/ui"

type LineItemOptionsProps = {
  variant: HttpTypes.StoreProductVariant | undefined
  "data-testid"?: string
  "data-value"?: HttpTypes.StoreProductVariant
}

const LineItemOptions = ({
  variant,
  "data-testid": dataTestid,
  "data-value": dataValue,
}: LineItemOptionsProps) => {
  return (
    <Text
      data-testid={dataTestid}
      data-value={dataValue}
      className="inline-block text-xs text-gray-400 w-full overflow-hidden text-ellipsis font-mono uppercase tracking-wide"
    >
      <span className="text-blue-400">&gt;</span> Variant: {variant?.title || "Standard"}
    </Text>
  )
}

export default LineItemOptions
