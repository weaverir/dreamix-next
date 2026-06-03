"use client";
import { Metadata } from "next";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import Skeleton from "react-loading-skeleton";
import useNavbarState from "@/hooks/useHideNavbar"; // Import the useNavbarState hook
import { useDarkMode } from "@/contexts/darkmode";

export const metadata: Metadata = {
  title: "فروشگاه دریمیکس",
  description: "طراحی سایت برای شما",
};

const products = [
  {
    id: 1,
    name: "محصول 1",
    price: "10000 ریال",
    imageUrl: "https://www.portal.ir/uploads/editor/69fa2a.png?q=high",
    available: true,
    quantity: 2,
  },
  {
    id: 2,
    name: "محصول 2",
    price: "20000 ریال",
    imageUrl: "https://www.portal.ir/uploads/editor/69fa2a.png?q=high",
    available: true,
    quantity: 1,
  },
  {
    id: 3,
    name: "محصول 3",
    price: "30000 ریال",
    imageUrl: "https://www.portal.ir/uploads/editor/69fa2a.png?q=high",
    available: false,
    quantity: 3,
  },
];

const CartModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // ✅ Properly typed refs
  const modalRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const { isInFirst80px, isScrollingUp } = useNavbarState();
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Close the modal when scrolling down and not in first 80px
    if (!isScrollingUp && !isInFirst80px) {
      setIsOpen(false);
    }
  }, [isScrollingUp, isInFirst80px]);

  useEffect(() => {
    const modalEl = modalRef.current;
    const contentEl = contentRef.current;

    // Skeleton fade-out after 2s
    const timer = setTimeout(() => {
      if (contentEl) {
        gsap.to(contentEl, {
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            setIsLoading(false);
            gsap.to(contentEl, {
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
            });
          },
        });
      }
    }, 2000);

    if (modalEl) {
      if (isOpen) {
        modalEl.style.display = "block";
        gsap.fromTo(
          modalEl,
          { opacity: 0, y: -50 },
          { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
        );
      } else {
        gsap.to(modalEl, {
          opacity: 0,
          y: -50,
          duration: 0.5,
          ease: "power3.out",
          onComplete: () => {
            if (modalEl) modalEl.style.display = "none";
          },
        });
      }
    }

    return () => clearTimeout(timer);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
  };

  const SkeletonProduct = () => {
    const baseColor = darkMode ? "#2c2c2c" : "#e0e0e0";
    const highlightColor = darkMode ? "#3c3c3c" : "#f0f0f0";

    return (
      <div className="flex my-1 dark:bg-black bg-white w-[230px] shadow-[0_1px_10px_rgb(0,0,0,0.08)] dark:shadow-[0_1px_10px_rgb(255,255,255,0.15)] z-50 px-2 py-1 rounded-sm gap-4">
        <Skeleton
          height={90}
          width={72}
          baseColor={baseColor}
          highlightColor={highlightColor}
        />
        <div className="flex flex-col gap-1 justify-between h-[50%] w-full">
          <div className="flex flex-col">
            <Skeleton
              height={12}
              width="60%"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <Skeleton
              height={12}
              width="45%"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
            <Skeleton
              height={12}
              width="40%"
              baseColor={baseColor}
              highlightColor={highlightColor}
            />
          </div>
          <div className="flex flex-row justify-between gap-1">
            <div className="w-1/4">
              <Skeleton
                height={12}
                width="100%"
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            </div>
            <div className="w-1/4">
              <Skeleton
                height={12}
                width="100%"
                baseColor={baseColor}
                highlightColor={highlightColor}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={modalRef}
      style={{ display: "none" }}
      className="absolute dark:bg-black transition-colors ease-in duration-500 w-max p-4 rounded-md shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:shadow-[0_1px_10px_rgb(255,255,255,0.15)] backdrop-blur-xl bg-white top-14 -right-44 flex flex-col gap-4"
    >
      <div ref={contentRef}>
        {isLoading ? (
          <div>
            <div className="w-[35%] dark:bg-black mb-2">
              <Skeleton
                height={16}
                width="100%"
                baseColor={darkMode ? "#2c2c2c" : "#e0e0e0"}
                highlightColor={darkMode ? "#3c3c3c" : "#f0f0f0"}
              />
            </div>
            {Array(3)
              .fill(null)
              .map((_, index) => (
                <SkeletonProduct key={index} />
              ))}
            {/* Skeleton UI for bottom parts */}
            <div className="flex items-center dark:bg-black justify-between mt-3 font-semibold font-sans">
              <div className="w-[40%] dark:bg-black">
                <Skeleton
                  height={11}
                  width="100%"
                  baseColor={darkMode ? "#2c2c2c" : "#e0e0e0"}
                  highlightColor={darkMode ? "#3c3c3c" : "#f0f0f0"}
                />
              </div>
              <div className="w-[40%] dark:bg-black">
                <Skeleton
                  height={11}
                  width="100%"
                  baseColor={darkMode ? "#2c2c2c" : "#e0e0e0"}
                  highlightColor={darkMode ? "#3c3c3c" : "#f0f0f0"}
                />
              </div>
            </div>
            <div className="text-gray-500 dark:bg-black font-sans text-sm mt-2 mb-4">
              <Skeleton
                height={11}
                width="100%"
                baseColor={darkMode ? "#2c2c2c" : "#e0e0e0"}
                highlightColor={darkMode ? "#3c3c3c" : "#f0f0f0"}
              />
              <Skeleton
                height={11}
                width="60%"
                baseColor={darkMode ? "#2c2c2c" : "#e0e0e0"}
                highlightColor={darkMode ? "#3c3c3c" : "#f0f0f0"}
              />
            </div>
            <div className="flex justify-between dark:bg-black text-sm">
              <div className="w-[35%]">
                <Skeleton
                  height={40}
                  width="100%"
                  baseColor={darkMode ? "#2c2c2c" : "#e0e0e0"}
                  highlightColor={darkMode ? "#3c3c3c" : "#f0f0f0"}
                />
              </div>
              <div className="w-[35%]">
                <Skeleton
                  height={40}
                  width="100%"
                  baseColor={darkMode ? "#2c2c2c" : "#e0e0e0"}
                  highlightColor={darkMode ? "#3c3c3c" : "#f0f0f0"}
                />
              </div>
            </div>
          </div>
        ) : (
          <>
                        <h2 className="font-sans dark:text-text_w transition-colors ease-in duration-500 mb-2">
              سبد خرید
            </h2>
            {products.map((product) => (
              <div
                key={product.id}
                className="dark:bg-black my-1 flex w-[230px] shadow-[0_1px_10px_rgb(0,0,0,0.08)] dark:shadow-[0_1px_5px_rgb(255,255,255,0.2)] p-2 rounded-sm gap-4"
              >
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  width={72}
                  height={96}
                  className="object-cover rounded-md"
                />
                <div className="flex flex-col justify-between w-full">
                  {/* top */}
                  <div className="font-sans">
                    {/* title */}
                    <div className="font-sans dark:text-text_w transition-colors ease-in duration-500">
                      <h3 className="font-sans dark:text-text_w transition-colors ease-in duration-500">
                        {product.name}
                      </h3>
                      <div className="font-sans dark:text-text_w transition-colors ease-in duration-500">
                        {product.price}
                      </div>
                    </div>
                    {/* description */}
                    <div className="font-sans dark:text-text_w transition-colors ease-in duration-500">
                      {product.available ? "موجود" : "ناموجود"}
                    </div>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500 dark:text-gray-300 font-sans transition-colors ease-in duration-500">
                      تعداد: {product.quantity}
                    </span>
                    <span className="text-blue-500" onClick={handleClose}>
                      حذف
                    </span>
                  </div>
                </div>
              </div>
            ))}
            {/* Added part */}
            <div className="flex items-center dark:text-text_w justify-between mt-3 font-semibold font-sans">
              <span>جمع کل </span>
              <span>200000 تومان</span>
            </div>
            <p className="text-gray-500 dark:text-gray-300 font-sans text-sm mt-2">
              متن متن متن متن متن متن متن
            </p>
            <p className="text-gray-500 dark:text-gray-300 font-sans text-sm mb-4">
              متن متن متن متن متن متن متن
            </p>
            <div className="flex justify-between text-sm">
              <button className="rounded-md py-3 px-4 ring-1 dark:text-text_w ring-gray-300">
                مشاهده سبد
              </button>
              <button className="rounded-md py-3 px-4 dark:bg-white dark:text-black bg-black text-white">
                چک کردن
              </button>
            </div>
            {/* End of added part */}
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
