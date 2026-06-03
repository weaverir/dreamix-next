"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import Skeleton from "react-loading-skeleton";


// Define slide type
interface Slide {
  id: number;
  title: string;
  description: string;
  url: string;
  image: string;
  bg: string;
}

const Slider: React.FC = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch slider data
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get<Slide[]>("https://dreamix-back.liara.run/sliders/");
        setSlides(res.data);
      } catch (error) {
        console.error("Error fetching slider data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Auto-slide
  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, [slides]);

  // Skeleton UI while loading
  if (isLoading) {
    return (
      <div className="h-[calc(100vh-85px)] flex items-center justify-center">
        <div className="w-full h-full flex">
          {/* Skeleton text */}
          <div className="w-1/2 flex flex-col items-center justify-center gap-4 p-8">
            <Skeleton height={24} width="60%" />
            <Skeleton height={40} width="80%" />
            <Skeleton height={48} width="30%" />
          </div>
          {/* Skeleton image */}
          <div className="w-1/2 relative">
            <Skeleton height="100%" width="100%" />
          </div>
        </div>
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="h-[calc(100vh-85px)] flex items-center justify-center">
        <p className="text-xl">هیچ اسلایدی یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="rounded-sm h-[calc(100vh-85px)] dark:backdrop-brightness-25 backdrop-blur-lg overflow-hidden relative">
      <div
        className="w-[300vw] h-full flex transition-transform ease-in-out duration-500"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className="relative w-screen h-full flex flex-col text-center xl:flex-row"
            key={slide.id}
          >
            {/* Background */}
            <div
              className={`${slide.bg} backdrop-brightness-90 rounded-sm ring-1 ring-gray-100 backdrop-blur-sm absolute inset-0`}
            ></div>

            {/* Text */}
            <div className="relative dark:text-text_w z-10 font-sans_b h-1/2 xl:h-full xl:w-1/2 flex flex-col gap-8 2xl:gap-12 items-center justify-center">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl">{slide.title}</h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-black dark:bg-text_w dark:text-black text-white py-3 px-4">
                  ادامه
                </button>
              </Link>
            </div>

            {/* Image */}
            <div className="relative rounded-sm ring-1 ring-gray-100 h-1/2 xl:h-full xl:w-1/2">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover w-full opacity-100"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute flex justify-center left-1/2 bottom-8 gap-4 transform -translate-x-1/2">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
