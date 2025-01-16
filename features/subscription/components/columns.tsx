"use client"

import { Badge } from "@/components/ui/badge"
import { PLAN, SubscriptionStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ShieldAlert, ShieldCheck } from "lucide-react";
import CellAction from "./cell-action";

export type SubscriptionColumn={
    id:string;
    name:string;
    email:string;
    image:string;
    plan:PLAN;
    status:SubscriptionStatus;
    startDate:string;
    endDate:string;
}

export const columns : ColumnDef<SubscriptionColumn>[]=[
    {
        accessorKey:"name",
        header:"Name",
        cell:({row})=>(
            <div className="flex flex-row justify-start items-center  gap-3">
            <img
              src={
                row.original.image ||
                `https://avatar.iran.liara.run/username?username=${row.original.name}`
              }
              alt="user"
              width={30}
              height={30}
              className="rounded-full"
            />
            <h2 className="inline-flex uppercase font-semibold truncate text-zinc-700 dark:text-zinc-100">
              {row.original.name}
            </h2>
          </div>
        )
    },
    {
        accessorKey:"email",
        header:"Email",
        cell:({row})=>(
            <h2 className="truncate text-zinc-700 dark:text-zinc-100 font-semibold">
                {row.original.email}
            </h2>
        )
    },
    {
        accessorKey: "plan",
        header: "Plan",
        cell: ({ row }) => (
          <Badge
            variant={row.original.plan}
            className="inline-flex items-center justify-start gap-1 hover:cursor-pointer"
          >
            {row.original.plan}
          </Badge>
        ),
      },
      {
        accessorKey:'status',
        header:"Status",
        cell:({row})=>(
            <div className="flex flex-row justify-start items-center gap-1">
                    {
                        row.original.status === SubscriptionStatus.ACTIVE ? (
                            <ShieldCheck className="text-green-500" />
                        ):(
                            <ShieldAlert className="text-red-500" />
                        )
                    }
                    <h2 className="truncate text-zinc-700 dark:text-zinc-100 font-semibold">
                        {row.original.status}
                    </h2>
            </div>
        )
      },
      {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => (
          <h2 className="truncate text-zinc-700 dark:text-zinc-100 font-semibold">
            {row.original.startDate}
          </h2>
        ),
      },
    
      {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => (
          <h2 className="truncate text-zinc-700 dark:text-zinc-100 font-semibold">
            {row.original.endDate}
          </h2>
        ),
      },
      {
        id:"actions",
        cell:({row})=><CellAction data={row.original}/>
      }
    
]