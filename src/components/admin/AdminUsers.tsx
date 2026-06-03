"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";

export default function AdminUsers() {
  const [requests, setRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const res = await axiosInstance.get("/accounts/admin/teacher/request/");
      setRequests(res.data);
    } catch (err) {
      toast.error("خطا در دریافت درخواست‌ها");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // FIXED HERE ↓↓↓
  const handleVerify = async (id: number, action: "approve" | "reject") => {
    try {
      await axiosInstance.post(
        `/accounts/admin/teacher/${id}/verify/`,
        { action }
      );

      toast.success(
        action === "approve"
          ? "درخواست با موفقیت تایید شد"
          : "درخواست رد شد"
      );

      fetchRequests();
    } catch (err) {
      toast.error("خطا در پردازش درخواست");
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-white dark:bg-gray-900 rounded-md shadow">
        <p className="text-gray-500 dark:text-gray-300">در حال بارگذاری...</p>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-md shadow">
      <h2 className="text-xl font-bold mb-4">👥 درخواست‌های معلم شدن</h2>

      {requests.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">
          هیچ درخواستی وجود ندارد.
        </p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req: any) => (
            <li
              key={req.id}
              className="p-4 rounded-md bg-gray-100 dark:bg-gray-800"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold dark:text-white">
                    {req.user.first_name} {req.user.last_name}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    شماره: {req.user.phone_number}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    تخصص: {req.expertise}
                  </p>
                </div>

                <div className="flex gap-2">
                  {/* FIXED HERE ↓↓↓ */}
                  <button
                    onClick={() => handleVerify(req.id, "approve")}
                    className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    تایید
                  </button>

                  <button
                    onClick={() => handleVerify(req.id, "reject")}
                    className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
                  >
                    رد
                  </button>
                </div>
              </div>

              <p className="mt-3 text-sm dark:text-gray-300">
                <strong>بیو:</strong> {req.bio}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
