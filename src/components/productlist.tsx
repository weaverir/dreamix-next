"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";
import { useDarkMode } from "@/contexts/darkmode";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  description: string;
  image1: string;
  rating: number;
  totalSessions: number | null;
  duration: string;
  categoryTitle?: string | null;
}

/* ------------------------- SKELETON LOADING ------------------------- */

const ProductSkeleton: React.FC = () => {
  const { darkMode } = useDarkMode();
  const baseColor = darkMode ? "#2c2c2c" : "#e0e0e0";
  const highlightColor = darkMode ? "#3c3c3c" : "#f0f0f0";

  return (
    <div className="flex gap-6 overflow-x-auto px-4 py-4">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="shrink-0 w-[80%] sm:w-[45%] lg:w-[22%] bg-white dark:bg-black p-4 rounded-md shadow flex flex-col gap-4"
        >
          <div className="relative w-full h-60">
            <Skeleton
              className="absolute object-cover rounded-md"
              height="100%"
              width="100%"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
          <Skeleton width="80%" baseColor={baseColor} highlightColor={highlightColor} />
          <Skeleton count={2} width="90%" baseColor={baseColor} highlightColor={highlightColor} />
        </div>
      ))}
    </div>
  );
};

/* ------------------------- PRODUCT LIST (OVERFLOW CAROUSEL) ------------------------- */

const Productlist: React.FC<{ products: Product[] }> = ({ products }) => {
  const router = useRouter();

  return (
    <div className="relative font-sans w-full">
      {/* Horizontal scroll container */}
      <div
        className="
          flex gap-6 overflow-x-auto scroll-smooth px-4 py-4
          snap-x snap-mandatory
        "
        style={{ scrollbarWidth: "none" }}
      >
        {products.map((info) => (
          <div
            key={info.id}
            className="
              snap-start shrink-0
              w-[80%] sm:w-[45%] lg:w-[22%]
              bg-white dark:bg-black p-4 rounded-md shadow
              flex flex-col gap-4
            "
          >
            <Link href={`/courses/${info.slug}`} className="relative w-full h-60 block">
              <Image
                src={info.image1}
                alt={info.name}
                fill
                className="object-cover rounded-md"
              />
            </Link>

            <div className="flex justify-between">
              <span className="font-medium">{info.name}</span>
              <span className="font-semibold">{info.price}</span>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-300 line-clamp-3">
              {info.description}
            </p>

            <div className="text-xs text-gray-400 dark:text-gray-300">
              ⭐ {info.rating} | جلسات: {info.totalSessions ?? 0}
            </div>

            <button
              onClick={() => router.push(`/courses/${info.slug}`)}
              className="mt-auto rounded-xl ring-1 ring-red-400 py-2 px-4 text-xs hover:bg-red-400 transition"
            >
              مشاهده دوره
            </button>
          </div>
        ))}
      </div>

      {/* Optional fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-white dark:from-black to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-white dark:from-black to-transparent" />
    </div>
  );
};

/* ------------------------- MAIN CONTAINER ------------------------- */

const ProductContainer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dreamix-back.liara.run/");
        const data = await res.json();

        const mappedData: Product[] = data.results.map((item: any) => ({
          id: item.id,
          name: item.title,
          slug: item.slug,
          price: `${item.price.toLocaleString()} تومان`,
          description: item.description,
          image1: item.image,
          rating: item.rating,
          totalSessions: item.totalSessions,
          duration: item.duration,
          categoryTitle: item.Category?.title || null,
        }));

        setProductData(mappedData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return <>{loading ? <ProductSkeleton /> : <Productlist products={productData} />}</>;
};

export default ProductContainer;
