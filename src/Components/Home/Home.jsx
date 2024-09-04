import axios from 'axios'
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import './home.css'
import HomeSlider from'../HomeSlider/HomeSlider'
import CategorySlider from'../CategorySlider/CategorySlider'
import toast from 'react-hot-toast';
import { useContext, useState } from 'react';
import { cartContext } from '../../Context/CartContext';


const Home = () => {
  const {addProduct} = useContext(cartContext);
  const [loader , setLoader] = useState(false);
  async function addProductToCart(id) {
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
  async function getAllProducts(){
    return await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  }
  const {data , isLoading , isFetching , error} = useQuery("products" , getAllProducts);
  if (isLoading) {
    return <> <div className='h-screen flex flex-wrap justify-center items-center text-[#22db14] text-7xl '>
    <i className="fa-solid fa-spinner fa-spin "></i>
  </div>  </>
  }
  return (
    <>
    <section className='py-8 px-6 mt-10'>
      <div className='w-full md:w-[85%] m-auto'>
        <HomeSlider/>
        <CategorySlider/>
        <div className='flex flex-wrap justify-center items-center'>
          {data?.data.data.map((item , idx) => <>
          <div key={idx}  className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-3 relative overflow-hidden'>
            <div className='inner p-3 hover:border hover:border-lime-500 rounded-lg hover:border-[6fb76f] transition-all  hover:shadow-lg hover:shadow-lime-400'>
              <Link to={`/productDetails/${item.id}`}>
                <img src={item.imageCover} alt="img" className='w-full'/>
                <h2 className='text-[#6FB76F] mt-3'> {item.category.name} </h2>
                <h2 className=' mt-3'> {item.title.split(" ").slice(0,2).join(" ")} </h2>
                <div className="flex flex-wrap justify-between items-center mt-3">
                  <div>
                    <h4> {item.price} EGP</h4>
                  </div>
                  <div>
                    <h4> {item.ratingsAverage} <i className='fa-solid fa-star text-yellow-300'></i> </h4>
                  </div>         
                </div>
                <div className='flex justify-end mb-5 mt-3'>
                  <h4 className='cursor-pointer text-2xl'> <i className='fa-solid fa-heart text-red-600'></i></h4>
                </div>
              </Link >
                <div className='btn absolute flex justify-center items-center'>
                  <button onClick={()=> addProductToCart(item.id)} type="submit" className="absolute w-2/3 text-white bg-[#1FC512] border  hover:bg-[#3FA43F] font-medium rounded-lg text-sm py-1 transition-all"> + Add</button>
                </div>
                </div>
          </div>
          </> )}
        </div>
      </div>
    </section> 
    </>
  );
};

export default Home