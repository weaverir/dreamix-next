"use client";
import TeacherSidebar from "./TeacherSidebar";
import TeacherProfile from "./TeacherProfile";
import TeacherCourses from "./TeacherCourses";
import { TeacherProvider, useTeacher } from "@/contexts/techersSideBar"; // ✅ fixed path

function TeacherContent() {
  const { active } = useTeacher();

  return (
    <main className="flex-1 p-4 sm:p-6">
      {active === "profile" && <TeacherProfile />}
      {active === "courses" && <TeacherCourses />}
    </main>
  );
}

export default function TeacherPanel() {
  return (
    <TeacherProvider>
      <div className="flex flex-col backdrop-blur-lg font-sans md:flex-row h-full px-10 mx-auto min-h-screen">
        <TeacherSidebar />
        <TeacherContent />
      </div>
    </TeacherProvider>
  );
}
