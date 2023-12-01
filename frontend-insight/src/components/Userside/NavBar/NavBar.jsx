import React, { useState } from 'react'
import bginsight from '../../../assets/bginsight.png'
import hamburgerMenu from '../../../assets/hamburgerMenu.svg' 
import close from '../../../assets/close.svg'

import { Input,Button } from "@material-tailwind/react";

import { Link, useNavigate } from "react-router-dom";
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import ArticleIcon from '@mui/icons-material/Article';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import {LogoutDetails} from '../../../Redux/UserSlice'
import { useDispatch,useSelector } from "react-redux";
import NewspaperIcon from '@mui/icons-material/Newspaper';
import NotificationDrawer from '../../NotificationDrawer/NotificationDrawer';
import { Loader } from '../../../components/Loading/Loader';
import {

  ChevronDownIcon,
  
} from "@heroicons/react/24/solid";
import {

  Typography,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,Badge

} from "@material-tailwind/react";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import HelpIcon from '@mui/icons-material/Help';
import MoveToInboxIcon from '@mui/icons-material/MoveToInbox';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';

const profileMenuItems = [
  {
    label: "My Profile",
    icon: AccountCircleIcon,
  },
  {
    label: "My Blogs",
    icon: ArticleIcon,
  },
  {
    label: "Edit Profile",
    icon: SettingsIcon,
  },

  {
    label: "Saved",
    icon:BookmarksIcon, 
  },
  {
    label: "Inbox",
    icon: MoveToInboxIcon,
  },
  {
    label: "Help",
    icon: HelpIcon,
  },
  {
    label: "Sign Out",
    icon: PowerSettingsNewIcon,
  },
];
 



function NavBar() {
    const [toggle,setToggle]=useState(false)
    const { userinfo } = useSelector((state) => state.user);
    const [loading,setLoading]=useState(false)
    const handleLoading=()=>setLoading((cur)=>!cur)


    const [isMenuOpen, setIsMenuOpen] = useState(false);
 
    const closeMenu = () => setIsMenuOpen(false);
    const navigate=useNavigate()

    const [isNotificationDrawerOpen, setIsNotificationDrawerOpen] = useState(false);


    const dispatch=useDispatch()
    const Signout=()=>{
        dispatch(LogoutDetails())
        localStorage.removeItem("token")
        navigate("/login/")
    }

    const handleOpenNotificationDrawer = () => {
      handleLoading()
      setIsNotificationDrawerOpen(true);
      closeMenu(); 
    };

  return (

    <>
 <div className='w-full m-1 mb-0 rounded-lg h-[60px] bg-white border-b flex justify-between items-center'>
  <div className='ml-20 flex items-center'>
  <Link to='/User/Home/'>
    <img src={bginsight} className='h-[70px]' />
  </Link>
  <div className='ml-28 flex'>
  <Input
            type="search"
            color="teal"
            label="Search here..."
            // className="pr-20"
            // containerProps={{
            //   className: "min-w-[288px]",
            // }}
          />
          <Button
            size="sm"
            color="blue-gray"
            className="rounded-lg ml-1"
          >
            Search
          </Button>
  </div>

    
  </div>
  <ul className='hidden md:flex space-x-20 mr-[100px]'>
   <Link to="/User/usercreateblog/"> <li className='flex items-center hover:cursor-pointer hover:bg-blue-gray-50 rounded-3xl mt-2'><NoteAltIcon fontSize='medium'/><span>Write</span></li></Link>
  <Link to="/User/blogs">  <li className='flex items-center mt-2 hover:cursor-pointer hover:bg-blue-gray-50 rounded-3xl'><ArticleIcon fontSize='medium'/><span>Blogs</span></li></Link>
    <li className='flex items-center hover:cursor-pointer hover:bg-blue-gray-50 rounded-3xl'><NewspaperIcon fontSize='medium'/><span> Community</span></li>
    
    <li className='flex items-center hover:cursor-pointer hover:bg-blue-gray-50 rounded-3xl' onClick={handleOpenNotificationDrawer}><NotificationsActiveIcon fontSize='medium'/><span>Notifs</span></li>
    {/* <Link to='/User/userprofile/'>
    <li className='flex items-center'><img className='w-[40px] h-[40px] rounded-full' src={userinfo.profile_img} /></li>
    </Link> */}
        <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={userinfo.profile_img}
          />

          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;

          const handlemenuitemclick=()=>{
            closeMenu()

            if (label === 'My Profile'){

              navigate('/User/userprofile')
            }else if (label === 'My Blogs'){
              navigate(`/User/myblogs/${userinfo.id}`)
            }else if (label === 'Sign Out'){
              Signout()
            }
            else if (label === 'Saved'){
              navigate(`/User/saved/${userinfo.id}`)
            }
            else if (label === 'Inbox'){
              navigate(`/User/chat/`)
            }
          }
          return (
            <MenuItem
              key={label}
              onClick={handlemenuitemclick}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
      <NotificationDrawer isOpen={isNotificationDrawerOpen} userinfo={userinfo} onClose={() => setIsNotificationDrawerOpen(false)} />
    </Menu>
  </ul>

  <div className='md:hidden'>
        <img src={toggle?close:hamburgerMenu} onClick={()=>setToggle(!toggle)}/>
        </div>
</div>

<div className={toggle?"absolute z-10 p-4 bg-white w-full px-8 md:hidden":"hidden"}>
        <ul>
            <li className='p-5 flex hover:bg-gray-50'><NoteAltIcon fontSize='medium'/><span className='m-auto text-xl font-normal'>Write</span> </li>
            <li className='p-5 flex hover:bg-gray-100'><ArticleIcon fontSize='medium'/><span className='m-auto text-xl font-normal'>Docs</span></li>
            <li className='p-5 flex hover:bg-gray-100'><BookmarksIcon fontSize='medium'/><span className='m-auto text-xl font-normal'>Saved</span></li>
            <li className='p-5 flex hover:bg-gray-100'><img className='w-[60px] h-[60px]' src={userinfo.profile_img} /><span className='m-auto text-xl font-normal'>Profile</span></li>
            <div className='flex flex-col my-4 gap-4'>
            <button className='border border-[20B486] flex justify-center items-center hover:bg-black hover:text-white  bg-transparent  px-6 gap-2 py-4'>
                Sign In
            </button>
          
            </div>

        </ul>
    </div>

<div className='w-full h-[1px] bg-gray-600'></div>

    </>
  )
}

export default NavBar
