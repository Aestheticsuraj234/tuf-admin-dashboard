"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { MoveRight, Trash } from "lucide-react";
import { useCurrentUser } from "@/features/auth/hooks/use-current-user";
import AlertModal from "@/components/shared/modal/alert-modal";
import { toast } from "sonner";
import { onDeleteContent } from "../action";

interface ContentCardProps {
  logo: string;
  id:string;
  title: string;
  description: string;
  href: string;
}

const ContentCard = ({ description, href, logo, title ,id}: ContentCardProps) => {
  const user = useCurrentUser();
  const [open, setOpen] = useState(false);
  const [loading ,setLoading] = useState(false)
  const isAdmin = user?.role === "ADMIN";

  const onConfirm = async()=>{
    try {
        setLoading(true);
        await onDeleteContent(id);
        toast("Content Deleted🗑️")
      
    } catch (error) {
        toast("Something Went Wrong")
    }
    finally{
        setLoading(false)
        setOpen(false)
    }
  }

  return (
    <>
     <AlertModal
    isOpen={open}
    onClose={()=>setOpen(false)}
    onConfirm={onConfirm}
    loading={loading}
    />
    <Card>
      <CardHeader className="relative flex flex-col items-start justify-center space-y-6 pb-2">
        <Image
          src={logo}
          alt={title}
          className={cn("rounded-md p-2 border dark:bg-white")}
          width={60}
          height={60}
        />
        <CardTitle className="text-xl font-bold dark:text-zinc-100 text-zinc-800">
          {title}
        </CardTitle>
        {isAdmin && (
          <Button
            variant={"destructive"}
            size={"icon"}
            className="absolute right-0 top-0 mx-4"
            onClick={()=>setOpen(true)}
          >
            <Trash size={24} />
          </Button>
        )}
      </CardHeader>
      <CardContent>
        <div className="text-md inline-flex font-normal text-zinc-500">
          {description}
        </div>
      </CardContent>
      <CardFooter>
        <Link href={href} passHref>
          <Button
            className="flex flex-row justify-start items-center font-bold truncate"
            variant={"outline"}
          >
            {title.length > 12 ? title.slice(0, 5) + "..." : title}
            <MoveRight className="ml-2" size={20} />
          </Button>
        </Link>
      </CardFooter>
    </Card>
    </>
  );
};

export default ContentCard;
