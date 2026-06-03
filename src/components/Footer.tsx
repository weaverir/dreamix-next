import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Footer = () => {
  return (
    <div className=' py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:64 backdrop-brightness-90 dark:text-text_w font-sans_m relative dark:bg-black/40 backdrop-blur-md'>
      {/*top */}
      <div className='flex flex-col md:flex-row justify-between gap-24'>
        {/*top-right */}
      <div className='w-full md:w-1/2 lg:w-1/4  flex flex-col gap-8'>
      <Link href={"/"}>
      <Image width={150} height={55} alt='logo' src={"/image1.png"} />
      </Link>
      <p>  آدرس : تبریز - منظریه - دانشگاه مهارت ملی  </p>
      <span className='font-semibold'>dreamix_webdevs@gmail.com</span>
      <span>09142551895</span>
      <div className='flex gap-6'>
        <Image src={"/facebook.png"}  alt='facebook' width={16} height={16}/>
        <Image src={"/instagram.png"}  alt='instagram' width={16} height={16}/>
        <Image src={"/youtube.png"}  alt='youtube' width={16} height={16}/>
        <Image src={"/pinterest.png"}  alt='pinterest' width={16} height={16}/>
        <Image src={"/x.png"}  alt='x' width={16} height={16}/>
      </div>
      </div>
       {/*top-center */}
       <div className='w-1/2 hidden lg:flex justify-between    '>
       <div className='flex flex-col mt-3 justify-between gap-16 '>
        <h1 className='font-medium text-2xl'>دریمیکس</h1>
        <div className='flex flex-col gap-6'>
          <Link href={"/"}>درباره ما</Link>
          <Link href={"/"}>نمونه کار ها</Link>
          <Link href={"/"}>مجوز ها</Link>
          <Link href={"/"}>بلاگ</Link>
          <Link href={"/"}>تماس با ما</Link>
        </div>
       </div>

       <div className='flex flex-col mt-3 justify-between gap-16 '>
        <h1 className='font-medium text-2xl'>فروشگاه</h1>
        <div className='flex flex-col gap-6'>
        <Link href={"/"}>دوره های جدید</Link>
        <Link href={"/"}>اساتید</Link>
        <Link href={"/"}>بلاگ</Link>
        <Link href={"/"}>بهترین دوره ها</Link>
        <Link href={"/"}>نقشه راه</Link>

        </div>
       </div>

       <div className='flex flex-col mt-3 justify-between gap-16 '>
        <h1 className='font-medium text-2xl'>ابزار</h1>
        <div className='flex flex-col gap-6'>
          <Link href={"/"}>پشتیبانی</Link>
          <Link href={"/"}>اکانت من</Link>
          <Link href={"/"}>ادرس فروشگاه</Link>
          <Link href={"/"}>قوانین و مقررات</Link>
          <Link href={"/"}>کارت هدیه</Link>

        </div>
       </div>
       </div>
       {/*top-left */}
       <div className='w-full md:w-1/2 lg:w-1/4 justify-center mt-3  flex flex-col gap-8'>
      <h1 className='font-medium  text-lg'>ثبت نام</h1>
      
      <p>اولین نفر باشید که از تخفیف ها و اخبار مطلع میشود</p>
      <div className='flex'>
        <input type="text" placeholder='ادرس ایمیل' className='p-4 w-3/4 dark:bg-black dark:text-text_w outline-none'  />
        <button className='w-1/4 text-white bg-red-400'>پیوستن</button>
      </div>
      <span className='font-semibold'>پرداخت ایمن</span>
      <div className='flex gap-3  justify-between'>
        <Image src={"/discover.png"}  alt='facebook' width={40} height={20}/>
        <Image src={"/skrill.png"}  alt='facebook' width={40} height={20}/>
        <Image src={"/paypal.png"}  alt='facebook' width={40} height={20}/>
        <Image src={"/mastercard.png"}  alt='facebook' width={40} height={20}/>
        <Image src={"/visa.png"}  alt='facebook' width={40} height={20}/>
        </div>
      </div>
      </div>
      {/*bottom*/}
      <div className='flex flex-col md:flex-row items-center justify-between gap-8 mt-16'>
        <div className=''> 1404 فروشگاه دریمیکس</div>
        <div className='flex flex-col gap-8 md:flex-row'>
          
          
          
        </div>
      </div>
      
    </div>
  )
}

export default Footer
