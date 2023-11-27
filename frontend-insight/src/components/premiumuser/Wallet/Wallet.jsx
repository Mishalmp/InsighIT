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
  Input,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Loader } from "../../components/Loading/Loader";

function Wallet() {

    const [open, setOpen] = useState(false);

  return (
    <>
    <div className="ml-72 flex">
      <h1 className="font-bold text-2xl ">
        Wallet
      </h1>

      <div className="md:w-56 ml-28">
        <Input
          label="Search"
          icon={<MagnifyingGlassIcon className="h-5 w-5" />}
        />
      </div>
    </div>
    <Card className="w-[50rem] min-h-[25rem] max-h-[50rem] overflow-y-auto overflow-x-hidden mt-5 bg-gray-50">
 
          <>
            <Card
              className="gap-10 rounded-md flex-row m-2 ml-16 mr-16 h-16"
          
            >
              <img
                className="ml-5 mt-2 h-12 w-12 rounded-lg"
                src=""
                alt="profile img"
              />

              <Typography
                variant="h5"
                className="w-32 items-center justify-center flex"
              >
              
              </Typography>
              <p className="mt-4 text-gray-500 text-lg">
           
              </p>

              <p className="bg-green-100 w-40 text-md font-semibold justify-center items-center mt-4 h-[1.6rem] flex text-blue-800  rounded-md">
          
              </p>
            </Card>
          </>
  
        <Typography
          variant="h4"
          className="flex justify-center items-center mt-5"
        >
        
        </Typography>
   
    </Card>
    
      <Dialog size="md" open={open} handler={handleOpen}>
        <DialogHeader>
          <Typography variant="h4" color="blue-gray">
            Subscription Info
          </Typography>
        </DialogHeader>
        <DialogBody divider className="grid grid-cols-1 gap-4">
          <Typography variant="h6" color="blue-gray">
            Subscription Type:
          </Typography>
          <Typography variant="h6" color="blue-gray">
            Start date:
          </Typography>
          <Typography variant="h6" color="blue-gray">
            End date:
          </Typography>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button
            variant="text"
            color="blue-gray"
          
          >
            close
          </Button>
          <Button variant="gradient" >
            Ok, Got it
          </Button>
        </DialogFooter>
      </Dialog>
    )}
  </>
  )
}

export default Wallet
