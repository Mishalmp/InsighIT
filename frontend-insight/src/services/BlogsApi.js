import { BlogsAxiosInstant } from "../utils/axiosUtils";



const CreateBlog=(values)=>{
    return BlogsAxiosInstant.post("/blogs/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const CreateCommunity=(values)=>{
    return BlogsAxiosInstant.post("communitycreate/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const ListBlogs=(searchQuery,topic)=>{

        return BlogsAxiosInstant.get(`/blogslist/?search=${searchQuery}&topic=${topic}`,{
       
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

const GetBlogsByUser=(user_id,searchQuery,topic)=>{
  
        return BlogsAxiosInstant.get(`blogs/by-user/${user_id}/?search=${searchQuery}&topic=${topic}`,{
        
            withCredentials:true
        }).catch((error)=>error.response)


}



const ListCommunities=()=>{
    return BlogsAxiosInstant.get("communitylist/",{
        withCredentials:true
    }).catch((error)=>error.response)
}

const DeleteCommunity=(id)=>{
    return BlogsAxiosInstant.delete(`communityview/${id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)

}

const CommunitiesByUser=(user_id)=>{
    return BlogsAxiosInstant.get(`communitiesbyuser/${user_id}/`,{
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

const TrendingTopics=()=>{
    return BlogsAxiosInstant.get("trendingtopics/",{
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

const LikeBlog=(values)=>{
    return BlogsAxiosInstant.post("/likes/",values,{
        withCredentials:true
    }).catch((error)=>error.response)

}

const UnlikeBlog=(values)=>{
    
    return BlogsAxiosInstant.delete(`/likeview/`,{ data: values },{
        withCredentials:true
    }).catch((error)=>error.response)
}

const GetBlogLike=(blogId,userId)=>{
    return BlogsAxiosInstant.get(`/likeview/?blog=${blogId}&user=${userId}`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const ReportBlogs=(values)=>{
    return BlogsAxiosInstant.post("/reportblogs/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}


const ReportBlogList=()=>{
    return BlogsAxiosInstant.get("/reportbloglist/",{
        withCredentials:true
    }).catch((error)=>error.response)
}

const Reportupdate=(id,values)=>{
    return BlogsAxiosInstant.patch(`/reportview/${id}/`,values,{
        withCredentials:true
    }).catch((error)=>error.response)
}


const CreateSaved=(values)=>{
    return BlogsAxiosInstant.post(`/createsaved/`,values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const ListSaved=(user_id,searchQuery)=>{
    return BlogsAxiosInstant.get(`/listsaved/${user_id}/?search=${searchQuery}`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const IsSave=(user_id,blog_id)=>{
    return BlogsAxiosInstant.get(`/saveview/?user_id=${user_id}&blog_id=${blog_id}`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const Unsave=(user_id,blog_id)=>{
    return BlogsAxiosInstant.delete(`/saveview/?user_id=${user_id}&blog_id=${blog_id}`,{
        withCredentials:true
    }).catch((error)=>error.response)
}



export {CreateBlog,GetBlogDetail,GetBlogsByTopic,ListBlogs,GetBlogsByUser,
    CreateTopics,GetTopics,TrendingBlogs,UpdateBlog,DeleteBlog,CreateComment,ListComment,DeleteComment,
    LikeBlog,UnlikeBlog,GetBlogLike,ReportBlogs,ReportBlogList,Reportupdate,CreateSaved,ListSaved,IsSave,Unsave,
    CommunitiesByUser,DeleteCommunity,ListCommunities,CreateCommunity,TrendingTopics

}