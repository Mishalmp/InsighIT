import React, { useState } from 'react'
import { Checkoutsession } from '../../../services/UserApi'


function checkoutsession() {

    const [clientsecret,setClientSecret]=useState('')
   
    

    const handleSubmit=async ()=>{
        try{

          const response = await Checkoutsession(17)
          // console.log(response.data,'edssdfsdfsdfsfds');

        }catch(error){
          console.error(error)
        }
    }

  
  return (
    <div>
        <h1>Hi hello</h1>
        <button className='bg-black w-10 h-10' onClick={handleSubmit}></button>
      
    </div>
  )
}

export default checkoutsession
