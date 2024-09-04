import React, { useContext } from 'react'
import { cartContext } from '../../Context/CartContext'
import { Link } from 'react-router-dom'
const Cart = () => {
  const {products , totalPrice , updateCart ,  deleteItem , clearCart} = useContext(cartContext)

  return (
    <section className='lg:mt-14 mt-28 py-8'>
      <div className='md:w-[80%] w-[90%] mx-auto bg-gray-200 p-5'>
        <h2 className='text-3xl font-semibold mb-5'>Cart Shop</h2>
        {products?.length != 0  ?( <>
          <h2 className='text-[#22DB14] text-2xl font-semibold'>Total Price: {totalPrice} </h2>
        {products?.map( (item , idx )=> <>
          <div key={idx} className='md:flex md:flex-wrap justify-center items-center border-b border-green-500'>
          <div className='md:w-1/6 p-5'>
          <img src={item.product.imageCover} alt="" className='w-full'/></div>
          <div className='md:w-4/6 p-5'>
            <h2 className='mb-3 text-2xl font-semibold'> {item.product.title.split(" ").slice(0,2).join(" ")} </h2>
            <h2 className='mb-3 text-xl'> {item.price} EGP</h2>
            <h2 className='mb-3 text-xl'> {item.product.id} </h2>
            <button  onClick={() => deleteItem(item.product.id)} type="button" className="text-red-600 border  hover:text-red-700 font-medium text-sm py-1 transition-all"> 
            <i className="fa-solid fa-trash-can"></i>  Remove
            </button>
          </div>
          <div className='w-1/6 p-5'>
          <div className='flex justify-between items-center'>
              <button onClick={()=> updateCart(item.product.id , item.count+1)} type="button" className="bg-transparent border px-2 border-lime-600 rounded-md text-lg"> 
            +
            </button>
            <div>
              <h2 className='mx-3 '> {item.count} </h2>
            </div>
            <button  onClick={()=> updateCart(item.product.id , item.count-1)} type="button" className="bg-transparent border px-3 border-lime-600 rounded-md text-lg"> 
            -
            </button>
          </div>
          </div>
        </div>
        </>)
        }
        <div className='flex md:flex-row md:justify-between md:items-center mt-5 flex-col space-y-4'>
        <button  onClick={clearCart} type="button" className="border-[#22DB14] border rounded-lg p-5 font-mono text-lg py-2"> 
          Clear Your Cart
        </button>
        <Link to="/payment" className="border-[#22DB14] border rounded-lg p-5 font-mono text-lg py-2 text-center"> 
          Pay Now 
        </Link>
        </div>
        </> ) : ( <div className='py-5 text-center text-[#22DB14]'> 
          <h2 className='text-3xl font-mono'> NO DATA TO DISPLAY IT</h2>
        </div> ) }
      </div>
    </section>
  )
}

export default Cart
