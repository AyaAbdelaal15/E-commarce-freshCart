import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios, { Axios } from 'axios'
import toast from 'react-hot-toast'
import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { authContext } from '../../Context/AuthContext'

const Login = () => {
 const [loading , setLoading] = useState(false)
 const navigate = useNavigate()
 const {setToken} = useContext(authContext)
 const user =  {
  email: "",
  password: "",
  };

  const validation = Yup.object().shape(
    {
      email: Yup.string().required("Email is required").email("Enter valid email"),
      password: Yup.string().required("Password is required").matches(/^[a-zA-Z]{3,10}[0-9]{2,5}$/, " must be * Start with a letter (either uppercase or lowercase).* Be between 6 and 9 characters in total.* Can only contain letters (A-Z or a-z) and numbers (0-9)"),
    }
  )

  async function loginUser(values){
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin" , values
      );
      toast.success(res.data.message);
      navigate("/home")
      setToken(res.data.token)
      localStorage.setItem("tkn" , res.data.token)
      setLoading(false);
      
    } catch (error) {
      toast.error(error.response.data.message);
      setLoading(false);
    }
  }
  const formik = useFormik({
    initialValues: user,
    onSubmit: loginUser,
    validationSchema: validation,
  })
  return (
    <div className='py-3 mb-10 md:mt-14 mt-20'>
      <h1 className='mt-8 text-green-700 text-4xl font-bold text-center'>Log in Now:</h1>
      <div className='md:w-[80%] mx-auto md:p-0 p-5'>
        <form className='mt-8' onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="block mb-2">Email:</label>
            <input type="email" id="email" className="bg-transparent border text-sm rounded-lg block w-full p-2 focus:ring-green-400 focus:ring-2 focus:border-green-500" autoComplete='username'  value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          </div>
          {formik.errors.email && formik.touched.email ?(  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.email}
          </div>) : ("")
          }
          <div className="mb-3">
            <label htmlFor="password" className="block mb-2 ">Password:</label>
            <input type="password" id="password" className="bg-transparent border text-sm rounded-lg block w-full p-2 focus:ring-green-400 focus:ring-2 focus:border-green-500" autoComplete='current-password'  value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
          </div>
          {formik.errors.password && formik.touched.password ?(  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {formik.errors.password}
          </div>) : ("")
          }
          <div className='flex justify-end mt-5'>
            <button type="submit" className="text-white bg-[#3FA43F] border  hover:bg-[#3FA43F] font-medium rounded-lg text-sm px-5 py-2 me-2 mb-2">
              {loading == true ? (
                <div> <i className='fa-solid fa-spinner fa-spin text-white'></i></div> 
                ) : (
                  "Log in"
                )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
