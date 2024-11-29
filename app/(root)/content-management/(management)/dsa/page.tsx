import Header from "@/components/shared/header";
import Hint from "@/components/shared/hint";
import JsonUploadModal from "@/components/shared/modal/bulk-upload-modal";
import { Button } from "@/components/ui/button";
import { add_bulk_data } from "@/features/content-management/dsa/actions";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const DsaManagementMainPage = () => {
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
    </main>
  );
};

export default DsaManagementMainPage;
