import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import { jwtDecode } from 'jwt-decode'
import UnknownUser from '../../pages/UnknownUser/UnknownUser'
import { connectWebSocket, showAdminNotification } from '../../helpers/NotificationAdmin'

function AdminProtected() {
    const [notifications, setNotifications] = useState([]);
    
    const token=localStorage.getItem('token')

    if (token){
        const decode = jwtDecode(token)

        if (decode.role === 'user'){
            return <HomePage/>
        }else if(decode.role === 'admin'){
            useEffect(() => {
               
                const cleanupWebSocket = connectWebSocket(setNotifications, showAdminNotification);
          
                return () => {
                  cleanupWebSocket();
                };
          
            }, []);

            return <Outlet/>
        }
        }
        else{
            return <UnknownUser/>
    }
}

export default AdminProtected
