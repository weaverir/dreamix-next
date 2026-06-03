"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";

interface Category {
  id: number;
  slug: string;
  title: string;
  image: string;
}

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Create form
  const [newTitle, setNewTitle] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  // Edit modal state
  const [editOpen, setEditOpen] = useState(false);
  const [editSlug, setEditSlug] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axiosInstance.get("/categories");
      setCategories(res.data);
    } catch {
      toast.error("خطا در دریافت دسته‌بندی‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

 
  const handleCreate = async () => {
    if (!newTitle.trim() || !newImageFile) {
      toast.error("عنوان و تصویر الزامی هستند");
      return;
    }

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("image", newImageFile);

    try {
      await axiosInstance.post("/categories/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("دسته‌بندی ایجاد شد");
      setNewTitle("");
      setNewImageFile(null);
      fetchCategories();
    } catch {
      toast.error("خطا در ایجاد دسته‌بندی");
    }
  };

  // OPEN EDIT MODAL
  const openEdit = (cat: Category) => {
    setEditSlug(cat.slug);
    setEditTitle(cat.title);
    setEditImageFile(null); // optional new file
    setEditOpen(true);
  };

  // SAVE EDIT (PUT multipart/form-data)
  const handleEdit = async () => {
    if (!editSlug) return;

    const formData = new FormData();
    formData.append("title", editTitle);

    if (editImageFile) {
      formData.append("image", editImageFile);
    }

    try {
      await axiosInstance.put(`/categories/${editSlug}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("دسته‌بندی ویرایش شد");
      setEditOpen(false);
      fetchCategories();
    } catch {
      toast.error("خطا در ویرایش دسته‌بندی");
    }
  };

  // DELETE CATEGORY
  const handleDelete = async (slug: string) => {
    try {
      await axiosInstance.delete(`/categories/${slug}/`);
      toast.success("دسته‌بندی حذف شد");
      fetchCategories();
    } catch {
      toast.error("خطا در حذف دسته‌بندی");
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 rounded-md shadow">
        <p className="dark:text-gray-300">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 bg-white dark:bg-gray-900 rounded-md shadow space-y-6">
        <h2 className="text-xl font-bold dark:text-white">📂 مدیریت دسته‌بندی‌ها</h2>

        {/* CREATE CATEGORY */}
        <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md space-y-3">
          <h3 className="font-bold dark:text-white">ایجاد دسته‌بندی جدید</h3>

          <input
            placeholder="عنوان دسته‌بندی"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full p-2 rounded-md bg-white dark:bg-black/40"
          />

          <input
            type="file"
            onChange={(e) => setNewImageFile(e.target.files?.[0] || null)}
            className="w-full p-2 rounded-md bg-white dark:bg-black/40"
          />

          <button
            onClick={handleCreate}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            ایجاد
          </button>
        </div>

        {/* CATEGORY LIST */}
        <ul className="space-y-4">
          {categories.map((cat) => (
            <li
              key={cat.slug}
              className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md"
            >
              <p className="font-bold dark:text-white">{cat.title}</p>

              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-32 object-cover rounded-md mt-2"
              />

              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => openEdit(cat)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                >
                  ویرایش
                </button>

                <button
                  onClick={() => handleDelete(cat.slug)}
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                >
                  حذف
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* EDIT MODAL */}
      {editOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-xl w-80 shadow-xl">
            <h2 className="text-lg font-bold mb-4 dark:text-white">ویرایش دسته‌بندی</h2>

            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white mb-3"
            />

            <input
              type="file"
              onChange={(e) => setEditImageFile(e.target.files?.[0] || null)}
              className="w-full p-2 rounded-md bg-gray-100 dark:bg-gray-800 dark:text-white mb-3"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setEditOpen(false)}
                className="px-3 py-1 bg-gray-400 text-white rounded-md"
              >
                لغو
              </button>

              <button
                onClick={handleEdit}
                className="px-3 py-1 bg-blue-500 text-white rounded-md"
              >
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
