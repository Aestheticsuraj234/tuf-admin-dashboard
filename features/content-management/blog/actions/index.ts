"use server";

import { date, z } from "zod";
import { AddBlogSchema } from "../schema";
import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db/db";
import { BlogType, ContentType } from "@prisma/client";
import { calculateReadTime } from "../utils";
import { revalidatePath } from "next/cache";

export const create_blog = async (values: z.infer<typeof AddBlogSchema>) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("You are not an admin");
  }

  const content = await db.content.findFirst({
    where: {
      type: ContentType.BLOGS,
    },
  });

  if (!content) {
    throw new Error("Blog content type not found");
  }

  let newBlog;
  switch (values.blogType) {
    case BlogType.EXISTING:
      newBlog = await db.blog.create({
        data: {
          contentId: content.id,
          title: values.title,
          description: values.description,
          thumnail: values.thumbnail,
          slug: values.slug,
          status: values.status,
          blogType: values.blogType,
          blogUrl: values.blogUrl,
        },
      });
      break;
    case BlogType.NEW:
      const existingBlog = await db.blog.findUnique({
        where: {
          slug: values.slug,
        },
      });
      if (existingBlog) {
        throw new Error("Blog with this slug already exists");
      }
      newBlog = await db.blog.create({
        data: {
          contentId: content.id,
          title: values.title,
          description: values.description,
          thumnail: values.thumbnail,
          slug: values.slug,
          status: values.status,
          readTime: calculateReadTime(values.blogContent).toString(),
          blogType: values.blogType,
          blogContent: values.blogContent,
        },
      });
      break;
      default:
        throw new Error("Invalid blog type")
  }

  revalidatePath("/content-management/blogs" , "page")
  return{
    success:true,
    message:"Blog Created successfully",
    data:newBlog
  }
};

export const delete_blog = async (id:string)=>{
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("You are not an admin");
  }

const existingBlog = await db.blog.findUnique({
  where:{
    id:id
  }
})

if(!existingBlog){
  throw new Error("Blog not found")
}

await db.blog.delete({
  where:{
    id:id
  }
})

revalidatePath("/content-management/blogs" , "page")

return {
  success:true ,
  message:"Blog deleted successfully✅"
}

}
