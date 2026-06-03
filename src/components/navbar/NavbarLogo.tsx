"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

const NavbarLogo = () => {
  const route = useRouter()
  return (
    <div className=' justify-self-center'>
        <Image 
      src="/image.png" 
      width={28} 
      height={40} 
      alt="Logo" 
      draggable="false"
      onClick={() => route.push("/")} 
      style={{ cursor: 'pointer',
        height : "28px"
       }} 
    />
    </div>
  )
}

export default NavbarLogo
