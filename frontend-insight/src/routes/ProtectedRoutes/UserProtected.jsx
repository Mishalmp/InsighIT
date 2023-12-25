import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { Outlet } from 'react-router-dom'
import UnknownUser from "../../pages/UnknownUser/UnknownUser";
import AdminHomePage from "../../pages/Admin/AdminHomePage";
import { connectWebSocket, showNotification } from '../../helpers/Notificationuser';
import { useSelector } from "react-redux";
function UserProtected() {
    const token = localStorage.getItem('token')
    const [notifications, setNotifications] = useState([]);
    const {userinfo} = useSelector((state)=>state.user)
    if (token){
        const decoded = jwtDecode(token)
       
        if (decoded.role === 'user'){

            useEffect(() => {
               
                  const cleanupWebSocket = connectWebSocket(userinfo.id, setNotifications, showNotification);
            
                  return () => {
                    cleanupWebSocket();
                  };
            
              }, [userinfo.id]);


            return <Outlet/>
        }else if(decoded.role === 'admin'){
            return <AdminHomePage/>
        }
    }else{
        return <UnknownUser/>
    }
 
}

export default UserProtected
