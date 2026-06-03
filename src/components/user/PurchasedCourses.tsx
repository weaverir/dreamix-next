// components/PurchasedCourses.tsx
"use client";
import React from "react";

export default function PurchasedCourses() {
  const courses = [
    { id: "1", title: "React Basics", thumbnail: "/react.png" },
    { id: "2", title: "Next.js Advanced", thumbnail: "/next.png" },
  ];

  return (
    <div className="font-sans p-6 bg-stone-50 dark:bg-gray-800 rounded-md shadow">
      <h2 className="text-xl font-bold mb-4">📚 Purchased Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {courses.map((course) => (
          <div
            key={course.id}
            className="flex items-center gap-4 p-3 rounded-md bg-white dark:bg-gray-900 shadow hover:shadow-md transition"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-16 h-16 rounded object-cover"
            />
            <span className="font-medium">{course.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
