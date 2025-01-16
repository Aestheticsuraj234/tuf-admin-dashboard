"use client";
import { useRouter } from "next/navigation";
import React, { use, useEffect, useRef, useState } from "react";
import EditorJS from "@editorjs/editorjs";
import { toast } from "sonner";
import { getBlogByBolgId, update_blog } from "@/features/content-management/blog/actions";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { AddBlogSchema, UpdateBlogSchema } from "@/features/content-management/blog/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlogType, ContentStatus } from "@prisma/client";
import Hint from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import UpdateBlogFields from "@/features/content-management/blog/components/update-blog-fields";
import Editor from "@/features/content-management/blog/components/update-editor";

const UpdateFormPage = (props: { params: Promise<{ id: string }> }) => {
  const params = use(props.params);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState<any>(null);
  const router = useRouter();
  const editorRef = useRef<EditorJS | null>(null);

  useEffect(() => {
    async function fetchData() {
      setIsPending(true);
      try {
        const response = await getBlogByBolgId(params.id);
        setFormData(response);
        toast("blog fetched successfully");
       
    } catch (error) {
        console.error("Error fetching step data:", error);
        toast("Failed to fetch step data.");
    } finally {
        setIsPending(false);
    }
}

fetchData();
}, [params.id]);

console.log(formData)
  const methods = useForm<z.infer<typeof UpdateBlogSchema>>({
    resolver: zodResolver(UpdateBlogSchema),
    defaultValues: {
      title: formData?.title,
      description: formData?.description,
      thumbnail: formData?.thumnail,
      slug: formData?.slug,
      status: formData?.status,
      blogUrl: formData?.blogUrl,
      blogContent: formData?.blogContent,
    },
  });

  useEffect(() => {
    if (formData) {
      methods.reset({
        title: formData?.title,
        description: formData?.description,
        thumbnail: formData?.thumnail,
        slug: formData?.slug,
        status: formData?.status,
        blogUrl: formData?.blogUrl,
        blogContent: formData?.blogContent,
      });
    }
  }, [formData, methods]);

  async function onSubmit(values: z.infer<typeof UpdateBlogSchema>) {
    
      try {
        setIsPending(true);
        if (editorRef.current) {
          const outputData = await editorRef.current.save();
          values.blogContent = JSON.stringify(outputData);
        }
         const response = await update_blog(values , params.id)
        toast("Blog Updated succcessfully");
        router.back()
       
      } catch (error) {
        console.error(error);
        toast("Error in Updating blog");
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
          <UpdateBlogFields />
          {formData?.blogContent && 
          (<FormField
            control={methods.control}
            name="blogContent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blog Content</FormLabel>
                <FormControl>
                  {/*@ts-ignore */}
                 
                    <Editor
                      editorRef={editorRef}
                      initialData={JSON.parse(formData.blogContent)}
                    />
                
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        ) }
          <Button disabled={isPending} type="submit">
            {isPending ? "Updating..." : "Update"}
          </Button>
        </form>
      </FormProvider>
    </main>
  </div>
  )
};

export default UpdateFormPage;
