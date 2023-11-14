import React, { useState } from 'react'
import { Input } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { Loader } from '../../components/Loading/Loader';
import { jwtDecode } from 'jwt-decode';
import { AdminSignIn } from '../../services/AdminApi';


function AdminLogin() {

    const navigate = useNavigate()
    const [form,setForm]=useState({ email:'',password:''})
    const [loading,setLoading]=useState()
    const Handleloading =()=>setLoading((cur)=>!cur)

    const ValidateForm=()=>{
        if (form.email.trim() === ''){
            toast.error("email cannot be empty!!!")
            return false
        }else if(form.password.trim() === ''){
            toast.error("password cannot be empty!!!")
            return false
        }else if (!isValidEmail(form.email)){
            toast.error("Enter valid email")
            return false
        }
        return true

    }

    function isValidEmail(email){
        const Regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return Regex.test(email);

    }

    const FormHandlerLogin = async (e)=>{
        e.preventDefault();

        if (ValidateForm()){
            
            Handleloading();

            AdminSignIn(form).then((res)=>{
                if (res.status === 200){
                    const token = JSON.stringify(res.data)
                    const decoded = jwtDecode(token)
                    console.log(decoded,'decccooo')
                    Handleloading()

                    if (decoded.role === 'admin' && decoded.is_superuser){
                        localStorage.setItem("token",token)
                        toast.success('Admin Logged in Successfully!!!')
                        navigate('/admin/adminhomepage/')
                        
                    }else{
                        toast.error("Invalid Credentials!!!")
                    }
                }else{
                    Handleloading()
                    toast.error(
                        "Invalid login credentials"
                    )
                }
            })

        }
       
    }

  return (
    <>
    {loading && <Loader/>}
    <ToastContainer/>
    <div className="h-screen w-full flex justify-center items-center">
    <div className="outward-shadow bg-white w-2/4 h-3/4 sm:w-1/3 flex justify-center items-center">
      <form
        className="space-y-8 sm:w-52 lg:w-80 xl:w-96 mt-4"
        action=""
        onSubmit={FormHandlerLogin}
      >
        <h1 className="text-2xl font-bold mb-8 text-center text-gray-600">
          ADMIN Login
        </h1>
        <Input
          
          id="email"
          name='email'
          value={form.email}
          className=""
          variant="standard"
          label="Email"
          onChange={(e)=>{
            setForm({...form,[e.target.name]:e.target.value});
          }}
         
        />
        <Input
          name="password"
          value={form.password}
          id="password"
          variant="standard"
          label="Password"
          onChange={(e)=>{
            setForm({...form,[e.target.name]:e.target.value})

          }}
         
        />
        <div className="flex justify-end">
          <a href="#" className="text-gray-400 hover:text-gray-600 text-sm">
            Forgot password?
          </a>
        </div>
        <button className="w-11/12 bg-gray-700 text-white mx-4 my-6 px-4 py-2 rounded-full hover:bg-red-600">
          Login
        </button>
      </form>
    </div>
  </div>
  </>
  )
}

export default AdminLogin
