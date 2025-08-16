import { deleteLineItem } from "@lib/data/cart"
import { Spinner, Trash } from "@medusajs/icons"
import { clx } from "@medusajs/ui"
import { useState } from "react"

const DeleteButton = ({
  id,
  children,
  className,
  buttonClassName,
}: {
  id: string
  children?: React.ReactNode
  className?: string
  buttonClassName?: string
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (id: string) => {
    setIsDeleting(true)
    await deleteLineItem(id).catch((err) => {
      setIsDeleting(false)
    })
  }

  return (
    <div
      className={clx(
        "flex items-center justify-between font-mono text-xs",
        className
      )}
    >
      <button
        className={clx(
          "flex gap-x-2 items-center cursor-pointer transition-all duration-200 px-3 py-1.5 border rounded-none uppercase tracking-wide font-mono text-xs",
          isDeleting 
            ? "text-yellow-400 border-yellow-400/50 bg-yellow-400/10" 
            : "text-red-400 border-red-400/30 hover:border-red-400/60 hover:bg-red-400/10 hover:text-red-300",
          buttonClassName
        )}
        onClick={() => handleDelete(id)}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <Spinner className="animate-spin w-4 h-4" color="currentColor" />
            <span>Removing...</span>
          </>
        ) : (
          <>
            <Trash color="currentColor" />
            <span>{children || "[Delete]"}</span>
          </>
        )}
      </button>
    </div>
  )
}

export default DeleteButton