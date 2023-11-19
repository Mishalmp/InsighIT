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
  Input,
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
function Blogs() {

  const [blogs,setBlogs]=useState([])
  const [searchQuery, setSearchQuery] = useState('');
  // const [isSidebarFixed, setIsSidebarFixed] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     const scrollTop = window.scrollY;
  //     setIsSidebarFixed(scrollTop > 700);
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);

  useEffect(()=>{
    const FetchBlogs=async ()=>{
      try{
        const response=await ListBlogs(searchQuery)
        setBlogs(response.data)
        console.log(response.data,'resssssss');
      }catch (error){
        console.error("error! fetching blogs",error)
      }
    }
    FetchBlogs()
  },[searchQuery])

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log();
  };

  console.log(searchQuery,'search....')
  return (
    <div>
      <Navbar/>
      <div className='flex'>
      {/* <div className={`flex-grow ${isSidebarFixed ? 'ml-[28rem]' : ''}`}> */}
      <div>
      <Breadcrumbs/>
      <div className='flex'>

      <h1 className='font-bold text-5xl ml-[40%] mt-10'>Blogs</h1>
      <div className="w-full md:w-72 -mt-9 ml-28">
               <Input
                label="Search"
                icon={<MagnifyingGlassIcon   className="h-5 w-5" />}
                onChange={handleSearchChange}
                value={searchQuery}
                
                />
            </div>
                </div>
      <Blogfilter/>
      {blogs.map((blog)=>(

        <Blogcard 
        key={blog.id}
        id={blog.id}
        profile_img={blog.user_id.profile_img}
        user_premium={blog.user_id.is_premium}
        author={blog.user_id.first_name}
        date={blog.created_at}
        title={blog.title}
        content={blog.content}
        blog_image={blog.banner_img}
        topic={blog.topic.topic}
        likes={blog.likes}
        is_premium_blog={blog.is_premium_blog}
        />
      ))

      }
      </div>

    <Sidefooter/>
    </div>

    </div>
  )
}

export default Blogs
