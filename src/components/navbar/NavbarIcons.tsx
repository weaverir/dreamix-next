"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CartModal from "./cartModal";
import { useDarkMode } from "@/contexts/darkmode";

const NavbarIcons: React.FC = () => {
  const route = useRouter();
  const [profileIsOpen, setProfileIsOpen] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const [notificationIsOpen, setNotificationIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { darkMode, toggleDarkMode } = useDarkMode();

  const profileDivRef = useRef<HTMLDivElement>(null);
  const profileIconRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const cartRef = useRef<HTMLDivElement>(null);

  // ✅ Check tokens in localStorage
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const loggedIn = !!accessToken && !!refreshToken;
    setIsLoggedIn(loggedIn);
  }, []);

  // Hover animation
  useEffect(() => {
    const handleMouseEnter = (element: HTMLElement) => {
      gsap.to(element, { scale: 1.2, duration: 0.2, ease: "power1.inOut" });
    };

    const handleMouseLeave = (element: HTMLElement) => {
      gsap.to(element, { scale: 1, duration: 0.2, ease: "power1.inOut" });
    };

    const addHoverEffect = (element: HTMLElement | null) => {
      if (element) {
        const onEnter = () => handleMouseEnter(element);
        const onLeave = () => handleMouseLeave(element);

        element.addEventListener("mouseenter", onEnter);
        element.addEventListener("mouseleave", onLeave);

        return () => {
          element.removeEventListener("mouseenter", onEnter);
          element.removeEventListener("mouseleave", onLeave);
        };
      }
      return () => {};
    };

    const cleanups = [
      addHoverEffect(profileIconRef.current),
      addHoverEffect(notificationRef.current),
      addHoverEffect(cartRef.current),
    ];

    return () => {
      cleanups.forEach((cleanup) => cleanup());
    };
  }, []);

  // Animate dropdown
  useEffect(() => {
    if (profileDivRef.current) {
      gsap.to(profileDivRef.current, {
        duration: 0.5,
        y: profileIsOpen ? 0 : -20,
        opacity: profileIsOpen ? 1 : 0,
        display: profileIsOpen ? "block" : "none",
        ease: "power3.inOut",
      });
    }
  }, [profileIsOpen]);

  const handleProfile = () => {
    if (!isLoggedIn) {
      route.push("/login");
    } else {
      setProfileIsOpen((prev) => !prev);
    }
  };

  return (
    <div draggable="false" className="flex justify-between relative items-center gap-4 xl:gap-6">
      {/* Dark Mode Toggle */}
      <i
        className="font-awsome select-none text-gray-500 cursor-pointer text-xl"
        onClick={toggleDarkMode}
      >
        {darkMode ? "" : ""}
      </i>

      {/* Cart Icon */}
      <div draggable="false" className="relative" ref={cartRef}>
        <div className="absolute -top-2 font-sans rounded-full bg-red-500 text-white w-4 h-4 flex justify-center items-center -right-2 text-sm z-10">
          2
        </div>
        <i
          className="font-awsome select-none text-gray-500 cursor-pointer text-xl"
          onClick={() => setCartIsOpen((prev) => !prev)}
        >
          
        </i>
      </div>
      {cartIsOpen && <CartModal />}

      {/* Notification Icon */}
      


      {/* Profile Icon */}
      <div ref={profileIconRef}>
        <i
          className="font-awsome text-gray-500 select-none cursor-pointer text-2xl"
          onClick={handleProfile}
        >
          
        </i>
      </div>

      {/* Profile Dropdown */}
      <div
        ref={profileDivRef}
        className="backdrop-blur-sm font-sans absolute rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] z-20 top-12 left-0 text-sm bg-white p-2 dark:bg-gray-900 dark:text-white"
        style={{ opacity: 0, display: "none", transform: "translateY(-20px)" }}
      >
        <Link draggable="false" href={"/settings"}>
          پروفایل
        </Link>
        <div
          className="mt-2 cursor-pointer"
          onClick={() => {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("userType");
            setIsLoggedIn(false);
            setProfileIsOpen(false);
             // ✅ redirect after logout
          }}
        >
          خروج
        </div>
      </div>
    </div>
  );
};

export default NavbarIcons;
