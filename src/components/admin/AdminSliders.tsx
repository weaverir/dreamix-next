"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";

interface Slide {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string | null;
}

export default function AdminSliders() {
  const [sliders, setSliders] = useState<Slide[]>([]);
  const [loading, setLoading] = useState(true);

  // Create form
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState<File | null>(null);

  // Edit form
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editUrl, setEditUrl] = useState("");
  const [editImageFile, setEditImageFile] = useState<File | null>(null);

  // Fetch sliders
  const fetchSliders = async () => {
    try {
      const res = await axiosInstance.get("/sliders/");
      setSliders(res.data);
    } catch {
      toast.error("خطا در دریافت اسلایدرها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSliders();
  }, []);

  // Create slider (multipart/form-data)
  const handleCreate = async () => {
    if (
      !newTitle.trim() ||
      !newDescription.trim() ||
      !newUrl.trim() ||
      !newImageFile
    ) {
      toast.error("تمام فیلدها الزامی هستند");
      return;
    }

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("description", newDescription);
    formData.append("url", newUrl);
    formData.append("image", newImageFile);

    try {
      await axiosInstance.post("/sliders/create/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("اسلایدر ایجاد شد");
      setNewTitle("");
      setNewDescription("");
      setNewUrl("");
      setNewImageFile(null);
      fetchSliders();
    } catch {
      toast.error("خطا در ایجاد اسلایدر");
    }
  };

  // Start editing
  const startEdit = (slide: Slide) => {
    setEditingId(slide.id);
    setEditTitle(slide.title);
    setEditDescription(slide.description);
    setEditUrl(slide.url);
    setEditImageFile(null); // new image optional
  };

  // Submit edit (PUT multipart/form-data)
  const handleEdit = async () => {
    if (!editingId) return;

    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("description", editDescription);
    formData.append("url", editUrl);

    if (editImageFile) {
      formData.append("image", editImageFile);
    }

    try {
      await axiosInstance.put(`/sliders/${editingId}/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("اسلایدر ویرایش شد");
      setEditingId(null);
      fetchSliders();
    } catch {
      toast.error("خطا در ویرایش اسلایدر");
    }
  };

  // Delete slider
  const handleDelete = async (id: number) => {
    try {
      await axiosInstance.delete(`/sliders/${id}/`);
      toast.success("اسلایدر حذف شد");
      fetchSliders();
    } catch {
      toast.error("خطا در حذف اسلایدر");
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
    <div className="p-6 bg-white dark:bg-gray-900 rounded-md shadow space-y-6">
      <h2 className="text-xl font-bold mb-4">🖼 مدیریت اسلایدرها</h2>

      {/* CREATE SLIDER */}
      <div className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md space-y-3">
        <h3 className="font-bold dark:text-white">ایجاد اسلایدر جدید</h3>

        <input
          placeholder="عنوان"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="w-full p-2 rounded-md bg-white dark:bg-black/40"
        />

        <input
          placeholder="توضیحات"
          value={newDescription}
          onChange={(e) => setNewDescription(e.target.value)}
          className="w-full p-2 rounded-md bg-white dark:bg-black/40"
        />

        <input
          placeholder="لینک"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
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
          ایجاد اسلایدر
        </button>
      </div>

      {/* LIST OF SLIDERS */}
      <ul className="space-y-4">
        {sliders.map((slide) => (
          <li
            key={slide.id}
            className="p-4 bg-gray-100 dark:bg-gray-800 rounded-md"
          >
            {editingId === slide.id ? (
              <>
                {/* EDIT MODE */}
                <input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full p-2 rounded-md mb-2"
                />

                <input
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full p-2 rounded-md mb-2"
                />

                <input
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  className="w-full p-2 rounded-md mb-2"
                />

                <input
                  type="file"
                  onChange={(e) =>
                    setEditImageFile(e.target.files?.[0] || null)
                  }
                  className="w-full p-2 rounded-md mb-2"
                />

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleEdit}
                    className="px-3 py-1 bg-blue-500 text-white rounded-md"
                  >
                    ذخیره
                  </button>

                  <button
                    onClick={() => setEditingId(null)}
                    className="px-3 py-1 bg-gray-400 text-white rounded-md"
                  >
                    لغو
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* VIEW MODE */}
                <p className="font-bold dark:text-white">{slide.title}</p>
                <p className="text-sm dark:text-gray-300">
                  {slide.description}
                </p>

                <img
                  src={slide.image || "/placeholder.jpg"}
                  alt={slide.title}
                  className="w-full h-40 object-cover rounded-md mt-2"
                />

                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => startEdit(slide)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded-md"
                  >
                    ویرایش
                  </button>

                  <button
                    onClick={() => handleDelete(slide.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded-md"
                  >
                    حذف
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
