"use client";
import { createContext, useContext, useState, ReactNode } from "react";

type TeacherContextType = {
  active: string;
  setActive: (value: string) => void;
};

const TeacherContext = createContext<TeacherContextType | undefined>(undefined);

export function TeacherProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("profile");

  // ✅ must return JSX, not {}
  return (
    <TeacherContext.Provider value={{ active, setActive }}>
      {children}
    </TeacherContext.Provider>
  );
}

export function useTeacher() {
  const ctx = useContext(TeacherContext);
  if (!ctx) throw new Error("useTeacher must be used inside TeacherProvider");
  return ctx;
}
