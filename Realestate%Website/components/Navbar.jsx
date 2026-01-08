import React, { useEffect, useState } from 'react';
import { MdRealEstateAgent } from "react-icons/md";
import { AiOutlineMenuFold } from "react-icons/ai";
import { IoCloseSharp } from "react-icons/io5";
import { motion } from 'framer-motion';

const Navbar = () => {

const [showMobailMenu, setShowMobailMenu]=useState(false)

useEffect(()=>{
if(showMobailMenu){
document.body.style.overflow='hidden'
}else{
  document.body.style.overflow='auto'
}
return ()=> {
document.body.style.overflow='auto'
}
},

  [showMobailMenu]
)

  return (
    <div className=" bg-[url('/real1_forBg.jpg')] bg-cover bg-center w-full h-screen text-white overflow-hidden">
      <div className="flex justify-around items-center py-3 bg-black/30 backdrop-blur-sm ">
         <div className="ml-5 inline-flex items-center">
  <MdRealEstateAgent className="mr-1" />
  <span>Estate</span>
</div>


        <div className=" hidden md:flex space-x-7 text-white ">
          <a href="#"  className='hover:text-teal-400 '>Home</a>
          <a href="#About"  className='hover:text-teal-400 '>About</a>
          <a href="#Project"  className='hover:text-teal-400'>Projects</a>
          <a href="#Testimony"  className='hover:text-teal-400'>Testimonials</a>
        </div>

        <button className="hidden md:block mr-5 w-24 p-2 rounded-full bg-white text-black hover:bg-gray-200 transition">
          Sign Up
        </button>
        <AiOutlineMenuFold className='md:hidden cursor-pointer' onClick={()=>setShowMobailMenu(true)}/>
      </div>

{/* ..............Mobile Menu............... */}
<div className={`md:hidden ${showMobailMenu?'w-full fixed':'h-0 w-0'}  bg-white top-0 right-0 bottom-0 overflow-hidden transition-all`}>
  
  <div className='flex justify-end  text-black p-6 cursor-pointer'>
      <IoCloseSharp  onClick={()=> setShowMobailMenu(false)}/>
  </div>
 
  <ul className='flex flex-col items-center text-black cursor-pointer '>
    <a href="#" onClick={()=> setShowMobailMenu(false)} className='px-4 py-2 rounded-full font-medium inline-block'>Home</a>
    <a href="#About" onClick={()=> setShowMobailMenu(false)} className='px-4 py-2 rounded-full font-medium inline-block'>About</a>
    <a href="#Project" onClick={()=> setShowMobailMenu(false)} className='px-4 py-2 rounded-full font-medium inline-block'>Projects</a>
    <a href="#Testimony" onClick={()=> setShowMobailMenu(false)} className='px-4 py-2 rounded-full font-medium inline-block'>Testimonials</a>
  </ul>
</div>
      <motion.section 
      initial={{opacity:0,y:100}}
      transition={{duration:1.5}}
      whileInView={{opacity:1, y:0}}
      viewport={{once:true}}
      className=" flex flex-col mt-60 text-center ">
        <h1 className=" text-2xl font-bold sm:text-3xl md:text-4xl">
          Explore homes that<br/> 
          fit your dream
        </h1>
       <div className='flex justify-center text-center mt-11 space-x-7'>
        <a href='#Project' className=' border rounded  px-8 py-2'>Projects</a>
        <a href='#Contact' className='border  bg-blue-500 px-8 py-2 rounded hover:bg-blue-600'>Contact us</a>
       
       </div>
      </motion.section>
    </div>
  );
};

export default Navbar;

