import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
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
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button, Chip
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CreateTopics, GetTopics } from "../../services/BlogsApi";
import Topiccreate from "../../components/Topics/Topiccreate";
function Topics() {
  const [topics, settopics] = useState([]);
  const [modalopen,setmodalopen] =useState(false)

  useEffect(() => {
    fetchTopics();
  }, []);

  const fetchTopics = async () => {
    try {
      const ress = await GetTopics();
      settopics(ress.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CardHeader floated={false} shadow={false} className="rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              Topics
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              These are details about Tech Topics in InsighIT
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                // value={searchQuery}
                // onChange={(e)=>setSearchQuery(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5">
        <Typography className="text-center ml-[40%]" variant="h2" color="blue-gray">
              Topics
            </Typography>
            
        <Button
              variant="gradient"
              className="w-28 h-10  float-right mr-20"
              onClick={()=>setmodalopen(true)}
            >
              <EditIcon fontSize="inherit"/> Create
            </Button>
            </div>
      </CardHeader>
      <div className="ml-24 mt-10 mb-5 h-[38rem] grid grid-cols-2 hidescroll overflow-y-auto">
        {topics.length > 0 ?(
            topics.map((topic)=>(

                <div className="max-w-sm h-[14rem] mt-5 p-6 bg-white border border-gray-200 rounded-lg shadow ">
                <div className="grid grid-cols-2">
                    <div>
                        <img className="w-16 h-16 rounded-full object-contain"  src={topic.img} alt={topic.topic} />
                    </div>
                <div>
                  <h5 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900 ">
                   {topic.topic}
                  </h5>
                </div>
         
                </div>
                <p className="mb-3 font-normal text-gray-500 ">
                 {topic.desc}
                </p>
                <div className="grid grid-cols-2 mt-10">
                <a
                 
                  className="inline-flex items-center text-blue-800"
                >
                  No of Blogs Created :{topic.num_blogs}
             
                </a>
                <div className="ml-10">
                    
                    <h6 className="mb-2 text-xl font-semibold text-center tracking-tight text-gray-900 ">
                    <Chip
                              variant="ghost"
                              size="sm"
                              value={topic.is_block ? "Inactive" : "Active"}
                              color={topic.is_block ? "red" : "green"}
                            />
                    </h6>
                  </div>
                  </div>
              </div>

            ))
        ):(
            <Typography variant="h3" className="text-center">
            No Topics Found
          </Typography>
        )

        }

        <Topiccreate isOpen={modalopen} onClose={()=>setmodalopen(false)} fetchTopics={fetchTopics} onSubmit={CreateTopics} topics={topics} />
     
      </div>
    </>
  );
}

export default Topics;
