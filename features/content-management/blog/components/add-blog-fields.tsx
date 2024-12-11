"use client"

import React , {useState} from 'react'
import { useFormContext } from 'react-hook-form';
import { BlogType , ContentStatus } from '@prisma/client';
import { Input } from '@/components/ui/input';
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
import ImageUpload from '@/components/shared/upload-image';
import { ClipLoader } from "react-spinners";
const AddBlogFields = () => {

    const {control , watch , setValue} = useFormContext();

    const [isLoading , setIsLoading] = useState(false);

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
      <div className='relative grid md:grid-cols-3 gap-8 mt-10'>
      <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title of Blog" {...field} />
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
            <div className='relative'>
                <Input placeholder="Slug of Blog:" {...field} readOnly/>
                {
                    isLoading && (
                       <ClipLoader color='#000' size={15} className='absolute top-1/2 transform -translate-y-1/2 right-3'/> 
                    )
                }
            </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}

export default AddBlogFields