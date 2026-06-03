"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/contexts/instance";
import { useSearchParams, useRouter } from "next/navigation";

interface FilterProps {
  onSearch?: (params: string) => void; // optional, so no TS error
}

const Filter = ({ onSearch }: FilterProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [categories, setCategories] = useState<any[]>([]);
  const [filters, setFilters] = useState({
    price_min: "",
    price_max: "",
    category: "",
    ordering: "",
  });

  // Load filters from URL on first render
  useEffect(() => {
    setFilters({
      price_min: searchParams.get("price_min") || "",
      price_max: searchParams.get("price_max") || "",
      category: searchParams.get("category") || "",
      ordering: searchParams.get("ordering") || "",
    });
  }, []);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories/");
        setCategories(res.data);
      } catch (err) {
        console.log("Error fetching categories");
      }
    };
    fetchCategories();
  }, []);

  // Update filter state + merge URL params
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFilters((prev) => {
      const updated = { ...prev, [name]: value };

      // Merge with existing params
      const params = new URLSearchParams(window.location.search);

      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }

      // KEEP ALL OTHER PARAMS (like name=...)
      const finalParams = params.toString();

      router.push(`/list?${finalParams}`);

      // If parent wants to listen
      if (onSearch) onSearch(finalParams);

      return updated;
    });
  };

  return (
    <div
      className="
        flex flex-col md:flex-row justify-between 
        font-sans pt-12 dark:text-text_w 
        px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 
        gap-4 md:gap-0
      "
    >
      {/* LEFT SIDE FILTERS */}
      <div className="flex gap-4 flex-wrap">

        {/* Min Price */}
        <input
          type="text"
          name="price_min"
          value={filters.price_min}
          placeholder="کمترین رقم"
          onChange={handleChange}
          className="
            text-xs rounded-2xl dark:bg-black px-2 outline-none 
            font-sans_m text-black w-24 ring-1 ring-gray-400 dark:text-text_w
          "
        />

        {/* Max Price */}
        <input
          type="text"
          name="price_max"
          value={filters.price_max}
          placeholder="بیشترین رقم"
          onChange={handleChange}
          className="
            text-xs rounded-2xl dark:bg-black px-2 outline-none 
            font-sans_m text-black w-24 ring-1 ring-gray-400 dark:text-text_w
          "
        />

        {/* Category */}
        <select
          name="category"
          value={filters.category}
          onChange={handleChange}
          className="
            py-2 px-4 rounded-2xl dark:bg-black text-xs 
            font-sans_m font-medium bg-[#ebeded] outline-none
          "
        >
          <option value="">دسته بندی</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.title}
            </option>
          ))}
        </select>
      </div>

      {/* RIGHT SIDE SORTING */}
      <div>
        <select
          name="ordering"
          value={filters.ordering}
          onChange={handleChange}
          className="
            py-2 px-4 rounded-2xl dark:bg-black text-xs 
            font-sans_m font-medium bg-[#ebeded] outline-none
          "
        >
          <option value="">مرتب سازی</option>
          <option value="-price">کمترین قیمت</option>
          <option value="price">بیشترین قیمت</option>
          <option value="-created_at">جدیدترین</option>
          <option value="created_at">قدیمی ترین</option>
        </select>
      </div>
    </div>
  );
};

export default Filter;
