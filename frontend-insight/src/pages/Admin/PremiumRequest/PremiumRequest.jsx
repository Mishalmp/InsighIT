// import React, { useEffect, useState } from 'react'
// import AdminNavbar from '../../../components/Admin/AdminNavbar'
// import AdminSidebar from '../../../components/Admin/AdminSidebar'
// import {
//     Card,
//     CardHeader,
//     Input,
//     Typography,
//     Button,
//     CardBody,
//     Chip,
//     CardFooter,
//     Tabs,
//     TabsHeader,
//     Tab,
//     Avatar,
//     IconButton,
//     Tooltip,
//   } from "@material-tailwind/react";
//   import { MagnifyingGlassIcon,ArrowDownTrayIcon } from "@heroicons/react/24/outline";
//   import { PencilIcon } from "@heroicons/react/24/solid";

// import { timeAgo } from '../../../helpers/Timemanage';


// function PremiumRequest() {





//   return (
//     <div className='flex'>
//         <AdminSidebar/>
//         <Card className='h-2/3 w-2/3 ml-10'>
//         <AdminNavbar/>
//       <CardHeader floated={false} shadow={false} className="rounded-none">
//         <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
//           <div>
//             <Typography variant="h5" color="blue-gray">
//               Recent Reports
//             </Typography>
//             <Typography color="gray" className="mt-1 font-normal">
//               These are details about the last Blog Reports
//             </Typography>
//           </div>
//           <div className="flex w-full shrink-0 gap-2 md:w-max">
//             <div className="w-full md:w-72">
//               <Input
//                 label="Search"
//                 icon={<MagnifyingGlassIcon className="h-5 w-5" />}
//               />
//             </div>
//             <Button className="flex items-center gap-3" size="sm">
//               <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Download
//             </Button>
//           </div>
//         </div>
//       </CardHeader>
//       <CardBody className="overflow-scroll px-0">
//         <table className="w-full min-w-max table-auto text-left">
//           <thead>
//             <tr>
//               {TABLE_HEAD.map((head) => (
//                 <th
//                   key={head}
//                   className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
//                 >
//                   <Typography
//                     variant="small"
//                     color="blue-gray"
//                     className="font-normal leading-none opacity-70"
//                   >
//                     {head}
//                   </Typography>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody>
//             {reports.map(
//               (
//                 report,
//                 index
//               ) => {
//                 const isLast = index === reports.length - 1;
//                 const classes = isLast
//                   ? "p-4"
//                   : "p-4 border-b border-blue-gray-50";
 
//                 return (
//                   <tr >
//                     <td className={classes}>
//                       <div className="flex items-center gap-3">
//                         <Avatar
//                         //   src={report.user.profile_img}
//                         alt='username'
//                           size="md"
//                           className="border border-blue-gray-50 bg-blue-gray-50/50 object-contain p-1"
//                         />
//                         <Typography
//                           variant="small"
//                           color="blue-gray"
//                           className="font-bold"
//                         >
//                           {/* {report.user.first_name} {report.user.last_name} */}
//                         </Typography>
//                       </div>
//                     </td>
                 
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal"
//                       >
//                         {/* {timeAgo(report.reported_at)} */}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal"
//                       >
//                         {/* {report.reason} */}
//                       </Typography>
//                     </td>
                 

//                     <td className={classes}>
//                       <Typography
//                         variant="small"
//                         color="blue-gray"
//                         className="font-normal"
//                       >
//                         {/* {report.blog.title} */}
//                       </Typography>
//                     </td>
//                     <td className={classes}>
//                       <div className="w-max">
//                         <Chip
//                           size="sm"
//                           variant="ghost"
//                         //   value={report.is_solved?"Solved":"Not Solved"}
//                           color={
//                             // report.is_solved
//                               ? "green"
//                               : "red"
//                           }
//                         />
//                       </div>
//                     </td>
               
//                     <td className={classes} >
//                       <Tooltip content="View Report">
//                         <IconButton variant="text">
//                           <PencilIcon className="h-4 w-4" />
//                         </IconButton>
//                       </Tooltip>
//                     </td>
//                   </tr>
//                 );
//               },
//             )}
//           </tbody>
//         </table>

//         {/* {selectedReport && (
//         <ReportBlogModal
//           isOpen={!!selectedReport}
//           onClose={() => setSelectedReport(null)}
//           report={selectedReport}
//         />
//       )} */}

//       </CardBody>
//       <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
//         <Button variant="outlined" size="sm">
//           Previous
//         </Button>
//         <div className="flex items-center gap-2">
//           <IconButton variant="outlined" size="sm">
//             1
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             2
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             3
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             ...
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             8
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             9
//           </IconButton>
//           <IconButton variant="text" size="sm">
//             10
//           </IconButton>
//         </div>
//         <Button variant="outlined" size="sm">
//           Next
//         </Button>
//       </CardFooter>
//     </Card>
        

      
//     </div>
//   )
// }

// export default PremiumRequest
