"use client";
import { useState } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";

type Props = {
  courseSlug: string;
  onSaved?: () => void;
};

export default function SessionCreateForm({ courseSlug, onSaved }: Props) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post(`/teacher/courses/${courseSlug}/sessions/create/`, {
        title,
      });
      toast.success("جلسه ساخته شد ✅");
      if (onSaved) onSaved();
    } catch {
      toast.error("خطا در ساخت جلسه ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="عنوان جلسه"
        className="p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        ذخیره جلسه
      </button>
    </form>
  );
}
