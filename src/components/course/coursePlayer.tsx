"use client";
import React from "react";

interface Props {
  activeLesson: { video?: string } | null;
}

const BASE_URL = "https://dreamix-back.liara.run";
function getFullUrl(path?: string | null) {
  if (!path) return null;
  return path.startsWith("http") ? path : `${BASE_URL}${path}`;
}

export default function CoursePlayer({ activeLesson }: Props) {
  const videoUrl = getFullUrl(activeLesson?.video);

  if (!videoUrl) {
    return (
      <div className="flex items-center justify-center h-72 md:h-[420px] bg-neutral-900 rounded-xl text-gray-400">
        ویدیو در دسترس نیست
      </div>
    );
  }

  return (
    <div className="relative w-full aspect-video rounded-xl shadow-lg bg-neutral-900">
      <video
         
        src={videoUrl}
        controls
        className="w-full h-full rounded-xl"
      />
    </div>
  );
}
