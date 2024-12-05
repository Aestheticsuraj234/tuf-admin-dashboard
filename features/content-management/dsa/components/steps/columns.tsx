"use client";

import { Badge } from "@/components/ui/badge";
import { ContentStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar1Icon } from "lucide-react";
import CellAction from "./cell-action";
import { formatDate, formatDateTime } from "@/lib/utils";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type DsaStepColumn = {
  id: string;
  stepNumber: number;
  stepTitle: string;
  chaptersCount: number;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<DsaStepColumn>[] = [
  {
    accessorKey: "stepNumber",
    header: "Sno.",
    cell: ({ row }) => (
      <h2 className="font-semibold text-zinc-700 dark:text-zinc-100">
        {row.original.stepNumber}
      </h2>
    ),
  },
  {
    accessorKey: "stepTitle",
    header: "Step Title",
    cell: ({ row }) => (
      <h2 className="font-semibold text-zinc-700 dark:text-zinc-100">
        {row.original.stepTitle}
      </h2>
    ),
  },
  {
    accessorKey: "chaptersCount",
    header: "Total Chapters",
    cell: ({ row }) => (
      <h2 className="font-semibold text-zinc-700 dark:text-zinc-100">
        {row.original.chaptersCount}
      </h2>
    ),
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
];
