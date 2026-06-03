// app/courses/[slug]/page.tsx
import axios from "axios";
import type { Metadata } from "next";
import CourseDetailPage from "@/components/course/CourseDetailPage";

interface Props { params: { slug: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  try {
    const res = await axios.get(`https://dreamix-back.liara.run/course/${slug}`);
    const course = res.data.course;

    return {
      title: course.title,
      description: course.description,
      openGraph: {
        title: course.title,
        description: course.description,
        images: [course.image],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title: course.title,
        description: course.description,
        images: [course.image],
      },
    };
  } catch {
    return {
      title: "Course Not Found",
      description: "این دوره یافت نشد",
    };
  }
}

export default async function Page({ params }: Props) {
  const { slug } = params;
  // Public data only (no token)
  const res = await axios.get(`https://dreamix-back.liara.run/course/${slug}`);
  const data = res.data;

  return <CourseDetailPage course={data} />;
}
