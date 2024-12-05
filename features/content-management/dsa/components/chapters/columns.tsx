"use client";

import { Badge } from "@/components/ui/badge";
import { ContentStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar1Icon } from "lucide-react";

import { formatDate, formatDateTime } from "@/lib/utils";
import CellAction from "./cell-action";


export interface ChapterColumn{
    id:string;
    FormStepNo:number;
    StepTitle:string;
    chapterNumber:number;
    chapterTitle:string;
   
    numberOfproblems:number;
    status:ContentStatus;
    createdAt:Date;
    updatedAt:Date;
}

export const columns: ColumnDef<ChapterColumn>[] = [
    {
        accessorKey:"FormStepNo",
        header:({column})=>(
            <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
                From Step No
            </h2>
        ),
        cell:({row})=>(
            <h2 className="font-semibold text-zinc-700 dark:text-zinc-100 inline-flex truncate">
                {row.original.FormStepNo}
            </h2>
        )
    },
    {
        accessorKey:"StepTitle",
        header:({column})=>(
            <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
                Step Title
            </h2>
        ),
        cell:({row})=>(
            <h2 className="font-semibold text-zinc-700 dark:text-zinc-100 inline-flex truncate">
                {row.original.StepTitle}
            </h2>
        )
    },
    {
        accessorKey:"chapterNumber",
        header:({column})=>(
            <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
                Chapter Number
            </h2>
        ),
        cell:({row})=>(
            <h2 className="font-semibold text-zinc-700 dark:text-zinc-100 inline-flex truncate">
                {row.original.chapterNumber}
            </h2>
        )
    },
    {
        accessorKey:"chapterTitle",
        header:({column})=>(
            <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
                Chapter Title
            </h2>
        ),
        cell:({row})=>(
            <h2 className="font-semibold text-zinc-700 dark:text-zinc-100 inline-flex truncate">
                {row.original.chapterTitle}
            </h2>
        )
    },

    {
        accessorKey:"numberOfproblems",
        header:({column})=>(
            <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
                Total Problems
            </h2>
        ),
        cell:({row})=>(
            <h2 className="font-semibold text-zinc-700 dark:text-zinc-100 inline-flex truncate">
                {row.original.numberOfproblems}
            </h2>
        )
    },

    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <Badge variant={row.original.status}>{row.original.status}</Badge>
        ),
      },

      {
        accessorKey: "createdAt",
        header: "CreatedAt",
        cell: ({ row }) => (
          <div className="flex items-center">
            <Calendar1Icon className="mr-2" size={20} />
            <h2 className="truncate text-zinc-700 dark:text-zinc-100 font-semibold">
              {formatDate(row.original.createdAt)}
            </h2>
          </div>
        ),
      },
      {
        accessorKey: "updatedAt",
        header: "UpdatedAt",
        cell: ({ row }) => (
          <div className="flex items-center">
            <Calendar1Icon className="mr-2" size={20} />
            <h2 className="truncate text-zinc-700 dark:text-zinc-100 font-semibold">
            {formatDate(row.original.updatedAt)}
            </h2>
          </div>
        ),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <CellAction data={row.original} />,
      },
    
    

]