import React from 'react'
import { MdRealEstateAgent } from "react-icons/md";
import { FaRegCopyright } from "react-icons/fa";
const Footers = () => {
  return (
    <div className='pt-10 px-4 md:px-20 lg:px-32 bg-gray-900 w-full overflow-hidden indeterminate:Footer'>
      <div className='container mx-auto flex flex-col md:flex-row justify-between items-start'>
        <div className='w-full md:w-1/3 mb-8 md:mb-0'> 
           <img src="/Logo.jpg" alt="Logo" className='w-24 h-24 rounded-full ml-1 mb-2'/>
            <p className='text-gray-300 mt-3'>
          Our mission is to help you find a home that reflects your dreams, your lifestyle, and your future.
          </p>
        </div>
        <div>
            <h3 className='text-white text-lg font-bold mb-4'>Company </h3>
        <ul className='flex flex-col gap-2 text-gray-400'>
            <a href="#" className='hover:text-white'>Home</a>
            <a href="#About" className='hover:text-white'>About</a>
             <a href="Contact" className='hover:text-white'>Contact Us</a>
               <a href="Project" className='hover:text-white'>Privacy Policy</a>
        </ul>
        
        </div>
        <div className='w-full md:w-1/3'>
          <h3 className='text-white text-lg font-bold mb-4'>
            Subscribe our newsletter
          </h3>
          <p className='text-gray-400 mb-4 max-w-80'>
            The latest nems, articles, and resources , sent to your inbox weekly
          </p>
          <div>
            <input type="email" placeholder='Enter Your Email'
            className='p-2 rounded bg-gray-800 text-gray-400 border border-gray-700 focus:outline-none w-full md:w-auto' />
          <button className='py-2 px-4 rounded bg-blue-500 text-white ml-3'>Subscribe</button>
          
          </div>
        </div>
       </div>
      <div className='border border-gray-700 py-4 mt-10 text-center
      text-gray-500 '>
      Copyright 2025 © Nigist Sisay. All Right Reserved
      </div>
    </div>
  )
}

export default Footers

