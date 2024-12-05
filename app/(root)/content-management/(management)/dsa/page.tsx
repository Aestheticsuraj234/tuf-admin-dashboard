import Header from "@/components/shared/header";
import Hint from "@/components/shared/hint";
import JsonUploadModal from "@/components/shared/modal/bulk-upload-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  add_bulk_data,
  getDsaContentStatistics,
  getDsaSheets,
  getRecentDsaActivity,
} from "@/features/content-management/dsa/actions";
import DsaSheetGrid from "@/features/content-management/dsa/components/dsa-sheet-grid";
import DsaStaticticsCard from "@/features/content-management/dsa/components/dsa-statictics-card";
import { formatDateTime } from "@/lib/utils";
import {
  ActivityIcon,
  BoxIcon,
  Calendar,
  Footprints,
  GitPullRequest,
  Notebook,
  PlusIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

const DsaManagementMainPage = async () => {
  const { totalChapters, totalDsaSheet, totalProblems, totalSteps } =
    await getDsaContentStatistics();
    const recentActivity = await getRecentDsaActivity()
    
    const dsaSheet  = await getDsaSheets()

    

  return (
    <main className="px-4 py-4 flex flex-col">
      <div className="flex flex-row justify-between items-center px-4">
        <Header title="DSA Management" description="Manage your dsa here." />
        <div className="flex flex-row justify-center items-center gap-5">
          <JsonUploadModal
            buttonLabel="Upload Dsa Bulk Data"
            dialogDescription="Use this modal to upload your dsa bulk data into the json format"
            dialogTitle="Upload DSA JSON Data"
            action={add_bulk_data}
          />
          <Link href={"/content-management/dsa/add"}>
            <Hint
              label="Add New DSA Steps"
              align="center"
              alignOffset={18}
              side="right"
              sideOffset={18}
            >
              <Button variant={"outline"} size={"icon"}>
                <PlusIcon size={20} />
              </Button>
            </Hint>
          </Link>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-4 mt-10 mx-10">
        <DsaStaticticsCard
          title="Total Dsa Sheets"
          totalLength={totalDsaSheet}
          icon={BoxIcon}
          backgroundColor="#81edf0"
        />
        <DsaStaticticsCard
          title="Total Steps"
          totalLength={totalSteps}
          icon={Footprints}
          backgroundColor="#7bedb6"
        />
        <DsaStaticticsCard
          title="Total Chapters"
          totalLength={totalChapters}
          icon={Notebook}
          backgroundColor="#f7a881"
        />

        <DsaStaticticsCard
          title="Total Problems"
          totalLength={totalProblems}
          icon={GitPullRequest}
          backgroundColor="#f27eb2"
        />
      </div>

      <div className="mt-10 mx-10">
        <h2 className="text-2xl font-semibold mb-4 flex justify-start items-center">
          <ActivityIcon
            size={40}
            className="mr-2 border rounded-full px-2 py-2"
          />
          Recent Activity
        </h2>

        {/* TODO: ADD EMPTY STATE COMPONENT AS WELL IF RECENTACTIVITY === 0 */}
    <ul className="space-y-2">
    {
      recentActivity.map((activity , index)=>(
        <li
        key={activity.id}
        className="flex justify-between items-center border shadow p-4 rounded"
        >
          <span className="text-sm font-semibold truncate text-zinc-700 dark:text-zinc-100">
          {
            activity.title.toLocaleUpperCase()
          }
          </span>
          <div className="flex justify-center items-center gap-2">
            <Calendar size={20} className="mr-2"/>
            <Badge>


                {formatDateTime(activity.updatedAt)}
            </Badge>
          </div>
        </li>
      ))
    }
    </ul>
      </div>

      <div className="mt-10 mx-10">
        <h2 className="text-2xl font-semibold mb-4">DSA Sheets</h2>
        <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-2 mt-10 mx-10">
      {
        dsaSheet.map((dsaSheet)=>(
          <DsaSheetGrid
          
          chapterCount = {dsaSheet.chapterCount}
          status={dsaSheet.status}
          updatedAt={dsaSheet.updatedAt}
          id={dsaSheet.id}
          problemCount={dsaSheet.problemsCount}
          stepsCount={dsaSheet.stepCount}
          title={dsaSheet.title}
          description={dsaSheet.description}
          key={dsaSheet.id}
          />
        ))
      }
        </div>
      </div>
    </main>
  );
};

export default DsaManagementMainPage;
