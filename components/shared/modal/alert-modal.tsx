"use client";
import React, { useEffect, useState } from "react";
import { Modal } from "../modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(()=>{
    setIsMounted(true)
  },[])

  if(!isMounted){
    return null
  }

  return (
    <Modal
    title="Are You Sure?"
    description="This action cannot be undo."
    isOpen={isOpen}
    onClose={onClose}
    >
        <div className="pt-6 space-x-2 flex items-center justify-end w-full">
            <Button disabled={loading} variant={"outline"} onClick={onClose}>
                Cancel
            </Button>
            <Button disabled={loading} variant={"destructive"} onClick={onConfirm}>
                Continue
            </Button>
        </div>
    </Modal>
  );
};

export default AlertModal;
