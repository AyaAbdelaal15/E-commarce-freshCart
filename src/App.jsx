import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Login from './Components/Login/Login'
import Products from './Components/Products/Products'
import Categories from './Components/Categories/Categories'
import Brand from './Components/Brand/Brand'
import NotFound from './Components/NotFound/NotFound'
import Register from './Components/Register/Register'
import Home from'./Components/Home/Home'
import Cart from './Components/Cart/Cart'
import { Toaster } from 'react-hot-toast'
import AuthContext from './Context/AuthContext'
import CartContextProvider from './Context/CartContext'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import {QueryClientProvider , QueryClient} from 'react-query'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Payment from './Components/Payment/Payment'
import AllOrders from './Components/AllOrders/AllOrders'


function App() {
  const x =new QueryClient()
  const router =createBrowserRouter([
    {path: "E-commarce-freshCart" , element: <Layout/>, children:[
      {
        path: "/",
        element:(
          <Login/>
        ),
      },
      {
        path: "/home",
        element:(
        <ProtectedRoute> 
          <Home/>
        </ProtectedRoute> 
        ),
      },
      {
        path: "/products",
        element:(
        <ProtectedRoute>  
          <Products/>
        </ProtectedRoute> 
        ),
      },
      {
        path: "/brand",
        element:(
        <ProtectedRoute> 
          <Brand/>
        </ProtectedRoute>
        ),   
      },
      {
        path: "/categories",
        element:( 
        <ProtectedRoute> 
          <Categories/>
        </ProtectedRoute>
        ),   
      },
      {
        path: "/cart",
        element:( 
        <ProtectedRoute> 
          <Cart/>
        </ProtectedRoute> 
        ),   
      },
      {
        path: "/productDetails/:id",
        element:( 
        <ProtectedRoute> 
          <ProductDetails/>
        </ProtectedRoute> 
        ),   
      },
      {
        path: "/payment",
        element:( 
        <ProtectedRoute> 
          <Payment/>
        </ProtectedRoute> 
        ),   
      },
      {
        path: "/allOrders",
        element:( 
        <ProtectedRoute> 
          <AllOrders/>
        </ProtectedRoute> 
        ),   
      },
      {
        path: "/register",
        element: 
        <Register/>
      },
      {
        path: "/login",
        element: <Login/>
      },
      {
        path: "*",
        element: <NotFound/>
      },
    ]}
  ])
  return (
    <>
    <QueryClientProvider client={x}>
      <AuthContext>
        <CartContextProvider>
          <Toaster/>
          <RouterProvider router={router}/>
        </CartContextProvider>
      </AuthContext>  
    </QueryClientProvider>
    </>
  )
}

export default App
