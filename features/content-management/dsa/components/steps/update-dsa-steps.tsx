import React, { useEffect, useState } from "react";
import { Chapter, Step } from "../../type";
import { useFieldArray, useFormContext } from "react-hook-form";
import { ContentStatus, DifficultyLevel } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";

import { Plus, Trash2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Hint from "@/components/shared/hint";
interface UpdateDsaStepFieldsProps {
  steps?: Step;
  chapters?: Chapter[];
}

const UpdateDsaStepFields = ({ steps, chapters }: UpdateDsaStepFieldsProps) => {
  const { control, getValues, setValue, watch } = useFormContext();
  const [isPending, setIsPending] = useState(false);
  const {
    fields: dsaSteps,
    append: appendStep,
    remove: removeStep,
  } = useFieldArray({
    control,
    name: "dsaSteps",
  });

  useEffect(() => {
    if (steps && dsaSteps.length === 0) {
      setIsPending(true);
      appendStep({
        stepNumber: steps.stepNumber,
        stepTitle: steps.stepTitle,
        status: steps.status,
        dsaChapters: chapters || [],
      });
      setIsPending(false);
    }
  }, [steps, chapters, dsaSteps.length, appendStep]);

  const removeStepAtIndex = (index: number) => {
    removeStep(index);
  };

  const addChapter = (stepIndex: number) => {
    const chapters = getValues(`dsaSteps.${stepIndex}.dsaChapters`) || [];
    setValue(`dsaSteps.${stepIndex}.dsaChapters`, [
      ...chapters,
      {
        chapterNumber: chapters.length + 1,
        chapterTitle: "",
        problems: [],
        status: ContentStatus.ARCHIVED,
      },
    ]);
  };

  const removeChapterAtIndex = (stepIndex: number, chapterIndex: number) => {
    const chapters = getValues(`dsaSteps.${stepIndex}.dsaChapters`) || [];
    chapters.splice(chapterIndex, 1);
    setValue(`dsaSteps.${stepIndex}.dsaChapters`, chapters);
  };

  const addProblem = (stepIndex: number, chapterIndex: number) => {
    const problems =
      getValues(`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems`) ||
      [];
    setValue(`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems`, [
      ...problems,
      {
        problemTitle: "",
        difficultyLevel: DifficultyLevel.EASY,
        status: ContentStatus.ARCHIVED,
        youtubeLink: "",
        problemLink: "",
        articleLink: "",
      },
    ]);
  };

  const removeProblemAtIndex = (
    stepIndex: number,
    chapterIndex: number,
    problemIndex: number
  ) => {
    const problems =
      getValues(`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems`) ||
      [];
    problems.splice(problemIndex, 1);
    setValue(
      `dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems`,
      problems
    );
  };


  return (
    <div className="space-y-4">
        {
            dsaSteps.map((step , stepIndex)=>(
                <div
                key={step.id}
                className="space-y-4 my-8 bg-gray-100 dark:bg-zinc-800 border rounded-lg p-6"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold text-zinc-700 dark:text-zinc-100">
                    {/* @ts-ignore */}
                    Step {step.stepNumber}
                  </h3>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeStepAtIndex(stepIndex)}
                  >
                    <Trash2 size={16} className="text-white" />
                  </Button>
                </div>
      
                <FormField
                  control={control}
                  name={`dsaSteps.${stepIndex}.stepTitle`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Step Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Step title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
      
                <FormField
                  control={control}
                  name={`dsaSteps.${stepIndex}.status`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Add Step Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select the Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value={ContentStatus.ARCHIVED}>
                              Archived
                            </SelectItem>
                            <SelectItem value={ContentStatus.PUBLISHED}>
                              Published
                            </SelectItem>
                            <SelectItem value={ContentStatus.UNPUBLISHED}>
                              Unpublished
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
      
                <div className="space-y-4 mt-6">
                  {watch(`dsaSteps.${stepIndex}.dsaChapters`)?.map(
                    // @ts-ignore
                    (chapter, chapterIndex) => (
                      <div
                        key={chapterIndex}
                        className="space-y-4 bg-white dark:bg-zinc-900 border rounded-md p-4 mb-4"
                      >
                        <div className="flex justify-between items-center">
                          <h4 className="text-lg font-medium">Chapter {chapter.chapterNumber}</h4>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            onClick={() => {
                              removeChapterAtIndex(stepIndex, chapterIndex);
                            }}
                          >
                            <Trash2 size={16} className="text-white" />
                          </Button>
                        </div>
      
                        <FormField
                          control={control}
                          name={`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.chapterTitle`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Chapter Title</FormLabel>
                              <FormControl>
                                <Input placeholder="Chapter Title" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
      
                        <FormField
                          control={control}
                          name={`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.status`}
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Add Chapter Status</FormLabel>
                              <FormControl>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select the Status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value={ContentStatus.ARCHIVED}>
                                      Archived
                                    </SelectItem>
                                    <SelectItem value={ContentStatus.PUBLISHED}>
                                      Published
                                    </SelectItem>
                                    <SelectItem value={ContentStatus.UNPUBLISHED}>
                                      Unpublished
                                    </SelectItem>
                                  </SelectContent>
                                </Select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
      
                        <div className="space-y-4 mt-4">
                          {watch(
                            `dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems`
                          )?.map(
                            // @ts-ignore
                            (problem, problemIndex) => (
                              <div key={problemIndex} className="space-y-4 bg-gray-50 dark:bg-zinc-800 border rounded-md p-4">
                                <div className="flex justify-between items-center">
                                  <h5 className="font-medium">Problem {problemIndex + 1}</h5>
                                  <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    onClick={() =>
                                      removeProblemAtIndex(
                                        stepIndex,
                                        chapterIndex,
                                        problemIndex
                                      )
                                    }
                                  >
                                    <Trash2 size={16} className="text-white" />
                                  </Button>
                                </div>
      
                                <FormField
                                  control={control}
                                  name={`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems.${problemIndex}.problemTitle`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Problem Title</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Problem Title"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
      
                                <FormField
                                  control={control}
                                  name={`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems.${problemIndex}.articleLink`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Article Link</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Article Link"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
      
                                <FormField
                                  control={control}
                                  name={`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems.${problemIndex}.youtubeLink`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Youtube Link</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Youtube Link"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
      
                                <FormField
                                  control={control}
                                  name={`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems.${problemIndex}.problemLink`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Problem Link</FormLabel>
                                      <FormControl>
                                        <Input
                                          placeholder="Problem Link"
                                          {...field}
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
      
                                <FormField
                                  control={control}
                                  name={`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems.${problemIndex}.status`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Add Problem Status</FormLabel>
                                      <FormControl>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select the Status" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem
                                              value={ContentStatus.ARCHIVED}
                                            >
                                              Archived
                                            </SelectItem>
                                            <SelectItem
                                              value={ContentStatus.PUBLISHED}
                                            >
                                              Published
                                            </SelectItem>
                                            <SelectItem
                                              value={ContentStatus.UNPUBLISHED}
                                            >
                                              Unpublished
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
      
                                <FormField
                                  control={control}
                                  name={`dsaSteps.${stepIndex}.dsaChapters.${chapterIndex}.problems.${problemIndex}.difficultyLevel`}
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel>Add Difficulty Level</FormLabel>
                                      <FormControl>
                                        <Select
                                          onValueChange={field.onChange}
                                          defaultValue={field.value}
                                        >
                                          <SelectTrigger>
                                            <SelectValue placeholder="Select the Level" />
                                          </SelectTrigger>
                                          <SelectContent>
                                            <SelectItem
                                              value={DifficultyLevel.EASY}
                                            >
                                              Easy
                                            </SelectItem>
                                            <SelectItem
                                              value={DifficultyLevel.MEDIUM}
                                            >
                                              Medium
                                            </SelectItem>
                                            <SelectItem
                                              value={DifficultyLevel.HARD}
                                            >
                                              Hard
                                            </SelectItem>
                                          </SelectContent>
                                        </Select>
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              </div>
                            )
                          )}
                          <div className="flex justify-end">
                            <Hint
                              label="Add problem"
                              side="left"
                              align="center"
                              sideOffset={10}
                            >
                              <Button
                                type="button"
                                variant="outline"
                                size="icon"
                                onClick={() => addProblem(stepIndex, chapterIndex)}
                              >
                                <Plus size={16} />
                              </Button>
                            </Hint>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                  <div className="flex justify-end">
                    <Hint
                      label="Add Chapter"
                      side="left"
                      align="center"
                      sideOffset={10}
                    >
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => addChapter(stepIndex)}
                      >
                        <Plus size={16} />
                      </Button>
                    </Hint>
                  </div>
                </div>
              </div>
            ))
        }
    </div>
  );
};

export default UpdateDsaStepFields;
