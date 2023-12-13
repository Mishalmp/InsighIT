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
    <div >
       <Typography variant="h4" className="ml-10">Tech News Daily</Typography>
               <Myslider
              slidesToShow={4}
              slidesToScroll={4}
              infinite
              className=" mt-10 h-[25rem]  gap-5 max-w-[80rem] mb-10"
            >
      {newss.map((news) => (
     
        <Card className="ml-10 w-96 mb-10 h-[28rem]">
         
            <img src={news.urlToImage} className="object-cover  h-[12rem]" alt="card-image" />
        
          <CardBody className="h-[11rem]">
            <Typography variant="h5" color="blue-gray" className="mb-2">
              {news.author}
            </Typography>
            <Typography>{news.title.substring(0, 100)+'...'}</Typography>
          </CardBody>
          <CardFooter className="pt-0">
           <a href={news.url}> <Button  >Read More</Button></a>
          </CardFooter>
        </Card>
        
      ))}
      </Myslider>
    </div>
  );
}

export default Technews;


