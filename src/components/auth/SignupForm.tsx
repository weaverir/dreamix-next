"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import api from "@/contexts/axios";

export default function SignupForm() {
  const [showPass, setShowPass] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [step, setStep] = useState<"signup" | "verify">("signup");

  const [form, setForm] = useState({
    phone_number: "",
    password: "",
    password_repeat: "",
    otp: "",
  });

  const [otpDigits, setOtpDigits] = useState(["", "", "", ""]);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      await api.post("/accounts/signup/", {
        phone_number: form.phone_number,
        password: form.password,
      });
      setStep("verify");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast.error("ثبت نام ناموفق بود ❌");
    }
  };

  const handleVerify = async () => {
    const otp = otpDigits.join("");
    try {
      await api.post("/accounts/signup/verify/", {
        phone_number: form.phone_number,
        password: form.password,
        otp,
      });

      toast.success("ثبت نام با موفقیت انجام شد 🎉");
      router.push("/login");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      toast.error("کد تایید نامعتبر است ❌");
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/^\d?$/.test(value)) {
      const newDigits = [...otpDigits];
      newDigits[index] = value;
      setOtpDigits(newDigits);
      if (value && index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpDigits[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`)?.focus();
    }
    if (e.key === "ArrowLeft" && index > 0) document.getElementById(`otp-${index - 1}`)?.focus();
    if (e.key === "ArrowRight" && index < 3) document.getElementById(`otp-${index + 1}`)?.focus();
  };

  return (
    <div className="relative">
      {/* Signup form always visible */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label className="text-sm dark:text-text_w">شماره موبایل</label>
          <input
            name="phone_number"
            value={form.phone_number}
            onChange={handleChange}
            placeholder="09xxxxxxxxx"
            dir="ltr"                  // ✅ ensure numbers start from left
            inputMode="numeric"        // ✅ numeric keypad on mobile
            className="h-12 p-3 rounded-md bg-white/60 dark:bg-black/40 border backdrop-blur-md dark:text-text_w outline-none focus:ring-2 focus:ring-red-400 transition"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm dark:text-text_w">رمز عبور</label>
          <div className="relative">
            <input
              name="password"
              type={showPass ? "text" : "password"}
              value={form.password}
              onChange={handleChange}
              className="h-12 w-full p-3 pr-10 rounded-md bg-white/60 dark:bg-black/40 border backdrop-blur-md dark:text-text_w outline-none focus:ring-2 focus:ring-red-400 transition"
            />
            <i
              className="font-awsome absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300 text-lg"
              onClick={() => setShowPass(!showPass)}
            >
              {showPass ? "" : ""}
            </i>
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm dark:text-text_w">تکرار رمز عبور</label>
          <div className="relative">
            <input
              name="password_repeat"
              type={showRepeat ? "text" : "password"}
              value={form.password_repeat}
              onChange={handleChange}
              className="h-12 w-full p-3 pr-10 rounded-md bg-white/60 dark:bg-black/40 border backdrop-blur-md dark:text-text_w outline-none focus:ring-2 focus:ring-red-400 transition"
            />
            <i
              className="font-awsome absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600 dark:text-gray-300 text-lg"
              onClick={() => setShowRepeat(!showRepeat)}
            >
              {showRepeat ? "" : ""}
            </i>
          </div>
        </div>
      </div>

      <button
        onClick={handleSignup}
        className="rounded-xl ring-1 ring-red-400 py-3 px-4 text-sm hover:bg-red-400 hover:text-white hover:dark:text-black transition-colors duration-500 w-full mt-6 backdrop-blur-md"
      >
        ایجاد حساب
      </button>

      <div className="text-center mt-4">
        <Link href="/login" className="text-blue-500 hover:underline text-sm">
          از اینجا وارد شوید
        </Link>
      </div>

      {/* Verify modal overlay */}
      {step === "verify" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-6 w-80 flex flex-col gap-4">
            <h2 className="text-lg font-bold text-center dark:text-white">
              کد تایید را وارد کنید
            </h2>

            {/* Ensure left-to-right order for digits */}
            <div dir="ltr" className="flex justify-center gap-3">
              {otpDigits.map((digit, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => handleOtpKeyDown(i, e)}
                  dir="ltr"                 // ✅ keep digit from left
                  inputMode="numeric"       // ✅ mobile numeric keypad
                  pattern="[0-9]*"
                  autoFocus={i === 0}       // ✅ start at first box
                  className="w-12 h-12 text-center text-xl rounded-md border dark:bg-black/40 dark:text-white focus:ring-2 focus:ring-red-400 outline-none"
                />
              ))}
            </div>

            <button
              onClick={handleVerify}
              className="rounded-xl ring-1 ring-red-400 py-3 px-4 text-sm hover:bg-red-400 hover:text-white transition-colors duration-500 w-full mt-4"
            >
              تایید کد
            </button>

            <button
              onClick={() => setStep("signup")}
              className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mt-2"
            >
              بازگشت
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
