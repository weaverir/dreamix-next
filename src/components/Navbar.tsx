// components/Navbar.tsx
"use client";
import React from 'react';
import NavbarLogo from './navbar/NavbarLogo';
import NavbarMenu from './navbar/NavbarMenu';
import Image from 'next/image';
import NavbarIcons from './navbar/NavbarIcons';
import SearchBar from './navbar/search';
import NavLinks1 from './navbar/navLinks';
import useNavbarState from '@/hooks/useHideNavbar'; // Correct import

const Navbar = () => {
  const { isInFirst80px, isScrollingUp } = useNavbarState();
  console.log(`isInFirst80px : ${isInFirst80px} , isScrollingUp : ${isScrollingUp} `)

  
  return (
    <div className={`
    h-20 px-4  
    rounded-sm    items-center shadow-[0_2px_30px_rgb(0,0,0,0.1)] justify-between 
    backdrop-brightness-100 z-50 flex w-[100%] font-bold md:px-8 lg:px-16 xl:px-32 2xl:px-64 
    backdrop-blur-md transition-transform duration-500 ease-in-out 
    ${isInFirst80px ? 'relative dark:bg-black/40 ' : 'fixed bg-white/60 dark:bg-black/70 '} 
    ${isScrollingUp ? 'translate-y-0' : '-translate-y-full'}
  `}>
      {/* mobile */}
      <div className='flex justify-between items-center w-full md:hidden'>
        <NavbarMenu />
        <div className='w-[70%]'>
        <SearchBar  />

        </div>
        <NavbarLogo />
      </div>
      {/* bigger screens */}
      <div className='hidden md:flex flex-row w-full items-center justify-between gap-8'>
        {/* rightside */}
        <div className='w-1/3 xl:w-1/2 flex font-sans gap-7'>
          <Image width={165} height={60} alt='logo' src={"/image1.png"} />
          <NavLinks1 />
        </div>
        {/* leftside */}
        <div  className='w-2/3 xl:w-1/2 flex flex-row items-center justify-between gap-8'>
          <SearchBar />
          <NavbarIcons />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
