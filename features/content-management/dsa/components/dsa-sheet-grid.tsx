"use client";
import { ContentStatus } from "@prisma/client";
import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookIcon, BookOpen, CodeIcon, ListIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface DsaSheetGridProps {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
  updatedAt: Date;
  stepsCount: number;
  chapterCount: number;
  problemCount: number;
}

const DsaSheetGrid = ({
  chapterCount,
  description,
  id,
  problemCount,
  status,
  stepsCount,
  title,
  updatedAt,
}: DsaSheetGridProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/content-management/dsa/${id}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col items-start justify-center cursor-pointer">
        <BookIcon size={40} className="px-2 py-2 border rounded-full" />
        <CardTitle className="font-extrabold text-xl truncate text-zinc-700 dark:text-zinc-100 flex justify-between items-center w-full">
          {title.toLocaleUpperCase()}
          <Badge variant={status}>{status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="mx-2 my-2 flex flex-col space-y-5">
        <div className="flex flex-row justify-between items-center mx-2 my-2">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <ListIcon
                size={40}
                className="border rounded-full text-white bg-indigo-300 px-2 py-2"
              />
              <div>
                <div className="font-medium">Steps</div>
                <div className="text-muted-foreground">{stepsCount}</div>
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <BookOpen
                size={40}
                className="border rounded-full text-white bg-green-500 px-2 py-2"
              />
              <div>
                <div className="font-medium">Chapters</div>
                <div className="text-muted-foreground">{chapterCount}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row justify-between items-center mx-2 my-2">
          <div className="flex flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              <CodeIcon
                size={40}
                className="border rounded-full text-white bg-pink-400 px-2 py-2"
              />
              <div>
                <div className="font-medium">Problems</div>
                <div className="text-muted-foreground">{problemCount}</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button variant={"outline"} onClick={handleClick} className="px-4 py-2">
          View🚀
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DsaSheetGrid;
