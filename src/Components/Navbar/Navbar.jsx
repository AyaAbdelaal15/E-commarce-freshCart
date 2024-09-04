import { useContext, useState } from "react";
import logo from "./../../assets/freshcart-logo.svg"
import { NavLink, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import { cartContext } from "../../Context/CartContext";
const Navbar = () => {
    const {setToken , token} = useContext(authContext)
    const {numOfItems} = useContext(cartContext)
    const [open , setOpen] = useState(false);
    const toggleMenue = () =>{
      setOpen(!open)
    } 
    const navigate =useNavigate()
    function logout(){
      localStorage.removeItem("tkn"); 
      setToken(null);
      navigate("login")
    }
  return (
   <nav className='bg-gray-200  top-0 inset-x-0 py-3 text-center capitalize sticky z-[999]' >
    <div className="container   text-gray-500  ">
      <div className='flex flex-col md:flex-row space-x-3 justify-evenly'>
        <div className="flex justify-between items-center mb-5 md:mb-0">
        <img src={logo} width={120} alt="freshCart" className="lg:ms-10 md:ms-6 ms-3"/>
        <button onClick={toggleMenue} className="icon md:hidden text-2xl text-black mr-3"> <i class="fa-solid fa-bars"></i> </button>
        </div>
        <div className={open ? 'flex flex-col md:flex-row' : "hidden md:flex "}>
        <ul  className="flex flex-col md:space-x-2 md:flex-row  space-x-2">
        {token ? <>
          <li><NavLink to="home">Home</NavLink></li>
          <li><NavLink to="cart">cart</NavLink></li>
          <li><NavLink to="allOrders">all Orders</NavLink></li>
          <li><NavLink to="products">products</NavLink></li>
          <li><NavLink to="categories">categories</NavLink></li>
          <li><NavLink to="brand">brands</NavLink></li>
        </> : ""} 
        </ul>
        </div>
        <div className={open ? "flex flex-col md:flex-row" : "hidden md:flex md:flex-row"}>
        <ul className='flex flex-col md:flex-row md:space-x-2 items-center'>
          <li className='flex space-x-2 text-black'>
            <i className='fab fa-facebook-f'></i>
            <i className='fab fa-linkedin-in'></i>
            <i className='fab fa-youtube'></i>
            <i className='fab fa-twitter'></i>
            <i className='fab fa-instagram'></i>
          </li>
          {token ?
        <>
            <li className='space-x-2 text-black'>
              <NavLink className="lg:mt-0 relative text-xl" to='/cart'>
               <i className="fa-solid fa-cart-shopping text-xl"></i>
               <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-[#6FB76F] border-2 border-white rounded-full -top-3 -end-3 "> 
                {numOfItems} 
               </div> 
               </NavLink> </li>
            <li className='space-x-2 text-black'><button onClick={logout} className="lg:mt-0">log out</button> </li>
            </>
            : 
            <>
            <li className="space-x-2"><NavLink to="register"> Register </NavLink> </li>
            <li className="space-x-2"><NavLink to="login">log in</NavLink> </li>
           </>
        }
        </ul>
      </div>
      </div>
      
    </div>
  </nav>
  )
}

export default Navbar
