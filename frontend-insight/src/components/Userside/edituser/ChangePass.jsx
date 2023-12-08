import React from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Dialog,
    DialogHeader,
    DialogBody,Input

  } from "@material-tailwind/react";
function ChangePass({ isOpen, onClose }) {
  return (
    <div>
      <Dialog
        size="xs"
        open={isOpen}
        handler={onClose}
        className="bg-transparent shadow-none"
      >
        <Card className="mx-auto w-[30rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Change Password
            </Typography>

            <Typography className="-mb-2" variant="h6">
              Current Password
            </Typography>
            <Input label="Current Password"  size="lg" />
            <Typography className="-mb-2" variant="h6">
              New Password
            </Typography>
            <Input label="New Password" name="skill" size="lg" />
            <Typography className="-mb-2" variant="h6">
              Confirm Password
            </Typography>
            <Input label="Confirm Password" name="skill" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" fullWidth>
              Save
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              <Typography
                variant="small"
                color="black"
                className="ml-1 font-bold"
                onClick={onClose}
              >
                Don't Save
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>
    </div>
  );
}

export default ChangePass;
