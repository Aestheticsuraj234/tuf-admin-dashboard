import Header from "@/components/shared/header";
import Hint from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import BlogInfoCard from "@/features/content-management/blog/components/blog-info-card";
import { db } from "@/lib/db/db";
import { ContentStatus } from "@prisma/client";
import { NotebookIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BlogInfoList from "@/features/content-management/blog/components/blog-info-list";

const MainBlogPage = async () => {
  const [publishedBlog, unPublishedBlog, archivedBlog] = await Promise.all([
    db.blog.count({
      where: {
        status: ContentStatus.PUBLISHED,
      },
    }),
    db.blog.count({
      where: {
        status: ContentStatus.UNPUBLISHED,
      },
    }),
    db.blog.count({
      where: {
        status: ContentStatus.ARCHIVED,
      },
    }),
  ]);


  const [AllPublishedBlogs , AllUnPublishedBlogs , AllArchivedBlogs] = await Promise.all([
  db.blog.findMany({
    where:{
      status:ContentStatus.PUBLISHED
    },
    select:{
      id:true,
      title:true,
      slug:true,
      content:{
        select:{
          author:true
        }
      },
      createdAt:true
    }
  }),
  db.blog.findMany({
    where:{
      status:ContentStatus.UNPUBLISHED
    },
    select:{
      id:true,
      title:true,
      slug:true,
      content:{
        select:{
          author:true
        }
      },
      createdAt:true
    }
  }),
  db.blog.findMany({
    where:{
      status:ContentStatus.ARCHIVED
    },
    select:{
      id:true,
      title:true,
      slug:true,
      content:{
        select:{
          author:true
        }
      },
      createdAt:true
    }
  })
  ])



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
      <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-3 mt-10 mx-10">
        <BlogInfoCard
          blogType="PUBLISHED"
          numberOfBlogs={publishedBlog}
          Icon={NotebookIcon}
          backgroundColor="#03dc7a"
        />
        <BlogInfoCard
          blogType="UNPUBLISHED"
          numberOfBlogs={unPublishedBlog}
          Icon={NotebookIcon}
          backgroundColor="#ffd700"
        />
        <BlogInfoCard
          blogType="ARCHIVED"
          numberOfBlogs={archivedBlog}
          Icon={NotebookIcon}
          backgroundColor="#FF0000"
        />
      </div>
      <Separator className="mt-6" />
      <section className="w-auto mt-10">
        <Tabs defaultValue="Published">
          <TabsList>
            <TabsTrigger
              value="Archived"
              className="flex justify-center items-center gap-4"
            >
              <span>Archived</span>
              <span className="text-sm text-gray-500">{archivedBlog}</span>
            </TabsTrigger>

            <TabsTrigger
              value="Published"
              className="flex justify-center items-center gap-4"
            >
              <span>Published</span>
              <span className="text-sm text-gray-500">{publishedBlog}</span>
            </TabsTrigger>

            <TabsTrigger
              value="UnPublished"
              className="flex justify-center items-center gap-4"
            >
              <span>UnPublished</span>
              <span className="text-sm text-gray-500">{unPublishedBlog}</span>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Archived">
            <div className="flex flex-col">
              <div className="flex-1 space-y-4 p-8 pt-6">
                {
                  AllArchivedBlogs.map((blog)=>(
                    // @ts-ignore
                    <BlogInfoList key={blog.id} data={blog}/>
                  ))
                }
              </div>
            </div>
          </TabsContent>
          <TabsContent value="Published">
            <div className="flex flex-col">
              <div className="flex-1 space-y-4 p-8 pt-6">
              {
                  AllPublishedBlogs.map((blog)=>(
                    // @ts-ignore
                    <BlogInfoList key={blog.id} data={blog}/>
                  ))
                }
              </div>
            </div>
          </TabsContent>
          <TabsContent value="UnPublished">
            <div className="flex flex-col">
              <div className="flex-1 space-y-4 p-8 pt-6">
              {
                  AllUnPublishedBlogs.map((blog)=>(
                    // @ts-ignore
                    <BlogInfoList key={blog.id} data={blog}/>
                  ))
                }
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </section>
    </main>
  );
};

export default MainBlogPage;
