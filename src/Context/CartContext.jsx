import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { authContext } from './AuthContext';
export const cartContext = createContext()
const CartContextProvider = ({children}) => {
    const [numOfItems , setNumOfItems] = useState(0);
    const [products , setProducts] = useState([]);
    const [totalPrice , setTotalPrice] = useState(0);
    const [cartId , setCartId] = useState(0);
    const {token} = useContext(authContext);
    async function addProduct(productId) {
        try {
            const {data} = await axios.post("https://ecommerce.routemisr.com/api/v1/cart" , 
                {
                    productId: productId
                },  
                {
                    headers:{
                        token: localStorage.getItem("tkn")
                    },
                },
            );
            getUserCart()
            return data
        } catch (error) {
        }
    }
    async function getUserCart() {
        try {
            const {data} = await axios.get("https://ecommerce.routemisr.com/api/v1/cart" , {
                headers:{
                    token: localStorage.getItem("tkn")
                }
            });
            setNumOfItems(data.numOfCartItems);
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
            setCartId(data.data._id);
            return(data)
        } catch (error) {
        }
    }
    useEffect(function(){
        if(token != null){
            getUserCart();
        }
    },[token])
    async function updateCart(id , count){
        try {
            let {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , 
                {
                    count: count
                },
                {
                    headers:{
                        token : localStorage.getItem("tkn")
                    }
                }  
            );
            setNumOfItems(data.numOfCartItems);
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
            setCartId(data.data._id);
            return data;
        } catch (error) {
            
        }
    }
    async function clearCart() {
        try {
            const {data} = await axios.delete("https://ecommerce.routemisr.com/api/v1/cart" , {
                headers:{
                    token : localStorage.getItem("tkn")
                }
            });
            setNumOfItems(0);
            setProducts([]);
            setTotalPrice(0);
            return data 
        } catch (error) {
            
        }
    }
    async function deleteItem(id) {
        try {
            const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}` , {
                headers:{
                    token : localStorage.getItem("tkn")
                }
            });
            setNumOfItems(data.numOfCartItems);
            setProducts(data.data.products);
            setTotalPrice(data.data.totalCartPrice);
            setCartId(data.data._id);
            return data 
        } catch (error) {
            
        }
    }
    
  return (
    <cartContext.Provider value={{addProduct , products , totalPrice , numOfItems , updateCart , deleteItem , clearCart , cartId , setNumOfItems , setTotalPrice , setProducts}}>
      {children}
    </cartContext.Provider>
  )
}

export default CartContextProvider
