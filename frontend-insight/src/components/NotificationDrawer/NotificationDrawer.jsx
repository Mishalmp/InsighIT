import React, { Fragment, useEffect, useState } from 'react'
import {
    Drawer,
    Button,
    Typography,
    IconButton,Alert,
  } from "@material-tailwind/react";

  import { Notificationsbyuser } from '../../services/UserApi';
  import { Loader } from '../../components/Loading/Loader';

function NotificationDrawer({ isOpen,userinfo, onClose }) {

 const [notifications,setNotifications]=useState([])
 const [loading,setLoading]=useState(false)

 

 const handleCloseAll = () => {
    setNotifications([]);
  };

 useEffect(()=>{

    const fetchnotifications=async()=>{

        try{
            const response = await Notificationsbyuser(userinfo.id);
            const fetchedNotifications = response.data;
            // handleLoading()
            setNotifications(fetchedNotifications);
            console.log(notifications, 'Fetched Notifications');
        }catch(error){
            console.error(error)
        }
    }
    fetchnotifications()

 },[userinfo.id])

 const handleLoading=()=>setLoading((cur)=>!cur)
 

  return (
    <div>
        {loading && <Loader/>}
          <Fragment>
     
      <Drawer  open={isOpen} onClose={onClose} className="p-4 w-[40rem]">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Notifications
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
        
        <div  className="flex w-full flex-col gap-2" >
      
        
     
        {notifications.map((notification)=>(
              <Alert open={true} >
             
              {notification.text}
            </Alert>
        ))}
    
    <Button variant="outlined"  onClick={handleCloseAll}>Clear All</Button>
    </div>
    
       
      </Drawer>
    </Fragment>
      
    </div>
  )
}

export default NotificationDrawer
