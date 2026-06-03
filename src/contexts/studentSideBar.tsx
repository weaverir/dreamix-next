"use client";
import { createContext, useContext, useState } from "react";

const StudentContext = createContext<any>(null);

export function StudentProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("profile");

  return (
    <StudentContext.Provider value={{ active, setActive }}>
      {children}
    </StudentContext.Provider>
  );
}

export const useStudent = () => useContext(StudentContext);
