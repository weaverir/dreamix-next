"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/contexts/instance";

interface Comment {
  id: number;
  name: string;
  email: string;
  body: string;
  created_on: string;
  active: boolean;
  course: number;
}

export default function CourseComments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  // new states for form
  const [newComment, setNewComment] = useState("");
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // fetch comments
  useEffect(() => {
    async function fetchComments() {
      try {
        const res = await axiosInstance.get(`/course/${slug}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchComments();
  }, [slug]);

  // submit comment
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!newComment.trim() || !email.trim()) return;

    setSubmitting(true);
    try {
      const res = await axiosInstance.post(`/course/${slug}/comments/create/`, {
        body: newComment,
        email: email,
      });

      // Optimistically add new comment
      setComments((prev) => [
        {
          id: res.data.id ?? Date.now(),
          name: res.data.name ?? "کاربر",
          email: email,
          body: newComment,
          created_on: new Date().toISOString(),
          active: false,
          course: res.data.course ?? 0,
        },
        ...prev,
      ]);

      setNewComment("");
      setEmail("");
    } catch (err) {
      console.error("Error posting comment:", err);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return <p className="text-gray-500 dark:text-gray-400">در حال بارگذاری دیدگاه‌ها...</p>;
  }

  return (
    <section className="space-y-6">
      <h2 className="text-lg font-bold dark:text-text_w">دیدگاه و پرسش‌ها</h2>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="ایمیل شما"
          className="w-full p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-text_w"
          required
        />
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="دیدگاه خود را بنویسید..."
          className="w-full p-3 rounded-md border border-gray-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-text_w"
          rows={3}
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-4 py-2 rounded-md bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
        >
          {submitting ? "در حال ارسال..." : "ارسال دیدگاه"}
        </button>
      </form>

      {/* Comments List */}
      {comments.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">هیچ دیدگاهی ثبت نشده است.</p>
      ) : (
        comments.map((comment) => (
          <div
            key={comment.id}
            className="bg-white dark:bg-neutral-900 p-5 rounded-xl shadow-sm space-y-2 border border-gray-100 dark:border-neutral-800"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm dark:text-text_w">{comment.name || "کاربر"}</p>
              <span className="text-xs text-gray-400">
                {new Date(comment.created_on).toLocaleDateString("fa-IR")}
              </span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">{comment.body}</p>
            <p className="text-xs text-gray-400">{comment.email}</p>
            {!comment.active && (
              <p className="text-xs text-red-500">این دیدگاه هنوز تأیید نشده است</p>
            )}
          </div>
        ))
      )}
    </section>
  );
}
