"use client";

import React from "react";

export default function AuthLayout({
                                       title,
                                       children,
                                   }: {
    title: string;
    children: React.ReactNode;
}) {
    return (
        <div className="font-sans min-h-screen flex items-center justify-center bg-gray-200/40 dark:bg-black transition-colors duration-500 px-4 backdrop-blur-md">
            <div className="w-full max-w-md h-[600px] bg-white/30 dark:bg-white/10 backdrop-blur-xl shadow-[0_8px_25px_rgba(0,0,0,0.25)] rounded-2xl p-6 flex flex-col transition-all duration-500 overflow-hidden">
                <h2 className="text-xl font-semibold text-center dark:text-text_w mb-6">
                    {title}
                </h2>
                {children}
            </div>
        </div>
    );
}
