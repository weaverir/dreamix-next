"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import CourseHeader from "./CourseHeader";
import CoursePlayer from "./coursePlayer";
import CourseSidebar from "./CourseSidebar";
import CourseStats from "./CourseStats";
import CourseComments from "./CourseComments";
import { Section } from "@/app/types/coursetypes";

export default function CourseDetailPage({ course }: { course: any }) {
  const courseData = course.course;

  const [sections, setSections] = useState<Section[]>([]);
  const [activeSectionId, setActiveSectionId] = useState<number | null>(null);
  const [activeLesson, setActiveLesson] = useState<any | null>(null);
  const [loadingSessions, setLoadingSessions] = useState(true);
  const [noToken, setNoToken] = useState(false);

  useEffect(() => {
    async function fetchSessions() {
      setLoadingSessions(true);
      const token = typeof window !== "undefined" ? localStorage.getItem("accessToken") : null;

      if (!token) {
        setNoToken(true);
        setLoadingSessions(false);
        return;
      }

      try {
        const res = await axios.get(
          `https://dreamix-back.liara.run/course/${courseData.slug}/sessions/`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = res.data.sections || [];
        setSections(data);

        const firstSection = data[0] || null;
        const firstLesson = firstSection?.lessons?.[0] || null;
        setActiveSectionId(firstSection?.id ?? null);
        setActiveLesson(firstLesson ?? null);
      } catch (e) {
        setSections([]);
      } finally {
        setLoadingSessions(false);
      }
    }

    fetchSessions();
  }, [courseData.slug]);

  return (
    <main className="min-h-screen font-sans backdrop-blur-md  bg-gray-50/30 dark:bg-black/20 transition-colors duration-500">
      <section className="py-10 px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64 space-y-12">
        <CourseHeader course={courseData} totalSessions={sections.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <CoursePlayer activeLesson={activeLesson}  />
            {noToken && (
              <div className="rounded-lg bg-yellow-50 dark:bg-neutral-900 p-4 text-sm text-gray-700 dark:text-gray-300">
                برای مشاهده ویدیوها ابتدا وارد حساب شوید.
              </div>
            )}
          </div>

          <CourseSidebar
            course={courseData}
            sections={sections}
            activeSectionId={activeSectionId}
            setActiveSectionId={setActiveSectionId}
            setActiveLesson={setActiveLesson}
          />
        </div>

        <CourseStats course={courseData} totalSessions={sections.length} />
        <CourseComments slug={courseData.slug} />
      </section>
    </main>
  );
}
