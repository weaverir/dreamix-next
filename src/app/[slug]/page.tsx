
"use client";
import React, { useState } from "react";
import Image from "next/image";

type LessonType = "video" | "article";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: LessonType;
}

interface Section {
  id: string;
  title: string;
  lessons: Lesson[];
}

interface Course {
  id: number;
  title: string;
  cover: string;
  price: string;
  progressPercent: number;
  totalSessions: number;
  duration: string;
  participants: number;
  rating: number;
  votes: number;
  instructor: {
    name: string;
    bio: string;
  };
  certificateStatus: string;
  sections: Section[];
  comments: {
    user: string;
    text: string;
    reply?: string | null;
  }[];
}

const course: Course = {
  id: 1,
  title: "آموزش کامل Visual Studio Code",
  cover: "/vs.png",
  price: "رایگان",
  progressPercent: 40,
  totalSessions: 23,
  duration: "20:45:00",
  participants: 13733,
  rating: 4.73,
  votes: 217,
  instructor: {
    name: "حسام موسوی",
    bio: "بیش از ۱۵ سال تجربه برنامه‌نویسی، فعالیت در پروژه‌های مختلف و آموزش با علاقه‌مندی بالا.",
  },
  certificateStatus: "در انتظار مشاهده کامل دوره به شکل آفلاین",
  sections: [
    {
      id: "s1",
      title: "بخش اول | معرفی",
      lessons: [
        { id: "l1", title: "معرفی دوره", duration: "03:30", type: "video" },
        { id: "l2", title: "چرا این دوره را باید مشاهده کنم؟", duration: "05:00", type: "video" },
        { id: "l3", title: "نصب و راه‌اندازی اولیه", duration: "08:54", type: "video" },
        { id: "l4", title: "نگاه اولیه به VSCode", duration: "09:46", type: "video" },
      ],
    },
    {
      id: "s2",
      title: "بخش دوم | تنظیمات",
      lessons: [
        { id: "l1", title: "معرفی دوره", duration: "03:30", type: "video" },
        { id: "l2", title: "چرا این دوره را باید مشاهده کنم؟", duration: "05:00", type: "video" },
        { id: "l3", title: "نصب و راه‌اندازی اولیه", duration: "08:54", type: "video" },
        { id: "l4", title: "نگاه اولیه به VSCode", duration: "09:46", type: "video" },
      
      ],
    },
    {
      id: "s3",
      title: "بخش دوم | تنظیمات",
      lessons: [
        { id: "l1", title: "معرفی دوره", duration: "03:30", type: "video" },
        { id: "l2", title: "چرا این دوره را باید مشاهده کنم؟", duration: "05:00", type: "video" },
        { id: "l3", title: "نصب و راه‌اندازی اولیه", duration: "08:54", type: "video" },
        { id: "l4", title: "نگاه اولیه به VSCode", duration: "09:46", type: "video" },
      
      ],
    },
  ],
  comments: [
    {
      user: "امیر",
      text: "سلام وقت بخیر، دوره عالیه. از چه کیبورد و صفحه نمایشی استفاده می‌کنید؟",
      reply: "درود امیر جان، کیبورد و صفحه نمایش من به چه کارت میاد آخه 😄",
    },
    {
      user: "aaty",
      text: "سلام، برای پروژه سطح بالای لاراول فقط از PHP استفاده کنم؟",
      reply: null,
    },
  ],
};

