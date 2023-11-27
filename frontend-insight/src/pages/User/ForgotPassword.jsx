import React, { useState } from 'react'
import Bloggingimg from '../../assets/Forgot password-bro.png'
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { accountsapi } from '../../constants/constants';
// import {jwtDecode} from "jwt-decode";
// import { Loader } from '../../components/Loading/Loader';
import axios from 'axios';
import "react-toastify/dist/ReactToastify.css";
import NavBar from '../../components/Userside/NavBarhome/NavBar';
function ForgotPassword() {

    const navigate=useNavigate()
    
    const [form,setForm]=useState({email:''})

    // const emailInputRef=useRef(null)
    // // const passInputRef=useRef(null)

    // useEffect(() => {
    //     emailInputRef.current.focus();
    //     document.title = "Forgot Password | InsighIT";
    //   }, []);


      const validation = () => {
        if (form.email.trim() === "") {
          toast.error("email should not be empty");
          return false;
        } else if (!isValidEmail(form.email.trim())) {
          setForm([]);
        //   emailInputRef.current.focus();
          toast.warn("enter a valid email");
          return false;
        } 
    
        return true;
      };
    
      function isValidEmail(email) {
        const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return Regex.test(email);
      }

      const FormHandlerLogin= async (e)=>{
        e.preventDefault()

        if (validation()){
            try{
                const response=await axios.post(
                    accountsapi+"accounts/forgotpassword/",form
                )

                toast.success("Email has been sent !!")
                navigate("/login/")
                localStorage.setItem("user_id",response.data.user_id)
                setForm({email:''})
            }catch(error) {
                toast.error("Account not Found")
            }
            return true
        }


      }


  return (
    <>
    {/* {loading && <Loader/>} */}
<ToastContainer  />

<div className="min-h-screen flex">
<div className="w-1/2 outward-shadow bg-cover flex items-center justify-center" >
  <img className='max-h-[600px] m-5 w-[600px] ' src={Bloggingimg} alt="Blog img" />
</div>
<div className="w-1/2 flex items-center justify-center bg-white-100">
  <div className="bg-white p-8 rounded shadow-md w-96">
  <h2 className="text-2xl font-semibold text-center text-indigo-600">Forgot Password</h2>
      <form className="mt-4" onSubmit={FormHandlerLogin}>
        <div className="mb-4">
          <label className="block text-gray-600 text-sm font-medium mb-2">Enter Email</label>
          <input
          
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
            placeholder="enter email"
            name='email'
            value={form.email}
            onChange={(e)=>{
              setForm({...form,[e.target.name]:e.target.value})
            }}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Send Verification Mail
        </button>
      </form>
      <div className="text-center my-3">
              <p className="text-gray-600">Or</p>
            </div>
          
            <Link to='/login/'>
      <p className="text-center text-gray-600 mt-4">
       Continue to login <a className="text-indigo-600">
        Login
       </a>
      </p>
            </Link>
  </div>
</div>

</div>

    </>
  )
}

export default ForgotPassword
