import React, { useEffect, useState } from "react";

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
import VerifiedIcon from "@mui/icons-material/Verified";
import Myslider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { PremiumList } from "../../../services/UserApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { DefaultSkeleton } from "../../Skeletons/Usercard";

function Usercardlist() {
  const { userinfo } = useSelector((state) => state.user);
    const navigate = useNavigate()
  const [premiumlist, setPremiumlist] = useState([]);
  const [showSkeleton, setShowSkeleton] = useState(true);

  const fetchPremiumList = async () => {
    try {
      const res = await PremiumList();
      setPremiumlist(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchDataWithDelay = async () => {
      // Show skeleton for 1 second
      setShowSkeleton(true);
      setTimeout(() => {
        setShowSkeleton(false);
        fetchPremiumList();
      }, 1000);
    };

    fetchDataWithDelay();
  }, []);

  return (
    <div className="">
      <div className="flex gap-4 mt-32 ">

      <WhatshotIcon fontSize="large" />
        <Typography variant="h4" className="">Trending Authors</Typography>
      </div>
    <div
      className="mt-10 h-[25rem] flex gap-4 max-w-[80rem] overflow-x-auto hidescroll"
    >

      {showSkeleton ? (
            <>
              <DefaultSkeleton />
              <DefaultSkeleton />
              <DefaultSkeleton />
              <DefaultSkeleton />
           
            </>
          ):(

      premiumlist.map((premium, index) => (
        <Card
          className={`w-[18rem] h-[20rem] m-2 hover:bg-gray-100 cursor-pointer shadow-xl${
            index < premiumlist.length - 1 ? " mr-2" : ""
          }`}
          key={premium.id}
        >
          <img
            alt="candice"
            src={`${
              premium.profile_img
                ? premium.profile_img
                : "https://docs.material-tailwind.com/img/face-1.jpg"
            }`}
            className=" h-16 w-16 !rounded-full  object-cover object-center ml-5 mt-5"
          />
          <div className="ml-5 mt-5">
            <Typography variant="h6" color="blue-gray" className="mb-2 ">
              {premium.first_name + " " + premium.last_name}{" "}
              <VerifiedIcon
                fontSize="small"
                className="-mt-1 ml-1"
                color="primary"
              />
            </Typography>
            <p className="text-base -mt-2 text-gray-600 font-serif">
              {premium.tag_name}
            </p>
          </div>
          <p className="text-sm min-h-[3.6rem] text-gray-500 ml-5 mr-5 mt-4 ">
            {premium.bio && premium.bio.substring(0, 70) + "..."}
          </p>

          <div
            className="w-40 h-8 mt-10 bg-blue-800 ml-16 rounded-2xl cursor-pointer hover:bg-blue-700"
            onClick={() => {
              if (premium.id === userinfo.id) {
                navigate("/User/userprofile");
              } else {
                navigate(`/User/authorprofile/${premium.id}`);
              }
            }}
          >
            <p className="text-white text-center mt-[0.2rem]  text-lg">
              View Profile
            </p>
          </div>
        </Card>
      )))}

      <Card className="w-[18rem] h-[20rem] m-2 hover:bg-gray-100 cursor-pointer shadow-xl">
        <img
          alt="candice"
          src="https://docs.material-tailwind.com/img/face-1.jpg"
          className=" h-16 w-16 !rounded-full  object-cover object-center ml-5 mt-5"
        />
        <div className="ml-5 mt-5">
          <Typography variant="h6" color="blue-gray" className="mb-2 ">
            Mishal Mp
            <VerifiedIcon
              fontSize="small"
              className="-mt-1 ml-1"
              color="primary"
            />
          </Typography>
          <p className="text-base -mt-2 text-gray-600 font-serif">
            Web developer
          </p>
        </div>
        <p className="text-sm min-h-[3.6rem] text-gray-500 ml-5 mr-5 mt-4 ">
          Web developer wormisdf asdnlasd asdljn zdfg dfgsdfg xdfgxdfg zff...
        </p>

        <div className="w-40 h-8 mt-10 bg-blue-800 ml-16 rounded-2xl cursor-pointer hover:bg-blue-700">
          <p className="text-white text-center mt-[0.2rem] text-lg">View Profile</p>
        </div>
      </Card>

      <Card className="w-[18rem] h-[20rem] m-2 hover:bg-gray-100 cursor-pointer shadow-xl">
        <img
          alt="candice"
          src="https://docs.material-tailwind.com/img/face-1.jpg"
          className=" h-16 w-16 !rounded-full  object-cover object-center ml-5 mt-5"
        />
        <div className="ml-5 mt-5">
          <Typography variant="h6" color="blue-gray" className="mb-2 ">
            Mishal Mp
            <VerifiedIcon
              fontSize="small"
              className="-mt-1 ml-1"
              color="primary"
            />
          </Typography>
          <p className="text-base -mt-2 text-gray-600 font-serif">
            Web developer
          </p>
        </div>
        <p className="text-sm min-h-[3.6rem] text-gray-500 ml-5 mr-5 mt-4 ">
          Web developer wormisdf asdnlasd asdljn zdfg dfgsdfg xdfgxdfg zff...
        </p>

        <div className="w-40 h-8 mt-10 bg-blue-800 ml-16 rounded-2xl cursor-pointer hover:bg-blue-700">
          <p className="text-white text-center mt-[0.2rem] text-lg">View Profile</p>
        </div>
      </Card>

   


     
    </div>

    </div>
  );
}

export default Usercardlist;
