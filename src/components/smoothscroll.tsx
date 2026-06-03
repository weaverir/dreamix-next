// components/SmoothScroll.tsx
"use client";
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SmoothScroll = () => {
  useEffect(() => {
    const scroller = document.documentElement;

    gsap.to(scroller, {
      scrollTrigger: {
        trigger: scroller,
        start: "top top",
        end: "bottom bottom",
        scrub: 2, // Adjust scrub value to make the scroll slower
      },
      yPercent: -1, // Reduced value for slower scroll
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return null;
};

export default SmoothScroll;
