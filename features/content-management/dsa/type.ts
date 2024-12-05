import { ContentStatus, DifficultyLevel } from "@prisma/client";

export interface Problem {
    id: string;
    problemTitle: string;
    difficultyLevel: DifficultyLevel;
    youtubeLink: string;
    problemLink: string;
    articleLink: string;
    status: ContentStatus;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Chapter {
    id: string;
    chapterNumber: number;
    chapterTitle: string;
    chapterDescription: string;
    problems: Problem[];
    status?: ContentStatus;
    createdAt: string;
    updatedAt: string;
  }
export interface Step {
    id: string;
    stepNumber: number;
    stepTitle: string;
    status: ContentStatus;
    createdAt: string;
    updatedAt: string;
    dsaChapters: Chapter[]; // Added this property to include chapters within Step
  }
  