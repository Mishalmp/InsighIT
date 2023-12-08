import React from "react"
import { Routes, Route } from 'react-router-dom'
import LoginPage from "../pages/User/LoginPage"
import Signup from "../pages/User/Signup"
import ForgotPassword from "../pages/User/ForgotPassword"
import ResetPassword from "../pages/User/ResetPassword"
import UserProtected from "./ProtectedRoutes/UserProtected"
import PrivateRoutes from "./ProtectedRoutes/PrivateRoutes"
import HomePage from "../pages/HomePage"
import Blogs from "../pages/User/Blogs/Blogs"
import UserProfile from "../pages/User/Profile/UserProfile"
import UserproEdit from "../pages/User/Profile/UserproEdit"
import UserBlogCreate from "../pages/User/Blogs/UserBlogCreate"
import Blogdetail from "../pages/User/Blogs/Blogdetail"
import MyBlogs from "../pages/User/Blogs/MyBlogs"
import EditBlog from "../pages/User/Blogs/EditBlog"
import Dummy from "../pages/User/Blogs/Dummy"
import Upgradationform from "../pages/PremiumUser.jsx/Upgradationform"




import Paymentresult from "../components/Payment/Paymentresult"
import OtherProfile from "../pages/User/Profile/OtherProfile/OtherProfile"
import SavedBlogs from "../pages/User/Blogs/SavedBlogs"

import Chat from "../pages/User/Chat/Chat"
import Community from "../pages/User/Community/Community"
import SearchUser from "../components/searchuser/SearchUser"
import ReportIssue from "../pages/User/ReportIssue/ReportIssue"
import Sidebar from "../components/sidebar/Sidebar"
import PremiumRequest from "../pages/Admin/PremiumRequest/PremiumRequest"
import Technews from "../components/Technews/Technews"

function UserRoutes() {
    

    return(
     <Routes>
        
        <Route exact element={<PrivateRoutes/>}>
            <Route path="/login"  element={<LoginPage/>} />
            <Route path="/signup"  element={<Signup/>} />
            <Route path="/forgotpassword"  element={<ForgotPassword/>} />
            <Route path="/resetpassword"  element={<ResetPassword/>} />

        </Route>

        <Route exact element={<UserProtected/>}>
            <Route path="/Home" element={<HomePage/>} />
            <Route path="/blogs" element={<Blogs/>} />
            <Route path="/userprofile" element={<UserProfile/>}/>
            <Route path="/userprofileedit" element={<UserproEdit/>}/>
            <Route path="usercreateblog" element={<UserBlogCreate/>}/>
            <Route path="detailblog/:blogId" element={<Blogdetail/>}/>
            <Route path="myblogs/:userId" element={<MyBlogs/>}/>
            <Route path="saved/:userId" element={<SavedBlogs/>}/>
            <Route path="editblog/:blogId" element={<EditBlog/>}/>
            <Route path="dummy/" element={<Technews/>}/>    
            <Route path="reportissue/" element={<ReportIssue/>}/>    
            <Route path="community/" element={<Community/>}/>    
            <Route path="chat/" element={<Chat/>}/>
            <Route path="result/" element={<Paymentresult/>}/>
            <Route path="upgradeform/" element={<Upgradationform/>}/>
            <Route path="authorprofile/:authorId" element={<OtherProfile/>}/>
          
            
        </Route>
        
        
        </Routes>
    )
}

export default UserRoutes   