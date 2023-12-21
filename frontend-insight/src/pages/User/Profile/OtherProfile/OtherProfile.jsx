import React, { useEffect, useState } from "react";
import NavBar from "../../../../components/Userside/NavBar/NavBar";
import Footer from "../../../../components/Userside/footer/footer";

// import EditIcon from "@mui/icons-material/Edit";
import InstagramIcon from "@mui/icons-material/Instagram";
import Styled from "@emotion/styled";
import "react-toastify/dist/ReactToastify.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Crown from "../../../../assets/Userprofile/crown.png";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddIcon from "@mui/icons-material/Add";
import {
  CreateFollowing,
  Is_follower,
  Unfollow,
} from "../../../../services/UserApi";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Progress } from "@material-tailwind/react";
import { toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  IconButton,
} from "@material-tailwind/react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";

import { Loader } from "../../../../components/Loading/Loader";
import { useSelector, useDispatch } from "react-redux";

import { ListSkills } from "../../../../services/UserApi";

import { GetUserInfo,IsSubscriber } from "../../../../services/UserApi";
import { useParams } from "react-router-dom";

import Bloglistinprofile from "../../../../components/blogs/bloglistinprofile";
import Bloghidepage from "../../../../components/premiumuser/premiumBlog/Bloghidepage";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { useNavigate } from "react-router-dom";
function OtherProfile() {
  const { authorId } = useParams();

  const { userinfo } = useSelector((state) => state.user);

  const [loading, setLoading] = useState(false);
  const [is_following, setIs_following] = useState(false);
  const [is_subscriber, setIs_subscriber] = useState(false);

  const [author, setAuthor] = useState(null);
  const [skills, setSkills] = useState([]);
  const [opencover, setOpencover] = useState(false);
  const handleOpen = () => setOpencover((cur) => !cur);
  const [showhidepage,setShowhidepage]=useState(false)
  const navigate=useNavigate()

  useEffect(() => {
    const FetchData = async () => {
      try {
        const response = await GetUserInfo(authorId);
        setAuthor(response.data);

        const res_skills = await ListSkills(authorId);
        setSkills(res_skills.data);

        const res_follow = await Is_follower(userinfo.id, authorId);
        setIs_following(res_follow.data.is_follower);

        const res_sub=await IsSubscriber(userinfo.id, authorId)
        setIs_subscriber(res_sub.data.is_subscriber)

      } catch (error) {
        console.error(error);
      }
    };

    FetchData();
  }, [authorId, is_following]);

  const Handlefollow = async () => {



    const values = {
      follower: userinfo.id,
      following: authorId,
    };
    try {

      if(author.is_premium && !is_subscriber){
        setShowhidepage(true)
      }else{
      const resp = await CreateFollowing(values);
      toast.success("followed successfully");
      setIs_following(true);

      }

      
    } catch (error) {
      console.error(error);
    }
  };

  const Handleunfollow = async () => {
    try {
      const ress = await Unfollow(userinfo.id, authorId);
      toast.success("unfollowed successfully");
      setIs_following(false);
    } catch (error) {
      console.error(error);
    }
  };

  if (!author || !skills) {
    return <Loader />;
  }

  const data = [
    {
      label: "Profile",
      value: "profile",
      icon: UserCircleIcon,
    
    },

    {
      label: "Blogs",
      value: "blogs",
      icon: Square3Stack3DIcon,
     
    },
  ];

  return (
    <div className="">
      {/* {loading && <Loader />} */}
      <NavBar />
      <div className="flex ml-12 mt-[1rem] h-auto  max-w-[80rem] ">
        <div className="w-[40rem] min-h-[50rem] mt-8 bg-white shadow-2xl">
          <Card className="w-[30rem]  m-3 -mt-2.5 bg-gray-100 shadow-2xl">
            <div className="w-[30rem]   flex relative">
              {author.cover_img ? (
                <>
                  <img
                    className="absolute top-0 left-0 h-48 w-full rounded-lg object-cover object-center"
                    src={author.cover_img}
                    alt="Banner img"
                  />
                </>
              ) : (
                <div className="absolute top-0 left-0 mt-2 w-full h-48 flex items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 16"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                        />
                      </svg>
                    </div>
                  </label>
                </div>
              )}
            </div>
            <Dialog size="xl" open={opencover} handler={handleOpen}>
              <DialogHeader className="justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt="username"
                    src={author.profile_img}
                  />
                  <div className="-mt-px flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {author.first_name} {author.last_name}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-xs font-normal"
                    >
                      @{author.first_name}
                    </Typography>
                  </div>
                </div>
              </DialogHeader>
              <DialogBody>
                <img
                  alt="nature"
                  className="h-[30rem] w-full rounded-lg object-cover object-center"
                  src={author.cover_img}
                />
              </DialogBody>
            </Dialog>

            <div className="flex relative">
              <CardHeader
                floated={false}
                className="h-32 w-32 ml-[36%] mt-36 relative z-10"
              >
                {author.profile_img ? (
                  <div>
                    <img
                      className="w-32"
                      src={author.profile_img}
                      alt="profile-picture"
                    />
                    <label
                      htmlFor="pro-file"
                      className="flex flex-col items-center justify-center w-32 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center h-32 w-32 justify-center -mt-20">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                ) : (
                  <div className="flex relative ">
                    <label
                      htmlFor="pro-file"
                      className="flex flex-col items-center justify-center w-32 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                    >
                      <div class="flex flex-col items-center h-32 w-32 justify-center -mt-20">
                        <svg
                          class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                      </div>
                    </label>
                  </div>
                )}
              </CardHeader>
            </div>

            <CardBody className="text-center relative">
              <div className="flex gap-4 ml-36">
                <Typography variant="h4" color="blue-gray" className="mb-2 ">
                  {author.first_name} {author.last_name}{" "}
                  {author.is_premium && (
                    <VerifiedIcon className="-mt-1" color="primary" />
                  )}
                </Typography>

                {is_following ? (
                  <span
                    onClick={Handleunfollow}
                    className="bg-green-100 w-24 text-md cursor-pointer font-semibold justify-center items-center mt-1 h-[1.6rem] flex text-blue-800  rounded-md"
                  >
                    following
                  </span>
                ) : (
                  <span
                    className="bg-blue-800 w-20 text-md gap-1 cursor-pointer mt-1 h-[1.6rem] flex text-white  rounded-md"
                    onClick={Handlefollow}
                  >
                    <AddIcon className="ml-1 mt-[0.1rem]" /> follow
                  </span>
                )}
              </div>
              <Typography className="mt-2 font-thin text-lg text-gray-500">
                {author.tag_name}
              </Typography>
              <div className="flex gap-6 ml-24 -mb-4">
                <Typography className="mt-4 font-semibold text-lg text-blue-800">
                  100 Followers
                </Typography>
                <Typography className="mt-4  font-semibold text-lg text-blue-800">
                  50 Following
                </Typography>
              </div>
            </CardBody>
            <CardFooter className="flex justify-center gap-7">
              <InstagramIcon onClick={handleOpen} className="cursor-pointer hover:text-blue-600" />
              <GitHubIcon />
              <LinkedInIcon />
              {/* <Cog6ToothIcon className="w-6 h-6" /> */}
              {is_following && <CommentOutlinedIcon onClick={()=>navigate('/User/chat/')} fontSize="medium" className="hover:cursor-pointer  hover:text-blue-800 hover:rounded-lg"/>}
            </CardFooter>
          </Card>

          <Card className="w-[30rem] m-3 mt-5 bg-gray-100 shadow-2xl">
            <Typography variant="h5" color="blue-gray" className="m-5 ml-12">
              Skills
            </Typography>

            <CardBody>
              <ul className="grid grid-cols-2 gap-2">
                {skills && skills.length > 0 ? (
                  skills.map((skill) => (
                    <li className="bg-green-200 w-auto  h-[2.5rem] flex justify-center items-center text-blue-900  rounded-md">
                      {skill.skill}
                    </li>
                  ))
                ) : (
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className=" m-1 ml-6"
                  >
                    Skills not Added
                  </Typography>
                )}
              </ul>
            </CardBody>
          </Card>
        </div>

        <div className="w-[60rem] ml-5 min-h-[50rem] bg-white shadow-2xl rounded-lg">
          <div className="">
            <Tabs value="profile" className="mt-5 mr-20">
              <TabsHeader>
                {data.map(({ label, value, icon }) => (
                  <Tab key={value} value={value}>
                    <div className="flex items-center gap-2">
                      {React.createElement(icon, { className: "w-5 h-5" })}
                      {label}
                    </div>
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value}) => (
                  <TabPanel key={value} value={value}>
                    {value === "profile" && (
                      <>
                        <Card className="w-[50rem] h-auto mt-5 bg-gray-100 shadow-2xl">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="m-5 ml-10"
                          >
                            About Author
                          </Typography>

                          <Typography
                            className="text-md max-w-2xl ml-10 text-gray-600 container"
                            textGradient
                          >
                            {author.bio}
                          </Typography>
                          <div className="grid grid-cols-2">
                            <div>
                              <Typography
                                variant="h6"
                                className="m-5 ml-10  text-gray-600"
                              >
                                Education :
                              </Typography>
                              <Typography
                                className="font-medium  max-w-2xl ml-10 -mt-2 text-gray-600 container"
                                textGradient
                              >
                                Bachelors in Computer Application
                              </Typography>
                            </div>

                            <div className="mb-10">
                              <Typography
                                variant="h6"
                                className="m-5 ml-10  text-gray-600"
                              >
                                Work Experience :
                              </Typography>
                              <Typography
                                className="font-medium  max-w-2xl ml-10 -mt-2 text-gray-600 container"
                                textGradient
                              >
                                3 years experience in web development
                              </Typography>
                            </div>
                          </div>
                        </Card>

                        <Card className="w-[50rem] h-auto mt-5 bg-gray-100 shadow-2xl">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="m-5 ml-10"
                          >
                            Skills Ratings
                          </Typography>
                          {skills && skills.length > 0 ? (
                            skills.map((skill) => (
                              <div className="max-w-2xl ml-10 mb-10">
                                <div className="mb-2 flex items-center justify-between gap-4">
                                  <Typography color="blue-gray" variant="h6">
                                    {skill.skill}
                                  </Typography>
                                  <Typography color="blue-gray" variant="h6">
                                    {skill.rateofskills}%
                                  </Typography>
                                </div>
                                <Progress value={skill.rateofskills} />
                              </div>
                            ))
                          ) : (
                            <Typography
                              variant="h5"
                              color="blue-gray"
                              className=" m-1 ml-10 mb-5"
                            >
                              Skills not Added
                            </Typography>
                          )}
                        </Card>
                      </>

                    )}
                    {value === 'blogs' && (
                      <Bloglistinprofile userid={authorId} />
                    )}
                  </TabPanel>
                ))}
              </TabsBody>
              
            </Tabs>
          </div>
        </div>
      </div>
      {showhidepage && <Bloghidepage user_id={userinfo.id} author_id={authorId} />}

      <Footer />
    </div>
  );
}

export default OtherProfile;
