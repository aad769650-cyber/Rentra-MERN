import { CircleQuestionMark, Globe, House, Menu, UserStar } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AccessDashBoard } from '../api/apiCall'

const Header = () => {

    const [isShow,setIsShow]=useState(false)

    console.log(isShow);
    
const variants={
    center:"flex justify-center items-center"
}


const handleClick=()=>{
    console.log("clicked");
    
    AccessDashBoard()
}

  return (

<>

<div className={`${isShow?"block":"hidden" } absolute top-18 right-8 z-60 w-fit bg-gray-100 rounded-xl`}>
    <div className='p-4 flex flex-col gap-2 cursor-pointer'>
        <div className={`${variants.center} gap-1 hover:bg-gray-200 p-2 rounded`}>
         <CircleQuestionMark size={16} />   Help Center
        </div>
        <hr />
        <div>
           <div className='text-black font-semibold hover:bg-gray-200 p-2 rounded'> Become a host</div>
            <p className='text-sm text-gray-600 hover:bg-gray-200 p-2 rounded'>It's easy to start hosting  and <br /> earn money</p>
        </div>
        <div className='hover:bg-gray-200 p-2 rounded'>
            Find Host
        </div>
        <hr />

        <div className='hover:bg-gray-200 p-2 rounded'>
            Login or signup
        </div>
    </div>
</div>



    <div className='p-4 bg-[#ffffff] sticky z-30 top-0 right-0 w-full '>

        <div className=' flex justify-between items-center'>

            <div className={`${variants.center} gap-2`}>
<img src="/logo.svg" alt="Main Logo" className='w-20 h-10'/>
            </div>



            <div className=''>
<NavLink to={"/"}
 className={({ isActive }) =>
  isActive
      ? "px-4 py-2 text-black border-b-2 border-black md:flex gap-2 hidden"
      : "px-4 py-2 text-gray-500 hover:text-blue-600 md:flex gap-2 hidden"


      
}>


<House color='#15173D'/><span  className='font-semibold'>Home</span></NavLink>
        
            </div>
            <div className=''>
<NavLink to={"/admin"}
 className={({ isActive }) =>
  isActive
      ? "px-4 py-2 text-black border-b-2 border-black md:flex gap-2 hidden"
      : "px-4 py-2 text-gray-500 hover:text-blue-600 md:flex gap-2 hidden"


      
}>


<UserStar  color='#15173D'/><span  className='font-semibold'>Admin</span></NavLink>
        
     
            </div>


            <div className={`${variants.center} gap-2 p-2 cursor-pointer`}>
                <div className='font-semibold rounded-l-full rounded-r-full p-2 translate-all duration-200 shrink-0 hover:bg-gray-100'>
                   <div onClick={()=>handleClick()}>Become a Host</div>
                </div>
                <div className='rounded-full p-3 translate-all duration-200 shrink-0 bg-gray-100 hover:bg-gray-200'>
    <Globe color="#000" size={16}/>
                </div>
                <div className='relative rounded-full p-3 translate-all duration-200 shrink-0 bg-gray-100 hover:bg-gray-200'
                onClick={()=>{setIsShow(!isShow)}}>
                  <Menu size={16} color="#000" />
                </div>
            </div>
        </div>





            <div className='flex gap-2 justify-center items-center'>
<NavLink to={"/"}
 className={({ isActive }) =>
  isActive
      ? "px-4 py-2 text-black border-b-2 border-black flex gap-2 md:hidden"
      : "px-4 py-2 text-gray-500 hover:text-blue-600 flex gap-2 md:hidden"


      
}>


<House color='#15173D'/><span  className='font-semibold'>Home</span></NavLink>
        
           
<NavLink to={"/adminLogin"}
 className={({ isActive }) =>
  isActive
      ? "px-4 py-2 text-black border-b-2 border-black flex gap-2 md:hidden"
      : "px-4 py-2 text-gray-500 hover:text-blue-600 flex gap-2 md:hidden"


      
}>


<UserStar  color='#15173D'/><span  className='font-semibold'>Admin</span></NavLink>
        
            </div>
    </div>


</>

)
}

export default Header