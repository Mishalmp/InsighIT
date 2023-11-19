import React, { useState } from 'react'
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
  import { Stepper, Step} from "@material-tailwind/react";
  import CheckoutForm from '../payment/PaymentCard';


  function CheckIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className="h-3 w-3"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12.75l6 6 9-13.5"
        />
      </svg>
    );
  }
function Bloghidepage() {
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => setOpen((cur) => !cur);
    const [activeStep, setActiveStep] = useState(0);
    const [isLastStep, setIsLastStep] = useState(false);
    const [isFirstStep, setIsFirstStep] = useState(false);
   
    const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
    const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
   
   
  return (
    <div>
      <Dialog
        size="lg"
        open={open}
        // handler={handleOpen}
        className="bg-transparent shadow-none"
      >
         
        <div className="mx-auto bg-white w-full max-w-[50rem] rounded-lg p-4">
        <div className="w-full py-3 px-6">
      <Stepper
        activeStep={activeStep}
        isLastStep={(value) => setIsLastStep(value)}
        isFirstStep={(value) => setIsFirstStep(value)}
      >
        <Step onClick={() => setActiveStep(0)}>1</Step>
        <Step onClick={() => setActiveStep(1)}>2</Step>
        <Step onClick={() => setActiveStep(2)}>3</Step>
      </Stepper>
    
    </div>
    {activeStep === 0 &&(
        <>
          <Typography variant='h2' className='text-center font-semibold'>Choose One Plan</Typography>

<Typography className='text-center max-w-28 mt-5 mb-5'>You Can't read this blog. <br /> Please do subscribe this author to see their premium blogs</Typography>
<div className='flex gap-5 ml-10'>


<Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
<CardHeader
floated={false}
shadow={false}
color="transparent"
className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
>
<Typography
  variant="small"
  color="white"
  className="font-normal uppercase"
>
  standard
</Typography>
<Typography
  variant="h1"
  color="white"
  className="mt-6 flex justify-center gap-1 text-7xl font-normal"
>
  <span className="mt-2 text-xl">$</span>29{" "}
  <span className="self-end text-xl">/mo</span>
</Typography>
</CardHeader>
<CardBody className="p-0">
<ul className="flex flex-col gap-4">
 
  <li className="flex items-center gap-4">
    <span className="rounded-full border border-white/20 bg-white/20 p-1">
      <CheckIcon />
    </span>
    <Typography className="font-normal">40+ built-in pages</Typography>
  </li>
  <li className="flex items-center gap-4">
    <span className="rounded-full border border-white/20 bg-white/20 p-1">
      <CheckIcon />
    </span>
    <Typography className="font-normal">1 year free updates</Typography>
  </li>
  <li className="flex items-center gap-4">
    <span className="rounded-full border border-white/20 bg-white/20 p-1">
      <CheckIcon />
    </span>
    <Typography className="font-normal">
      Life time technical support
    </Typography>
  </li>
</ul>
</CardBody>
<CardFooter className="mt-12 p-0">
<Button
  size="lg"
  color="white"
  className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
  ripple={false}
  fullWidth={true}
>
  Buy Now
</Button>
</CardFooter>
</Card>


<Card color="gray" variant="gradient" className="w-full max-w-[20rem] p-8">
<CardHeader
floated={false}
shadow={false}
color="transparent"
className="m-0 mb-8 rounded-none border-b border-white/10 pb-8 text-center"
>
<Typography
  variant="small"
  color="white"
  className="font-normal uppercase"
>
  standard
</Typography>
<Typography
  variant="h1"
  color="white"
  className="mt-6 flex justify-center gap-1 text-7xl font-normal"
>
  <span className="mt-2 text-xl">$</span>29{" "}
  <span className="self-end text-xl">/mo</span>
</Typography>
</CardHeader>
<CardBody className="p-0">
<ul className="flex flex-col gap-4">


  <li className="flex items-center gap-4">
    <span className="rounded-full border border-white/20 bg-white/20 p-1">
      <CheckIcon />
    </span>
    <Typography className="font-normal">40+ built-in pages</Typography>
  </li>
  <li className="flex items-center gap-4">
    <span className="rounded-full border border-white/20 bg-white/20 p-1">
      <CheckIcon />
    </span>
    <Typography className="font-normal">1 year free updates</Typography>
  </li>
  <li className="flex items-center gap-4">
    <span className="rounded-full border border-white/20 bg-white/20 p-1">
      <CheckIcon />
    </span>
    <Typography className="font-normal">
      Life time technical support
    </Typography>
  </li>
</ul>
</CardBody>
<CardFooter className="mt-12 p-0">
<Button
  size="lg"
  color="white"
  className="hover:scale-[1.02] focus:scale-[1.02] active:scale-100"
  ripple={false}
  fullWidth={true}
>
  Buy Now
</Button>
</CardFooter>
</Card>

</div>
        </>
    )}
    {
        activeStep === 1 &&(

            <CheckoutForm/>
        )
    }
      
    {/* <div className="mt-10 flex justify-between">
        <Button onClick={handlePrev} disabled={isFirstStep}>
          Prev
        </Button>
        <Button onClick={handleNext} disabled={isLastStep}>
          Next
        </Button>
      </div> */}
        </div>
      </Dialog>
    </div>
  )
}

export default Bloghidepage
