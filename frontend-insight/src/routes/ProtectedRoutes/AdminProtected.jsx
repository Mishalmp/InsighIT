import React from 'react'
import { Outlet } from 'react-router-dom'
import HomePage from '../../pages/HomePage'
import { jwtDecode } from 'jwt-decode'
import UnknownUser from '../../pages/UnknownUser/UnknownUser'

function AdminProtected() {
    
    const token=localStorage.getItem('token')

    if (token){
        const decode = jwtDecode(token)

        if (decode.role === 'user'){
            return <HomePage/>
        }else if(decode.role === 'admin' && decode.is_superuser){
            return <Outlet/>
        }
        }
        else{
            return <UnknownUser/>
    }
}

export default AdminProtected
