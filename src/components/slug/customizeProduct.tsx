import React from 'react'

const CustomizeProduct = () => {
  return (
    <div className='flex flex-col font-sans gap-6'>
        <h4 className='font-sans_m'>رنگ</h4>
        <ul className='flex items-center gap-3'>
            <li className='h-8 rounded-full ring-1 cursor-pointer relative bg-red-500 ring-gray-300 w-8'>
                <div className='absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2'/>
            </li>
            <li className='h-8 rounded-full ring-1 cursor-pointer relative bg-blue-500 ring-gray-300 w-8'>
            </li>
            <li className='h-8 rounded-full ring-1 cursor-not-allowed relative bg-green-500 ring-gray-300 w-8'>
            <div className='absolute w-10 h-[2px] bg-red-400 -rotate-45  top-1/2 left-1/2 transform  -translate-x-1/2 -translate-y-1/2'/>

            </li>

        </ul>

        <h4 className='font-sans_m'>سایز</h4>
        <ul className='flex items-center gap-3'>
            <li className='ring-1 rounded-md py-1 px-4 text-sm cursor-pointer ring-red-400 text-red-400'>Small</li>
            <li className='ring-1 rounded-md py-1 px-4 text-sm cursor-pointer ring-red-400 text-white bg-red-400'>Medium</li>
            <li className='ring-1 rounded-md py-1 bg-pink-200 px-4 text-sm cursor-not-allowed ring-pink-200 text-white'>Large</li>

        </ul>
    </div>
  )
}

export default CustomizeProduct
