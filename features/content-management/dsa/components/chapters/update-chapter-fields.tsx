"use client";

import React, { useEffect, useState } from "react";
import { Chapter, Problem } from "../../type";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Hint from "@/components/shared/hint";

interface UpdateDsaChapterFieldsProps {
  chapter?: Chapter;
  problems: Problem[];
}

const UpdateDsaChapterFields = ({
  problems,
  chapter,
}: UpdateDsaChapterFieldsProps) => {
  const { control, getValues, setValue, watch } = useFormContext();
  const {
    fields: problemFields,
    append: appendProblem,
    remove: removeProblem,
  } = useFieldArray({
    control,
    name: "problems",
  });

  useEffect(() => {
    if (problems && problemFields.length === 0) {
      problems.forEach((problem) => {
        appendProblem(problem);
      });
    }
  }, [problems, problemFields.length, appendProblem]);

  useEffect(() => {
    if (chapter) {
      setValue("chapterTitle", chapter.chapterTitle);
      setValue("status", chapter.status);
    }
  }, [chapter, setValue]);
  

  const addProblem = () => {
    appendProblem({
      problemTitle: "",
      difficultyLevel: DifficultyLevel.EASY,
      status: ContentStatus.ARCHIVED,
      youtubeLink: "",
      problemLink: "",
      articleLink: "",
    });
  };

  const removeProblemAtIndex = (index: number) => {
    removeProblem(index);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="chapterTitle"
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
        name="status"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Chapter Status</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select the Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value={ContentStatus.ARCHIVED}>Archived</SelectItem>
                  <SelectItem value={ContentStatus.PUBLISHED}>Published</SelectItem>
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

      <div className="space-y-4">
        {problemFields.map((field, index) => (
          <div
            key={field.id}
            className="space-y-4 bg-gray-50 dark:bg-zinc-800 border rounded-md p-4"
          >
            <div className="flex justify-between items-center">
              <h5 className="font-medium">Problem {index + 1}</h5>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => removeProblemAtIndex(index)}
              >
                <Trash2 size={16} className="text-white" />
              </Button>
            </div>

            <FormField
              control={control}
              name={`problems.${index}.problemTitle`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Problem Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`problems.${index}.articleLink`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Article Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Article Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`problems.${index}.youtubeLink`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Youtube Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Youtube Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`problems.${index}.problemLink`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Problem Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name={`problems.${index}.status`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Status</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
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

            <FormField
              control={control}
              name={`problems.${index}.difficultyLevel`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Difficulty Level</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select the Level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={DifficultyLevel.EASY}>Easy</SelectItem>
                        <SelectItem value={DifficultyLevel.MEDIUM}>Medium</SelectItem>
                        <SelectItem value={DifficultyLevel.HARD}>Hard</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        ))}
        <div className="flex justify-end">
          <Hint label="Add problem" side="left" align="center" sideOffset={10}>
            <Button type="button" variant="outline" size="icon" onClick={addProblem}>
              <Plus size={16} />
            </Button>
          </Hint>
        </div>
      </div>
    </div>
  );
};

export default UpdateDsaChapterFields;
