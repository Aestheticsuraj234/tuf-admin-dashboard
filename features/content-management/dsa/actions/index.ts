"use server";

import { db } from "@/lib/db/db";
import { DsaContentSchema, UpdateDSAStepSchema } from "../schema";
import { z } from "zod";
import { currentUser } from "@/features/auth/actions";
import { ContentStatus, ContentType, DifficultyLevel } from "@prisma/client";
import { Sheet } from "lucide-react";
import { revalidatePath } from "next/cache";

export const create_dsa = async (values: z.infer<typeof DsaContentSchema>) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("Unauthorized");
  }

  const { title, description, dsaSteps, status } = values;

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
      status,
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

export const getDsaContentStatistics = async () => {
  const content = await db.content.findFirst({
    where: {
      type: ContentType.DSA,
    },
  });

  if (!content) {
    return {
      totalDsaSheet: 0,
      totalSteps: 0,
      totalChapters: 0,
      totalProblems: 0,
    };
  }

  const totalDsaSheet = await db.dsa.count({
    where: {
      contentId: content.id,
    },
  });

  const totalSteps = await db.dsaStep.count({
    where: {
      dsa: {
        contentId: content.id,
      },
    },
  });

  const totalChapters = await db.dsaChapter.count({
    where: {
      dsaStep: {
        dsa: {
          contentId: content.id,
        },
      },
    },
  });

  const totalProblems = await db.problem.count({
    where: {
      dsaChapter: {
        dsaStep: {
          dsa: {
            contentId: content.id,
          },
        },
      },
    },
  });

  return {
    totalDsaSheet,
    totalSteps,
    totalChapters,
    totalProblems,
  };
};

export const getRecentDsaActivity = async () => {
  const recentActivity = await db.dsa.findMany({
    where: {
      content: {
        type: ContentType.DSA,
      },
    },
    orderBy: {
      updatedAt: "desc",
    },
    take: 10,
    select: {
      id: true,
      title: true,
      updatedAt: true,
    },
  });

  return recentActivity;
};

