"use client";

import { Separator } from "@/components/ui/separator";
import { ChapterColumn , columns } from "./columns";
import { DataTable } from "@/components/shared/data-table";

interface DsaChapterClientProps{
    data:ChapterColumn[]
}

export const DsaChapterClient:React.FC<DsaChapterClientProps> = ({
    data
})=>{
    return (
        <>
        <Separator/>
        <DataTable columns={columns} data={data}/>
        </>
    )
}