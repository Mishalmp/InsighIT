import React, { useEffect, useState } from 'react'

import rightmore from '../../../assets/blogs/rightmore.svg'


import { GetTopics } from '../../../services/BlogsApi'
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

function Blogfilter() {

  // const [topics,setTopics]=useState([])

  // useEffect(()=>{
  //   const FetchTopics=async ()=>{

  //     try{
  //       const response = await GetTopics()
  //       setTopics(response.data)
  //       console.log(response.data,'topicsss')
  //     }catch(error){
  //       console.error("Error!fetching topics..",error)
  //     }
  //   }
  //   FetchTopics()
  // },[])
  const [activeTab, setActiveTab] = React.useState("html");
  const data = [
    {
      label: "Web Development",
      value: "web development",
      desc: `It really matters and then like it really doesn't matter.
      What matters is the people who are sparked by it. And the people 
      who are like offended by it, it doesn't matter.`,
    },
    {
      label: "React",
      value: "react",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Python",
      value: "python",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
    {
      label: "Django",
      value: "django",
      desc: `Because it's about motivating the doers. Because I'm here
      to follow my dreams and inspire other people to follow their dreams, too.`,
    },
    {
      label: "Nodejs",
      value: "nodejs",
      desc: `We're not always in the position that we want to be at.
      We're constantly growing. We're constantly making mistakes. We're
      constantly trying to express ourselves and actualize our dreams.`,
    },
  ];
  return (
    <div className='w-[52rem] ml-[10%] mt-10 mb-10'>
        {/* <div className='md:w-[40rem] md:ml-[10%] h-10 mt-20 overflow-x-auto'> 
      <ul className='flex justify-between text-lg'>
        
        <li>All</li>

        {topics.map((topic)=>(
          <li>{topic.topic} </li>
        ))}  
      
        <li><img className='w-10 h-10' src={rightmore} alt="more" /></li>
      </ul>
      </div>
      <div className='max-w-[1200px] md:ml-[10%] mb-10 mt-5 h-[1px] bg-blue-gray-700'></div> */}
        <Tabs value={activeTab}>
      <TabsHeader
        className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
        indicatorProps={{
          className:
            "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
        }}
      >
        {data.map(({ label, value }) => (
          <Tab
            key={value}
            value={value}
            onClick={() => setActiveTab(value)}
            className={activeTab === value ? "text-gray-900" : ""}
          >
            {label}
          </Tab>
        ))}
      </TabsHeader>
      <TabsBody>
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
    </div>
  )
}

export default Blogfilter
