export type LessonType = "video" | "article";

export interface Lesson {
  id: number;
  title: string;
  duration: string | null;
  type?: LessonType;        // API فعلاً نوع درس رو نمی‌ده
  video?: string | null;    // در API دوم اسم فیلد "video" هست
  course: number;           // ID دوره
  sections_id: number;      // ID بخش
}

export interface Section {
  id: number;
  title: string;
  lessons: Lesson[];
  course: number;           // ID دوره
}

export interface CourseData {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  image: string;
  duration: string;
  totalSessions: number | null;
  rating: number;
  votes?: number | null;
  certificateStatus: boolean;
  teacher: number;          // فعلاً فقط ID برمی‌گرده
}

export interface CourseResponse {
  course: CourseData;
  // فقط داده عمومی دوره از API اول
}

export interface SessionsResponse {
  sections: Section[];
  // داده بخش‌ها و درس‌ها از API دوم
}
