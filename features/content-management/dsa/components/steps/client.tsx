"use client";

import { Separator } from "@/components/ui/separator";
import { DsaStepColumn , columns } from "./columns";
import { DataTable } from "@/components/shared/data-table";

interface DsaStepClientProps{
    data:DsaStepColumn[]
}

export const DsaStepClient:React.FC<DsaStepClientProps> = ({
    data
})=>{
    return (
        <>
        <Separator/>
        <DataTable columns={columns} data={data}/>
        </>
    )
}