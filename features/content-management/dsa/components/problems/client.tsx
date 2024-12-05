"use client";

import { Separator } from "@/components/ui/separator";
import { ProblemColumn, columns } from "./columns";
import { DataTable } from "@/components/shared/data-table";

interface DsaProblemClientProps{
    data:ProblemColumn[]
}

export const DsaProblemClient:React.FC<DsaProblemClientProps> = ({
    data
})=>{
    return (
        <>
        <Separator/>
        <DataTable columns={columns} data={data}/>
        </>
    )
}