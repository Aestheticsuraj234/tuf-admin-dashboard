"use server";

import { db } from "@/lib/db/db";
import { DsaContentSchema } from "../schema";
import { z } from "zod";
import { currentUser } from "@/features/auth/actions";
import { ContentStatus, ContentType, DifficultyLevel } from "@prisma/client";

export const create_dsa = async (values: z.infer<typeof DsaContentSchema>) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const { title, description, dsaSteps } = values;

  const content = await db.content.findFirst({
    where: {
      type: ContentType.DSA,
    },
  });

  if (!content) {
    throw new Error("Content not found");
  }
  if (!dsaSteps) {
    throw new Error("No DSA Step found");
  }

  const createdDSA = await db.dsa.create({
    data: {
      contentId: content.id,
      title,
      description,
      dsaSteps: {
        create: dsaSteps.map((step) => ({
          stepNumber: step.stepNumber,
          stepTitle: step.stepTitle,
          status: step.status,
          dsaChapters: {
            create: step.dsaChapters?.map((chapter) => ({
              chapterNumber: chapter.chapterNumber,
              chapterTitle: chapter.chapterTitle,
              status: chapter.status,
              problems: {
                create: chapter.problems?.map((problem) => ({
                  title: problem.problemTitle, // Correct field name
                  articleLink: problem.articleLink,
                  videoLink: problem.youtubeLink,
                  practiceLink: problem.problemLink,
                  difficultyLevel: problem.difficultyLevel as DifficultyLevel,
                  status: problem.status as ContentStatus,
                })),
              },
            })),
          },
        })),
      },
    },
  });

  return {
    message: "Successfully created✅",
    data: createdDSA,
  };
};

export const add_bulk_data = async (
  formData: FormData
): Promise<{
  success: boolean;
  message: string;
}> => {
  try {
    const file = formData.get("file");

    if (!file || !(file instanceof Blob)) {
      return {
        success: false,
        message: "Invalid File",
      };
    }

    const fileContent = await file.text();
    const jsonData = JSON.parse(fileContent);

    // validate JSON using zod schema
    const parsedData = DsaContentSchema.parse(jsonData);

    const result = await create_dsa(parsedData);

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: (error as Error).message,
    };
  }
};
