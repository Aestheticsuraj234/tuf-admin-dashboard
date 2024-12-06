import { ContentStatus, DifficultyLevel } from "@prisma/client";
import { z } from "zod";

export const problemSchema = z.object({
    problemTitle:z.string().min(1 , {message:"Chapter title is required"}),
    difficultyLevel:z.nativeEnum(DifficultyLevel),
    youtubeLink:z.string().url().optional(),
    problemLink:z.string().url().optional(),
    articleLink:z.string().url().optional(),
    status:z.nativeEnum(ContentStatus)
})
export const DsaChapterSchema = z.object({
    chapterNumber:z.number().min(1 , {message:"Chapter number is required"}),
    chapterTitle:z.string().min(1 , {message:"Chapter title is required"}),
    problems:z.array(problemSchema).optional(),
    status:z.nativeEnum(ContentStatus)
})

export const UpdateDsaChapterSchema = z.object({
  
    chapterTitle:z.string().min(1 , {message:"Chapter title is required"}),
    problems:z.array(problemSchema).optional(),
    status:z.nativeEnum(ContentStatus)
})


export const DsaStepSchema = z.object({
    stepNumber:z.number().min(1 , {message:"Step number is required"}),
    stepTitle:z.string().min(1 , {message:"Step title is required"}),
    dsaChapters:z.array(DsaChapterSchema).optional(),
    status:z.nativeEnum(ContentStatus)
})

export const UpdateDSAStepSchema = z.object({
    dsaSteps: z.array(DsaStepSchema).optional(),
  });
  

  
export const DsaContentSchema = z.object({
    title:z.string().min(1 , {message:"Dsa title is required"}),
    description:z.string().min(1,{message:"Descriptiom is required"}),
    dsaSteps:z.array(DsaStepSchema).optional(),
    status:z.nativeEnum(ContentStatus)
})