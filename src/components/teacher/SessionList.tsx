"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/contexts/instance";
import toast from "react-hot-toast";
import SessionItem from "./SessionItem";

export interface Session {
  id: number;
  title: string;
  intro?: string[];
  lessons?: any[];
  course: number;
}

interface Props {
  slug: string;
  sessions?: Session[]; // optional initial sessions from course object
}

export default function SessionList({ slug, sessions: initialSessions }: Props) {
  const [sessions, setSessions] = useState<Session[]>(initialSessions || []);
  const [loading, setLoading] = useState(!initialSessions);

  useEffect(() => {
    if (initialSessions) return; // already provided by parent
    const fetchSessions = async () => {
      try {
        const res = await axiosInstance.get(`/teacher/courses/${slug}/sessions/`);
        setSessions(res.data);
      } catch {
        toast.error("خطا در دریافت جلسات");
      } finally {
        setLoading(false);
      }
    };
    fetchSessions();
  }, [slug, initialSessions]);

  const handleDelete = async (sessionId: number) => {
    try {
      await axiosInstance.delete(`/teacher/courses/${slug}/sessions/${sessionId}/`);
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      toast.success("جلسه حذف شد");
    } catch {
      toast.error("خطا در حذف جلسه");
    }
  };

  const handleUpdate = async (sessionId: number, payload: Partial<Session>) => {
    try {
      const res = await axiosInstance.put(
        `/teacher/courses/${slug}/sessions/${sessionId}/`,
        payload
      );
      setSessions((prev) =>
        prev.map((s) => (s.id === sessionId ? { ...s, ...res.data } : s))
      );
      toast.success("جلسه ویرایش شد");
    } catch {
      toast.error("خطا در ویرایش جلسه");
    }
  };

  if (loading) return <p className="dark:text-gray-300">در حال بارگذاری جلسات...</p>;

  if (sessions.length === 0)
    return <p className="dark:text-gray-300">هیچ جلسه‌ای یافت نشد.</p>;

  return (
    <ul className="space-y-3 mt-4">
      {sessions.map((session) => (
        <SessionItem
          key={session.id}
          session={session}
          onDelete={() => handleDelete(session.id)}
          onUpdate={(payload) => handleUpdate(session.id, payload)}
          courseSlug={slug}
        />
      ))}
    </ul>
  );
}
