"use server";

import { z } from "zod";
import { ContentSchema } from "../schema";
import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db/db";

export const create_content = async (values:z.infer<typeof ContentSchema>) =>{
    const user = await currentUser();

    if(user?.role !== "ADMIN"){
        throw new Error("You are not authroized❌")
    }

    const content = await db.content.create({
        data:{
            title:values.title,
            description:values.description,
            image:values.image,
            type:values.type,
            status:values.status,
            authorId:user.id!
        }
    });

    return {
        success:true,
        message:"Content Added Successfully",
        data:content
    }
}