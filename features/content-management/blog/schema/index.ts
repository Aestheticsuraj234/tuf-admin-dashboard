import { BlogType, ContentStatus } from "@prisma/client";
import { z } from "zod";

export const AddBlogSchema = z.object({
    title:z.string().min(1 , {message:"Please enter a title"}),
    description:z.string().min(1 , {message:"Please enter a title"}),
    thumbnail:z.string().min(1 , {message:"Please enter a title"}),
    slug:z.string().min(1 , {message:"Please enter a title"}),
    blogUrl:z.any().optional(),
    blogContent:z.any().optional(),
    status:z.nativeEnum(ContentStatus),
    blogType:z.nativeEnum(BlogType)
})

export const UpdateBlogSchema = z.object({
    thumbnail:z.string().min(1,{message:"Please enter a thumbnail"}),
    title:z.string().min(1,{message:"Please enter a title"}),
    slug:z.string().min(1,{message:"Please enter a slug"}),
    description:z.string().min(1,{message:"Please enter a description"}),
    blogUrl:z.any().optional(),
    blogContent:z.any().optional(),
    status:z.nativeEnum(ContentStatus),
  })
  
  