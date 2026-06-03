import { CourseData } from "@/app/types/coursetypes";

interface Props {
  course: CourseData;
  totalSessions?: number; // تعداد جلسات از API دوم
}

export default function CourseHeader({ course, totalSessions }: Props) {
  return (
    <header className="space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold dark:text-text_w">
        {course.title}
      </h1>
      <p className="text-gray-700 dark:text-gray-300">{course.description}</p>
      
    </header>
  );
}
