"use client";

import { Separator } from "@/components/ui/separator";
import { SubscriptionColumn , columns } from "./columns";
import { DataTable } from "@/components/shared/data-table";

interface SubscriptionClientProps{
    data:SubscriptionColumn[]
}

export const SubscriptionClient:React.FC<SubscriptionClientProps> = ({
    data
})=>{
    return (
        <>
        <Separator/>
        <DataTable columns={columns} data={data}/>
        </>
    )
}