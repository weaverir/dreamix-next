"use client";
import AdminSidebar from "./AdminSidebar";
import { AdminProvider, useAdmin } from "@/contexts/adminSideBar";
import AdminSliders from "./AdminSliders";
import AdminUsers from "./AdminUsers";
import AdminCourses from "./AdminCourses";
import AdminCategories from "./AdminCategories";

function AdminContent() {
  const { active } = useAdmin();

  return (
    <div
      className="
        flex flex-col  font-sans  md:flex-row 
        gap-4 
        px-4 md:px-10 
        h-auto md:h-screen
      "
    >
      {/* Sidebar */}
      <div className="w-full mt-6 md:w-auto">
        <AdminSidebar />
      </div>

      {/* Main Content */}
      <div
        className="
          flex-1 
          m-0 md:m-6 
          rounded-lg 
          p-4 md:p-6 
          bg-white/60 dark:bg-black/40 
          backdrop-blur-md
        "
      >
        {active === "sliders" && <AdminSliders />}
        {active === "users" && <AdminUsers />}
        {active === "courses" && <AdminCourses />}
        {active === "categories" && <AdminCategories />}
      </div>
    </div>
  );
}

export default function AdminPanel() {
  return (
    <AdminProvider>
      <AdminContent />
    </AdminProvider>
  );
}
