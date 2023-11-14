import React, { useState } from 'react'
import NavBar from '../../../components/Userside/NavBar/NavBar'
import Footer from '../../../components/Userside/footer/footer'
import { Input } from "@material-tailwind/react";

import { Loader } from "../../../components/Loading/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setUpdateInfo } from "../../../Redux/UserSlice";
import { UpdateUser } from "../../../services/UserApi";
function UserproEdit() {


    const { userinfo } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [user,setUser]=useState({
        id:userinfo.id,
        first_name:userinfo.first_name,
        last_name:userinfo.last_name,
        email:userinfo.email,
        role:userinfo.role,
        is_active:userinfo.is_active,
        is_google:userinfo.is_google,
        bio:userinfo.bio,
        profile_img:userinfo.profile_img,
        cover_img:userinfo.cover_img
    })
    console.log(user,'initial state');

    const dispatch = useDispatch();
    const handleloading = () => setLoading((cur) => !cur);

    const userUpdate=async ()=>{
        handleloading()

        try{
            const id = userinfo.id;
            const res = await UpdateUser(id,user);
            dispatch(
                setUpdateInfo({
                    updatedData:{
                        userinfo:res.data
                    }
                })
                
            )
            handleloading();
                console.log(res.data,'resdataredux');
        }catch (error){
            console.log(error)
        }

        
    }


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({
          ...user,
          [name]: value
        });
      };


    //   const handleprofileimgUpload = async (file) => {
    //     handleloading();
    //     try {
    //       const id = userinfo.id;
    //       const formData = new FormData();
    //       formData.append("profile_img", file);
    //       const res = await UpdateUser(id, formData);
    
    //       console.log(res, "proimg resss");
    
    //       dispatch(
    //         setUpdateInfo({
    //           updatedData: {
    //             userinfo: { profile_img: res.data.profile_img },
    //           },
    //         })
    //       );
    //       handleloading();
    //       console.log(res.data, "dispatch");
    //     } catch (error) {
    //       handleloading();
    //       console.log(error);
    //     }
    //   };

    //   const handlecoverimgUpload = async (file) => {
    //     handleloading();
    //     try {
    //       const id = userinfo.id;
    //       const formData = new FormData();
    //       formData.append("cover_img", file);
    //       const res = await UpdateUser(id, formData);
    //       //   console.log(res.data, "resdaata");
    
    //       dispatch(
    //         setUpdateInfo({
    //           updatedData: {
    //             userinfo: { cover_img: res.data.cover_img },
    //           },
    //         })
    //       );
    //       handleloading();
    //       //   console.log(res.data, "resdaata2222");
    //     } catch (error) {
    //       handleloading();
    //       console.log(error);
    //     }
    //   };

  return (
    <div>
        <NavBar/>
      
<form className='m-16' onSubmit={userUpdate}>
    <div class="grid gap-6 mb-6 md:grid-cols-2">
    <div className="w-72">
    <Input variant="standard" name='first_name' value={user.first_name} onChange={handleInputChange} size='lg' label="First Name" />
    </div>
    <div className="w-72">
      <Input label="Last Name" name='last_name' value={user.last_name} onChange={handleInputChange} variant="standard" size="lg"  />
    </div>
    <div className="w-72">
      <Input label="Email" variant="standard" size="lg" disabled={true} />
    </div>
    <div className="w-72">
      <Input label="Password"  variant="standard" size="lg"  />
    </div>
    <div className="w-72">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Profile Img</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
    </div>
    <div className="w-72">
    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white" for="file_input">Cover Img</label>
<input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="file_input_help" id="file_input" type="file"/>
    </div>
    <div>
        
<label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your Bio..."></textarea>

    </div>

    </div>
    <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
</form>

    <Footer/>
    </div>
  )
}

export default UserproEdit