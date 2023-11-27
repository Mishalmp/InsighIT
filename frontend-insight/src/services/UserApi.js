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
    return UserAxiosInstant.get(`accounts/listskills/${user_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const EditSkill=(id,value)=>{
    return UserAxiosInstant.patch(`accounts/skillview/${id}/`,value,{
        withCredentials:true
    }).catch((error)=>error.response)

}

const DeleteSkill=(id)=>{
    return UserAxiosInstant.delete(`accounts/skillview/${id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}



const Checkoutsession=(data)=>{
    return UserAxiosInstant.post(`accounts/create-checkout-session/`,data,{
        withCredentials:true
    }).catch((error)=>error.response)

}

const NotificationCreate=(values)=>{
    return UserAxiosInstant.post("accounts/notifications/",values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const Notificationsbyuser=(user_id)=>{
    return UserAxiosInstant.get(`accounts/listnotification/${user_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const CreateSubscription=(data)=>{
    return UserAxiosInstant.post("accounts/subscriptions/",data,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const IsSubscriber=(user_id,blog_author)=>{
    return UserAxiosInstant.get(`accounts/isSubscriber/${user_id}/${blog_author}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const CreateFollowing=(values)=>{
    return UserAxiosInstant.post('accounts/followingscreate/',values,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const Unfollow=(follower_id,following_id)=>{
    return UserAxiosInstant.delete(`accounts/unfollow/${follower_id}/${following_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const Is_follower=(follower_id,following_id)=>{
    return UserAxiosInstant.get(`accounts/is_follower/${follower_id}/${following_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const Followingslist=(user_id)=>{
    return UserAxiosInstant.get(`accounts/followings/${user_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const Followerslist=(user_id)=>{
    return UserAxiosInstant.get(`accounts/followers/${user_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const SubscriptionsList=(user_id)=>{
    return UserAxiosInstant.get(`accounts/subscriptionslist/${user_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)
}

const Subscriberslist=(user_id)=>{
    return UserAxiosInstant.get(`accounts/subscriberslist/${user_id}/`,{
        withCredentials:true
    }).catch((error)=>error.response)

}

export {UserSignin,UserGoogleSignin,UserGoogleSignup,GetUserInfo,UpdateUser,CreateSkill,ListSkills,EditSkill,DeleteSkill,NotificationCreate,Checkoutsession,Notificationsbyuser,CreateSubscription,IsSubscriber,CreateFollowing,Is_follower,Unfollow,Followingslist,Followerslist,SubscriptionsList,Subscriberslist}
