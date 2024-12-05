"use client";

import { Badge } from "@/components/ui/badge";
import { ContentStatus, DifficultyLevel } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Brain, Calendar1Icon, NotebookPen, Youtube } from "lucide-react";

import { formatDate, formatDateTime } from "@/lib/utils";
import CellAction from "./cell-action";
import Link from "next/link";

export interface ProblemColumn {
  FromChapterNo: number;
  ChapterTitle: string;
  problemTitle: string;
  difficultyLevel: DifficultyLevel;
  problemLink: string;
  articleLink: string;
  videoLink: string;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

export const columns: ColumnDef<ProblemColumn>[] = [
  {
    accessorKey: "FromChapterNo",
    header: ({ column }) => (
      <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
        From Chapter No.
      </h2>
    ),
    cell: ({ row }) => (
      <h2 className="font-semibold text-zinc-700 dark:text-zinc-100 inline-flex truncate">
        {row.original.FromChapterNo}
      </h2>
    ),
  },
  {
    accessorKey: "ChapterTitle",
    header: ({ column }) => (
      <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
        Chapter Title
      </h2>
    ),
    cell: ({ row }) => (
      <h2 className="font-semibold text-zinc-700 dark:text-zinc-100 inline-flex truncate">
        {row.original.ChapterTitle}
      </h2>
    ),
  },
  {
    accessorKey: "problemTitle",
    header: ({ column }) => (
      <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
        Problem Title
      </h2>
    ),
    cell: ({ row }) => (
      <h2 className="font-semibold text-zinc-700 dark:text-zinc-100 inline-flex truncate">
        {row.original.problemTitle}
      </h2>
    ),
  },
  {
    accessorKey: "difficultyLevel",
    header: "Difficulty",
    cell: ({ row }) => (
      <Badge variant={row.original.difficultyLevel}>
        {row.original.difficultyLevel}
      </Badge>
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
    accessorKey:"problemLink",
    header: ({ column }) => (
        <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
          Problem Link
        </h2>
      ),
      cell: ({ row }) => (
       <Link href={row.original.problemLink} target="_blank">
        <Brain size={30} className="text-indigo-400 hover:underline" />
       </Link>
      ),
  },
  {
    accessorKey:"articleLink",
    header: ({ column }) => (
        <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
          Article Link
        </h2>
      ),
      cell: ({ row }) => (
       <Link href={row.original.articleLink} target="_blank">
        <NotebookPen size={30} className="text-yellow-400 hover:underline" />
       </Link>
      ),
  },
  {
    accessorKey:"videoLink",
    header: ({ column }) => (
        <h2 className="font-normal text-zinc-500 dark:text-zinc-100 inline-flex truncate">
          Video Link
        </h2>
      ),
      cell: ({ row }) => (
       <Link href={row.original.videoLink} target="_blank">
        <Youtube size={30} className="text-red-500 hover:underline" />
       </Link>
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
