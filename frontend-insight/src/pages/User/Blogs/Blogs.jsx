import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/Userside/NavBar/NavBar'
import Blogcard from '../../../components/Userside/blogcard/blogcard'
import Sidefooter from '../../../components/Userside/footer/Sidefooter'
import Blogfilter from '../../../components/Userside/sortbar/Blogfilter'
import { ListBlogs } from '../../../services/BlogsApi'
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs'
import {
  // Card,
  // CardHeader,
  Input, Typography,
  // Typography,
  // Button,
  // CardBody,
  // Chip,
  // CardFooter,
  // Tabs,
  // TabsHeader,
  // Tab,
  // Avatar,
  // IconButton,
  // Tooltip,
} from "@material-tailwind/react";
import Footer from '../../../components/Userside/footer/footer'
import Sortorder from "../../../components/Userside/sortbar/sortorder"
import Sidebar from '../../../components/sidebar/Sidebar'
function Blogs() {

  const [blogs,setBlogs]=useState([])
  const [searchQuery, setSearchQuery] = useState('');
  const [sort, setSort] = useState('latest');


  useEffect(()=>{
    const FetchBlogs=async ()=>{
      try{
        const response=await ListBlogs(searchQuery,"",sort)
        setBlogs(response.data)
        
      }catch (error){
        console.error("error! fetching blogs",error)
      }
    }
    FetchBlogs()
  },[searchQuery,sort])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log();
  };

 
  return (
    <div className='bg-white '>
      <Navbar/>
      <div className='flex'>
      {/* <div className={`flex-grow ${isSidebarFixed ? 'ml-[28rem]' : ''}`}> */}
      <div className='bg-gray-50 mt-5 rounded-lg w-[60rem] ml-[5rem] mb-5 shadow-2xl'>
      <Breadcrumbs/>
      <div className="flex">
            <h1 className="font-bold text-5xl  ml-[20rem] mt-10">Blogs</h1>
            <div className="md:w-72 mt-12 ml-[8rem] ">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
      <Blogfilter ListBlogs={ListBlogs} setBlogs={setBlogs} searchQuery={searchQuery} sort={sort} />
      <div className='ml-[3rem]'>
      <Sortorder setSort={setSort} sort={sort} />

     <div className='h-[75rem] w-[55rem] overflow-x-hidden overflow-y-auto mb-5 hidescroll'>
      {blogs.length > 0 ?
      blogs.map((blog)=>(
        
        <Blogcard 
        key={blog.id}
        id={blog.id}
        profile_img={blog.user_id.profile_img}
        user_premium={blog.user_id.is_premium}
        author={blog.user_id.first_name+" "+blog.user_id.last_name}
        date={blog.created_at}
        title={blog.title}
        content={blog.content}
        blog_image={blog.banner_img}
        topic={blog.topic.topic}
        likes={blog.likes}
        is_premium_blog={blog.is_premium_blog}
        />
      )):(
        <Typography variant='h3' className='text-center'>No Data Found</Typography>
      )

      }
      </div>
       </div>
      </div>
     

    <Sidebar/>
     
    </div>
    <Footer/>
    </div>
  )
}

export default Blogs
