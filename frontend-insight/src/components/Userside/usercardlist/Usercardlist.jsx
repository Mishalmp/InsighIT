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

import { PremiumList } from "../../../services/UserApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
function Usercardlist() {
  const { userinfo } = useSelector((state) => state.user);
    const navigate = useNavigate()
  const [premiumlist, setPremiumlist] = useState([]);

  const fetchPremiumList = async () => {
    try {
      const res = await PremiumList();
      setPremiumlist(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPremiumList();
  }, []);

  return (
    <div>
        <Typography variant="h4" className="ml-10 mt-10">Trending Authors</Typography>
    <Myslider
      slidesToShow={4}
      slidesToScroll={4}
      infinite
      className=" mt-10 h-[25rem]  gap-5 max-w-[80rem]"
    >
      {premiumlist.map((premium, index) => (
        <Card
          className={`w-[12rem] h-[20rem] m-2 hover:bg-gray-100 cursor-pointer shadow-xl${
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
            className="w-40 h-8 mt-10 bg-blue-800 ml-20 rounded-2xl cursor-pointer hover:bg-blue-700"
            onClick={() => {
              if (premium.id === userinfo.id) {
                navigate("/User/userprofile");
              } else {
                navigate(`/User/authorprofile/${premium.id}`);
              }
            }}
          >
            <p className="text-white text-center mt-2 !important text-lg">
              View Profile
            </p>
          </div>
        </Card>
      ))}

      <Card className="w-[15rem] h-[20rem] m-2 hover:bg-gray-100 cursor-pointer shadow-xl">
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

        <div className="w-40 h-8 mt-10 bg-blue-800 ml-20 rounded-2xl cursor-pointer hover:bg-blue-700">
          <p className="text-white text-center mt-2  text-lg">View Profile</p>
        </div>
      </Card>
      <Card className="w-[15rem] h-[20rem] !m-2 hover:bg-gray-100 cursor-pointer shadow-xl">
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

        <div className="w-40 h-8 mt-10 bg-blue-800 ml-20 rounded-2xl cursor-pointer hover:bg-blue-700">
          <p className="text-white text-center mt-2 !important text-lg">
            View Profile
          </p>
        </div>
      </Card>
      <Card className="w-[15rem] h-[20rem] m-2 hover:bg-gray-100 cursor-pointer shadow-xl">
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

        <div className="w-40 h-8 mt-10 bg-blue-800 ml-20 rounded-2xl cursor-pointer hover:bg-blue-700">
          <p className="text-white text-center mt-2 !important text-lg">
            View Profile
          </p>
        </div>
      </Card>
      <Card className="w-[15rem] h-[20rem] m-2 hover:bg-gray-100 cursor-pointer shadow-xl">
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

        <div className="w-40 h-8 mt-10 bg-blue-800 ml-20 rounded-2xl cursor-pointer hover:bg-blue-700">
          <p className="text-white text-center mt-2 !important text-lg">
            View Profile
          </p>
        </div>
      </Card>
    </Myslider>

    </div>
  );
}

export default Usercardlist;