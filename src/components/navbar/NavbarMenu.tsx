"use client"
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import Image from 'next/image'
import NavbarIcons from './NavbarIcons'

const NavbarMenu = () => {
  const route = useRouter()
  const [open, setOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (open) {
      gsap.to(menuRef.current, { 
        duration: 0.5, 
        y: 0, 
        opacity: 1, 
        ease: 'power3.inOut',
        onStart: () => setIsAnimating(true),
        onComplete: () => setIsAnimating(false),
      })
    } else if (menuRef.current) {
      gsap.to(menuRef.current, { 
        duration: 0.5, 
        y: -20, 
        opacity: 0, 
        ease: 'power3.inOut',
        onStart: () => setIsAnimating(true),
        onComplete: () => {
          setIsAnimating(false)
        },
      })
    }
  }, [open])

  const handleToggle = () => {
    setOpen(!open)
  }

  const closeMenuAndNavigate = (path: string) => {
    route.push(path)
    setOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("userType")

    setOpen(false)
    route.push("/")
  }

  return (
    <div>
      <Image 
        src="/menu.png" 
        alt="Menu toggle" 
        width={28} 
        height={28} 
        className="cursor-pointer" 
        onClick={handleToggle} 
      />
      
      {(open || isAnimating) && (
        <div 
          ref={menuRef} 
          className="z-50 left-0 top-20 md:hidden w-[100%] justify-center flex flex-col items-center gap-8 text-xl font-sansb bg-black h-[calc(100vh-80px)] text-white absolute" 
          style={{ transform: 'translateY(-20px)', opacity: 0 }}
        >
          <div><NavbarIcons /></div>
          <div className="cursor-pointer" onClick={() => closeMenuAndNavigate("/")}>خانه</div>
          <div className="cursor-pointer" onClick={() => closeMenuAndNavigate("/login")}>ورود</div>
          <div className="cursor-pointer" onClick={() => closeMenuAndNavigate("/settings")}>پروفایل</div>
          <div className="cursor-pointer" onClick={() => closeMenuAndNavigate("/contact")}>تماس با ما</div>

          {/* ✅ LOGOUT BUTTON */}
          <div className="cursor-pointer" onClick={handleLogout}>خروج</div>

          <div className="cursor-pointer" onClick={() => closeMenuAndNavigate("/cart")}>سبد خرید</div>
        </div>
      )}
    </div>
  )
}

export default NavbarMenu
