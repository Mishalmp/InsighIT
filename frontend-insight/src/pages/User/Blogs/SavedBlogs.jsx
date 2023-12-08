import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Userside/NavBar/NavBar";
import Blogcard from "../../../components/Userside/blogcard/blogcard";
import Sidefooter from "../../../components/Userside/footer/Sidefooter";
import Blogfilter from "../../../components/Userside/sortbar/Blogfilter";
import { ListSaved } from "../../../services/BlogsApi";

import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { useParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import { Loader } from "../../../components/Loading/Loader";
import Sidebar from "../../../components/sidebar/Sidebar";
import Footer from '../../../components/Userside/footer/footer'
function SavedBlogs() {
  const [saved, setSaved] = useState(null);
  const { userinfo } = useSelector((state) => state.user);
  const { userId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const Fetchmyblogs = async () => {
      try {
        const response = await ListSaved(userId, searchQuery);
        setSaved(response.data);
        // console.log(response.data, "myblogssss");
      } catch (error) {
        console.error("error! fetching my blogs", error);
      }
    };
    Fetchmyblogs();
  }, [userId, searchQuery]);

  if (!saved) {
    return <Loader />;
  }


  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  console.log(saved, "my saved");
  return (
    <div>
      <Navbar />
      <div className="flex">
      <div className='bg-gray-50 mt-5 rounded-lg w-[60rem] ml-[5rem] mb-5 shadow-2xl'>
          <Breadcrumbs />
          <div className="flex">
            <h1 className="font-bold text-5xl  ml-[25rem] mt-10">
              Saved Blogs
            </h1>
            {/* <div className="md:w-72 -mt-9 ml-28">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div> */}
          </div>
          <Blogfilter />
          <div className='ml-[3rem]'>
          <div className="h-[60rem] w-[55rem] overflow-x-hidden overflow-y-auto mb-5">
            {saved.map((savedBlog) => (
              <Blogcard
                key={savedBlog.id}
                id={savedBlog.blog.id}
                profile_img={savedBlog.blog.user_id.profile_img}
                author={savedBlog.blog.user_id.first_name}
                date={savedBlog.created_at}
                title={savedBlog.blog.title}
                content={savedBlog.blog.content}
                blog_image={savedBlog.blog.banner_img}
                topic={savedBlog.blog.topic.topic}
                likes={savedBlog.blog.likes}
                is_premium_blog={savedBlog.blog.is_premium_blog}
                is_saved={true}
              />
            ))}
          </div>
        </div>

        
      </div>
      <Sidebar/>
    </div>
    <Footer/>
    </div>
  );
}

export default SavedBlogs;
