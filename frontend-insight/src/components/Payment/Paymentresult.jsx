import React, { useEffect } from 'react'
import {
    Button,
    Dialog,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Checkbox,
    CogIcon,
    UserIcon,
    BuildingLibraryIcon,
  } from "@material-tailwind/react";
  import { Link } from 'react-router-dom';

  import { CreateSubscription } from '../../services/UserApi';

function Paymentresult() {

    const isSuccess = new URLSearchParams(window.location.search).get("success") === "true";
    const searchparams= new URLSearchParams(window.location.search)

    useEffect(()=>{
        console.log('Effect is running! isSuccess:', isSuccess);
        const handleSubscriptioncreate=async()=>{
            if(isSuccess){

                const sub_type=searchparams.get('subscription_type')
                const currentdate= new Date()
                
                let endDate;

                if (sub_type === 'basic_monthly' || sub_type === 'standard_monthly'){

                    endDate = new Date(currentdate);
                    endDate.setMonth(currentdate.getMonth() + 1);

                }else if (sub_type === 'basic_yearly' || sub_type === 'standard_yearly'){

                    endDate=new Date(currentdate)
                    endDate.setFullYear(currentdate.getFullYear() + 1);


                }else{
                    throw new error('invalid subscription type')
                }

                try {
                    await CreateSubscription({

                        subscriber:searchparams.get('subscriber'),
                        subscribed_to:searchparams.get('subscribed_to'),
                        subscription_type:searchparams.get('subscription_type'),
                        is_active:true,
                        end_time:endDate,
                   
                    })
                   
                    
                } catch (error) {
                    console.error(error)
                    
                }
            }

        }
        handleSubscriptioncreate()
    },[isSuccess])



  return (
    <div>
         <div className="flex justify-center items-center h-screen">
            {
                isSuccess?(
                    <Card className="w-96 border-4 border-green-600 rounded-xl">
                    <CardBody>
                      <Typography variant="h5" color="blue-gray" className="mb-2 text-3xl text-light-green-900">
                        Payment Successfull
                      </Typography>
                      <Typography className="text-sm mt-5">
                        Your payment done successfully.
                      </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                      <a href="#" className="inline-block">
                      <Link to='/User/Home'>
                        <Button size="sm" variant="text" className="flex items-center ml-64 gap-2 text-deep-orange-900 font-bold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4 transform rotate-180"
                            >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                              />
                          </svg>
                          Back
                        </Button>
                              </Link>
                       
                      </a>
                    </CardFooter>
                  </Card>

                ):(
                    <Card className="w-96 border-4 border-red-600 rounded-xl">
                    <CardBody>
                      <Typography variant="h5" color="blue-gray" className="mb-2 text-3xl text-red-500">
                        Payment Cancelled
                      </Typography>
                      <Typography className="text-sm mt-5">
                        Your payment Has cancelled
                      </Typography>
                    </CardBody>
                    <CardFooter className="pt-0">
                      <a href="#" className="inline-block">
                      <Link to='/User/Home'>
                        <Button size="sm" variant="text" className="flex items-center ml-64 gap-2 text-deep-orange-900 font-bold">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="h-4 w-4 transform rotate-180"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                            />
                          </svg>
                          Back
                        </Button>
                        </Link>
                       
                      </a>
                    </CardFooter>
                  </Card>

                )

            }
  
    </div>
      
    </div>
  )
}

export default Paymentresult
