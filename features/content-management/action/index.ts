"use server";

import { currentUser } from "@/features/auth/actions";
import { db } from "@/lib/db/db";
import { revalidatePath } from "next/cache";


export const getAllContent = async ()=>{
    try {
        const allcontent = await db.content.findMany({
            where:{
                status:"PUBLISHED"
            }
        })

        return allcontent
        
    } catch (error) {
            return null;
    }   
}


export const onDeleteContent = async(id:string)=>{
    const user = await currentUser();

    if(user?.role !=="ADMIN"){
        throw new Error("Unauthorize")
    }

    const existingContent = await db.content.findUnique({
        where:{
            id:id
        }
    })

    if(!existingContent){
        throw new Error("Content Not Found")
    }

    await db.content.delete({
        where:{
            id:id
        }
    })

    revalidatePath("/content-management")
    return{
        success:true,
        message:"Content Deleted Successfully",

    }
}