import React, { useState } from "react";
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
} from "@material-tailwind/react";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useSelector, useDispatch } from "react-redux";
import { CreateExperiences,CreateQualifications } from "../../services/PremiumApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
function Upgradeformfinal({ onBack }) {

  const {premiumuserinfo}=useSelector((state)=>state.user);
  const navigate=useNavigate()

  const [qualifications, setQualifications] = useState("");
  const [experience, setExperiences] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
      const quali_res=await CreateQualifications({
        premium_user:premiumuserinfo.id,
        qualifications:qualifications
      });

      const exp_res=await CreateExperiences({
        premium_user:premiumuserinfo.id,
        experience:experience
      })
      console.log(quali_res.data,'qaaali')
      console.log(exp_res.data,'exppppp')
      toast.success("Record Submitted Successfully")
      
    }catch(error){
      console.error("error",error)
      toast.error("error occured while submitting!!")
    }

    navigate('/User/userprofile')

 
  };
  return (
    <div>
      <ToastContainer/>
      <Card className="w-[50rem] ml-72 h-auto mt-5 bg-gray-100">
        <Typography variant="h4" className="text-center mt-5">
          Premium Upgrade Form
        </Typography>
        <Typography variant="h5" color="blue" className="text-center mt-5">
          Step 2/2
        </Typography>
        <form className="m-16" onSubmit={handleSubmit}>
          <div class="grid gap-6 mb-6 md:grid-cols-2">
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Qualifications <AddCircleOutlineIcon />
              </label>
              <textarea
                id="message"
                rows="4"
                name="qualifications"
                value={qualifications}
                onChange={(e)=>setQualifications(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your Qualifications.."
              ></textarea>
            </div>
            <div>
              <label
                for="message"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Experiences <AddCircleOutlineIcon />
              </label>
              <textarea
                id="message"
                rows="4"
                name="experience"
                value={experience}
                onChange={(e)=>setExperiences(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Write your Experiences.."
              ></textarea>
            </div>
          </div>

          <div className="flex mt-10">
            <Typography color="blue" className="mt-1" onClick={onBack}>
              Back
            </Typography>
            <button
              type="submit"
              class="text-white  ml-[40%] bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default Upgradeformfinal;
