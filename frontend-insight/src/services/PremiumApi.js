import { PremiumAxiosInstant } from "../utils/axiosUtils";


const CreatepremiumUserinfo=(values)=>{
    return PremiumAxiosInstant.post("/premiumuserinfo/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}
const CreateExperiences=(values)=>{
    return PremiumAxiosInstant.post("/experiences/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}
const CreateQualifications=(values)=>{
    return PremiumAxiosInstant.post("/qualifications/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}


const GetPremiuminfo=(user_id)=>{
    return PremiumAxiosInstant.get(`/premiumuserinfoview/${user_id}/`)
}


export {CreatepremiumUserinfo,CreateExperiences,CreateQualifications,GetPremiuminfo}