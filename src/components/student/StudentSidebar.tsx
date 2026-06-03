"use client";
import React from "react";
import { useStudent } from "@/contexts/studentSideBar";

export default function StudentSidebar() {
  const { active, setActive } = useStudent();

  return (
    <aside
      className="
        w-full md:w-64 rounded-lg mt-7
        max-h-min md:h-full
        bg-white/80 dark:bg-black/40 backdrop-blur-md
        border-b md:border-r border-gray-300 dark:border-gray-700
        p-4 flex flex-col md:gap-4 gap-2
      "
    >
      <h2 className="text-xl font-bold dark:text-white mb-4 text-center md:text-left">
        پنل دانشجو
      </h2>

      {/* Profile */}
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

      {/* Request to Become Teacher */}
      <button
        onClick={() => setActive("teacher_request")}
        className={`p-2 rounded-md transition ${
          active === "teacher_request"
            ? "bg-red-500 text-white"
            : "hover:bg-gray-200 dark:hover:bg-gray-800 dark:text-white"
        }`}
      >
        درخواست برای معلم شدن
      </button>

      {/* Exit */}
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
