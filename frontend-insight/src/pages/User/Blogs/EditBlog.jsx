import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@material-tailwind/react";
import { Card, Typography, Button,Checkbox} from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { GetBlogDetail, GetTopics,UpdateBlog } from "../../../services/BlogsApi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from '../../../components/Loading/Loader';
import NavBar from "../../../components/Userside/NavBar/NavBar";
import Footer from "../../../components/Userside/footer/footer";
import { useNavigate, useParams } from "react-router-dom";
import EditorToolbar , { modules, formats } from '../../../helpers/EditorToolbar'


function EditBlog() {

    const {blogId} = useParams()
    const navigate=useNavigate()

    const [value, setValue] = useState("");
    const [title, setTitle] = useState("");
    const [topics, setTopics] = useState([]);
    const { userinfo } = useSelector((state) => state.user);
    const [selectTopic, setSelectTopic] = useState('');
    const [loading,setLoading]=useState(false)
    const [imageFile, setImageFile] = useState(null);
    const [videoFile, setVideoFile] = useState(null);
    const [ispremium, setisPremium] = useState(false);
    const handleLoading = () => setLoading((cur) => !cur);


    useEffect(()=>{
        fetchBlogData()
        fetchTopics()

    },[blogId])



    const fetchBlogData= async ()=>{
        try{
            const response=await GetBlogDetail(blogId)
            const BlogData=response.data
            setTitle(BlogData.title)
            setValue(BlogData.content)
            // setSelectTopic(BlogData.topic)
            console.log(BlogData.topic,'daaaata');
            setImageFile(BlogData.banner_img)
            setisPremium(BlogData.is_premium_blog)
            
            // setVideoFile(BlogData.video_post)
            // console.log(videoFile.name,'viedonama');
            console.log(response.data,'ressssponseeeee');
         
        }catch(error){
            console.error("errror ! fetching blogdata ,",error)
        }

    }


    const fetchTopics=async ()=>{
        try{
            const response = await GetTopics()
            setTopics(response.data)
        }catch(error){
            console.error("error! fetching topics",error)
        }
    }


    const HandleBlogUpdate= async ()=>{
        
        handleLoading();

        const formData=new FormData()

        formData.append("title",title)
        formData.append("content",value)
        formData.append("topic",selectTopic)
        formData.append("banner_img",imageFile)
        formData.append("video_post",videoFile)

        try{
            const response = await UpdateBlog(blogId,formData)
            console.log("blog updated successfully",response.data)
            toast.success("Blog Updated Successfully!!!")
            navigate(`/User/detailblog/${blogId}/`)
        }catch(error){
            console.error("error while updating blog",error)
            toast.error("error occured while updating")
        }



    }

    const handleVideoChange = (e) => {
      const file = e.target.files && e.target.files[0];
      if (file) {
          setVideoFile(file);
      }
  };
  
    const handleImageChange=(e)=>{
        setImageFile(e.target.files[0])

    }
    
    // console.log(value,'valueeeeeeeees')
    // console.log(title,'title',selectTopic,'selectopics',imageFile,'image',videoFile,'videofile')
  return (
    <div>
          {loading && <Loader/>}
      <ToastContainer  />
        <NavBar/>
        <Typography className="text-center font-semibold text-2xl -ml-24 mt-10">Edit Blog</Typography>
      <Card className="w-[60rem] h-auto m-10 ml-[15%] bg-gray-50">
      <div className="grid grid-cols-2" >
      <div className="mt-16">
        <Typography className="text-center font-semibold ">Title </Typography>
        <div className="flex flex-col w-80 mt-2 ml-20 gap-6">
          <Input
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="Title..."
          />
        </div>
        <div className="w-80 mt-12 mb-10 ml-20 gap-6">
          <Typography className="text-center font-semibold mb-5">Topic</Typography>
          <Select
            variant="outlined"
            label="Select Version"
            value={selectTopic.topic}
            onChange={(value) => setSelectTopic(value)}
          >
            {topics.map((topic) => (
              <Option key={topic.id} value={topic.id}>
                {topic.topic}
              </Option>
            ))}
          </Select>
        </div>
        </div>
        <div className="mt-16">
        <Typography className="text-center font-semibold">
          Banner Image{" "}
        </Typography>
        <div className="flex items-center justify-center mt-5 w-full mb-10">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[25rem] h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {imageFile ? (
                <img
                  className="w-[25rem] h-40 "
                  src={imageFile}
                  alt="Selected Image"
                />
              ) : (
                <>
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  ></path>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  Click to upload banner image
                </span>
              </p>

                </>
              )}
             
              {imageFile && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {imageFile.name}
                </p>
              )}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
        </div>
        </div>
        <div className="mt-5">
          <Typography className="text-center font-semibold">
            Blog Content
          </Typography>
          <EditorToolbar />
      <ReactQuill
        theme="snow"
        value={value}
        onChange={setValue}
        // placeholder={"Write something awesome..."}
        className="h-[15rem] w-[80%] ml-[10%] mb-10"
        modules={modules}
        formats={formats}
      />




          {/* <ReactQuill
            theme="snow"
            className="h-[10rem] w-[80%] ml-[10%] mb-10"
            value={value}
            onChange={setValue}
            
          /> */}
        </div>
       
        <div className="grid grid-cols-2 ml-10" >
        <div className="mt-10 mb-10">
          <Typography className="text-center font-semibold">
            Video Upload (Optional)
          </Typography>
          <input
            className="block w-[23rem] mt-5 ml-10 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            value={videoFile}
            onChange={handleVideoChange}
          />
             {/* {videoFile ? <p>{videoFile.name}</p> : ''} */}
        </div>
        {userinfo.is_premium && (
             <div className="mt-20 mb-10 ml-5  flex">
             <Checkbox
               defaultValue="true"
               onClick={(e) => setisPremium(!ispremium)}
             />
             <Typography className="mt-3 ml-2">Premium Blog </Typography>
           </div>
         )}
         </div>

        <Button className="mt-6 mb-10 w-[60%] ml-[20%]" onClick={HandleBlogUpdate}>
          Submit Blog
        </Button>
      </Card>

        <Footer/>

      
    </div>
  )
}

export default EditBlog
