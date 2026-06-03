"use client";
import { useEffect, useState } from "react";
import StudentPanel from "@/components/student/StudentPanel";
import TeacherPanel from "@/components/teacher/TeacherPanel";
import AdminPanel from "@/components/admin/AdminPanel";

export default function SettingsPage() {
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    // ✅ Only read from localStorage, don't overwrite
    const savedType = localStorage.getItem("userType");
    setUserType(savedType);
  }, []);

  if (!userType) {
    return <div>Loading...</div>;
  }

  if (userType === "student") {
    return <StudentPanel />;
  }

  if (userType === "teacher") {
    return <TeacherPanel />;
  }

  if (userType === "admin") {
    return (
      <AdminPanel />
    );
  }

  return <div>Unknown role</div>;
}
