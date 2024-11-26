import Header from "@/components/shared/header";
import Hint from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { getAllContent } from "@/features/content-management/action";
import ContentCard from "@/features/content-management/components/content-card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const ContentManagmentMainPage = async () => {
  const allContent = await getAllContent();
  return (
    <div className="px-4 py-4 flex-col flex">
      <div className="flex flex-row justify-between items-center px-4">
        <Header
          title="Content Mangement"
          description="Manage your Content here❤️‍🔥"
        />
        <Link href={"/content-management/add"}>
          <Hint
            label="Add New Content"
            align="center"
            alignOffset={18}
            side="left"
            sideOffset={18}
          >
            <Button variant={"outline"} size={"icon"}>
              <PlusIcon size={24} />
            </Button>
          </Hint>
        </Link>
      </div>



      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mt-10 mx-10">
        {
          allContent?.map((content)=>(
            <ContentCard
            key={content.id}
            id={content.id}
            logo={content.image}
            title={content.title}
            description={content.description}
            href={`/content-management/${content.type.toLocaleLowerCase().replace(/ /g, "-")}`}
            />
          ))
        }
      </div>



    </div>
  );
};

export default ContentManagmentMainPage;
