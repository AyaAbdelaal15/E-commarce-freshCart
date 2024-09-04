import axios from "axios"
import { useContext, useState } from "react"
import { cartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"

const Payment = () => {
    const [details , setDetails] = useState("")
    const [phone , setPhone] = useState("")
    const [city , setCity] = useState("")
    const {cartId , setNumOfItems , setProducts , setTotalPrice} = useContext(cartContext)
    async function cashPayment(){
        const x =  {
        shippingAddress:{
            details,
            phone,
            city
        }};
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}` ,
                x ,
                {
                    headers: {
                        token: localStorage.getItem("tkn")
                    }
                }
            )
            setNumOfItems(0);
            setProducts([]);
            setTotalPrice(0);
            toast.success(data.status)
        } catch (error) {
            error
        }
        
    }
    async function onlinePayment() {
        const x =  {
            shippingAddress:{
                details,
                phone,
                city
            }};
            try {
                const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173` ,
                    x ,
                    {
                        headers: {
                            token: localStorage.getItem("tkn")
                        }
                    }
                )
                window.open(data.session.url);
                toast.success(data.status)
                setNumOfItems(0);
                setProducts([]);
                setTotalPrice(0);
            } catch (error) {
                error
            }
    }
    return (
    <section className="py-10 lg:mt-14 mt-28 ">
        <h2 className="text-center text-3xl font-semibold text-sky-600">Payment</h2>
        <div className="w-[90%] md:w-[70%] mx-auto">
            <div className="mb-3">
                <label htmlFor="details" className="block mb-2">Details:</label>
                <input type="text" id="details" className="bg-transparent border text-sm rounded-lg block w-full p-2 focus:ring-sky-400 focus:ring-2 focus:border-sky-500" autoComplete='username' onChange={(e)=> setDetails(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="phone" className="block mb-2 ">Phone:</label>
                <input type="tel" id="phone" className="bg-transparent border text-sm rounded-lg block w-full p-2 focus:ring-sky-400 focus:ring-2 focus:border-sky-500" autoComplete='current-password' onChange={(e)=> setCity(e.target.value)}/>
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="block mb-2 ">City:</label>
                <input type="text" id="city" className="bg-transparent border text-sm rounded-lg block w-full p-2 focus:ring-sky-400 focus:ring-2 focus:border-sky-500" autoComplete='current-password'  onChange={(e)=> setPhone(e.target.value)}/>
            </div>
            <div className='flex md:flex-row md:justify-between md:items-center  flex-col md:space-x-5 '>
                <button  type="button" onClick={cashPayment} className="border-sky-500 w-full md:w-1/2 border rounded-lg font-mono text-lg py-1 mt-9 text-sky-500"> 
                Cash Payment
                </button>
                <button  type="button" onClick={onlinePayment} className="border-sky-500 w-full md:w-1/2 border rounded-lg font-mono text-lg py-1 mt-9 text-sky-500"> 
                Online Payment
                </button>
            </div>
            
        </div>
    </section>
  )
}

export default Payment
