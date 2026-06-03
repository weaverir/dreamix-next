"use client"
import React, { useState } from 'react'

const AddToCart = () => {
    const [quantity, setQuantity] = useState(1)
    const stuck =10 ;
  return (
    <div className='flex font-sans  flex-col gap-4'>
      <h4 className='font-sans_m'>تعداد</h4>
      <div className='flex items-center justify-between'>
        <div className='flex justify-between items-center gap-4'>
            <div className='flex gap-4 items-center bg-gray-200 dark:bg-black dark:text-text_w justify-between font-sans_m w-32 rounded-3xl py-2 px-4'>
                <button onClick={()=>{setQuantity(((prev)=>(prev == 1 || prev <= 0 ? prev=1 : prev-1)))}} >-</button>
                {quantity}
                <button onClick={()=>{setQuantity(((prev)=>( prev == stuck ? prev= stuck :prev+1)))}}>+</button>

            </div>
            <div className='font-sans text-xs'>فقط <span className='text-orange-500 font-sans_m'>{stuck} عدد</span> باقی مانده است  </div>
        </div>
        <button className='w-max px-4 rounded-3xl ring-1 text-red-400 transition-colors ease-in disabled:cursor-not-allowed disabled:bg-pink-200 disabled:ring-none disabled:text-white duration-500 ring-red-400 hover:bg-red-400 hover:text-white py-2'>افزودن به سبد</button>
      </div>

    </div>
  )
}

export default AddToCart
