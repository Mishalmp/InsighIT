import axios from "axios";

import { accountsapi,adminapi,blogsapi } from "../constants/constants";


const CreateAxiosClient=(baseURL)=>{
    const client = axios.create({
        baseURL,
        timeout:8000,
        timeoutErrorMessage:"Request timed out please try again!!!"

    })
    return client
}

const attachToken=(req,tokenName)=>{
    let authToken = localStorage.getItem(tokenName.access)
    if (authToken){
        req.headers.Authorization=`Bearer${authToken}`;
    }
    return req
}


const UserAxiosInstant=CreateAxiosClient(accountsapi)
UserAxiosInstant.interceptors.request.use(async(req)=>{
    const modifiedReq=attachToken(req,'token')
    return modifiedReq
})

const AdminAxiosInstant=CreateAxiosClient(adminapi)
AdminAxiosInstant.interceptors.request.use(async(req)=>{
    const modifiedReq=attachToken(req,'token')
    return modifiedReq
})

const BlogsAxiosInstant =CreateAxiosClient(blogsapi)
BlogsAxiosInstant.interceptors.request.use(async(req)=>{
    const modifiedReq=attachToken(req,'token')
    return modifiedReq
})

export {UserAxiosInstant,AdminAxiosInstant,BlogsAxiosInstant}