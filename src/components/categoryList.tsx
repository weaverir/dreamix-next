"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

interface Category {
  id: number;
  title: string;
  slug: string;
  image?: string | null;
  created_date_jalali: string;
  updated_date_jalali: string;
}

const BASE_URL = "https://dreamix-back.liara.run";

function getFullUrl(path?: string | null) {
  if (!path) return "/stu.png"; // fallback image
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

const CategorySkeleton: React.FC = () => (
  <div className="px-4">
    <div className="flex overflow-x-auto scrollbar-hide overflow-y-hidden gap-4 h-max md:gap-8">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="flex-shrink-0 rounded-md h-max w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
        >
          <div className="relative w-full h-96">
            <Skeleton height="100%" width="100%" />
          </div>
          <Skeleton className="mt-8 font-sans_m font-light text-xl" width="25%" />
        </div>
      ))}
    </div>
  </div>
);

const CategoryList: React.FC<{ categories: Category[] }> = ({ categories }) => (
  <div className="px-4">
    <div className="flex overflow-x-auto scrollbar-hide overflow-y-hidden gap-4 h-max md:gap-8">
      {categories.map((category) => (
        <Link
          key={category.id}
          draggable="false"
          href={`/list?category=${category.id}`}   // ✅ FINAL LINK
          className="flex-shrink-0 rounded-md h-max w-full sm:w-1/2 lg:w-1/4 xl:w-1/6"
        >
          <div className="relative w-full h-96">
            <Image
              draggable="false"
              src={getFullUrl(category.image)}
              alt={category.title}
              fill
              sizes="20vw"
              className="rounded-md absolute object-cover"
            />
          </div>
          <h1 className="mt-8 dark:text-text_w transition-colors ease-in duration-500 font-sans_m font-light text-xl">
            {category.title}
          </h1>
        </Link>
      ))}
    </div>
  </div>
);

const CategoryContainer: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<Category[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch(`${BASE_URL}/categories/`);
        if (!res.ok) throw new Error("Failed to fetch categories");
        const data = await res.json();
        setCategoryData(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("دسته‌بندی‌ها در دسترس نیستند.");
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) return <CategorySkeleton />;
  if (error) return <div className="px-4 text-sm text-red-500">{error}</div>;

  return <CategoryList categories={categoryData} />;
};

export default CategoryContainer;
