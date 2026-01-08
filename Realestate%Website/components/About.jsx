import React from 'react'



const About = () => {
  return (
    <div 
      
    className='flex flex-col items-center container mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden ' id='About'>

        <h1 className='text-2xl sm:text-4xl font-bold mb-2'>About 
         <span className='underline underline-offset-1 decoration-1 under font-light'> Our Brand</span></h1>
        <p className='text-gray-500 max-w-80 text-center mb-8'>
         Passionate About Properties, Dedicated To Your Vision</p>

     <div className='flex flex-col md:flex-row md:gap-20 items-center'>
        <div  >
            <img src="/building.png" alt="real pic"  className="w-full h-[450px] sm:w-1/2 max-w-lg object-cover rounded-tl-full shadow-lg hover:scale-105 transition-transform duration-300"/>
         </div>
            <div className='flex flex-col items-center md:items-start mt-10 text-gray-500'>
               <div className='grid grid-cols-2 gap-6 md:gap-10 w-full 2xl:pr-28'>
                 <div>
                    <p className='text-4xl font-medium text-gray-800'>10+</p>
                    <p>Years of Excellence</p>
                 </div>
                 <div>
                    <p className='text-4xl font-medium text-gray-800'>12+</p>
                    <p>Projects completed</p>
                 </div>
                 <div>
                    <p className='text-4xl font-medium text-gray-800'>20+</p>
                    <p>Mn. Sq. Ft. Delivered</p>
                 </div>
                 <div>
                    <p className='text-4xl font-medium text-gray-800'>25+</p>
                    <p>Ongoing Projects</p>
                 </div>
               </div>
          <p className="my-6 max-w-lg">
            We specialize in crafting timeless, high-quality real estate propertiesthat blend
            modern design with comfort and sustainability.  Our mission is to help you find a home
            that reflects your dreams, your lifestyle, and your future.
          </p>
          <button className='bg-blue-600 rounded text-white px-8 py-2 my-3'>More About...</button>
        </div>

     </div>
    </div>
  )
}

export default About
