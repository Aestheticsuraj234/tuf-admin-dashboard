"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
  import { Button } from "@/components/ui/button";
  import { ContentStatus, DifficultyLevel } from "@prisma/client";
import { Input } from "@/components/ui/input";

import React, { useEffect, useState } from "react";
import { Problem } from "../../type";
import { useFormContext } from "react-hook-form";

interface UpdateDsaProblemrFieldsProps {
 
    problem: Problem;
  }
//   @ts-ignore
const UpdateDsaProblemrFields = ({problem}:Problem) => {
    const { control, setValue } = useFormContext();

    useEffect(()=>{
        if(problem){
            setValue("problemTitle", problem.problemTitle);
            setValue("difficultyLevel", problem.difficultyLevel);
            setValue("status", problem.status);
            setValue("youtubeLink", problem.youtubeLink);
            setValue("problemLink", problem.problemLink);
            setValue("articleLink", problem.articleLink);
        }
    })

  return (
    <div className="space-y-4">
        <FormField
              control={control}
              name={`problemTitle`}
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
              name={`articleLink`}
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
              name={`youtubeLink`}
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
              name={`problemLink`}
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
              name={`status`}
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
              name={`difficultyLevel`}
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
  )
}

export default UpdateDsaProblemrFields