export default function CourseDetailPage() {
  const [activeSectionId, setActiveSectionId] = useState<string>(course.sections[0].id);
  const activeSection = course.sections.find((s) => s.id === activeSectionId);

  return (
    <main className="min-h-screen font-sans bg-gray-50 dark:bg-black transition-colors duration-500">
      <section className="py-10 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 space-y-12">
        {/* Header */}
        <header className="space-y-4">
          <h1 className="text-2xl md:text-3xl font-bold dark:text-text_w">{course.title}</h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
            <span>پیشرفت شما: {course.progressPercent}%</span>
            <span>۰ از {course.totalSessions} جلسه</span>
          </div>
          {/* Progress bar */}
          <div className="w-full bg-gray-200 dark:bg-neutral-800 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all"
              style={{ width: `${course.progressPercent}%` }}
            />
          </div>
        </header>

        {/* Layout: Player + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Player area */}
          <div className="lg:col-span-2 space-y-4">
            <div className="relative w-full h-72 md:h-[420px] rounded-xl overflow-hidden shadow-lg bg-white dark:bg-neutral-900">
              <Image src={course.cover} alt={course.title} fill className="object-cover opacity-95" sizes="75vw" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button
                  className="rounded-full bg-black/60 text-white hover:bg-red-500 transition-colors p-5 shadow-md"
                  aria-label="play"
                >
                  ▶
                </button>
              </div>
            </div>

            {/* Actions under player */}
            <div className="flex items-center justify-between">
              <div className="flex gap-3">
                <button className="rounded-2xl ring-1 ring-red-400 py-2 px-4 text-xs font-sans_m hover:bg-red-400 hover:text-white hover:dark:text-black transition-colors">
                  مشاهده دوره
                </button>
                <button className="rounded-2xl ring-1 ring-gray-300 dark:ring-neutral-700 py-2 px-4 text-xs font-sans_m hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors">
                  ایجاد لینک دانلود
                </button>
              </div>
              <span className="text-xs text-green-600 dark:text-green-400">
                ویدیوها رو آنلاین مشاهده کنید و از مزیت‌های مشاهده آنلاین بهره‌مند شوید.
              </span>
            </div>
          </div>

          {/* Sidebar sections */}
          <aside className="lg:col-span-1 space-y-4">
            {course.sections.map((section) => (
              <div
                key={section.id}
                className="bg-white dark:bg-black p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => setActiveSectionId(section.id)}
                  className={`w-full text-right font-semibold mb-3 transition-colors ${
                    activeSectionId === section.id
                      ? "text-red-500 dark:text-red-400"
                      : "text-gray-700 dark:text-text_w"
                  }`}
                >
                  {section.title}
                </button>

                <ul className="space-y-3">
                  {section.lessons.length === 0 ? (
                    <li className="text-sm text-gray-500 dark:text-gray-400">درسی ثبت نشده است.</li>
                  ) : (
                    section.lessons.map((lesson) => (
                      <li
                        key={lesson.id}
                        className="flex items-center justify-between rounded-md border border-gray-200 dark:border-neutral-800 p-3 bg-gray-50 dark:bg-neutral-900 hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs px-2 py-1 rounded bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300">
                            {lesson.type === "video" ? "ویدیو" : "مقاله"}
                          </span>
                          <span className="text-sm font-medium dark:text-text_w">{lesson.title}</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{lesson.duration}</span>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            ))}
          </aside>
        </div>

        {/* Course stats / instructor / certificate */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <p className="text-sm text-gray-600 dark:text-gray-300">نوع دوره: {course.price}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">مدت زمان: {course.duration}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">تعداد جلسات: {course.totalSessions}</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">شرکت‌کنندگان: {course.participants.toLocaleString()} نفر</p>
            <p className="text-sm text-gray-600 dark:text-gray-300">امتیاز: {course.rating} از {course.votes} رأی</p>
          </div>

          <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-base mb-2 dark:text-text_w">گواهی پایان دوره</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{course.certificateStatus}</p>
          </div>

          <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-base mb-2 dark:text-text_w">مدرس دوره: {course.instructor.name}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">{course.instructor.bio}</p>
          </div>
        </div>

        {/* Comments */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold dark:text-text_w">دیدگاه و پرسش‌ها</h2>
          {course.comments.map((comment, idx) => (
            <div key={idx} className="bg-white dark:bg-neutral-900 p-5 rounded-xl shadow-sm space-y-2 border border-gray-100 dark:border-neutral-800">
              <p className="font-semibold text-sm dark:text-text_w">{comment.user}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{comment.text}</p>
              {comment.reply && (
                <div className="border-r-4 border-red-400 mr-3 pr-2 mt-2 text-sm text-gray-700 dark:text-gray-300">
                  {comment.reply}
                </div>
              )}
            </div>
          ))}
        </section>
      </section>
    </main>
  );
}
