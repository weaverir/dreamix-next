"use client"
import React, { useState } from "react"
import Image from "next/image"
import { useSwipeable } from "react-swipeable"

const Images = [
  { id: 1, url: "/slider3.webp" },
  { id: 2, url: "/silder2.webp" },
  { id: 3, url: "/silder1.webp" },
  { id: 4, url: "/cat3.webp" },
  { id: 5, url: "/cat4.webp" },
]

const ImgOfSlug: React.FC = () => {
  const [index, setIndex] = useState<number>(0)
  const [fade, setFade] = useState<boolean>(false)

  const handleNext = () => {
    setFade(true)
    setTimeout(() => {
      setIndex((index + 1) % Images.length)
      setFade(false)
    }, 500)
  }

  const handlePrev = () => {
    setFade(true)
    setTimeout(() => {
      setIndex((index - 1 + Images.length) % Images.length)
      setFade(false)
    }, 500)
  }

  // ✅ Explicitly typed parameter
  const handleClick = (i: number) => {
    setFade(true)
    setTimeout(() => {
      setIndex(i)
      setFade(false)
    }, 500)
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventScrollOnSwipe: true, // ✅ correct property name
    trackMouse: true,
  })

  return (
    <div className="flex flex-col bg-gray-200/60 backdrop-blur-lg rounded-2xl p-3 dark:bg-black/10 gap-8">
      {/* Arrow buttons */}
      <button
        className="absolute z-20 lg:mt-7 font-awsome left-4 transition-colors ease-in duration-500 top-1/3 transform -translate-y-1/2 text-blue-500 hover:text-blue-900 text-5xl px-3 py-1 rounded-full"
        onClick={handlePrev}
      >
        
      </button>
      <button
        className="absolute lg:mt-7 z-20 right-4 transition-colors ease-in duration-500 font-awsome top-1/3 transform -translate-y-1/2 text-blue-500 hover:text-blue-900 text-5xl px-3 py-1 rounded-full"
        onClick={handleNext}
      >
        
      </button>

      {/* Big image */}
      <div
        className={`h-[500px] relative ${
          fade
            ? "opacity-0 transition-opacity duration-500"
            : "opacity-100 transition-opacity duration-500"
        }`}
        {...handlers}
      >
        <Image
          draggable="false"
          src={Images[index].url}
          alt={`Main image ${index + 1}`}
          fill
          sizes="50vw"
          className="absolute ring-2 ring-gray-400 object-cover rounded-md"
        />
      </div>

      {/* Thumbnails */}
      <div className="flex justify-between gap-4 mt-8">
        {Images.map((image, i) =>
          index !== i ? (
            <div
              key={image.id}
              className={`h-32 w-1/4 relative hover:scale-105 cursor-pointer transition-transform duration-500 transform ${
                fade ? "scale-95" : "scale-100"
              }`}
              onClick={() => handleClick(i)}
            >
              <Image
                draggable="false"
                src={image.url}
                alt={`Thumbnail ${i + 1}`}
                fill
                sizes="30vw"
                className="absolute ring-2 ring-gray-400 object-cover rounded-md cursor-pointer"
              />
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}

export default ImgOfSlug
