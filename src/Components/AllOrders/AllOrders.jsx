import axios from 'axios';
import {jwtDecode} from 'jwt-decode'
import { useEffect, useState } from 'react';
const AllOrders = () => {
    const {id} = jwtDecode(localStorage.getItem("tkn"));
    const [loader, setLoader] = useState(false);
    const [allOrders, setAllOrders] = useState(null);
    async function getAllOrders() {
        setLoader(true);
        try {
            const {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`);
            setAllOrders(data)
            setLoader(false)
        } catch (error) {
            error
            setLoader(false)
        }
    } 
    useEffect(() => {
        getAllOrders();
    } , [])   

    if (loader) {
        return <> <div className='h-screen flex flex-wrap justify-center items-center text-[#22db14] text-7xl '>
        <i className="fa-solid fa-spinner fa-spin "></i>
      </div>  </>
      }
  return (
    <section className='py-10 mt-10'>
        <div className='w-full md:w-[80%] mx-auto'>
            {allOrders? allOrders.map((order , idx) => <>
            <div key={idx} className=''>
                <div className='p-5 mb-3 bg-gray-200 '>
                    <h2 className='text-green-500 font-mono text-lg'> Total Order Price : {order.totalOrderPrice} EGP</h2>
                    <h2 className='text-green-500 font-mono text-lg'> Payment Method Type : {order.paymentMethodType}</h2>
                    <div className='flex flex-wrap justify-center items-center gap-4 mt-7'>
                        {order.cartItems?.map(function (item , idx ) {
                            return(
                            <>
                            <div key={idx} className='lg:w-1/6 md:w-1/4 sm:w-1/2 w-full rounded-lg'>
                                <img src={item.product.imageCover} className='w-full rounded-lg' alt="product" />
                            </div>
                            </>)
                            })}
                    </div>
                </div>
            </div>
            </> ):( "" )}
        </div>
    </section>
  );
};

export default AllOrders
