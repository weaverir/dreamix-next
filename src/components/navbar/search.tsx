"use client"
import React, { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import { useRouter } from "next/navigation"

interface Course {
  id: number
  title: string
  slug: string
  description: string
  price: number
  image: string
  duration: string
}

const SearchBar = () => {
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Course[]>([])
  const [showResults, setShowResults] = useState(false)

  const wrapperRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  // ✅ Debounce search
  useEffect(() => {
    if (!query) {
      setResults([])
      setShowResults(false)
      return
    }

    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await axios.get(
          `https://dreamix-back.liara.run/search/?search=${encodeURIComponent(query)}`
        )
        setResults(res.data.results.courses || [])
        setShowResults(true)
      } catch (err) {
        console.error("Search error:", err)
      } finally {
        setLoading(false)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [query])

  // ✅ Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setShowResults(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  // ✅ Handle search icon click → navigate to /list
  const handleIconClick = () => {
    if (query.trim()) {
      router.push(`/list?search=${encodeURIComponent(query)}`)
      setShowResults(false)
    }
  }

  return (
    <div ref={wrapperRef} className="flex  flex-col gap-3 flex-1 relative">
      {/* Search Input */}
      <form
        className="flex flex-row gap-3 flex-1 dark:bg-black bg-gray-200 p-2 rounded-md"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          className="flex-1 dark:text-text_w bg-transparent pr-5 font-sans outline-none"
          name="name"
          type="text"
          placeholder="جست و جو"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoComplete="off"
          onFocus={() => results.length > 0 && setShowResults(true)}
        />
        <button type="button" className="cursor-pointer" onClick={handleIconClick}>
          <Image src={"/MdiMagnify.png"} alt="search" width={20} height={20} />
        </button>
      </form>

      {loading && <span className="text-sm text-gray-500">در حال جستجو...</span>}

      {/* ✅ Results popup */}
      {showResults && results.length > 0 && (
        <ul className="absolute top-full mt-2 w-full bg-white dark:bg-gray-800 rounded-md shadow p-2 z-50">
          {results.map((course) => (
            <li
              key={course.id}
              className="flex items-center gap-3 p-2 border-b dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => setShowResults(false)}
            >
              <Link href={`/courses/${course.slug}`} className="flex items-center gap-3 w-full">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={50}
                  height={50}
                  className="rounded-md"
                />
                <div>
                  <p className="font-semibold dark:text-white">{course.title}</p>
                  <p className="text-sm dark:text-gray-300 line-clamp-1">{course.description}</p>
                  <p className="text-xs text-gray-500">💰 {course.price} تومان</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default SearchBar
