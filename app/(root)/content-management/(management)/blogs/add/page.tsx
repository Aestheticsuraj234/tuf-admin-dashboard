"use client";
import React, { useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { AddBlogSchema } from "@/features/content-management/blog/schema";
import { BlogType, ContentStatus } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Hint from "@/components/shared/hint";
import { ArrowLeft } from "lucide-react";
import AddBlogFields from "@/features/content-management/blog/components/add-blog-fields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import EditorJS from "@editorjs/editorjs";
import Editor from "@/features/content-management/blog/components/editor";
import { create_blog } from "@/features/content-management/blog/actions";

const BlogAddPage = () => {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();
  const editorRef = useRef<EditorJS | null>(null);

  const methods = useForm<z.infer<typeof AddBlogSchema>>({
    resolver: zodResolver(AddBlogSchema),
    defaultValues: {
      thumbnail: "",
      title: "",
      description: "",
      blogContent: "",
      blogUrl: "",
      slug: "",
      blogType: BlogType.NEW,
      status: ContentStatus.UNPUBLISHED,
    },
  });

  async function onSubmit(values: z.infer<typeof AddBlogSchema>) {
    console.log(values)
    try {
      setIsPending(true);
      if (editorRef.current) {
        const outputData = await editorRef.current.save();
        values.blogContent = JSON.stringify(outputData);
      }
       const response = await create_blog(values)
      toast("Blog Created succcessfully");
      methods.reset();
      editorRef.current?.clear();
    } catch (error) {
      console.error(error);
      toast("Error in creating blog");
    } finally {
      setIsPending(false);
    }
  }

  const onBack = () => {
    router.back();
  };

  return (
    <div className="flex flex-col justify-start items-start mt-4 mx-4">
      <Hint
        label="Back"
        align="center"
        side="bottom"
        alignOffset={18}
        sideOffset={18}
      >
        <Button onClick={onBack} variant={"outline"} size={"icon"}>
          <ArrowLeft />
        </Button>
      </Hint>
      <main className="flex flex-col items-center justify-center w-full h-full space-y-8 px-4 py-4">
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="space-y-8 w-full"
          >
            <AddBlogFields />
            {methods.watch("blogType") === BlogType.NEW && (
              <FormField
                control={methods.control}
                name="blogContent"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blog Content</FormLabel>
                    <FormControl>
                      {/* TODO: ADD EDITOR HERE */}
                      <Editor editorRef={editorRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <Button disabled={isPending} type="submit">
              {isPending ? "Submittng..." : "Submit"}
            </Button>
          </form>
        </FormProvider>
      </main>
    </div>
  );
};

export default BlogAddPage;
