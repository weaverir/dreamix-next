"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";

export default function TeacherProfile() {
  const [profile, setProfile] = useState<any>(null);

  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    phone_number: "",
    bio: "",
    expertise: "",
    website: "",
  });

  // Fetch teacher profile
  const fetchProfile = async () => {
    try {
      const res = await axiosInstance.get("/accounts/teacher/dashboard/");
      setProfile(res.data);

      // Reset form (placeholders only)
      setForm({
        first_name: "",
        last_name: "",
        phone_number: "",
        bio: "",
        expertise: "",
        website: "",
      });
    } catch (err) {
      toast.error("خطا در دریافت پروفایل مدرس");
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
      await axiosInstance.put("/accounts/teacher/dashboard/edit/", payload);
      toast.success("پروفایل با موفقیت بروزرسانی شد");
      fetchProfile();
    } catch (err) {
      toast.error("خطا در بروزرسانی پروفایل");
    }
  };

  if (!profile) {
    return (
      <div className="p-6 bg-white/60 dark:bg-black/40 rounded-xl border border-gray-300 dark:border-gray-700">
        <p className="dark:text-gray-300">در حال بارگذاری...</p>
      </div>
    );
  }

  const user = profile.user;
  const teacher = profile.teacher_profile;

  return (
    <div className="p-6 bg-white/60 dark:bg-black/40 backdrop-blur-md rounded-xl border border-gray-300 dark:border-gray-700">
      <h2 className="text-xl font-bold dark:text-white mb-4">پروفایل مدرس</h2>

      <div className="space-y-4 dark:text-gray-200">

        <input
          name="first_name"
          placeholder={user.first_name || "نام"}
          value={form.first_name}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <input
          name="last_name"
          placeholder={user.last_name || "نام خانوادگی"}
          value={form.last_name}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <input
          name="phone_number"
          placeholder={user.phone_number || "شماره تماس"}
          value={form.phone_number}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <input
          name="expertise"
          placeholder={teacher.expertise || "تخصص"}
          value={form.expertise}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <input
          name="website"
          placeholder={teacher.website || "وبسایت"}
          value={form.website}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30"
        />

        <textarea
          name="bio"
          placeholder={teacher.bio || "بیوگرافی"}
          value={form.bio}
          onChange={handleChange}
          className="w-full p-2 rounded-md bg-white/60 dark:bg-black/30 h-32"
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
