import React from 'react'
import { FaStar } from "react-icons/fa";
import {testimonialsData} from '../assets/assets'


const Testimonails = () => {
  return (
    <div 
    id='Testimony' className='container mx-auto py-10 lg:px-32 w-full overflow-hidden'>
    <h1 className='text-2xl sm:text-4xl font-bold mb-2 text-center'>Customer 
        <span className='undreline underline-offset-1 decoration-1 under font-light'> Testimonials</span></h1>  
    
    <p className='text-center text-gray-500 mb-12 max-w-80 mx-auto'>
        Real Stories from those who found Home with us</p>
    
    <div className='flex flex-wrap justify-center gap-8'>
        {testimonialsData.map((testimonial, index )=>(
        <div key={index} className='max-w-[340px] border shadow-lg rounded px-8 py-12 text'>
          <img src={testimonial.image} alt="User"  className="w-20 h-20 rounded-full object-cover" /> 
        <h2 className='text-xl text-gray-700 font-medium'> {testimonial.name}</h2>
        <p className='text-gray-500 mb-4 text-sm'>{testimonial.title}</p>
        <div className='flex justify-center gap-1 text-red-500 mb-4'>
          {Array.from({length:testimonial.rating}, (item, index)=>(
         <FaStar key={index}/>
          ))}
        </div>
        <p className='text-gray-600'>{testimonial.comment}</p>
        </div>
        ))}
    </div>
    
    </div>
  )
}

export default Testimonails
