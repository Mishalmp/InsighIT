import React from 'react'

import { Route,Routes } from 'react-router-dom'
import AdminProtected from './ProtectedRoutes/AdminProtected'
import PrivateRoutes from './ProtectedRoutes/PrivateRoutes'
import AdminHomePage from '../pages/Admin/AdminHomePage'
import AdminLogin from '../pages/Admin/AdminLogin'
import UsersList from '../pages/Admin/UsersList'
import BlogReports from '../pages/Admin/Reports/BlogReports'
import PremiumRequest from '../pages/Admin/PremiumRequest/PremiumRequest'
import PremiumrequestView from '../pages/Admin/PremiumRequest/PremiumrequestView'
import Bugreports from '../pages/Admin/Reports/Bugreports' 
import WalletAdmin from '../pages/Admin/Dashboard/Wallet'
import { w3cwebsocket as W3CWebSocket } from "websocket";
import { wsurl } from '../constants/constants';
import { ToastContainer, toast } from "react-toastify";

function AdminRoutes() {

  const socket = new W3CWebSocket(`${wsurl}ws/notifications/`);

  socket.onopen = function () {
    console.log('WebSocket Connection Opened');
  };
  
  socket.onmessage = function (event) {
    const data = JSON.parse(event.data);
    console.log('WebSocket Message Received:', data);
    
    if (data) {
      toast.success(data.message);
    }
  };
  
  socket.onclose = function () {
    console.log('WebSocket Connection Closed');
    // Handle reconnection or other logic as needed
  };
  
  socket.onerror = function (error) {
    console.error('WebSocket Error:', error);
  };

  return (
    <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path='/adminlogin/' element={<AdminLogin/>} />

        </Route>

        <Route element={<AdminProtected/>}>

            <Route path='/adminhomepage/' element={<AdminHomePage/>} />
            <Route path='/userlist/' element={<UsersList/>} />
            <Route path='/blogreports/' element={<BlogReports/>} />
            <Route path='/premiumrequests/' element={<PremiumRequest/>} />
            <Route path='/premiumrequestview/:premiumId' element={<PremiumrequestView/>} />
            <Route path='/reportedissues/' element={<Bugreports/>} />
            <Route path='/adminwallet/' element={<WalletAdmin/>} />

        </Route>



    </Routes>
  )
}

export default AdminRoutes
