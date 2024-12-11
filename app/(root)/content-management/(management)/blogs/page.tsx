import Header from "@/components/shared/header";
import Hint from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const MainBlogPage = async () => {
  return (
    <main className="px-5 py-2.5">
      <div className="flex flex-row justify-between items-center w-full">
        <Header title="Blogs Management" description="Manage all blogs here" />
        <Link href={"/content-management/blogs/add"} passHref>
          <Hint
            label="Add Blog"
            align="center"
            side="left"
            alignOffset={18}
            sideOffset={18}
          >
            <Button
              variant={"outline"}
              size={"icon"}
              className="flex justify-center items-center"
            >
              <PlusIcon size={24} />
            </Button>
          </Hint>
        </Link>
      </div>
    </main>
  );
};

export default MainBlogPage;
