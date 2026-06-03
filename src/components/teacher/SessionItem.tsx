"use client";
import { useState } from "react";
import { Session } from "./SessionList";
import LessonList from "./LessonList";

interface Props {
  session: Session;
  courseSlug: string;
  onDelete: () => void;
  onUpdate: (payload: Partial<Session>) => void;
}

export default function SessionItem({ session, courseSlug, onDelete, onUpdate }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(session.title);

  const handleSave = () => {
    onUpdate({ title });
    setEditing(false);
  };

  return (
    <li className="p-3 rounded-md bg-white/70 dark:bg-black/40 border border-gray-300 dark:border-gray-700">
      <div className="flex justify-between items-center cursor-pointer" onClick={() => setExpanded(!expanded)}>
        {editing ? (
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 rounded-md border dark:border-gray-700 dark:bg-black/40 dark:text-white"
          />
        ) : (
          <h4 className="font-semibold dark:text-white">{session.title}</h4>
        )}
        <span>{expanded ? "▼" : "▶"}</span>
      </div>

      {expanded && (
        <div className="mt-2 space-y-2">
          {editing ? (
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                ذخیره
              </button>
              <button
                onClick={() => setEditing(false)}
                className="px-3 py-1 bg-gray-500 text-white rounded-md hover:bg-gray-600"
              >
                لغو
              </button>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(true)}
                className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                ویرایش
              </button>
              <button
                onClick={onDelete}
                className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                حذف
              </button>
            </div>
          )}

          {/* Lessons inside this session */}
          <LessonList courseSlug={courseSlug} sessionId={session.id} lessons={session.lessons || []} />
        </div>
      )}
    </li>
  );
}
