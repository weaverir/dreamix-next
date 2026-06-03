"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";

export default function StudentProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: ""
  });

  // Fetch profile
  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/accounts/dashboard/");
      setProfile(res.data);

      // Pre-fill form placeholders (not values)
      setForm({
        first_name: "",
        last_name: "",
        email: "",
        phone_number: ""
      });
    } catch (err) {
      toast.error("خطا در دریافت پروفایل");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  // Handle input changes
  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit only non-empty fields
  const handleSubmit = async () => {
    const payload: any = {};

    Object.keys(form).forEach((key) => {
      if (form[key as keyof typeof form] !== "") {
        payload[key] = form[key as keyof typeof form];
      }
    });

    if (Object.keys(payload).length === 0) {
      toast.error("هیچ تغییری اعمال نشده");
      return;
    }

    try {
      await axiosInstance.put("/accounts/dashboard/edit/", payload);
      toast.success("پروفایل با موفقیت بروزرسانی شد");
      fetchProfile();
    } catch (err) {
      toast.error("خطا در بروزرسانی پروفایل");
    }
  };

  if (!profile) {
    return <p className="dark:text-gray-300">در حال بارگذاری...</p>;
  }

  return (
    <div className="p-6 bg-white/70 dark:bg-black/40 rounded-xl border border-gray-300 dark:border-gray-700">
      <h2 className="text-xl font-bold mb-4 dark:text-white">پروفایل دانشجو</h2>

      <div className="space-y-4 dark:text-gray-200">

        <input
          name="first_name"
          placeholder={profile.first_name || "نام"}
          value={form.first_name}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <input
          name="last_name"
          placeholder={profile.last_name || "نام خانوادگی"}
          value={form.last_name}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <input
          name="email"
          placeholder={profile.email || "ایمیل"}
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <input
          name="phone_number"
          placeholder={profile.phone_number || "شماره تماس"}
          value={form.phone_number}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          ذخیره تغییرات
        </button>
      </div>
    </div>
  );
}
