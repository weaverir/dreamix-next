"use client";
import StudentSidebar from "./StudentSidebar";
import StudentProfile from "./StudentProfile";
import { StudentProvider, useStudent } from "@/contexts/studentSideBar";
import StudentTeacherRequest from "./StudentTeacherRequest";

function StudentContent() {
  const { active } = useStudent();

  return (
    <div
      className="
        flex flex-col md:flex-row 
        gap-4 
        px-4 md:px-10 
        h-auto md:h-screen
      "
    >
      {/* Sidebar */}
      <div className="w-full md:w-auto">
        <StudentSidebar />
      </div>

      {/* Main Content */}
      <div
        className="
          flex-1 
          m-0 md:m-6 
          rounded-lg 
          p-4 md:p-6 
          bg-white/60 dark:bg-black/40 
          backdrop-blur-md
        "
      >
        {active === "profile" && <StudentProfile />}
{active === "teacher_request" && <StudentTeacherRequest />}      
</div>
    </div>
  );
}

export default function StudentPanel() {
  return (
    <StudentProvider>
      <StudentContent />
    </StudentProvider>
  );
}
