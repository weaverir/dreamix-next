"use client";
import { useAdmin } from "@/contexts/adminSideBar";

export default function AdminSidebar() {
  const { active, setActive } = useAdmin();

  const itemClass = (key: string) =>
    `cursor-pointer p-2 rounded-md ${
      active === key
        ? "bg-red-500 text-white"
        : "hover:bg-red-200 dark:hover:bg-red-900"
    }`;

  return (
    <div
      className="
        w-full md:w-64 
        bg-white/60 dark:bg-black/40 
        backdrop-blur-md 
        rounded-lg 
        p-4
      "
    >
      <h2 className="font-bold text-lg mb-4 dark:text-white">پنل مدیریت</h2>

      <ul className="space-y-2 text-sm dark:text-gray-300">
        <li
          className={itemClass("sliders")}
          onClick={() => setActive("sliders")}
        >
          اسلایدرها
        </li>

        <li
          className={itemClass("users")}
          onClick={() => setActive("users")}
        >
          کاربران
        </li>

        <li
          className={itemClass("categories")}
          onClick={() => setActive("categories")}
        >
          دسته‌بندی‌ها
        </li>

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
      </ul>
    </div>
  );
}