export const getDsaSheets = async () => {
  try {
    const dsaSheets = await db.dsa.findMany({
      where: {
        content: {
          type: ContentType.DSA,
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        updatedAt: true,
        status: true,
        dsaSteps: {
          select: {
            _count: {
              select: {
                dsaChapters: true,
              },
            },
            dsaChapters: {
              select: {
                _count: {
                  select: {
                    problems: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // transform data to get the required Counts

    const transformedDsaSheets = dsaSheets.map((sheet) => {
      const stepCount = sheet.dsaSteps.length;

      const chapterCount = sheet.dsaSteps.reduce(
        (totalChapters, step) => totalChapters + step._count.dsaChapters,
        0
      );

      const problemsCount = sheet.dsaSteps.reduce(
        (totalProblems, step) =>
          totalProblems +
          step.dsaChapters.reduce(
            (chapterProblems, chapter) =>
              chapterProblems + chapter._count.problems,
            0
          ),
        0
      );

      return {
        id: sheet.id,
        title: sheet.title,
        description: sheet.description,
        stepCount,
        chapterCount,
        problemsCount,
        updatedAt: sheet.updatedAt,
        status: sheet.status,
      };
    });

    return transformedDsaSheets;
  } catch (error) {
    console.log("Error fetching dsa sheets:", error);
    throw new Error("Could not fetch dsa Sheets");
  }
};

export const getDsaStepsBySheetId = async (sheetId: string) => {
  const dsaSheetById = await db.dsa.findUnique({
    where: {
      id: sheetId,
    },
    select: {
      dsaSteps: {
        select: {
          id: true,
          stepNumber: true,
          stepTitle: true,
          status: true,
          dsaChapters: {
            select: {
              id: true,
            },
          },
          createdAt: true,
          updatedAt: true,
        },
      },
    },
  });

  if (!dsaSheetById) {
    return [];
  }
  return dsaSheetById?.dsaSteps.map((step) => ({
    id: step.id,
    stepNumber: step.stepNumber,
    stepTitle: step.stepTitle,
    chaptersCount: step.dsaChapters.length,
    status: step.status as ContentStatus,
    createdAt: step.createdAt,
    updatedAt: step.updatedAt,
  }));
};

export const getDsaChapterData = async (sheetId: string) => {
  const dsaSheet = await db.dsa.findUnique({
    where: {
      id: sheetId,
    },
    include: {
      dsaSteps: {
        include: {
          dsaChapters: {
            include: {
              problems: {
                select: {
                  id: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!dsaSheet || !dsaSheet.dsaSteps) {
    return [];
  }

  // TODO: NEED TO ADD TYPES FOR IT
  const chapterColumns: any[] = [];

  dsaSheet.dsaSteps.forEach((step) => {
    step.dsaChapters.forEach((chapter) => {
      chapterColumns.push({
        id: chapter.id,
        chapterNumber: chapter.chapterNumber,
        chapterTitle: chapter.chapterTitle,
        FormStepNo: step.stepNumber,
        StepTitle: step.stepTitle,
        numberOfproblems: chapter.problems.length,
        status: chapter.status as ContentStatus,
        createdAt: chapter.createdAt,
        updatedAt: chapter.updatedAt,
      });
    });
  });

  return chapterColumns;
};

export const getDsaProblemData = async (sheetId: string) => {
  const dsaSheet = await db.dsa.findUnique({
    where: {
      id: sheetId,
    },
    include: {
      dsaSteps: {
        include: {
          dsaChapters: {
            include: {
              problems: {
                select: {
                  id: true,
                  title: true,
                  difficultyLevel: true,
                  practiceLink: true,
                  videoLink: true,
                  articleLink: true,
                  status: true,
                  createdAt: true,
                  updatedAt: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!dsaSheet || !dsaSheet.dsaSteps) {
    return [];
  }

  // TODO: ADD TYPES
  const problemColumns: any[] = [];

  dsaSheet.dsaSteps.forEach((step) => {
    step.dsaChapters.forEach((chapter) => {
      chapter.problems.forEach((problem) => {
        problemColumns.push({
          id: problem.id,
          FromChapterNo: chapter.chapterNumber,
          ChapterTitle: chapter.chapterTitle,
          problemTitle: problem.title,
          difficultyLevel: problem.difficultyLevel as DifficultyLevel,
          videoLink: problem.videoLink,
          problemLink: problem.practiceLink,
          articleLink: problem.articleLink,
          status: problem.status as ContentStatus,
          createdAt: problem.createdAt,
          updatedAt: problem.updatedAt,
        });
      });
    });
  });

  return problemColumns;
};

export const getDsaSheetDataBySheetId = async (sheetId: string) => {
  const dsaSheet = await db.dsa.findUnique({
    where: {
      id: sheetId,
    },
    include: {
      dsaSteps: {
        include: {
          dsaChapters: {
            include: {
              problems: true,
            },
          },
        },
      },
    },
  });

  if (!dsaSheet) {
    return null;
  }

  return {
    id: dsaSheet.id,
    title: dsaSheet.title,
    description: dsaSheet.description,
    status: dsaSheet.status,
    dsaSteps: dsaSheet.dsaSteps.map((step) => ({
      id: step.id,
      stepNumber: step.stepNumber,
      stepTitle: step.stepTitle,
      status: step.status as ContentStatus,
      createdAt: step.createdAt,
      updatedAt: step.updatedAt,
      dsaChapters: step.dsaChapters.map((chapter) => ({
        id: chapter.id,
        chapterNumber: chapter.chapterNumber,
        chapterTitle: chapter.chapterTitle,
        status: chapter.status as ContentStatus,
        problems: chapter.problems.map((problem) => ({
          id: problem.id,

          problemTitle: problem.title,
          difficultyLevel: problem.difficultyLevel as DifficultyLevel,
          youtubeLink: problem.videoLink,
          problemLink: problem.practiceLink,
          articleLink: problem.articleLink,
          status: problem.status as ContentStatus,
          createdAt: problem.createdAt,
          updatedAt: problem.updatedAt,
        })),
      })),
    })),
  };
};

export const update_dsa_sheet = async (
  values: z.infer<typeof DsaContentSchema>,
  sheetId: string
) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("You are not authorized to update the DSA sheet.");
  }

  const { description, status, title, dsaSteps } = values;

  const updatedSheet = await db.dsa.update({
    where: {
      id: sheetId,
    },
    data: {
      title,
      description,
      status,
    },
  });

  const existingSteps = await db.dsaStep.findMany({
    where: {
      dsaId: sheetId,
    },
    include: {
      dsaChapters: {
        include: {
          problems: true,
        },
      },
    },
  });

  if (!dsaSteps || dsaSteps.length === 0) {
    throw new Error("There are no steps provided to update.");
  }

  for (const stepData of dsaSteps) {
    const existingStep = existingSteps.find(
      (step) => step.stepNumber === stepData.stepNumber
    );

    if (existingStep) {
      await UpdateDsaStepByStepId(sheetId, existingStep.id, {
        dsaSteps: [stepData],
      });
    } else {
      const newStep = await db.dsaStep.create({
        data: {
          stepTitle: stepData.stepTitle,
          stepNumber: stepData.stepNumber,
          status: stepData.status,
          dsaId: sheetId,
        },
      });

      for (const chapterData of stepData.dsaChapters || []) {
        const newChapter = await db.dsaChapter.create({
          data: {
            chapterTitle: chapterData.chapterTitle,
            chapterNumber: chapterData.chapterNumber,
            status: chapterData.status,
            dsaStepId: newStep.id,
          },
        });

        for (const problemData of chapterData.problems || []) {
          await db.problem.create({
            data: {
              title: problemData.problemTitle,
              status: problemData.status,
              videoLink: problemData.youtubeLink,
              practiceLink: problemData.problemLink,
              articleLink: problemData.articleLink,
              difficultyLevel: problemData.difficultyLevel,
              dsaChapterId: newChapter.id,
            },
          });
        }
      }
    }
  }

  return {
    success: true,
    message: "Updated successfully",
    data: updatedSheet,
  };
};

export const UpdateDsaStepByStepId = async (
  dsaSheetId: string,
  stepId: string,
  values: z.infer<typeof UpdateDSAStepSchema>
) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("You are not authorized to update the DSA step.");
  }

  if (!values.dsaSteps || values.dsaSteps.length === 0) {
    throw new Error("No steps provided to update.");
  }

  const { status, stepNumber, stepTitle, dsaChapters } = values.dsaSteps[0];

  const existingStep = await db.dsaStep.findUnique({
    where: {
      id: stepId,
    },
    include: {
      dsaChapters: {
        include: {
          problems: true,
        },
      },
    },
  });

  if (!existingStep) {
    throw new Error("Step not found.");
  }

  const updatedStep = await db.dsaStep.update({
    where: {
      id: stepId,
    },
    data: {
      stepTitle,
      stepNumber,
      status,
    },
  });

  if (!dsaChapters || dsaChapters.length === 0) {
    throw new Error("No chapters found for the step.");
  }

  for (const chapterData of dsaChapters) {
    const existingChapter = existingStep.dsaChapters.find(
      (chapter) => chapter.chapterNumber === chapterData.chapterNumber
    );

    if (existingChapter) {
      await db.dsaChapter.update({
        where: {
          id: existingChapter.id,
        },
        data: {
          chapterTitle: chapterData.chapterTitle,
          status: chapterData.status,
        },
      });

      for (const problemData of chapterData.problems || []) {
        const existingProblem = existingChapter.problems.find(
          (problem) => problem.title === problemData.problemTitle
        );

        if (existingProblem) {
          await db.problem.update({
            where: {
              id: existingProblem.id,
            },
            data: {
              title: problemData.problemTitle,
              status: problemData.status,
              videoLink: problemData.youtubeLink,
              practiceLink: problemData.problemLink,
              articleLink: problemData.articleLink,
              difficultyLevel: problemData.difficultyLevel,
            },
          });
        } else {
          await db.problem.create({
            data: {
              title: problemData.problemTitle,
              status: problemData.status,
              videoLink: problemData.youtubeLink,
              practiceLink: problemData.problemLink,
              articleLink: problemData.articleLink,
              difficultyLevel: problemData.difficultyLevel,
              dsaChapterId: existingChapter.id,
            },
          });
        }
      }

      const updatedProblemTitles = (chapterData.problems || []).map(
        (p) => p.problemTitle
      );
      for (const existingProblem of existingChapter.problems) {
        if (!updatedProblemTitles.includes(existingProblem.title)) {
          await db.problem.delete({
            where: {
              id: existingProblem.id,
            },
          });
        }
      }
    } else {
      const newChapter = await db.dsaChapter.create({
        data: {
          chapterTitle: chapterData.chapterTitle,
          chapterNumber: chapterData.chapterNumber,
          status: chapterData.status,
          dsaStepId: updatedStep.id,
        },
      });

      for (const problemData of chapterData.problems || []) {
        await db.problem.create({
          data: {
            title: problemData.problemTitle,
            status: problemData.status,
            videoLink: problemData.youtubeLink,
            practiceLink: problemData.problemLink,
            articleLink: problemData.articleLink,
            difficultyLevel: problemData.difficultyLevel,
            dsaChapterId: newChapter.id,
          },
        });
      }
    }
  }

  const updatedChapterNumbers = dsaChapters.map((c) => c.chapterNumber);
  for (const existingChapter of existingStep.dsaChapters) {
    if (!updatedChapterNumbers.includes(existingChapter.chapterNumber)) {
      await db.dsaChapter.delete({
        where: {
          id: existingChapter.id,
        },
      });
    }
  }

  return updatedStep;
};

export const delete_sheet = async (sheetId: string) => {
  const user = await currentUser();

  if (user?.role !== "ADMIN") {
    throw new Error("You ar not an admin");
  }

  const existingSHeet = await db.dsa.findUnique({
    where: {
      id: sheetId,
    },
  });

  if (!existingSHeet) {
    throw new Error("Sheet not found");
  }

  await db.dsa.delete({
    where: {
      id: sheetId,
    },
  });

  revalidatePath("/content-management", "page");

  return {
    success: true,
    message: "Sheet deleted successfully",
  };
};

// *Step

export const getStepWithChapterByStepId = async (stepId: string) => {
  const step = await db.dsaStep.findUnique({
    where: {
      id: stepId,
    },
    include: {
      dsaChapters: {
        include: {
          problems: true,
        },
      },
    },
  });

  if (!step) {
    return null;
  }

  return {
    step: {
      id: step.id,
      stepNumber: step.stepNumber,
      stepTitle: step.stepTitle,
      status: step.status as ContentStatus,
      createdAt: step.createdAt,
      updatedAt: step.updatedAt,
    },
    chapters: step.dsaChapters.map((chapter) => ({
      id: chapter.id,
      chapterNumber: chapter.chapterNumber,
      chapterTitle: chapter.chapterTitle,
      status: chapter.status as ContentStatus,
      problems: chapter.problems.map((problem) => ({
        id: problem.id,
        problemTitle: problem.title,
        difficultyLevel: problem.difficultyLevel as DifficultyLevel,
        youtubeLink: problem.videoLink,
        problemLink: problem.practiceLink,
        articleLink: problem.articleLink,
        status: problem.status as ContentStatus,
        createdAt: problem.createdAt,
        updatedAt: problem.updatedAt,
      })),
    })),
  };
};
