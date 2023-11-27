import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Userside/NavBar/NavBar";
import Blogcard from "../../../components/Userside/blogcard/blogcard";
import Sidefooter from "../../../components/Userside/footer/Sidefooter";
import Blogfilter from "../../../components/Userside/sortbar/Blogfilter";
import { GetBlogsByUser } from "../../../services/BlogsApi";

import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { useParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
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
function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const { userinfo } = useSelector((state) => state.user);
  const { userId } = useParams();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const Fetchmyblogs = async () => {
      try {
        const response = await GetBlogsByUser(userId,searchQuery);
        setBlogs(response.data);
        console.log(response.data, "myblogssss");
      } catch (error) {
        console.error("error! fetching my blogs", error);
      }
    };
    Fetchmyblogs();
  }, [userId,searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log();
  };

  return (
    <div>
      <Navbar />
      <div className="flex">
        <div>
          <Breadcrumbs />
          <div className="flex">
            <h1 className="font-bold text-5xl  ml-[25rem] mt-10">My Blogs</h1>
            <div className="md:w-72 -mt-9 ml-28">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <Blogfilter />
          <div className='ml-[10%]'>
          {blogs.map((blog) => (
            <Blogcard
              key={blog.id}
              id={blog.id}
              profile_img={blog.user_id.profile_img}
              author={blog.user_id.first_name}
              date={blog.created_at}
              title={blog.title}
              content={blog.content}
              blog_image={blog.banner_img}
              topic={blog.topic.topic}
              likes={blog.likes}
              is_premium_blog={blog.is_premium_blog}
            />
          ))}
          </div>
        </div>

        <Sidefooter />
      </div>
    </div>
  );
}

export default MyBlogs;
