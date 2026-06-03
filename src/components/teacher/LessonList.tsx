"use client";
import { useState } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";

interface Lesson {
  id?: number;
  title: string;
  video?: string;
}

interface Props {
  courseSlug: string;
  sessionId: number;
  lessons: Lesson[];
}

export default function LessonList({ courseSlug, sessionId, lessons }: Props) {
  const [localLessons, setLocalLessons] = useState<Lesson[]>(lessons || []);
  const [open, setOpen] = useState(false);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState<Lesson | null>(null);
  const [title, setTitle] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // --- CREATE ---
  const handleAddLesson = async () => {
    if (!title || !videoFile) {
      toast.error("عنوان و ویدیو الزامی است");
      return;
    }
    try {
      setUploading(true);
      const formData = new FormData();
      formData.append("title", title);
      formData.append("video", videoFile);

      const res = await axiosInstance.post(
        `/teacher/courses/${courseSlug}/sessions/${sessionId}/lesson/create/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setLocalLessons((prev) => [...prev, res.data]);
      toast.success("درس با موفقیت اضافه شد");
      closeModal();
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "خطا در افزودن درس");
    } finally {
      setUploading(false);
    }
  };

  // --- UPDATE ---
  const handleUpdateLesson = async () => {
    if (!editingLesson) return;
    try {
      const formData = new FormData();
      formData.append("title", title);
      if (videoFile) {
        formData.append("video", videoFile); // ✅ allow video change
      }

      const res = await axiosInstance.put(
        `/teacher/courses/${courseSlug}/sessions/${sessionId}/lesson/${editingLesson.id}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setLocalLessons((prev) =>
        prev.map((l) => (l.id === editingLesson.id ? { ...l, ...res.data } : l))
      );
      toast.success("درس ویرایش شد");
      closeModal();
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "خطا در ویرایش درس");
    }
  };

  // --- DELETE ---
  const handleDeleteLesson = async (lessonId: number) => {
    try {
      await axiosInstance.delete(
        `/teacher/courses/${courseSlug}/sessions/${sessionId}/lesson/${lessonId}/`
      );
      setLocalLessons((prev) => prev.filter((l) => l.id !== lessonId));
      toast.success("درس حذف شد");
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "خطا در حذف درس");
    }
  };

  // --- Modal helpers ---
  const openAddModal = () => {
    setEditingLesson(null);
    setTitle("");
    setVideoFile(null);
    setShowModal(true);
  };

  const openEditModal = (lesson: Lesson) => {
    setEditingLesson(lesson);
    setTitle(lesson.title);
    setVideoFile(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingLesson(null);
    setTitle("");
    setVideoFile(null);
  };

  return (
    <div className="mt-3 p-3 rounded-md bg-gray-50 dark:bg-black/30">
      <button
        onClick={() => setOpen(!open)}
        className="flex justify-between w-full py-2 px-3 bg-gray-200 dark:bg-gray-700 rounded-md"
      >
        <span className="font-semibold dark:text-white">درس‌ها</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>

      {open && (
        <>
          {localLessons.length === 0 ? (
            <p className="text-sm dark:text-gray-300 mt-2">هیچ درسی یافت نشد.</p>
          ) : (
            <ul className="space-y-2 mt-2">
              {localLessons.map((lesson) => (
                <li
                  key={lesson.id}
                  className="p-2 rounded-md bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-gray-700 flex justify-between items-center"
                >
                  <span className="dark:text-white">{lesson.title}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(lesson)}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      ویرایش
                    </button>
                    <button
                      onClick={() => handleDeleteLesson(lesson.id!)}
                      className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      حذف
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}

          <div className="mt-3">
            <button
              onClick={openAddModal}
              className="w-full py-2 rounded-md bg-green-500 hover:bg-green-600 text-white transition"
            >
              + افزودن درس
            </button>
          </div>
        </>
      )}

      {/* ✅ Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-96">
            <h3 className="text-lg font-bold mb-4 dark:text-white">
              {editingLesson ? "ویرایش درس" : "افزودن درس"}
            </h3>

            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="عنوان درس"
              className="w-full p-2 rounded-md border dark:border-gray-700 dark:bg-black/40 dark:text-white mb-2"
            />

            <input
              type="file"
              accept="video/*"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              className="w-full p-2 rounded-md border dark:border-gray-700 dark:bg-black/40 dark:text-white mb-2"
            />

            {/* ✅ Preview current video when editing */}
            {editingLesson?.video && !videoFile && (
              <video
                src={`https://dreamix-back.liara.run${editingLesson.video}`}
                controls
                className="mt-2 w-full rounded-md"
              />
            )}

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={closeModal}
                className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                لغو
              </button>
              <button
                onClick={() =>
                  editingLesson ? handleUpdateLesson() : handleAddLesson()
                }
                disabled={uploading}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:opacity-50"
              >
                {uploading
                  ? "در حال آپلود..."
                  : editingLesson
                  ? "ذخیره تغییرات"
                  : "افزودن درس"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
