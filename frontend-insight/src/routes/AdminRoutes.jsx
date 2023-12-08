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

function AdminRoutes() {
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

        </Route>



    </Routes>
  )
}

export default AdminRoutes
