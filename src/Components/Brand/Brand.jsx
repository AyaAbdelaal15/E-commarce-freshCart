import axios from "axios";
import { useQuery } from 'react-query';
import { useState } from "react";
const Brand = () => {
  async function getBrands(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  }
  const {data , isLoading } = useQuery("brand" , getBrands);
  if (isLoading) {
    return <> <div className='h-screen flex flex-wrap justify-center items-center text-[#22db14] text-7xl '>
    <i className="fa-solid fa-spinner fa-spin "></i>
  </div>  </>
  }
  return (<>
   <section className='py-8 px-6 mt-10'>
     <div className='w-full md:w-[85%] m-auto '>
       <h2 className="text-[#4FA74F] text-3xl font-semibold text-center mt-8 mb-14">All Brands</h2>
       <div className="flex flex-wrap justify-center items-center">
         {data?.data.data.map((item , idx) => <>
         <div key={idx}  className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 cursor-pointer'>
            <div className='inner p-3 border border-gray-300  hover:border hover:border-lime-500 rounded-lg hover:border-[6fb76f] transition-all duration-300 hover:shadow-md hover:shadow-lime-400'>
              <img src={item.image} alt="img" className='w-full'/>
              <h2 className='mt-3 text-center'> {item.name} </h2>
            </div>
         </div>
         </> )}
       </div>
      </div>
    </section>
  </>  
  )
}

export default Brand
