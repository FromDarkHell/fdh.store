"use client"

import repeat from "@lib/util/repeat"
import { HttpTypes } from "@medusajs/types"
import { Table, clx } from "@medusajs/ui"

import Item from "@modules/cart/components/item"
import SkeletonLineItem from "@modules/skeletons/components/skeleton-line-item"

type ItemsTemplateProps = {
  cart: HttpTypes.StoreCart
}

const ItemsPreviewTemplate = ({ cart }: ItemsTemplateProps) => {
  const items = cart.items
  const hasOverflow = items && items.length > 4
  const itemCount = items?.length || 0

  return (
    <div className="relative">
      {/* Background pattern for preview */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(0, 255, 127, 0.3) 1px, transparent 1px),
              linear-gradient(180deg, rgba(0, 255, 127, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>

      {/* Terminal-style preview header */}
      <div className="bg-gray-800/80 border-b border-green-400/30 px-3 py-2 mb-2 relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full "></div>
            <span className="text-xs font-mono text-green-400 uppercase tracking-wide">
              Preview Mode
            </span>
          </div>
          <span className="text-xs font-mono text-gray-400">
            {itemCount} item{itemCount !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* Scrollable content area */}
      <div
        className={clx(
          "relative z-10",
          {
            "pl-[1px] overflow-y-scroll overflow-x-hidden no-scrollbar max-h-[420px] scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-green-400/30":
              hasOverflow,
          }
        )}
      >
        {/* Custom scrollbar styling for webkit browsers */}
        <style jsx>{`
          div::-webkit-scrollbar {
            width: 4px;
          }
          div::-webkit-scrollbar-track {
            background: rgba(31, 41, 55, 0.5);
          }
          div::-webkit-scrollbar-thumb {
            background: rgba(0, 255, 127, 0.3);
            border-radius: 2px;
          }
          div::-webkit-scrollbar-thumb:hover {
            background: rgba(0, 255, 127, 0.5);
          }
        `}</style>

        <Table className="bg-transparent">
          <Table.Body data-testid="items-table">
            {items
              ? items
                  .sort((a, b) => {
                    return (a.created_at ?? "") > (b.created_at ?? "") ? -1 : 1
                  })
                  .map((item, index) => {
                    return (
                      <Table.Row 
                        key={item.id}
                        className="border-b border-green-400/10 hover:bg-gray-700/20 transition-all duration-200 font-mono group"
                      >
                        {/* Row number indicator */}
                        <Table.Cell className="w-8 text-xs text-gray-500 font-mono">
                          {String(index + 1).padStart(2, '0')}
                        </Table.Cell>
                        
                        <Item
                          key={item.id}
                          item={item}
                          type="preview"
                          currencyCode={cart.currency_code}
                        />
                        
                        {/* Status indicator */}
                        <Table.Cell className="w-8">
                          <div className="flex items-center justify-center">
                            <div className="w-2 h-2 bg-green-400 rounded-full opacity-50 group-hover:opacity-100 transition-opacity duration-200"></div>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    )
                  })
              : repeat(5).map((i) => {
                  return (
                    <Table.Row 
                      key={i}
                      className="border-b border-green-400/10 font-mono "
                    >
                      <Table.Cell className="w-8 text-xs text-gray-500 font-mono">
                        --
                      </Table.Cell>
                      <SkeletonLineItem key={i} />
                      <Table.Cell className="w-8">
                        <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      </Table.Cell>
                    </Table.Row>
                  )
                })}
          </Table.Body>
        </Table>

        {/* Loading state enhancement */}
        {!items && (
          <div className="absolute inset-0 bg-gray-800/50 flex items-center justify-center">
            <div className="text-center font-mono">
              <div className="text-green-400 text-sm uppercase tracking-wide ">
                Loading cart data...
              </div>
              <div className="text-xs text-gray-400 mt-1">
                <span className="text-blue-400">&gt;</span> Retrieving items from memory
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Terminal footer for preview */}
      {items && items.length > 0 && (
        <div className="bg-gray-800/50 border-t border-green-400/20 px-3 py-2 mt-2 relative z-10">
          <div className="flex items-center justify-between text-xs font-mono">
            <span className="text-gray-400">
              <span className="text-green-400">&gt;</span> Preview complete
            </span>
            {hasOverflow && (
              <span className="text-blue-400">
                Scroll for more items
              </span>
            )}
          </div>
        </div>
      )}

      {/* Empty state for preview */}
      {items && items.length === 0 && (
        <div className="text-center py-8 relative z-10">
          <div className="bg-gray-800/30 border border-green-400/20 p-6 font-mono">
            <div className="text-3xl text-gray-600 mb-2">∅</div>
            <div className="text-green-400 text-sm uppercase tracking-wide">
              [No Items]
            </div>
            <div className="text-gray-400 text-xs mt-1">
              <span className="text-blue-400">&gt;</span> Cart memory empty
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ItemsPreviewTemplate
