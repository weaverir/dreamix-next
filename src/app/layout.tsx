"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Particle from "@/components/Particle";
import { DarkModeProvider, useDarkMode } from "@/contexts/darkmode";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { darkMode } = useDarkMode();

  return (
      <html lang="fa" className={darkMode ? "dark" : ""} dir="rtl">
      <body
          className={`${inter.className} ${
              darkMode ? "bg-gray-800" : "bg-stone-50"
          } scroll-smooth transition-colors ease-in duration-500`}
      >
      {/* Place Toaster at root level */}
      <Toaster position="top-center" reverseOrder={false} />

      {/* Background particles */}
      <div className="w-full absolute -z-10">
        <Particle />
      </div>

      <Navbar />
      {children}
      <Footer />
      </body>
      </html>
  );
}

export default function RootLayout({
                                     children,
                                   }: Readonly<{ children: React.ReactNode }>) {
  return (
      <DarkModeProvider>
        <Layout>{children}</Layout>
      </DarkModeProvider>
  );
}