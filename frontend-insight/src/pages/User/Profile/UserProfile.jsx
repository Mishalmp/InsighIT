import React, { useEffect, useState } from "react";
import NavBar from "../../../components/Userside/NavBar/NavBar";
import Footer from "../../../components/Userside/footer/footer";
import userico from "../../../assets/userico.png";
import EditIcon from "@mui/icons-material/Edit";
import InstagramIcon from "@mui/icons-material/Instagram";
import Styled from "@emotion/styled";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Crown from "../../../assets/Userprofile/crown.png";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Progress } from "@material-tailwind/react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Alert,
  Avatar,
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
import { Loader } from "../../../components/Loading/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setUpdateInfo } from "../../../Redux/UserSlice";
import { UpdateUser } from "../../../services/UserApi";

function UserProfile() {
  const { userinfo } = useSelector((state) => state.user);

  //   console.log(userinfo, "ddddddddddd");
  useEffect(() => {
    const fetchUserInfo = async () => {
      if (userinfo) {
        // console.log(userinfo, "successsss");
      } else {
        // console.log("mooonji");
      }
    };
    fetchUserInfo();
  }, [userinfo]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleloading = () => setLoading((cur) => !cur);

  const handlecoverimgUpload = async (file) => {
    handleloading();
    try {
      const id = userinfo.id;
      const formData = new FormData();
      formData.append("cover_img", file);
      const res = await UpdateUser(id, formData);
      //   console.log(res.data, "resdaata");

      dispatch(
        setUpdateInfo({
          updatedData: {
            userinfo: { cover_img: res.data.cover_img },
          },
        })
      );
      handleloading();
      //   console.log(res.data, "resdaata2222");
    } catch (error) {
      handleloading();
      console.log(error);
    }
  };

  const handleprofileimgUpload = async (file) => {
    handleloading();
    try {
      const id = userinfo.id;
      const formData = new FormData();
      formData.append("profile_img", file);
      const res = await UpdateUser(id, formData);

      console.log(res, "proimg resss");

      dispatch(
        setUpdateInfo({
          updatedData: {
            userinfo: { profile_img: res.data.profile_img },
          },
        })
      );
      handleloading();
      console.log(res.data, "dispatch");
    } catch (error) {
      handleloading();
      console.log(error);
    }
  };

  const data = [
    {
      label: "Subscriptions",
      value: "subscriptions",
      icon: Square3Stack3DIcon,
      desc: ``,
    },
    {
      label: "Profile",
      value: "profile",
      icon: UserCircleIcon,
      desc: ``,
    },
    {
      label: "Settings",
      value: "settings",
      icon: Cog6ToothIcon,
      desc: ``,
    },
  ];
  return (
    <div className="">
      {loading && <Loader />}
      <NavBar />
      <div className="flex ml-12 mt-[1rem]  max-w-[80rem] ">
        <div className="w-[40rem] h-[50rem] mt-8 bg-white">
          {/* <Alert color="amber">A simple alert for showing message.</Alert> */}
          <Card className="w-[30rem]  m-3 -mt-2.5 bg-gray-100">
            <div className="w-[30rem]   flex relative">
              {userinfo.cover_img ? (
                <>
                <img
                  className="absolute top-0 left-0 h-48 w-full rounded-lg object-cover object-center"
                  src={userinfo.cover_img}
                  alt="Banner img"
                  />
                      <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      onChange={(e) => handlecoverimgUpload(e.target.files[0])}
                    />
                  </>
                
              ) : (
                <div className="absolute top-0 left-0 mt-2 w-full h-48 flex items-center justify-center">
                  <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                  >
                    <div class="flex flex-col items-center justify-center pt-5 pb-6">
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
                      <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span class="font-semibold">upload Cover Image</span>{" "}
                      </p>
                    </div>
                

                    <input
                      id="dropzone-file"
                      type="file"
                      class="hidden"
                      onChange={(e) => handlecoverimgUpload(e.target.files[0])}
                    />
                  </label>
                </div>
              )}
              <CameraAltIcon
                color="info"
                className="w-52 z-10 absolute mt-[10.6rem] ml-[28.4rem]"
                onClick={() => document.getElementById("dropzone-file").click()}
              />
            </div>

            <div className="flex relative">
              <CardHeader
                floated={false}
                className="h-32 w-32 ml-[36%] mt-36 relative z-10"
              >
                {userinfo.profile_img ? (
                  <div>
                    <img
                      className="w-32"
                      src={userinfo.profile_img}
                      alt="profile-picture"
                      onClick={() =>
                        document.getElementById("dropzone-file").click()
                      }
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
                        <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
                          <span class=" text-sm">upload dp</span>{" "}
                        </p>
                      </div>
                      <input
                        id="pro-file"
                        type="file"
                        class="hidden"
                        onChange={(e) =>
                          handleprofileimgUpload(e.target.files[0])
                        }
                      />
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
                        <p class="mb-6 text-sm text-gray-500 dark:text-gray-400">
                          <span class=" text-sm">Click to upload dp</span>{" "}
                        </p>
                      </div>
                      <input
                        id="pro-file"
                        type="file"
                        class="hidden"
                        onChange={(e) =>
                          handleprofileimgUpload(e.target.files[0])
                        }
                      />
                    </label>
                  </div>
                )}
              </CardHeader>
              {/* <div className="ml-24 w-52 h-8 flex text-center gap-2 rounded-full text-green-700 bg-white border-green-700 border-[2px]">
                <p className="ml-3">Request for Upgrade</p>{" "}
                <img className="w-6 h-6" src={Crown} alt="crown" />
              </div> */}
            </div>
            <CameraAltIcon
              color="info"
              className="absolute ml-[17.4rem] z-10 mt-[15.9rem]"
              onClick={() => document.getElementById("pro-file").click()}
            />
            <CardBody className="text-center relative">
              <Typography variant="h4" color="blue-gray" className="mb-2 ">
                {userinfo.first_name} {userinfo.last_name} <EditIcon />
              </Typography>

              <Typography
                className="font-medium w-full text-gray-600"
                textGradient
              >
                Hi my name is {userinfo.first_name}, I am a Python Full Stack
                Developer and has a passion about tech and productivity among
                other things.
              </Typography>
            </CardBody>
            <CardFooter className="flex justify-center gap-7">
              {/* <span>
            Edit
            </span> */}
              <InstagramIcon />
              <GitHubIcon />
              <LinkedInIcon />
            </CardFooter>
          </Card>

          <Card className="w-[30rem] m-3 mt-5 bg-gray-100">
            <Typography variant="h5" color="blue-gray" className="m-5 ml-12">
              Skills <EditIcon />
            </Typography>

            <CardBody>
              <ul className="grid grid-cols-2 gap-2">
                <li className="bg-green-200 w-auto h-[2.5rem] text-center text-blue-900  rounded-md">
                  Web Developer
                </li>
                <li className="bg-green-200 w-auto  h-[2.5rem] text-center text-blue-900  rounded-md">
                  React Developer
                </li>
                <li className="bg-green-200 w-auto  h-[2.5rem] text-center text-blue-900  rounded-md">
                  UI/UX Design
                </li>
                <li className="bg-green-200 w-auto  h-[2.5rem] text-center text-blue-900  rounded-md">
                  Mobile App Design
                </li>
              </ul>
            </CardBody>
          </Card>
          {/* <Card className="w-[38rem] m-3 overflow-hidden">
            <CardHeader
              floated={false}
              className="h-12 flex gap-12 text-center"
            >
              <Typography className="text-2xl font-semibold  ml-36">
                Subscriptions
              </Typography>{" "}
              <CardMembershipIcon />
            </CardHeader>

            <CardBody className="overflow-y-auto max-h-[20rem]">
              <div className="text-center flex gap-36 m-6">
                <Avatar
                  src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                  alt="user name"
                  size="sm"
                />{" "}
                <span className="flex gap-3">
                  {" "}
                  <Typography>First name </Typography>{" "}
                  <VerifiedIcon color="blue" />
                </span>{" "}
                <MoreHorizIcon />
              </div>
              <div className="text-center flex gap-36 m-6">
                <Avatar
                  src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                  alt="user name"
                  size="sm"
                />{" "}
                <span className="flex gap-3">
                  {" "}
                  <Typography>First name </Typography>{" "}
                  <VerifiedIcon color="blue" />
                </span>{" "}
                <MoreHorizIcon />
              </div>
              <div className="text-center flex gap-36 m-6">
                <Avatar
                  src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                  alt="user name"
                  size="sm"
                />{" "}
                <span className="flex gap-3">
                  {" "}
                  <Typography>First name </Typography>{" "}
                  <VerifiedIcon color="blue" />
                </span>{" "}
                <MoreHorizIcon />
              </div>
              <div className="text-center flex gap-36 m-6">
                <Avatar
                  src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                  alt="user name"
                  size="sm"
                />{" "}
                <span className="flex gap-3">
                  {" "}
                  <Typography>First name </Typography>{" "}
                  <VerifiedIcon color="blue" />
                </span>{" "}
                <MoreHorizIcon />
              </div>
              <div className="text-center flex gap-36 m-6">
                <Avatar
                  src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                  alt="user name"
                  size="sm"
                />{" "}
                <span className="flex gap-3">
                  {" "}
                  <Typography>First name </Typography>{" "}
                  <VerifiedIcon color="blue" />
                </span>{" "}
                <MoreHorizIcon />
              </div>
              <div className="text-center flex gap-36 m-6">
                <Avatar
                  src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                  alt="user name"
                  size="sm"
                />{" "}
                <span className="flex gap-3">
                  {" "}
                  <Typography>First name </Typography>{" "}
                  <VerifiedIcon color="blue" />
                </span>{" "}
                <MoreHorizIcon />
              </div>
              <div className="text-center flex gap-36 m-6">
                <Avatar
                  src="https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg"
                  alt="user name"
                  size="sm"
                />{" "}
                <span className="flex gap-3">
                  {" "}
                  <Typography>First name </Typography>{" "}
                  <VerifiedIcon color="blue" />
                </span>{" "}
                <MoreHorizIcon />
              </div>
            </CardBody>
          </Card> */}
        </div>
        <div className="w-[60rem] ml-5 h-[50rem] bg-white">
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
                {data.map(({ value, desc }) => (
                  <TabPanel key={value} value={value}>
                    {desc}

                    <Card className="w-[50rem] h-auto mt-5 bg-gray-100">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="m-5 ml-10"
                      >
                        About Me <EditIcon />
                      </Typography>

                      <Typography
                        className="font-medium max-w-2xl ml-10 text-gray-600 container"
                        textGradient
                      >
                        Hi my name is {userinfo.first_name}, I am a Python Full
                        Stack Developer and has a passion about tech and
                        productivity among other things. Developer and has a
                        passion about tech and productivity among other things.
                        has a passion about tech and productivity among other
                        things.
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

                        <div className="mb-10">
                          <Typography
                            variant="h6"
                            className="m-5 ml-10  text-gray-600"
                          >
                            Education :
                          </Typography>
                          <Typography
                            className="font-medium max-w-2xl ml-10 -mt-2 text-gray-600 container"
                            textGradient
                          >
                            Bachelors in Computer Application
                          </Typography>
                        </div>

                        <div>
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

                    <Card className="w-[50rem] h-auto mt-5 bg-gray-100">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="m-5 ml-10"
                      >
                        Skills <EditIcon />
                      </Typography>
                      <div className="max-w-2xl ml-10 mb-10">
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <Typography color="blue-gray" variant="h6">
                            Web Developer
                          </Typography>
                          <Typography color="blue-gray" variant="h6">
                            50%
                          </Typography>
                        </div>
                        <Progress value={50} />
                      </div>

                      <div className="max-w-2xl ml-10 mb-10">
                        <div className="mb-2 flex items-center justify-between gap-4">
                          <Typography color="blue-gray" variant="h6">
                            UI/UX Designer
                          </Typography>
                          <Typography color="blue-gray" variant="h6">
                            50%
                          </Typography>
                        </div>
                        <Progress value={50} />
                      </div>
                    </Card>
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default UserProfile;
