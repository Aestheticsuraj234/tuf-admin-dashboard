"use client";
import React, { useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChapterColumn } from "./columns";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";
import AlertModal from "@/components/shared/modal/alert-modal";


interface CellActionProps {
  data: ChapterColumn;
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const params = useParams();

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast("Id Copied Successfully✅");
  };

  const onConfirm = async()=>{
    // try {
    //     setLoading(true);
    //     await onDeleteUser(data.id);
    //     toast("User Deleted🗑️")
    //     router.refresh()
    // } catch (error) {
    //     toast("Something Went Wrong")
    // }
    // finally{
    //     setLoading(false)
    //     setOpen(false)
    // }
  }

  return (
    <>
    <AlertModal
    isOpen={open}
    onClose={()=>setOpen(false)}
    onConfirm={onConfirm}
    loading={loading}
    />
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} className="h-8 w-8 p-0">
          <span className="sr-only">Open Menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Action</DropdownMenuLabel>

        <DropdownMenuItem onClick={() => onCopy(data.id)}>
          <Copy className="mr-2 h-4 w-4" /> Copy Id
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => router.push(`/user-management/edit/${data.id}`)}>
          <Edit className="mr-2 h-4 w-4" /> Update
        </DropdownMenuItem>

        <DropdownMenuItem onClick={()=>setOpen(true)}>
            <Trash className="mr-2 h-4 w-4"/> Delete
        </DropdownMenuItem>

      </DropdownMenuContent>
    </DropdownMenu>
    </>
  );
};

export default CellAction;
