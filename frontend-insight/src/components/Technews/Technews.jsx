import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Myslider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../pages/Home.css";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { CardPlacehoderSkeleton } from "../Skeletons/News";
function Technews() {
  const [newss, setNews] = useState([]);

  const fetchdata = async () => {
    let response = await fetch(
      "https://newsapi.org/v2/top-headlines?country=in&category=technology&apiKey=779335093dc943fc916cff1ac2af4308"
    );

    let data = await response.json();

    setNews(data.articles);
  };
  useEffect(() => {
    fetchdata();
  }, []);

  // console.log(newss, "newss");

  return (
    <div>
      <div className="flex gap-4 mt-32 ">
        <WhatshotIcon fontSize="large" />
        <Typography variant="h4" className="">
          Tech News Daily
        </Typography>
      </div>

      {/* <div className="scrolling-wrapper"> */}
      {newss.length > 0 ? (
        <Myslider
          slidesToShow={4}
          slidesToScroll={4}
          infinite
          className=" mt-10 h-[25rem]   gap-5 max-w-[80rem] mb-10   "
        >
          {/* scrolling-content */}

          {newss.map((news) => (
            <Card className="ml-10 !w-[20rem] mb-10 h-[28rem]">
              <img
                src={news.urlToImage}
                className="object-cover  h-[12rem]"
                alt="card-image"
              />

              <CardBody className="h-[11rem]">
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {news.author}
                </Typography>
                <Typography>{news.title.substring(0, 100) + "..."}</Typography>
              </CardBody>
              <CardFooter className="pt-0">
                <a href={news.url}>
                  {" "}
                  <Button>Read More</Button>
                </a>
              </CardFooter>
            </Card>
          ))}
        </Myslider>
      ) : (
        <CardPlacehoderSkeleton />
      )}

      {/* </div> */}
    </div>
  );
}

export default Technews;
