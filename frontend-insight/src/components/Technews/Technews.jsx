import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

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

  console.log(newss, "newss");

  return (
    <div>
      {newss.map((news) => (
        <Card className="mt-20 ml-10 w-96">
          <CardHeader color="blue-gray" className="relative h-56">
            <img src={news.urlToImage} className="object-cover" alt="card-image" />
          </CardHeader>
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              UI/UX Review Check
            </Typography>
            <Typography>{news.title}</Typography>
          </CardBody>
          <CardFooter className="pt-0">
           <a href={news.url}> <Button  >Read More</Button></a>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}

export default Technews;

("779335093dc943fc916cff1ac2af4308");
