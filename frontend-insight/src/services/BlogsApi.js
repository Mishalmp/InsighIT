import { BlogsAxiosInstant } from "../utils/axiosUtils";


const CreateBlog=(values)=>{
    return BlogsAxiosInstant.post("/blogs/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const ListBlogs=(searchQuery)=>{
    return BlogsAxiosInstant.get(`/blogslist/?search=${searchQuery}`,{
       
        withCredentials:true
    }).catch((error)=>error.response)
}

const TrendingBlogs=()=>{
    return BlogsAxiosInstant.get("/trendingblogs/",{
        withCredentials:true
    }).catch((error)=>error.response)
}

const GetBlogDetail=(blog_id)=>{
    return BlogsAxiosInstant.get(`/blogdetail/${blog_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const UpdateBlog=(blog_id,values)=>{
    return BlogsAxiosInstant.patch(`/blogdetail/${blog_id}/`,values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const DeleteBlog=(blog_id)=>{
    return BlogsAxiosInstant.delete(`/blogdetail/${blog_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const GetBlogsByTopic=(topic_id)=>{
    return BlogsAxiosInstant.get(`/blogs/by-topic/${topic_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const GetBlogsByUser=(user_id,searchQuery)=>{
    return BlogsAxiosInstant.get(`blogs/by-user/${user_id}/?search=${searchQuery}`,{
        
        withCredentials:true
    }).catch((error)=>error.response)
}


const CreateTopics=(values)=>{
    return BlogsAxiosInstant.post("topics/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const GetTopics=()=>{
    return BlogsAxiosInstant.get("topics/",{
        withCredentials:true
    }).catch((error)=>error.response)
}


const CreateComment=(values)=>{
    return BlogsAxiosInstant.post("/commentslistcreate/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const ListComment=(blog_id)=>{
    return BlogsAxiosInstant.get(`/commentslist/${blog_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const DeleteComment=(id)=>{
    return BlogsAxiosInstant.delete(`/comment-retrieve-destroy/${id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}


export {CreateBlog,GetBlogDetail,GetBlogsByTopic,ListBlogs,GetBlogsByUser,CreateTopics,GetTopics,TrendingBlogs,UpdateBlog,DeleteBlog,CreateComment,ListComment,DeleteComment}