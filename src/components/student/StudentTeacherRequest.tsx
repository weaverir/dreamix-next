"use client";
import { useState } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";

export default function StudentTeacherRequest() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    expertise: "",
    bio: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // Validate required fields
    if (
      !form.first_name ||
      !form.last_name ||
      !form.expertise ||
      !form.bio
    ) {
      toast.error("لطفاً تمام فیلدهای ضروری را پر کنید");
      return;
    }

    try {
      await axiosInstance.post("/accounts/become/teacher/request/", form);
      toast.success("درخواست شما با موفقیت ارسال شد");
      setForm({
        first_name: "",
        last_name: "",
        expertise: "",
        bio: "",
      });
    } catch (err) {
      toast.error("خطا در ارسال درخواست");
    }
  };

  return (
    <div className="p-6 bg-white/70 dark:bg-black/40 rounded-xl border border-gray-300 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 dark:text-white">
        درخواست برای معلم شدن
      </h2>

      <div className="space-y-4">

        <input
          name="first_name"
          placeholder="نام"
          value={form.first_name}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <input
          name="last_name"
          placeholder="نام خانوادگی"
          value={form.last_name}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <input
          name="expertise"
          placeholder="تخصص (مثلاً: جاوااسکریپت، پایتون، طراحی UI)"
          value={form.expertise}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <textarea
          name="bio"
          placeholder="بیوگرافی کوتاه درباره تجربه و مهارت‌های شما"
          value={form.bio}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30 h-32"
        />

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          ارسال درخواست
        </button>
      </div>
    </div>
  );
}
