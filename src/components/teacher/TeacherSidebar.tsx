"use client";
import React from "react";
import { useTeacher } from "@/contexts/techersSideBar"; // ✅ fix path typo

export default function TeacherSidebar() {
  const { active, setActive } = useTeacher();

  return (
    <aside
      className="
        w-full md:w-64  rounded-lg mt-7
        h-auto md:h-full 
        bg-white/60 dark:bg-black/40 backdrop-blur-md 
        border-b md:border-r border-gray-300 dark:border-gray-700 
        p-4 flex flex-col md:gap-4 gap-2
      "
    >
      <h2 className="text-xl font-bold dark:text-white mb-4 text-center md:text-left">
        پنل مدرس
      </h2>

      <button
        onClick={() => setActive("profile")}
        className={`p-2 rounded-md transition ${
          active === "profile"
            ? "bg-red-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white"
        }`}
      >
        پروفایل
      </button>

      <button
        onClick={() => setActive("courses")}
        className={`p-2 rounded-md transition ${
          active === "courses"
            ? "bg-red-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white"
        }`}
      >
        دوره‌ها
      </button>

      <button
  onClick={() => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userType");
    window.location.href = "/";
  }}
  className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white transition"
>
  خروج
</button>

    </aside>
  );
}
