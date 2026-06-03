"use client";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/contexts/instance";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (accessToken && refreshToken) {
      axiosInstance
        .post("/accounts/api/token/verify/", { token: accessToken })
        .then(() => {
          router.push("/");
        })
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          localStorage.removeItem("userType");
        });
    }
  }, [router]);

  const handleLogin = async () => {
    try {
      const response = await axiosInstance.post("/accounts/login/", {
        phone_number: phoneNumber,
        password: password,
      });

      const { access, refresh, User_Type } = response.data;

      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("userType", User_Type);

      toast.success("ورود موفقیت‌آمیز بود 🎉");
      router.push("/");
    } catch (error: any) {
      toast.error(error.response?.data?.detail || "ورود ناموفق بود ❌");
    }
  };

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm dark:text-text_w">شماره تلفن</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="h-12 p-3 rounded-md bg-white/60 dark:bg-black/40 border border-gray-300 dark:border-gray-700 backdrop-blur-md dark:text-text_w outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm dark:text-text_w">رمز عبور</label>
          <div className="relative">
            <input
              type={showPass ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 w-full p-3 pr-10 rounded-md bg-white/60 dark:bg-black/40 border border-gray-300 dark:border-gray-700 backdrop-blur-md dark:text-text_w outline-none focus:ring-2 focus:ring-red-400 transition"
            />
            {/* ✅ Font Awesome icon instead of Image */}
            <i
              className={`font-awsome absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300 text-lg`}
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "" : ""}
            </i>
          </div>
        </div>
      </div>

      <button
        onClick={handleLogin}
        className="rounded-xl ring-1 ring-red-400 py-3 px-4 text-sm hover:bg-red-400 hover:text-white hover:dark:text-black transition-colors duration-500 w-full mt-6 backdrop-blur-md"
      >
        ورود
      </button>

      {/* ✅ Blue signup link */}
      <div className="text-center mt-4">
        <Link href="/signup" className="text-blue-500 hover:underline text-sm">
          ثبت نام نکرده اید ؟
        </Link>
      </div>
    </>
  );
}
