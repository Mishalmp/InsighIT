import { UserAxiosInstant } from "../utils/axiosUtils";


const UserSignin=(values)=>{
    return UserAxiosInstant.post("accounts/token/",values,{
        withCredentials:true
    }).catch((error)=>error.response);
};

const UserGoogleSignup=(value)=>{
    const values={
        email:value.email,
        first_name:value.given_name,
        last_name:value.family_name,
        password:value.id,
        // profile_img:value.picture,
    }
    return UserAxiosInstant.post("accounts/GoogleUser/",values,{
        withCredentials:true
    })//.catch((error=>error.response))
}

const UserGoogleSignin=(value)=>{
    const values={
        email:value.email,
        password:value.id,
    }
    return UserAxiosInstant.post("accounts/token/",values,{
        withCredentials:true
    })//.catch((error)=>error.response);
}

const GetUserInfo =(id)=>{
    return UserAxiosInstant.get(`accounts/userinfo/${id}/`,{
        withCredentials:true
    })
}

const UpdateUser=(id,value)=>{
    return UserAxiosInstant.patch(
        `accounts/updateuser/${id}/`,value,{
            withCredentials:true
        }
    )
}

const CreateSkill=(values)=>{
    return UserAxiosInstant.post("accounts/skills/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const ListSkills=(user_id)=>{
    return UserAxiosInstant.get(`accounts/listskills/${user_id}`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const Checkoutsession=(pre_id)=>{
    return UserAxiosInstant.post(`accounts/create-checkout-session/${pre_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)

}

const NotificationCreate=(values)=>{
    return UserAxiosInstant.post("accounts/notifications/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const Notificationsbyuser=(user_id)=>{
    return UserAxiosInstant.get(`accounts/listnotification/${user_id}/`)
}


export {UserSignin,UserGoogleSignin,UserGoogleSignup,GetUserInfo,UpdateUser,CreateSkill,ListSkills,NotificationCreate,Checkoutsession,Notificationsbyuser}
