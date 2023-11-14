import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Signup from './pages/User/Signup'
import LoginPage from './pages/User/LoginPage'
import ForgotPassword from './pages/User/ForgotPassword'
import ResetPassword from './pages/User/ResetPassword'
// import { Button } from "@material-tailwind/react";
import UnknownUser from './pages/UnknownUser/UnknownUser'
import PrivateRoutes from './routes/ProtectedRoutes/PrivateRoutes'
import UserRoutes from './routes/User'
import AdminRoutes from './routes/AdminRoutes'

function App() {
  

  return (
    <>
      <Router>
          <Routes>
            <Route element={<PrivateRoutes/>}>

            <Route path='/' exact element={<UnknownUser/>}/>
            <Route path='/login/' exact element={<LoginPage/>}/>
            <Route path='/signup/' exact element={<Signup/>}/>
            <Route path='/forgotpassword/' exact element={<ForgotPassword/>}/>
            <Route path='/resetpassword/' exact element={<ResetPassword/>}/>
            </Route>

            <Route path='/User/*'  element={<UserRoutes/>}/>
            <Route path='/admin/*' element={<AdminRoutes/>}/>


          </Routes>
  

      </Router>
    
  
    </>
  )
}

export default App
