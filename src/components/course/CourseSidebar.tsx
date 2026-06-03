"use client";
import { useState } from "react";
import { Section, Lesson, CourseData } from "@/app/types/coursetypes";

interface Props {
  course: CourseData;
  sections: Section[];
  activeSectionId: number | null;
  setActiveSectionId: (id: number) => void;
  setActiveLesson: (lesson: Lesson) => void;
}

export default function CourseSidebar({
  course,
  sections,
  activeSectionId,
  setActiveSectionId,
  setActiveLesson,
}: Props) {
  // state برای نگه داشتن بخش‌های باز
  const [openSections, setOpenSections] = useState<number[]>([]);

  const toggleSection = (id: number) => {
    setActiveSectionId(id);
    setOpenSections((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  return (
    <aside className="lg:col-span-1 space-y-4">
      {sections.map((section) => {
        const isOpen = openSections.includes(section.id);
        return (
          <div
            key={section.id}
            className="bg-white dark:bg-black p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
          >
            <button
              onClick={() => toggleSection(section.id)}
              className={`w-full text-right font-semibold mb-3 flex justify-between items-center transition-colors ${
                activeSectionId === section.id
                  ? "text-red-500 dark:text-red-400"
                  : "text-gray-700 dark:text-text_w"
              }`}
            >
              <span>{section.title}</span>
              <span className="text-xs">
                {isOpen ? "▲" : "▼"}
              </span>
            </button>

            {isOpen && (
              <ul className="space-y-3">
                {section.lessons.map((lesson) => (
                  <li
                    key={lesson.id}
                    onClick={() => setActiveLesson(lesson)}
                    className="flex items-center justify-between rounded-md border border-gray-200 dark:border-neutral-800 p-3 bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
                        {lesson.video ? "ویدیو" : "درس"}
                      </span>
                      <span className="text-sm font-medium dark:text-text_w">
                        {lesson.title}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {lesson.duration ?? "—"}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </aside>
  );
}
