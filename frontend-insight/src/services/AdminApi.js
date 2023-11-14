import { AdminAxiosInstant } from "../utils/axiosUtils";

const AdminSignIn=(values)=>{
    return AdminAxiosInstant.post("/token/",values,{
        withCredentials:true
    }).catch((error)=>error.response);
}

const ListUser = (values)=>{
    return AdminAxiosInstant.get(`/userlist/`,values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const BlockUser=(id,values)=>{
    return AdminAxiosInstant.put(`/userblockunblock/${id}/`,values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

export {AdminSignIn,ListUser,BlockUser}