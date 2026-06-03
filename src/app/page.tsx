
import Particle from "@/components/Particle"
import Silder from "@/components/slider"
import Productlist from "@/components/productlist"
import type { Metadata } from "next";
import CategoryList from "@/components/categoryList";

export const metadata: Metadata = {
  title: "سایت دریمیکس",
  description:  "آموزش برای شما",
};
const HomePage = () => {
  return (
    <div className=" right-0 flex flex-col top-0 h-full w-[100%] z-[2]">
      <Silder/>
      <div className=" flex   flex-col backdrop-blur-md pb-10  dark:bg-black/30 transition-colors duration-500  py-4  px-4 ">
        <h1 className="font-sans_m  py-4 dark:text-text_w my-10  transition-colors ease-in duration-500 text-3xl md:px-8 lg:px-16 xl:px-32 2xl:px-64"> برترین دوره ها </h1>
      <Productlist/>
      <h1 className="font-sans_m py-4 dark:text-text_w my-10 transition-colors ease-in duration-500 text-3xl md:px-8 lg:px-16 xl:px-32 2xl:px-64"> دسته بندی ها </h1>
      <CategoryList/>
      <h1 className="font-sans_m py-4 dark:text-text_w  transition-colors ease-in duration-500 my-10 text-3xl md:px-8 lg:px-16 xl:px-32 2xl:px-64">دوره های جدید</h1>
      <Productlist/>
      </div>
      
      </div>
  )
}

export default HomePage