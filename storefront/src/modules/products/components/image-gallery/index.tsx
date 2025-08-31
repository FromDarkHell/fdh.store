"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "@medusajs/icons"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000) // Change image every 5 seconds

    return () => clearInterval(interval)
  }, [isAutoPlay, images.length])

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1)
    setIsAutoPlay(false) // Stop auto-play when user manually navigates
  }

  const goToNext = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1)
    setIsAutoPlay(false) // Stop auto-play when user manually navigates
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlay(false) // Stop auto-play when user manually navigates
  }

  if (!images || images.length === 0) {
    return (
      <div className="flex items-center justify-center aspect-[29/34] w-full bg-gray-800 border border-green-400/30">
        <span className="text-green-400 font-mono text-sm">[NO IMAGE DATA]</span>
      </div>
    )
  }

  return (
    <div className="flex items-start relative">
      <div className="flex flex-col flex-1 small:mx-16 gap-y-6">
        <div className="relative aspect-[29/34] w-full overflow-hidden bg-gray-900 border border-green-400/50 group">

          <div className="absolute top-0 left-0 right-0 bg-gray-900/95 border-b border-green-400/30 p-2 flex items-center justify-between z-20">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full"></div>
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
              <span className="text-xs text-gray-400 ml-2 font-mono">
                image_viewer.exe
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-green-400 font-mono">
                [{currentIndex + 1}/{images.length}]
              </span>
              <button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="text-xs text-blue-400 hover:text-green-400 font-mono border border-blue-400/30 hover:border-green-400/50 px-2 py-1 transition-colors duration-200"
              >
                {isAutoPlay ? '[AUTO]' : '[MANUAL]'}
              </button>
            </div>
          </div>

          <div className="relative w-full h-full mt-8">
            {images.map((image, index) => (
              <Container
                key={image.id}
                className={`absolute inset-0 transition-all duration-500 ease-in-out ${
                  index === currentIndex 
                    ? 'opacity-100 scale-100 z-10' 
                    : 'opacity-0 scale-95 z-0'
                }`}
                id={image.id}
              >
                {!!image.url && (
                  <>
                    <Image
                      src={image.url}
                      priority={index <= 2 ? true : false}
                      className="absolute inset-0 object-contain"
                      alt={`Product image ${index + 1}`}
                      fill
                      sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                    />
                  </>
                )}
              </Container>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-gray-900/80 border border-green-400/50 hover:border-blue-400/70 p-3 transition-all duration-200 hover:bg-gray-800/90 group/btn"
              >
                <ChevronLeft className="text-green-400 group-hover/btn:text-blue-400 transition-colors duration-200" />
              </button>

              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-gray-900/80 border border-green-400/50 hover:border-blue-400/70 p-3 transition-all duration-200 hover:bg-gray-800/90 group/btn"
              >
                <ChevronRight className="text-green-400 group-hover/btn:text-blue-400 transition-colors duration-200" />
              </button>
            </>
          )}

          <div className="absolute inset-0 pointer-events-none opacity-20">
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-green-400 to-transparent " style={{
              top: '30%',
              animationDuration: '3s',
              animationDelay: '0s'
            }}></div>
            <div className="absolute w-full h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent " style={{
              top: '70%',
              animationDuration: '4s',
              animationDelay: '1s'
            }}></div>
          </div>

          <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-green-400/50"></div>
          <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-green-400/50"></div>
          <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-green-400/50"></div>
          <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-green-400/50"></div>
        </div>

        {images.length > 1 && (
          <div className="space-y-4">
            <div className="flex justify-center items-center gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-8 h-1 transition-all duration-200 font-mono text-xs ${
                    index === currentIndex 
                      ? 'bg-green-400 shadow-lg shadow-green-400/50' 
                      : 'bg-gray-600 hover:bg-blue-400/50'
                  }`}
                  style={{
                    clipPath: index === currentIndex 
                      ? 'polygon(0 0, calc(100% - 4px) 0, 100% 100%, 4px 100%)' 
                      : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
                  }}
                />
              ))}
            </div>

            <div className="grid grid-cols-4 small:grid-cols-6 gap-2">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  className={`relative aspect-square overflow-hidden border transition-all duration-200 ${
                    index === currentIndex 
                      ? 'border-green-400 ring-2 ring-green-400/50' 
                      : 'border-gray-600 hover:border-blue-400/50'
                  }`}
                >
                  {!!image.url && (
                    <>
                      <Image
                        src={image.url}
                        alt={`Thumbnail ${index + 1}`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 60px, 80px"
                      />

                      <div className="absolute inset-0 bg-gray-900/20"></div>

                      {index === currentIndex && (
                        <div className="absolute top-1 right-1 w-2 h-2 bg-green-400 rounded-full "></div>
                      )}
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ImageGallery