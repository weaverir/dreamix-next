"use client";

import { useDarkMode } from "@/contexts/darkmode";

const DarkModeBody = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = useDarkMode(); // ✅ Now we can use context safely

  return <div className={darkMode ? "dark" : ""}>{children}</div>;
};

export default DarkModeBody;
