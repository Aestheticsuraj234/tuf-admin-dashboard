import { ContentStatus, ContentType } from "@prisma/client";
import { z } from "zod";

export const ContentSchema = z.object({
    title:z.string().min(1 , {
        message:"Please enter a title"
    }),
    description:z.string().min(1 , {
        message:"Please enter a title"
    }),
    image:z.string().min(1 , {
        message:"Please enter a title"
    }),
    type:z.enum([
        ContentType.BLOGS,
        ContentType.CS_SUBJECTS,
        ContentType.DSA,
        ContentType.RESOURCES,
        ContentType.SYSTEM_DESIGN
    ]),
    status:z.enum([
        ContentStatus.ARCHIVED,
        ContentStatus.PUBLISHED,
        ContentStatus.UNPUBLISHED
    ])

})