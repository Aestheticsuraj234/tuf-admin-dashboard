"use client";

import { Separator } from "@/components/ui/separator";
import { UserColumn , columns } from "./columns";
import { DataTable } from "@/components/shared/data-table";

interface UserClientProps{
    data:UserColumn[]
}

export const UserClient:React.FC<UserClientProps> = ({
    data
})=>{
    return (
        <>
        <Separator/>
        <DataTable columns={columns} data={data}/>
        </>
    )
}