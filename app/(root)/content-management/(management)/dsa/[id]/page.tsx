import Hint from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import DsaSheetCard from "@/features/content-management/dsa/components/dsa-sheet-card";
import { db } from "@/lib/db/db";
import {
  ArrowLeft,
  BookOpenCheck,
  Brain,
  Edit,
  Footprints,
  Rss,
} from "lucide-react";
import Link from "next/link";
import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DsaStepClient } from "@/features/content-management/dsa/components/steps/client";
import {
  getDsaChapterData,
  getDsaProblemData,
  getDsaStepsBySheetId,
} from "@/features/content-management/dsa/actions";
import { DsaChapterClient } from "@/features/content-management/dsa/components/chapters/client";
import { DsaProblemClient } from "@/features/content-management/dsa/components/problems/client";

const DsaSheetIdPage = async (props: { params: Promise<{ id: string }> }) => {
  const params = await props.params;

  const dsaSheetById = await db.dsa.findUnique({
    where: {
      id: params.id,
    },
    select: {
      title: true,
      description: true,
      dsaSteps: {
        include: {
          dsaChapters: {
            include: {
              problems: true,
            },
          },
        },
      },
    },
  });

  const numberOfProblem = await db.problem.count({
    where: {
      dsaChapter: {
        dsaStep: {
          dsaId: params.id,
        },
      },
    },
  });

  const numberOfChapters = await db.dsaChapter.count({
    where: {
      dsaStep: {
        dsaId: params.id,
      },
    },
  });

  const numberOfSteps = await db.dsaStep.count({
    where: {
      dsaId: params.id,
    },
  });

  const dsaStepData = await getDsaStepsBySheetId(params.id);
  const dsaChaptersData = await getDsaChapterData(params.id);
  const dsaProblemData = await getDsaProblemData(params.id);

  return (
    <main className="px-4 py-4 flex flex-col">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl font-bold flex flex-row justify-start items-center">
          <span className="flex flex-row justify-start items-center text-red-500 gap-4 border rounded-md px-2 py-2 mr-3">
            <div>
              <Brain size={30} />{" "}
            </div>
            DSA Sheet
          </span>
          {dsaSheetById?.title.toLocaleUpperCase()}
        </h1>

        <div className="flex flex-row items-end justify-center gap-4">
          <Link href={`/content-management/dsa`}>
            <Hint
              label="Back to DSA"
              align="center"
              side="left"
              alignOffset={18}
              sideOffset={18}
            >
              <Button variant={"outline"} size={"icon"}>
                <ArrowLeft size={24} className="dark:text-white text-black" />
              </Button>
            </Hint>
          </Link>
          <Link href={`/content-management/dsa/${params.id}/edit/dsaSheet`}>
            <Hint
              label="Edit DSA Sheet"
              align="center"
              side="left"
              alignOffset={18}
              sideOffset={18}
            >
              <Button variant={"outline"} size={"icon"}>
                <Edit size={24} className="dark:text-white text-black" />
              </Button>
            </Hint>
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10 mx-10">
        <DsaSheetCard
          title={"Number Of Steps"}
          totalLength={numberOfSteps}
          icon={Footprints}
          backgroundColor={"#87cefa"}
        />
        <DsaSheetCard
          title={"Number Of chapters"}
          totalLength={numberOfChapters}
          icon={BookOpenCheck}
          backgroundColor={"#ff6347"}
        />
        <DsaSheetCard
          title={"Number Of Problems"}
          totalLength={numberOfProblem}
          icon={Rss}
          backgroundColor={"#90ee90"}
        />
      </div>
      <Separator className="mt-5 mx-4" />

      <section className="w-auto mt-10">
        <Tabs defaultValue={"steps"}>
          <TabsList>
            <TabsTrigger value="steps">Steps</TabsTrigger>
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="problems">Problems</TabsTrigger>
          </TabsList>
          <TabsContent value="steps">
            <div className="flex-col">
              <div className="flex-1 space-y-4 p-8 pt-6">
                <DsaStepClient data={dsaStepData} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="chapters">
            <div className="flex-col">
              <div className="flex-1 space-y-4 p-8 pt-6">
                <DsaChapterClient data={dsaChaptersData} />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="problems">
            <div className="flex-col">
              <div className="flex-1 space-y-4 p-8 pt-6">
                <DsaProblemClient data={dsaProblemData} />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default DsaSheetIdPage;
