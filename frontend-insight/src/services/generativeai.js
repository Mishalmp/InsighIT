import { GenerativeaiAxiosInstant } from "../utils/axiosUtils";



const CreateContentai=(data)=>{
    return GenerativeaiAxiosInstant.post("/text_generation/",data,{
        withCredentials:true
    }).catch((error)=>error.response)
}


export {
    CreateContentai
}

