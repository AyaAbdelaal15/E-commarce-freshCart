import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useContext, useState } from 'react';
import { cartContext } from '../../Context/CartContext';
import toast from 'react-hot-toast';

const ProductDetails = () => {
    const {addProduct} = useContext(cartContext);
    const [loader , setLoader] = useState(false);
    const {id} = useParams();
    async function getProductDetails(){
        return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
    }
    async function addProductToCart() {
        setLoader(true);
        const data = await addProduct(id);
        if(data){
            toast.success(data.message)
            setLoader(false);
        }
        else{
            toast.error(error)
            setLoader(false);
        }
    }
    const {data , isLoading } = useQuery(`product${id}` , getProductDetails);
    if (isLoading) {
        return <> <div className='h-screen flex flex-wrap justify-center items-center text-[#4FA74F] text-7xl '>
            <i className="fa-solid fa-spinner fa-spin "></i>
        </div>  </>
    }
  return (
    <section className='py-8 mt-10'>
        <div className='w-full md:w-[80%] mx-auto'>
            <div className='flex flex-wrap justify-center items-center'>
                <div className='lg:w-1/3 md:w-1/2 w-full p-5'>
                <div className=''>
                    <img src={data?.data.data.imageCover} alt="productImg"  className='w-full'/>
                </div>
                </div>
                <div className='lg:w-2/3 md:w-1/2 w-full p-5'>
                    <div>
                        <h2 className='text-[#3FA43F] text-2xl mb-3 font-semibold'> {data?.data.data.title.split(" ").slice(0,2).join(" ")} </h2>
                        <p className='text-xl mb-3'> {data?.data.data.description} </p>
                    </div>
                    <div className="flex flex-wrap justify-between items-center mt-3">
                        <div>
                             <h4> {data?.data.data.price} EGP</h4>
                        </div>
                        <div>
                            <h4> {data?.data.data.ratingsAverage} <i className='fa-solid fa-star text-yellow-300'></i> </h4>
                        </div>         
                    </div>
                    <div className='flex justify-end mb-5 mt-3'>
                        <h4 className='cursor-pointer text-2xl'> <i className='fa-solid fa-heart text-red-600'></i></h4>
                    </div>
                    <div>
                        <button onClick={addProductToCart} type="button" className="w-full text-white bg-[#1FC512] border  hover:bg-[#3FA43F] font-medium rounded-lg text-sm py-1 transition-all"> 
                            {loader ? <div> <i className='fa-solid fa-spinner fa-spin text-white'></i> </div>  : "+ Add"}
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </section>
  )
}

export default ProductDetails
