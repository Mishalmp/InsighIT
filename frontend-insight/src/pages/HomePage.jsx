import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import techimg from "../assets/Setup-bro.svg";
import trending from "../assets/trending.svg";
import Blogcard from "../components/Userside/blogcard/blogcard";
import Footer from "../components/Userside/footer/footer";
import NavBarhome from "../components/Userside/NavBarhome/NavBar";
import NavBarall from "../components/Userside/NavBar/NavBar";
import Trending from "../assets/Reading book-bro.png";
import { TrendingBlogs } from "../services/BlogsApi";
import Usercardlist from "../components/Userside/usercardlist/Usercardlist";
import Technews from "../components/Technews/Technews";
export default function HomePage() {
  // const [toggle,setToggle]=useState(false)
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const FetchTrendingBlogs = async () => {
      try {
        const response = await TrendingBlogs();
        setBlogs(response.data);
        console.log(response.data, "responsss");
      } catch (error) {
        console.error("Error! fetching trending blogs", error);
      }
    };
    FetchTrendingBlogs();
  }, []);

  return (
    <div>
      <NavBarhome />
      <div className="w-full h-1 bg-white"></div>
      <div className="w-full bg-black">
        <div className="max-w-[1480px] m-auto grid md:grid-cols-2">
          <div className="flex-col md:ml-[10rem] space-y-4 md:space-y-10 mt-10 md:mt-[150px]">
            <h1 className="text-4xl text-white md:text-7xl font-serif font-bold text-center md:text-left">
              Stay{" "}
              <span className="text-4xl text-[#039368] md:text-7xl font-bold">
                Curious.
              </span>
            </h1>
            <p className="font-serif text-lg text-center text-white md:text-left max-w-[300px] md:w-[100%]">
              Discover stories, thinking, and expertise from writers on any Tech
              Related topic.
            </p>
            <button className="px-6 py-3 rounded-[25px] bg-[#039368] text-white block mx-auto md:mx-0">
              Start Reading
            </button>
          </div>
          <img
            className="max-h-[450px] mt-5 w-full "
            src={techimg}
            alt="Tech"
          />
        </div>
      </div>
      <div className="w-full h-[1.5px] bg-[#039368]"></div>
      <div className="max-w-[1480px] m-10 md:ml-[10rem]">
        <div className="flex flex-col ml-16 md:flex-row mt-4 md:mt-[10rem] gap-4">
          <img src={trending} className="w-[50px] h-[50px]" alt="Trending" />
          <h2 className="text-2xl md:text-3xl font-normal mt-2 md:mt-0">
            Trending Topics
          </h2>
        </div>
        <div className="mt-4 md:mt-8 md:ml-20 flex">
          <h3 className="font-semibold text-lg mt-20"># Web development</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 -ml-44 gap-4 md:w-[500px] content-center">
            {Array.from({ length: 5 }, (_, i) => (
              <li
                key={i}
                className="bg-gray-300 md:h-[40px] rounded-[28px] mt-4 md:mt-0 flex items-center justify-center"
              >
                <span className="text-xl">Web Development</span>
              </li>
            ))}
          </ul>
          <img src={Trending} className="w-[500px]" alt="trending img" />
        </div>

        <div className="max-w-[1100px] h-[0.5px] bg-gray-600 md:ml-[80px] mt-4 md:mt-10 mx-auto"></div>
        <Usercardlist />
        <Technews />

        <div className="mt-4 md:mt-[100px] ml-24">
          <div className="flex gap-4">
            <img src={trending} className="w-[50px] h-[50px]" alt="Trending" />
            <h2 className="text-2xl md:text-3xl font-normal mt-2 md:mt-0">
              Trending Blogs
            </h2>
          </div>

          <div className="mt-10 ">
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
              />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
