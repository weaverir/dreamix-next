"use client"
import { useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import axios from "axios"
import Filter from "./../../components/list/filter" // ⬅️ import your filter

interface Course {
  id: number
  title: string
  slug: string
  description: string
  price: number
  image: string
  rating: number
  totalSessions?: number
}

export default function ListPage() {
  const searchParams = useSearchParams()
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Course[]>([])

  // Convert searchParams → backend query string
  const buildBackendQuery = () => {
    const params = new URLSearchParams()

    // Pass all params directly to backend
    searchParams.forEach((value, key) => {
      if (value) params.append(key, value)
    })

    return params.toString()
  }

  // Fetch results whenever search params change
  useEffect(() => {
    const fetchResults = async () => {
      const query = buildBackendQuery()
      if (!query) return

      setLoading(true)
      try {
        const res = await axios.get(
          `https://dreamix-back.liara.run/search/?${query}`
        )
        setResults(res.data.results.courses || [])
      } catch (err) {
        console.error("Search error:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [searchParams])

  // When Filter updates → update URL params
  const handleFilterChange = (params: string) => {
    router.push(`/list?${params}`)
  }

  return (
    <div className="max-w-7xl font-sans mx-auto p-6">
      {/* 🔥 FILTER BAR */}
      <Filter onSearch={handleFilterChange} />

      <h1 className="text-xl font-bold mb-6 dark:text-white mt-10">
        نتایج جستجو
      </h1>

      {loading && <p className="text-gray-500">در حال بارگذاری...</p>}

      {results.length === 0 && !loading ? (
        <p className="text-gray-500">هیچ دوره‌ای یافت نشد.</p>
      ) : (
        <div
          className="
            grid gap-6
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
          "
        >
          {results.map((info) => (
            <div
              key={info.id}
              className="
                snap-start shrink-0
                w-full
                bg-white dark:text-gray-500 dark:bg-black p-4 rounded-md shadow
                flex flex-col gap-4
              "
            >
              {/* Course Image */}
              <Link href={`/courses/${info.slug}`} className="relative w-full h-60 block">
                <Image
                  src={info.image}
                  alt={info.title}
                  fill
                  className="object-cover rounded-md"
                />
              </Link>

              {/* Title + Price */}
              <div className="flex justify-between">
                <span className="font-medium">{info.title}</span>
                <span className="font-semibold">{info.price} تومان</span>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-3">
                {info.description}
              </p>

              {/* Rating + Sessions */}
              <div className="text-xs text-gray-400 dark:text-gray-300">
                ⭐ {info.rating ?? 0} | جلسات: {info.totalSessions ?? 0}
              </div>

              {/* Button */}
              <button
                onClick={() => router.push(`/courses/${info.slug}`)}
                className="mt-auto rounded-xl ring-1 ring-red-400 dark:text-white py-2 px-4 text-xs hover:bg-red-400 transition"
              >
                مشاهده دوره
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
