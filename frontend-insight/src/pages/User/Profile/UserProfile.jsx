import React, { useEffect, useState } from "react";
import NavBar from "../../../components/Userside/NavBar/NavBar";
import Footer from "../../../components/Userside/footer/footer";

import EditIcon from "@mui/icons-material/Edit";
import InstagramIcon from "@mui/icons-material/Instagram";
import Styled from "@emotion/styled";
import "react-toastify/dist/ReactToastify.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Crown from "../../../assets/Userprofile/crown.png";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import VerifiedIcon from "@mui/icons-material/Verified";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { Progress } from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
  Alert,
  Avatar,
  Slider,
} from "@material-tailwind/react";
import {
  Button,
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  Square3Stack3DIcon,
  UserCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { Input, Checkbox } from "@material-tailwind/react";
import { Loader } from "../../../components/Loading/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setUpdateInfo } from "../../../Redux/UserSlice";
import { UpdateUser, CreateSkill, ListSkills } from "../../../services/UserApi";
import { Link } from "react-router-dom";

function UserProfile() {
  const { userinfo } = useSelector((state) => state.user);
  const { premiumuserinfo } = useSelector((state) => state.user);
  const [skills, setSkills] = useState([]);
  //   console.log(userinfo, "ddddddddddd");
  useEffect(() => {
    const fetchskills = async () => {
      try {
        const response = await ListSkills(userinfo.id);
        setSkills(response.data);
        console.log(skills, response.data, "silslslslslssl");
      } catch (error) {
        console.error("error ! couldn't fectch skills ", error);
      }
    };

    fetchskills();
  }, [userinfo]);

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const handleloading = () => setLoading((cur) => !cur);
  const [opencover, setOpencover] = useState(false);
  const handleOpen = () => setOpencover((cur) => !cur);

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

  const [bio, setBio] = useState("");
  const [aboutopen, setaboutOpen] = useState(false);
  const handleaboutOpen = () => setaboutOpen((cur) => !cur);

  const Handlesavebio = async () => {
    try {
      const response = await UpdateUser(userinfo.id, { bio });
      console.log(response.data);
      toast.success("bio updated succussfully");

      dispatch(
        setUpdateInfo({
          updatedData: {
            userinfo: { bio: response.data.bio },
          },
        })
      );
      // handleloading()
      setaboutOpen(false);
    } catch (error) {
      // handleloading()
      console.error(error);
    }
  };

  const [skillopen, setskillOpen] = useState(false);
  const [skill, setSkill] = useState({ skill: "", rateofskills: 0 });
  const handleskillopen = () => setskillOpen((cur) => !cur);

  const [skilleditopen, setskilleditopen] = useState(false);
  const handleskilleditopen = () => setskilleditopen((cur) => !cur);

  const HandleSkillSubmit = async () => {
    console.log(skill, "skiiiiiiiiiiilllllllll");

    const user_id = userinfo.id;
    const skillData = { ...skill, user_id };
    try {
      const response = CreateSkill(skillData);
      console.log(response.data);
      toast.success("Blog created succussfully!");
      // handleloading()
      setskillOpen(false);
    } catch (error) {
      console.error("error occured during skill creation", error);
      toast.error("Error occured during skill creation");
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
        <div className="w-[40rem] min-h-[50rem] mt-8 bg-white">
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
                    className="hidden"
                    onChange={(e) => handlecoverimgUpload(e.target.files[0])}
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
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                        <span className="font-semibold">
                          upload Cover Image
                        </span>{" "}
                      </p>
                    </div>

                    <input
                      id="dropzone-file"
                      type="file"
                      className="hidden"
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
            <Dialog size="xl" open={opencover} handler={handleOpen}>
              <DialogHeader className="justify-between">
                <div className="flex items-center gap-3">
                  <Avatar
                    size="sm"
                    variant="circular"
                    alt="username"
                    src={userinfo.profile_img}
                  />
                  <div className="-mt-px flex flex-col">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-medium"
                    >
                      {userinfo.first_name} {userinfo.last_name}
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="text-xs font-normal"
                    >
                      @{userinfo.first_name}
                    </Typography>
                  </div>
                </div>
              </DialogHeader>
              <DialogBody>
                <img
                  alt="nature"
                  className="h-[30rem] w-full rounded-lg object-cover object-center"
                  src={userinfo.cover_img}
                />
              </DialogBody>
            </Dialog>

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
                {userinfo.first_name} {userinfo.last_name}  {userinfo.is_premium && <VerifiedIcon className="-mt-1" color="primary"/>}
              </Typography>
              <Typography className="mt-2 font-thin text-lg text-gray-500">
                {userinfo.tag_name}
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
              {/* <span>
            Edit
            </span> */}
              <InstagramIcon onClick={handleOpen} />
              <GitHubIcon />
              <LinkedInIcon />
              <Cog6ToothIcon className="w-6 h-6" />
            </CardFooter>
            
            {premiumuserinfo &&  premiumuserinfo.is_approved  ? ''
            :(
              <Link to="/User/upgradeform/">
                {" "}
                <Typography className="mt-4 ml-64 font-thin text-lg text-blue-800">
                  need to upgrage?
                </Typography>
              </Link>
            )}
          </Card>

          <Card className="w-[30rem] m-3 mt-5 bg-gray-100">
            <Typography variant="h5" color="blue-gray" className="m-5 ml-12">
              Skills <EditIcon onClick={handleskillopen} />
            </Typography>

            <CardBody>
              <ul className="grid grid-cols-2 gap-2">
                {skills.map((skill) => (
                  <li
                    className="bg-green-200 w-auto  h-[2.5rem] flex justify-center items-center text-blue-900  rounded-md"
                    onDoubleClick={handleskilleditopen}
                  >
                    {skill.skill}
                  </li>
                ))}
                <li
                  className="bg-green-200 w-auto  h-[2.5rem]  flex justify-center items-center text-blue-900 font-semibold  rounded-md"
                  onClick={handleskillopen}
                >
                  <AddCircleOutlineIcon /> Add Skill
                </li>
              </ul>
            </CardBody>
          </Card>
        </div>
        <Dialog
          size="xs"
          open={skilleditopen}
          // handler={handleaboutOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-[30rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Add Skill
              </Typography>

              <Typography className="-mb-2" variant="h6">
                Skill Name
              </Typography>
              <Input
                label="skill"
                name="skill"
                value={skill.skill}
                size="lg"
                onChange={(e) => {
                  setSkill({ ...skill, [e.target.name]: e.target.value });
                }}
              />

              <Typography className="-mb-2" variant="h6">
                Skill Rating
              </Typography>
              <div className="w-96 mb-3">
                <Slider
                  color="black"
                  Value={skill.rateofskills}
                  name="rateofskills"
                  onChange={(e) => {
                    setSkill({
                      ...skill,
                      ["rateofskills"]: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" fullWidth>
                Save
              </Button>
              <Typography variant="small" className="mt-4 flex justify-center">
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="black"
                  className="ml-1 font-bold"
                  onClick={handleskilleditopen}
                >
                  Don't Save
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </Dialog>

        <Dialog
          size="xs"
          open={skillopen}
          // handler={handleaboutOpen}
          className="bg-transparent shadow-none"
        >
          <Card className="mx-auto w-[30rem]">
            <CardBody className="flex flex-col gap-4">
              <Typography variant="h4" color="blue-gray">
                Add Skill
              </Typography>

              <Typography className="-mb-2" variant="h6">
                Skill Name
              </Typography>
              <Input
                label="skill"
                name="skill"
                value={skill.skill}
                size="lg"
                onChange={(e) => {
                  setSkill({ ...skill, [e.target.name]: e.target.value });
                }}
              />

              <Typography className="-mb-2" variant="h6">
                Skill Rating
              </Typography>
              <div className="w-96 mb-3">
                <Slider
                  color="black"
                  Value={skill.rateofskills}
                  name="rateofskills"
                  onChange={(e) => {
                    setSkill({
                      ...skill,
                      ["rateofskills"]: parseInt(e.target.value),
                    });
                  }}
                />
              </div>
            </CardBody>
            <CardFooter className="pt-0">
              <Button variant="gradient" onClick={HandleSkillSubmit} fullWidth>
                Save
              </Button>
              <Typography variant="small" className="mt-4 flex justify-center">
                <Typography
                  as="a"
                  href="#signup"
                  variant="small"
                  color="black"
                  className="ml-1 font-bold"
                  onClick={handleskillopen}
                >
                  Don't Save
                </Typography>
              </Typography>
            </CardFooter>
          </Card>
        </Dialog>

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
                        About Me <EditIcon onClick={handleaboutOpen} />
                      </Typography>

                      <Typography
                        className="text-md max-w-2xl ml-10 text-gray-600 container"
                        textGradient
                      >
                        {userinfo.bio}
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
                    <Dialog
                      size="xs"
                      open={aboutopen}
                      // handler={handleaboutOpen}
                      className="bg-transparent shadow-none"
                    >
                      <Card className="mx-auto w-[30rem]">
                        <CardBody className="flex flex-col gap-4">
                          <Typography variant="h4" color="blue-gray">
                            About Me
                          </Typography>

                          <Typography className="-mb-2" variant="h6">
                            Your Bio (Max 30 words)
                          </Typography>
                          <textarea
                            name="bio"
                            placeholder={bio ? { bio } : "write your bio..."}
                            value={bio}
                            // defaultValue={bio}
                            id=""
                            cols="30"
                            rows="5"
                            onChange={(e) => setBio(e.target.value)}
                          ></textarea>

                          {/* <div className="-ml-2.5 -mt-3">
                            <Checkbox label="Remember Me" />
                          </div> */}
                        </CardBody>
                        <CardFooter className="pt-0">
                          <Button
                            variant="gradient"
                            onClick={Handlesavebio}
                            fullWidth
                          >
                            Save
                          </Button>
                          <Typography
                            variant="small"
                            className="mt-4 flex justify-center"
                          >
                            <Typography
                              as="a"
                              href="#Aboutme"
                              variant="small"
                              color="black"
                              className="ml-1 font-bold"
                              onClick={handleaboutOpen}
                            >
                              Don't Save
                            </Typography>
                          </Typography>
                        </CardFooter>
                      </Card>
                    </Dialog>

                    <Card className="w-[50rem] h-auto mt-5 bg-gray-100">
                      <Typography
                        variant="h5"
                        color="blue-gray"
                        className="m-5 ml-10"
                      >
                        Skills Ratings
                      </Typography>
                      {skills.map((skill) => (
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
                      ))}
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
