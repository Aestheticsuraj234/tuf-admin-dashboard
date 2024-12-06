"use client";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getChapterWithProblemsByChapterId, UpdateDsaChapterByChapterId } from "@/features/content-management/dsa/actions";
import { UpdateDsaChapterSchema } from "@/features/content-management/dsa/schema";
import { Button } from "@/components/ui/button";
import UpdateDsaChapterFields from "@/features/content-management/dsa/components/chapters/update-chapter-fields";

interface ChapterEditPageProps {
  params: Promise<{ id: string; chapterId: string }>;
}

const ChapterEditPage: React.FC<ChapterEditPageProps> = (props) => {
  const params = use(props.params);
  const [isPending, setIsPending] = useState(false);
  const [formData, setFormData] = useState<any>(null);

  useEffect(() => {
    async function FetchData() {
      setIsPending(true);
      try {
        const response = await getChapterWithProblemsByChapterId(
          params.chapterId as string
        );
        setFormData(response);
        console.log(response);
        toast("Data Fetched successfully✅");
      } catch (error) {
        console.error("Error fetching Chapter data:", error);
        toast("Failed to fetch Chapter data");
      } finally {
        setIsPending(false);
      }
    }
    FetchData();
  }, [params.chapterId]);


  const methods = useForm<z.infer<typeof UpdateDsaChapterSchema>>({
    resolver:zodResolver(UpdateDsaChapterSchema),
    defaultValues:{
        chapterTitle:formData?.chapter.chapterTitle,
        status:formData?.chapter.status,
        problems:formData?.problems
    }
})
console.log("methods" , methods.formState.errors)


const onSubmit = async(values:z.infer<typeof UpdateDsaChapterSchema>)=>{
  
    try {
     setIsPending(true)
     const updatedValue = await UpdateDsaChapterByChapterId( params.chapterId , values);
     console.log(updatedValue)
     console.log("updated Values:" , values)
     toast("DSA Chapter updated Successfully")
    } catch (error) {
         console.error('Error Updating das Chapter' , error)
         toast("Failed to update dsa Chapter")
    }    
    finally{
     setIsPending(false);
    }
 }




  return (
    <main className='flex flex-col items-center justify-center w-full h-full space-y-8 px-4 py-4'>
    <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-8 w-full'>
            <div>
                <UpdateDsaChapterFields chapter={formData?.chapter}  problems={formData?.problems}/>
            </div>

            <Button disabled={isPending} type="submit">
               {isPending ? "Updating..." :"Update"}
            </Button>
        </form>
    </FormProvider>
</main>
  );
};

export default ChapterEditPage;
