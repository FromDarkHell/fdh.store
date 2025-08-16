import { clx } from "@medusajs/ui"

const Divider = ({ className }: { className?: string }) => (
  <div
    className={clx(
      "h-px w-full bg-gradient-to-r from-transparent via-green-400/50 to-transparent mt-1",
      className
    )}
  />
)

export default Divider