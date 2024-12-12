"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { BlogType, ContentStatus } from "@prisma/client";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ImageUpload from "@/components/shared/upload-image";
import { ClipLoader } from "react-spinners";
import { slugify } from "../utils";
const AddBlogFields = () => {
  const { control, watch, setValue } = useFormContext();

  const [isLoading, setIsLoading] = useState(false);
  const blogType = watch("blogType");

  const handleTitleChange = (event: any) => {
    const newTitle = event.target.value;
    setIsLoading(true);
    setValue("title", newTitle);
    setTimeout(() => {
      setValue("slug", slugify(newTitle));
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div>
      <FormField
        control={control}
        name="thumbnail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              {/* TODO: ADD IMAGE UPLOAD COMPONENT */}
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                onRemove={field.onChange}
              />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <div className="relative grid md:grid-cols-3 gap-8 mt-10">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Title of Blog"
                  {...field}
                  value={field.value}
                  onChange={(e) => handleTitleChange(e)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Description of Blog" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel> Blog Slug</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input placeholder="Slug of Blog:" {...field} readOnly />
                  {isLoading && (
                    <ClipLoader
                      color="#ef4444"
                      size={15}
                      className="absolute top-1/2 transform -translate-y-1/2 right-3 "
                    />
                  )}
                </div>
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
              <FormLabel>Status of Blog</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
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

        <FormField
          control={control}
          name="blogType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Blog</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(value) => field.onChange(value)}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select the Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={BlogType.EXISTING}>Existing</SelectItem>
                    <SelectItem value={BlogType.NEW}>New</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="mt-4">
          {blogType === BlogType.EXISTING && (
            <FormField
              control={control}
              name="blogUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blog Url</FormLabel>
                  <FormControl>
                    <Input placeholder="Blog Url" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBlogFields;
