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

import AdminLayout from './layouts/AdminLayout'
function AdminRoutes() {


  return (
    <Routes>
        <Route element={<PrivateRoutes/>}>
            <Route path='/adminlogin/' element={<AdminLogin/>} />

        </Route>

        <Route element={<AdminProtected/>}>
        <Route element={<AdminLayout/>}>

            <Route path='/adminhomepage/' element={<AdminHomePage/>} />
            <Route path='/userlist/' element={<UsersList/>} />
            <Route path='/blogreports/' element={<BlogReports/>} />
            <Route path='/premiumrequests/' element={<PremiumRequest/>} />
            <Route path='/premiumrequestview/:premiumId' element={<PremiumrequestView/>} />
            <Route path='/reportedissues/' element={<Bugreports/>} />
            <Route path='/adminwallet/' element={<WalletAdmin/>} />
            </Route>

        </Route>



    </Routes>
  )
}

export default AdminRoutes
