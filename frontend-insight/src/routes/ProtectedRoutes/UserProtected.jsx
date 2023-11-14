import { jwtDecode } from "jwt-decode";
import React from "react";
import { Outlet } from 'react-router-dom'
import UnknownUser from "../../pages/UnknownUser/UnknownUser";
import AdminHomePage from "../../pages/Admin/AdminHomePage";


function UserProtected() {
    const token = localStorage.getItem('token')
    if (token){
        const decoded = jwtDecode(token)
        if (decoded.role === 'user'){
            return <Outlet/>
        }else if(decoded.role === 'admin' && decoded.is_superuser){
            return <AdminHomePage/>
        }
    }else{
        return <UnknownUser/>
    }
 
}

export default UserProtected
