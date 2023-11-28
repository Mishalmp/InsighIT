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
import { Loader } from "../../../components/Loading/Loader";
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthWestIcon from '@mui/icons-material/SouthWest';
import Userico from '../../../assets/user2img.png'
import { UserWallet } from "../../../services/UserApi";
import { timeAgo } from "../../../helpers/Timemanage";

function Wallet({ user }) {
  const [open, setOpen] = useState(false);
  const [totalrecieve,setTotalrecieve]=useState(null)
  const [totalwithdraw,setWithdraw]=useState(null)

  const [transactions,setTransactions]=useState(null)


  useEffect(()=>{
    const FetchWallet=async()=>{
      try {

        const response=await UserWallet(user.id)
        console.log(response.data,'walllettt');
        setTotalrecieve(response.data.total_recieved)
        setWithdraw(response.data.total_withdrawn)
        setTransactions(response.data.transactions)

        
      } catch (error) {
        console.error(error);
      }

    }
    FetchWallet()
  },[])
  console.log(transactions,'isererererer');
  return (
    <>
      <div className="ml-80 flex">
        <h1 className="font-bold text-2xl ">Wallet</h1>

        <div className="md:w-56 ml-32">
          <Input
            label="Search"
            icon={<MagnifyingGlassIcon className="h-5 w-5" />}
          />
        </div>
      </div>
      <Card className="w-[50rem] min-h-[25rem] max-h-[50rem] overflow-y-auto overflow-x-hidden mt-5 bg-gray-50">
        <div className="w-96 ml-48 mt-10 h-32 rounded-lg border-[1px] border-green-500 shadow-2xl shadow-gray-400">
          <Typography variant="h5" className="text-gray-500 mt-2 text-center">
            Your Wallet balance
          </Typography>
          <Typography variant="h2" className="text-green-600 mt-5 text-center">
            $ {user.wallet_balance}
          </Typography>
        </div>
        <div className="flex -ml-7 justify-center items-center gap-8">
          <div className="mt-10">
          <Typography variant="h6" className="text-gray-500 text-center">Total Recieved</Typography>
          <div className="w-44 mt-2 h-16 flex gap-8 rounded-lg border-[1px] border-green-500 shadow-2xl shadow-gray-400">
          
           <div className="w-10 h-10 mt-3 flex justify-center items-center ml-2 rounded-full bg-green-200">
           <NorthEastIcon fontSize="large" className="text-green-600"/>
           </div>

            <Typography
              variant="h6"
              className="text-green-600 mt-5 text-center"
            >
              $ {totalrecieve}
            </Typography>
          </div>
          </div>
          <div className="mt-10">
          <Typography variant="h6" className="text-gray-500 text-center">Total Withdrawn</Typography>
          <div className="w-44 mt-2 h-16 flex gap-8 rounded-lg border-[1px] border-red-800 shadow-2xl shadow-gray-400">
           
           <div className="w-10 h-10 mt-3 flex justify-center items-center ml-2 rounded-full bg-red-300">
           <SouthWestIcon fontSize="large" className="text-red-800"/>
           </div>

            <Typography
              variant="h6"
              className="text-red-800 mt-5 text-center"
            >
              $ {totalwithdraw}
            </Typography>
          </div>
          </div>
        </div>

        <Typography variant="h5" className="text-gray-500 mt-16 ml-48">Transactions</Typography>

        <div className="mb-5 mt-5">

        {transactions && transactions.map((transaction)=>(

             <div className="w-96 flex gap-8 ml-48 h-12 mt-3 rounded-lg shadow-2xl shadow-gray-500">
             <img src={Userico} className="w-8 h-8 rounded-full mt-2 ml-2" alt="user_img" />
             <p className="mt-3 font-semibold">{transaction.recieved_from.first_name} {transaction.recieved_from.last_name} </p>
             <p className="text-xs mt-4 text-gray-500">{timeAgo(transaction.created_at)}</p>
             
             <Typography variant="h6" className="text-green-600 mt-3">$ {transaction.recieved}</Typography>
           </div>

         ))}
     
     </div>
       
        

        
      </Card>

      <Dialog size="md" open={open}>
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
          <Button variant="text" color="blue-gray">
            close
          </Button>
          <Button variant="gradient">Ok, Got it</Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default Wallet;
