import React, { useEffect, useState } from "react";
import NavBar from "../../../components/Userside/NavBar/NavBar";
import Footer from "../../../components/Userside/footer/footer";
import Sidefooter from "../../../components/Userside/footer/Sidefooter";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Breadcrumbs from "../../../components/Breadcrumbs/Breadcrumbs";
import EditIcon from "@mui/icons-material/Edit";
import {
  // Card,
  // CardHeader,
  Input,
  Typography,
  
  Button,
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

import CommunityCard from "../../../components/Community/Community";
import AddCommunity from "../../../components/Community/AddCommunity";
import { useSelector } from "react-redux";
import { ListCommunities } from "../../../services/BlogsApi";
import { toast } from "react-toastify";
import Sidebar from "../../../components/sidebar/Sidebar";

function Community() {
  const { userinfo } = useSelector((state) => state.user);

  const [communities, setCommunities] = useState([]);

  const [isaddformopen, setIsaddformopen] = useState(false);
  
  const handleToggleaddform = () => setIsaddformopen((prev) => !prev);

  useEffect(() => {
    FetchCommunityposts();
  }, []);

  const FetchCommunityposts = async () => {
    try {
      const res = await ListCommunities();
      setCommunities(res.data);
    } catch (error) {
      console.error(error);
      toast.error("failed to fetch community posts");
    }
  };

  return (
    <div>
      <NavBar />
      <div className="flex">
        <div className="bg-gray-50 mt-5 rounded-lg w-[60rem] ml-[5rem] mb-5 shadow-2xl">
          <Breadcrumbs />
          <div className="flex">
            <h1 className="font-bold text-5xl  ml-[20rem] mt-10">
              Community Posts
            </h1>
            <Button
              variant="gradient"
              className="w-28 h-10 mt-32 mb-10"
              onClick={handleToggleaddform}
            >
              <EditIcon fontSize="inherit" /> Create
            </Button>
            {/* <div className="md:w-72 mt-12 ml-36">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div> */}
          </div>

          <div className="ml-[3rem]">
            {/* <Sortorder/> */}

            <div className="h-[76rem] hidescroll w-[50rem]  overflow-x-hidden overflow-y-auto mb-5">
              {communities.length > 0 ? (
                communities.map((post) => <CommunityCard
                key={post.id}
                id={post.id}
                author={post.user.first_name+" "+ post.user.last_name} 
                
                desc={post.text}
                author_id={post.user.id}
                time={post.created_at}
                image={post.image}
                tag_name={post.user.tag_name}
                FetchCommunityposts={FetchCommunityposts}
                author_info={post.user}
                
                />)
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
      <AddCommunity
        userinfo={userinfo}
        isOpen={isaddformopen}
        onClose={handleToggleaddform}
        FetchCommunityposts={FetchCommunityposts}
      />
      <Footer />
    </div>
  );
}

export default Community;
