"use client";
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";

const NavLinks1: React.FC = () => {
    const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

    useEffect(() => {
        linksRef.current.forEach((link) => {
            if (link) {
                gsap.set(link, { borderBottom: "2px solid transparent" });
                link.addEventListener("mouseenter", () => {
                    gsap.to(link, { borderBottomColor: "#ccc", duration: 0.3 });
                });
                link.addEventListener("mouseleave", () => {
                    gsap.to(link, { borderBottomColor: "transparent", duration: 0.3 });
                });
            }
        });
    }, []);

    return (
        <div className="hidden justify-center items-center xl:flex transition-colors duration-500 dark:text-text_w gap-5">
            <Link className="p-1 z-20" draggable="false" href="/" ref={(el) => { linksRef.current[0] = el; }}>خانه</Link>
            <Link className="p-1 z-20" draggable="false" href="/list" ref={(el) => { linksRef.current[1] = el; }}>دوره ها</Link>
            <Link className="p-1 z-20" draggable="false" href="/" ref={(el) => { linksRef.current[2] = el; }}>اساتید</Link>
            <Link className="p-1 z-20" draggable="false" href="/" ref={(el) => { linksRef.current[3] = el; }}>درباره ما</Link>
            <Link className="p-1 z-20" draggable="false" href="/" ref={(el) => { linksRef.current[4] = el; }}>تماس با ما</Link>
            
            
        </div>
    );
};

export default NavLinks1;