import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Input } from "@material-tailwind/react";
import { Card, Typography, Button } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
import { CreateBlog, GetTopics } from "../../../services/BlogsApi";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from '../../../components/Loading/Loader';
import NavBar from "../../../components/Userside/NavBar/NavBar";
import Footer from "../../../components/Userside/footer/footer";
import { useNavigate } from "react-router-dom";

// import { Editor } from "react-draft-wysiwyg";
// import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


function UserBlogCreate() {
  const [value, setValue] = useState("");
  const [title, setTitle] = useState("");
  const [selectTopic, setSelecttopic] = useState("");
  const [topics, setTopics] = useState([]);
  const { userinfo } = useSelector((state) => state.user);
  const [loading,setLoading]=useState(false)
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const navigate=useNavigate()
  const handleLoading=()=>setLoading((cur)=>!cur)

  useEffect(() => {
    FetchTopics();
  }, []);

  const FetchTopics = async () => {
    try {
      const response = await GetTopics();
      setTopics(response.data);
    } catch (error) {
      console.error("error fetching topics", error);
    }
  };

  

  const handleBlogSubmit = async () => {
    console.log(selectTopic, "selecttopicss");
    handleLoading()
    const blogvalues = {
      title: title,
      content: value,
      user_id: userinfo.id,
      topic: selectTopic,
    };

    const formData=new FormData()
    formData.append("title",title)
    formData.append("content",value)
    formData.append("user_id",userinfo.id)
    formData.append("topic",selectTopic)
    formData.append("banner_img",imageFile)
    formData.append("video_post",videoFile)

    try {
      console.log(blogvalues, "blogvalues");
      const response = await CreateBlog(formData);
      console.log("Blog created successfully");
      toast.success("Blog created successfully")
      navigate("/User/blogs")
    } catch (error) {
      console.error("error! creating blog", error);
      toast.error("error! creating blog")
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleVideoChange = (e) => {
    setVideoFile(e.target.files[0]);
  };

  return (
    <>
     {loading && <Loader/>}
      <ToastContainer  />
      <NavBar/>
      <Typography className="text-center font-semibold text-2xl -ml-24 mt-10">Write Blog</Typography>
      <Card className="w-[60rem] h-[60rem] m-10 ml-[15%] bg-gray-50">
        <Typography className="text-center font-semibold mt-4">Title </Typography>
        <div className="flex flex-col w-[70%]  mb-10 ml-[15%] gap-6">
          <Input
            variant="standard"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            label="Title..."
          />
        </div>
        <Typography className="text-center font-semibold">
          Banner Image{" "}
        </Typography>
        <div className="flex items-center justify-center w-full mb-10">
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-[80%] h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              {imageFile ? (
                <>
                <img
                  className="w-60 h-28 mt-10 mb-4"
                  src={URL.createObjectURL(imageFile)}
                  alt="Selected Image"
                  />
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                  {imageFile.name}
                </p>
                  </>
                
              ) : (
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
              )}
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                <span className="font-semibold">
                  Click to upload banner image
                </span>
              </p>
              {/* {imageFile && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {imageFile.name}
                </p>
              )} */}
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        <div>
          <Typography className="text-center font-semibold">
            Blog Content
          </Typography>
          <ReactQuill
            theme="snow"
            className="h-[10rem] w-[80%] ml-[10%]"
            value={value}
            onChange={setValue}
          />
          {/* <Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={this.onEditorStateChange}
/>; */}
        </div>
        <div className="w-72 mt-16 ml-[35%] gap-6">
          <Typography className="text-center font-semibold">Topic</Typography>
          <Select
            variant="outlined"
            label="Select Version"
            value={selectTopic}
            onChange={(value) => setSelecttopic(value)}
          >
            {topics.map((topic) => (
              <Option key={topic.id} value={topic.id}>
                {topic.topic}
              </Option>
            ))}
          </Select>
        </div>

        <div className="mt-10 mb-10">
          <Typography className="text-center font-semibold">
            Video Upload (Optional)
          </Typography>
          <input
            className="block w-[80%] ml-[10%] text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={handleVideoChange}
          />
        </div>
        <Button className="mt-6 w-[60%] ml-[20%]" onClick={handleBlogSubmit}>
          Submit Blog
        </Button>
      </Card>
      <Footer/>
    </>
  );
}

export default UserBlogCreate;
