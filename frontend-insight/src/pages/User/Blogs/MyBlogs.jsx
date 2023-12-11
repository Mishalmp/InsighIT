import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Userside/NavBar/NavBar";
import Blogcard from "../../../components/Userside/blogcard/blogcard";
import Sidefooter from "../../../components/Userside/footer/Sidefooter";
import Blogfilter from "../../../components/Userside/sortbar/Blogfilter";
import { GetBlogsByUser } from "../../../services/BlogsApi";
import Footer from '../../../components/Userside/footer/footer'
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import { useParams } from "react-router-dom";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import {
  // Card,
  // CardHeader,
  Input,
  Typography,
  // Button,
  // CardBody,
  // Chip,
  // CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  // Avatar,
  // IconButton,
  // Tooltip,
} from "@material-tailwind/react";
import Sidebar from "../../../components/sidebar/Sidebar";
function MyBlogs() {
  const [blogs, setBlogs] = useState([]);
  const { userinfo } = useSelector((state) => state.user);
  const { userId } = useParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedfilter,setSelectedfilter]=useState('')

  useEffect(() => {
    const Fetchmyblogs = async () => {
      try {
        const response = await GetBlogsByUser(userId, searchQuery, "",selectedfilter);
        setBlogs(response.data);
        console.log(response.data, "myblogssss");
      } catch (error) {
        console.error("error! fetching my blogs", error);
      }
    };
    Fetchmyblogs();
  }, [userId, searchQuery,selectedfilter]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    console.log();
  };

  const TABS = [
    {
      label: "All",
      value: "",
    },
    {
      label: "Visible",
      value: "visible",
    },
    {
      label: "Hidden",
      value: "hidden",
    }];

  return (
    <div>
      <Navbar />
      <div className="flex">
      <div className='bg-gray-50 mt-5 rounded-lg w-[60rem] ml-[5rem] mb-5 shadow-2xl'>
          <Breadcrumbs />
          <div className="flex">
            <h1 className="font-bold text-5xl  ml-[20rem] mt-10">My Blogs</h1>
            <div className="md:w-64 mt-12 ml-32">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          <Tabs value="all" className="w-full md:w-max ml-10 mt-10">
              <TabsHeader>
                {TABS.map(({ label, value }) => (
                  <Tab key={value} value={value} onClick={()=>setSelectedfilter(value)}>
                    &nbsp;&nbsp;{label}&nbsp;&nbsp;
                  </Tab>
                ))}
              </TabsHeader>
            </Tabs>

          <Blogfilter
            ListBlogs={GetBlogsByUser}
            userId={userId}
            setBlogs={setBlogs}
            searchQuery={searchQuery}
          />
          <div className='ml-[3rem]'>
          <div className="h-[75rem] w-[55rem] overflow-x-hidden overflow-y-auto mb-5">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
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
              ))
            ) : (
              <Typography variant="h3" className="text-center">
                No Data Found
              </Typography>
            )}
          </div>
          </div>
        </div>

    
        <Sidebar/>
        
      </div>
      <Footer/>
    </div>
  );
}

export default MyBlogs;
