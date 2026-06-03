import { CourseData } from "@/app/types/coursetypes";

interface Props {
  course: CourseData;
  totalSessions?: number; // تعداد جلسات واقعی از API دوم
}

export default function CourseStats({ course, totalSessions }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* اطلاعات پایه دوره */}
      <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <p className="text-sm text-gray-600 dark:text-gray-300">
          قیمت دوره: {course.price} تومان
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          مدت زمان: {course.duration}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          تعداد جلسات:{" "}
          {totalSessions !== undefined
            ? totalSessions
            : course.totalSessions ?? "—"}
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          امتیاز: {course.rating}{" "}
          {course.votes ? `از ${course.votes} رأی` : ""}
        </p>
      </div>

      {/* وضعیت گواهی پایان دوره */}
      <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <h3 className="font-bold text-base mb-2 dark:text-text_w">
          گواهی پایان دوره
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {course.certificateStatus ? "دارد" : "ندارد"}
        </p>
      </div>

      {/* مدرس دوره */}
      <div className="bg-white dark:bg-black p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
        <h3 className="font-bold text-base mb-2 dark:text-text_w">
          مدرس دوره
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">
          شناسه مدرس: {course.teacher}
        </p>
      </div>
    </div>
  );
}
