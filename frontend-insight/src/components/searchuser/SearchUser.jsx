import React, { useEffect, useRef, useState } from "react";


import { ListUser } from "../../services/AdminApi";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link, useNavigate } from "react-router-dom";

function SearchUser({ searchresultopen,searchQuery,userinfo,setsearchresultopen }) {

    const navigate= useNavigate()
    const searchUserRef = useRef(null);

    const [users,setUsers]=useState([])

    useEffect(()=>{

        fetchUsers()

    },[searchQuery])

    const fetchUsers=async()=>{
        try {
            
            const res=await ListUser(searchQuery)
            setUsers(res.data)

        } catch (error) {
            console.error(error);
        }
    }
    // useEffect(() => {
    //     const handleOutsideClick = (e) => {
    //       if (
    //         searchUserRef.current &&
    //         !searchUserRef.current.contains(e.target)
    //       ) {
    //         // Clicked outside of SearchUser component
    //         // Close the SearchUser component
    //         setsearchresultopen(false);
    //       }
    //     };
    
    //     // Add event listener when the component mounts
    //     document.addEventListener("click", handleOutsideClick);
    
    //     // Remove event listener when the component unmounts
    //     return () => {
    //       document.removeEventListener("click", handleOutsideClick);
    //     };
    //   }, []);


  return (
    <div
    ref={searchUserRef}
    className={`${
        searchresultopen
          ? "absolute ml-40 z-[100] mt-2 overflow-y-auto max-h-[24rem] min-h-[6rem] flex flex-col text-gray-700 bg-gray-50 shadow-md w-[26rem] rounded-xl bg-clip-border"
          : "hidden"
      }`}
    >
      <nav className="flex min-w-[240px] flex-col gap-1 p-2 font-sans text-base font-normal text-blue-gray-700">
        {users.length > 0 ?
        users.map((user)=>(
            <div
            // key={user.id}
            role="button"
            className="flex items-center w-full p-3 leading-tight transition-all rounded-lg outline-none text-start hover:bg-blue-gray-50 hover:bg-opacity-80 hover:text-blue-gray-900 focus:bg-blue-gray-50 focus:bg-opacity-80 focus:text-blue-gray-900 active:bg-blue-gray-50 active:bg-opacity-80 active:text-blue-gray-900"
            onClick={()=>{
                if (user.id === userinfo.id){
                    navigate('/User/userprofile')
                }else{
                    navigate(`/User/authorprofile/${user.id}`)
                }
            }}
          >
            
            <div className="grid mr-4 place-items-center">
              <img
                alt="candice"
                src={`${user.profile_img ? user.profile_img:"https://docs.material-tailwind.com/img/face-1.jpg"}`}
                className="relative inline-block h-12 w-12 !rounded-full  object-cover object-center"
              />
            </div>
            <div className="flex-col gap-5">
              <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                {user.first_name+' '+user.last_name} {user.is_premium && <VerifiedIcon color="primary" fontSize="small" className="-mt-1 ml-2" />}
              </h6>
              <p className="text-gray-700 text-md font-serif">{user.email}</p>
              <p className="block font-sans mt-2 text-sm antialiased font-normal leading-normal text-blue-gray-700">
                {user.tag_name}
              </p>
            </div>
          </div>

        )):(
            <p className="font-semibold text-center text-lg mt-6">no User found</p>
        )

        }
  
 
      </nav>
    </div>
  );
}

export default SearchUser;
