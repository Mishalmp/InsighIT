
import React, { useEffect, useState } from "react";
import { GetBlogDetail,DeleteBlog } from '../../../services/BlogsApi'
import { useSelector } from "react-redux";
import { Card, Typography, Button } from "@material-tailwind/react";
import { useNavigate, useParams } from "react-router-dom";
import { Loader } from '../../../components/Loading/Loader';
import NavBar from "../../../components/Userside/NavBar/NavBar";
import Footer from "../../../components/Userside/footer/footer";
import Commentlist from "../../../components/Comment/commentlist";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IosShareIcon from '@mui/icons-material/IosShare';
import CommentIcon from '@mui/icons-material/Comment';
import { Breadcrumbs } from "@material-tailwind/react";
import Commentpost from "../../../components/Comment/commentpost";
import NotificationModal from "../../../components/Modal/NotificationModal";
import { Rating } from "@material-tailwind/react";
import {

    ChevronDownIcon,
    
  } from "@heroicons/react/24/solid";
  import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
   
  } from "@material-tailwind/react";
 
  import SettingsIcon from '@mui/icons-material/Settings';
  import DeleteIcon from '@mui/icons-material/Delete';
  
  
  import ReportIcon from '@mui/icons-material/Report';
import { toast } from "react-toastify";

   

function timeAgo(date) {
    const now = new Date();
    const timestamp = new Date(date);
    const elapsedMilliseconds = now - timestamp;
    const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);
  
    if (elapsedSeconds < 60) {
      return `${elapsedSeconds} seconds ago`;
    }
  
    const elapsedMinutes = Math.floor(elapsedSeconds / 60);
  
    if (elapsedMinutes < 60) {
      return `${elapsedMinutes} minutes ago`;
    }
  
    const elapsedHours = Math.floor(elapsedMinutes / 60);
  
    if (elapsedHours < 24) {
      return `${elapsedHours} hours ago`;
    }
  
    const elapsedDays = Math.floor(elapsedHours / 24);
    return `${elapsedDays} days ago`;
  }



function Blogdetail() {
    const {blogId}=useParams()
    const [blog,setBlog]=useState(null)
    const { userinfo } = useSelector((state) => state.user);
    const navigate=useNavigate()

    const [isMenuOpen, setIsMenuOpen] = useState(false);
 
    const closeMenu = () => setIsMenuOpen(false);

    useEffect(()=>{

        const FetchBlog=async()=>{
            try{
                const response = await GetBlogDetail(blogId)
                console.log(response.data,'response data');
                setBlog(response.data)
            }catch(error){
                console.error("error! fetching blog",error)
            }
        }
        FetchBlog()
      
    },[blogId])

    if (!blog) {
        
        return <Loader />;
    }

    const createdAtAgo = timeAgo(blog.created_at);
    const isAuthor = userinfo.id == blog.user_id.id;
    // console.log(isAuthor,userinfo.id,blog.user_id.id,'iseadfadsfa');
    // console.log(blog.is_premium_blog,'premiummmmmmmmmmmmm')
    // console.log(userinfo,'useree')


    const handleEdit =()=>{
        navigate(`/User/editblog/${blogId}`)

    }

    const handleDelete= async ()=>{
        try{
            const response = await DeleteBlog(blogId)
            toast.success("Blog deleted Successfully")
            navigate(`/User/myblogs/${userinfo.id}`)

            console.log(response.data,'ressdsds')
        }catch(error){
            toast.error("Error Occured while deleting")
            console.error("Error deleting blog:",error)
        }


    }
    

  return (
    <>
    <NavBar/>
    <div className="flex">

    <Breadcrumbs className="ml-24 mt-10">
   
      <a href="#" className="opacity-60">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      </a>
      <a href="#" className="opacity-60">
        <span>Blogs</span>
      </a>
      <a href="#">Blog_detail</a>
    </Breadcrumbs>
    <Typography className='font-bold text-5xl ml-[20%] mt-10'>Blog Detail</Typography>
   
    </div>
    <Card className="w-[60rem] m-20 ml-[15%]">
    <Typography className="text-3xl font-semibold text-center mb-6">{blog.title}</Typography>
    
    <div className='flex m-[50px] gap-10'>
    <img src={blog.user_id.profile_img} className="w-14 h-14 rounded-full"/>
    <div className='mt-3 flex gap-10'>
    <p className='font-semibold text-xl'>{blog.user_id.first_name} {blog.user_id.last_name}</p>

    <p className='text-gray-700'>{createdAtAgo}</p>

    <Rating value={4} className="-mt-5" />

    </div>
    
  </div>
  <hr/>
  <div className='md:mt-1 md:mb-1 md:ml-10 max-w-[55rem] h-12 flex justify-between items-center'>
    

<div className='bg-gray-300 md:h-[2rem] rounded-[28px] w-[200px] flex items-center justify-center'>
  <span className='text-xl'>{blog.topic.topic}</span>
</div>

<ul className='flex space-x-8'>
  <li className='flex items-center'>
    <ThumbUpOffAltIcon className='w-14 h-14 cursor-pointer'/>
    <span className='ml-2 text-gray-700'>{blog.likes}</span>
  </li>
  <li className='flex items-center'>
  <CommentIcon className='w-10 h-10 cursor-pointer'/>
  </li>
  <li className='flex items-center'>
    <BookmarkAddIcon  className='w-10 h-10 cursor-pointer'  />
  </li>
  <li className='flex items-center'>
  <IosShareIcon className='w-10 h-10 cursor-pointer'/>
  </li>
  <li className='flex items-center relative'>
       
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
         <MoreHorizIcon className='w-10 h-10 cursor-pointer'/>
        </Button>
      </MenuHandler>
      <MenuList className="p-1">

      <MenuItem className="flex items-center gap-2 rounded"> <ReportIcon className="h-4 w-4" /> 
      <Typography as="span"  variant="small" className="font-normal" color="inherit">Report Blog</Typography> 
      
      </MenuItem>

      {isAuthor && (
        <div>

      <MenuItem className="flex items-center gap-2 rounded" onClick={handleEdit}> <SettingsIcon className="h-4 w-4" /> 
      <Typography as="span"  variant="small" className="font-normal" color="inherit">Edit Blog</Typography> 
      
      </MenuItem>
      <MenuItem className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10" onClick={handleDelete}> <DeleteIcon className="h-4 w-4 text-red-500" /> 
      <Typography as="span"  variant="small" className="font-normal" color="red">Delete Blog</Typography> 
      {/* <NotificationModal
                                buttonText="Block"
                                modalTitle="Delete Confirmation"
                                modalHeading="Do you want to delete this Blog ?"
                                buttonColor="red"
                                modalContent="Note : This blog will permanently deleted"
                                onOkClick={handleDelete}
                              /> */}
      </MenuItem>

        </div>
        )}
   
     
         
          
     
       
      </MenuList>
    </Menu>
      
      </li>
  
 
 
</ul>

</div>
<hr />

    {blog.banner_img && (
      <img
        className="mb-6 rounded-lg ml-20 mt-8 w-[80%] h-[30rem]  object-cover object-center"
        src={blog.banner_img}
        alt="Banner Image"
        
      />
    )}
    <div dangerouslySetInnerHTML={{ __html: blog.content }} className="m-10" />

    <video className="h-[30rem] w-[50rem] m-20 mt-20 mb-10  rounded-lg" controls>
      <source src={blog.video_post} type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    
  </Card>
  <Commentlist blogId={blogId} isAuthor={isAuthor}/>
  
  <Footer/>
  </>
  )
}

export default Blogdetail
