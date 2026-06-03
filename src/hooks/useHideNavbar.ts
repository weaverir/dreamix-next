// hooks/useNavbarState.ts
"use client";
import { useEffect, useState } from 'react';

const useNavbarState = () => {
  const [isInFirst80px, setIsInFirst80px] = useState(true);
  const [isScrollingUp, setIsScrollingUp] = useState(true);

  useEffect(() => {
    let lastScrollTop = 0;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const inFirst80px = scrollTop < 80; // Adjusted to include 80px from the beginning

      if (scrollTop > lastScrollTop) {
        // Scrolling down
        setIsScrollingUp(false);
      } else {
        // Scrolling up
        setIsScrollingUp(true);
      }

      setIsInFirst80px(inFirst80px);
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // For Mobile or negative scrolling
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return { isInFirst80px, isScrollingUp };
};

export default useNavbarState;
