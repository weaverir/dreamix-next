"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";

import CreateCourseForm from "./../admin/AdminCourses";
import SessionCreateForm from "./../teacher/SessionCreateForm";
import SessionList from "./../teacher/SessionList"; // NEW import

type Course = {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  duration: number;
  category: number;
  is_published: boolean;
  Session?: any[]; // optional sessions array
};

export default function TeacherCourses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [modalType, setModalType] = useState<"course" | "session">("course");

  const fetchCourses = async () => {
    try {
      const res = await axiosInstance.get("/teacher/courses/");
      setCourses(res.data);
    } catch (err: any) {
      toast.error("خطا در دریافت لیست دوره‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const openCreateCourseModal = () => {
    setEditingSlug(null);
    setModalType("course");
    setShowModal(true);
  };

  const openEditCourseModal = (slug: string) => {
    setEditingSlug(slug);
    setModalType("course");
    setShowModal(true);
  };

  const openCreateSessionModal = (slug: string) => {
    setEditingSlug(slug);
    setModalType("session");
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingSlug(null);
    setModalType("course");
  };

  return (
    <div className="relative">
      <div className="p-6 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-xl border border-gray-300 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold dark:text-white">دوره‌های مدرس</h2>

          <button
            onClick={openCreateCourseModal}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
          >
            + ساخت دوره
          </button>
        </div>

        {loading ? (
          <p className="dark:text-gray-300">در حال بارگذاری...</p>
        ) : courses.length === 0 ? (
          <p className="dark:text-gray-300">هیچ دوره‌ای یافت نشد.</p>
        ) : (
          <ul className="space-y-4">
            {courses.map((course) => (
              <li
                key={course.id}
                className="p-4 rounded-md bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-gray-700"
              >
                <h3 className="text-lg font-semibold dark:text-white">
                  {course.title}
                </h3>

                <p className="text-sm dark:text-gray-300">{course.description}</p>

                <div className="mt-2 flex items-center gap-4 text-sm dark:text-gray-400">
                  <span>💰 {course.price} تومان</span>
                  <span>⏱ {course.duration} ساعت</span>
                  <span>{course.is_published ? "✅ منتشر شده" : "❌ پیش‌نویس"}</span>
                </div>

                <div className="mt-4 flex gap-3">
                  <button
                    onClick={() => openEditCourseModal(course.slug)}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    ویرایش دوره
                  </button>

                  <button
                    onClick={() => openCreateSessionModal(course.slug)}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    ساخت جلسه
                  </button>
                </div>

                {/* NEW: show sessions inline */}
                {course.Session && (
                  <SessionList slug={course.slug} sessions={course.Session} />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={closeModal}
          />

          <div className="relative z-10 w-full max-w-lg p-6 bg-white/90 dark:bg-black/80 rounded-xl shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold dark:text-white">
                {modalType === "course"
                  ? editingSlug
                    ? "ویرایش دوره"
                    : "ساخت دوره جدید"
                  : "ساخت جلسه جدید"}
              </h3>

              <button
                onClick={closeModal}
                className="text-gray-600 dark:text-gray-300 hover:text-red-500"
              >
                ✕
              </button>
            </div>

            {modalType === "course" ? (
              //@ts-ignore
              <CreateCourseForm editingSlug={editingSlug || undefined} onSaved={fetchCourses} />
            ) : (
              <SessionCreateForm courseSlug={editingSlug!} onSaved={fetchCourses} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
