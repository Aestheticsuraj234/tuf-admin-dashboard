"use client";
import React from "react";

import { useFormContext, Controller } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ContentStatus, ContentType } from "@prisma/client";
import ImageUpload from "@/components/shared/upload-image";

const ContentFields = () => {
  const { control } = useFormContext();

  return (
    <div>
      <FormField
        control={control}
        name="image"
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

      <div className="md:grid md:grid-cols-3 gap-8 my-8">
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title of Content" {...field} />
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
                <Textarea placeholder="Enter Your Description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type of Content</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a content type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={ContentType.BLOGS}>Blogs</SelectItem>
                    <SelectItem value={ContentType.CS_SUBJECTS}>
                      Cs Subjects
                    </SelectItem>
                    <SelectItem value={ContentType.DSA}>DSA</SelectItem>
                    <SelectItem value={ContentType.RESOURCES}>
                      Resources
                    </SelectItem>
                    <SelectItem value={ContentType.SYSTEM_DESIGN}>
                      System Design
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
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Status of Content</FormLabel>
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
      </div>
    </div>
  );
};

export default ContentFields;
