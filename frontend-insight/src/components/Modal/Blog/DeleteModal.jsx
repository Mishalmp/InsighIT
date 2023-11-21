import React from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

function DeleteModal({ isOpen, onClose, onDelete }) {
  const handleConfirm = () => {
    // Call the onDelete function to perform the delete action
    onDelete();
    onClose(); // Close the modal
  };

  return (
    <Dialog open={isOpen} handler={onClose}>
      <DialogHeader>Confirm Delete</DialogHeader>
      <DialogBody>
        Are you sure you want to delete this blog?
      </DialogBody>
      <DialogFooter>
        <Button variant="text" color="blue-gray" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="gradient" color="red" onClick={handleConfirm}>
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default DeleteModal;
