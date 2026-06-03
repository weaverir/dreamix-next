"use client";
import { createContext, useContext, useState } from "react";

interface AdminContextType {
  active: string;
  setActive: (key: string) => void;
}

const AdminContext = createContext<AdminContextType | null>(null);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState("sliders");

  return (
    <AdminContext.Provider value={{ active, setActive }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be used inside AdminProvider");
  return ctx;
}
