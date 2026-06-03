"use client";
import { useState, useEffect } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";

export default function CreateCourseForm({ editingSlug }: { editingSlug?: string }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    category: "",
    is_published: true,
    is_visible_on_root: true,
  });

  const [previous, setPrevious] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    category: "", // category ID or title
  });

  const [categories, setCategories] = useState<any[]>([]);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get("/categories/");
        setCategories(res.data);
      } catch {
        toast.error("خطا در دریافت دسته‌بندی‌ها");
      }
    };
    fetchCategories();
  }, []);

  // Load existing course data when editing
  useEffect(() => {
    if (!editingSlug) return;

    const fetchCourse = async () => {
      try {
        const res = await axiosInstance.get(`/teacher/courses/${editingSlug}/`);
        const data = res.data.course;

        setPrevious({
          title: data.title ?? "",
          description: data.description ?? "",
          price: data.price ? String(data.price) : "",
          duration: data.duration ? String(data.duration) : "",
          category: data.category ? String(data.category) : "",
        });

        setForm((prev) => ({
          ...prev,
          title: "",
          description: "",
          price: "",
          duration: "",
          category: "",
          is_published: Boolean(data.is_published),
          is_visible_on_root: Boolean(data.is_visible_on_root),
        }));
      } catch {
        toast.error("خطا در دریافت اطلاعات دوره");
      }
    };

    fetchCourse();
  }, [editingSlug]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      if (form.title.trim()) formData.append("title", form.title);
      if (form.description.trim()) formData.append("description", form.description);
      if (form.price.trim()) formData.append("price", form.price);
      if (form.duration.trim()) formData.append("duration", form.duration);

      // Send category ID
      if (form.category.trim()) formData.append("category", form.category);

      formData.append("is_published", String(form.is_published));
      formData.append("is_visible_on_root", String(form.is_visible_on_root));

      if (imageFile) formData.append("image", imageFile);

      let res;

      if (editingSlug) {
        res = await axiosInstance.put(
          `/teacher/courses/${editingSlug}/`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("دوره با موفقیت ویرایش شد");
      } else {
        res = await axiosInstance.post(
          "/teacher/courses/create/",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        toast.success("دوره با موفقیت ساخته شد");
      }

      console.log("Response:", res.data);
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "خطا در ذخیره دوره");
    }
  };

  return (
    <div className="p-6 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-xl shadow-md space-y-4 border border-gray-300 dark:border-gray-700">
      <h2 className="text-xl font-bold dark:text-white">
        {editingSlug ? "ویرایش دوره" : "ساخت دوره جدید"}
      </h2>

      <input
        name="title"
        value={editingSlug ? undefined : form.title}
        onChange={handleChange}
        placeholder={editingSlug ? previous.title : "عنوان دوره"}
        className="w-full p-3 rounded-md bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-gray-700 dark:text-white outline-none"
      />

      <textarea
        name="description"
        value={editingSlug ? undefined : form.description}
        onChange={handleChange}
        placeholder={editingSlug ? previous.description : "توضیحات دوره"}
        className="w-full p-3 rounded-md bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-gray-700 dark:text-white outline-none"
      />

      <input
        name="price"
        type="number"
        value={editingSlug ? undefined : form.price}
        onChange={handleChange}
        placeholder={editingSlug ? previous.price : "قیمت (تومان)"}
        className="w-full p-3 rounded-md bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-gray-700 dark:text-white outline-none"
      />

      <input
        name="duration"
        type="number"
        value={editingSlug ? undefined : form.duration}
        onChange={handleChange}
        placeholder={editingSlug ? previous.duration : "مدت زمان دوره (ساعت)"}
        className="w-full p-3 rounded-md bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-gray-700 dark:text-white outline-none"
      />

      {/* CATEGORY SELECT */}
      <select
        name="category"
        value={editingSlug ? "" : form.category}
        onChange={handleChange}
        className="w-full p-3 rounded-md bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-gray-700 dark:text-white outline-none"
      >
        <option value="">
          {editingSlug ? previous.category || "دسته‌بندی" : "دسته‌بندی"}
        </option>

        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>
            {cat.title}
          </option>
        ))}
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImageFile(e.target.files?.[0] || null)}
        className="w-full p-3 rounded-md bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-gray-700 dark:text-white outline-none"
      />

      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2 dark:text-white">
          <input
            type="checkbox"
            name="is_published"
            checked={form.is_published}
            onChange={handleChange}
          />
          انتشار دوره
        </label>

        <label className="flex items-center gap-2 dark:text-white">
          <input
            type="checkbox"
            name="is_visible_on_root"
            checked={form.is_visible_on_root}
            onChange={handleChange}
          />
          نمایش در صفحه اصلی
        </label>
      </div>

      <button
        onClick={handleSubmit}
        className="w-full py-3 rounded-md bg-red-500 hover:bg-red-600 text-white transition"
      >
        {editingSlug ? "ویرایش دوره" : "ساخت دوره"}
      </button>
    </div>
  );
}
