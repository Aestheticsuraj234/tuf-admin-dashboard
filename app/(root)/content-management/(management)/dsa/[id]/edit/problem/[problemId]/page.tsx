"use client";
import { useParams, useRouter } from "next/navigation";
import React, { use, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { getProblemById, UpdateDsaProblemByProblemId } from "@/features/content-management/dsa/actions";
import { problemSchema } from "@/features/content-management/dsa/schema";
import { Button } from "@/components/ui/button";
import UpdateDsaProblemrFields from "@/features/content-management/dsa/components/problems/update-problem-field";

interface ProblemUpdatePageProps {
    params: Promise<{ id: string; problemId: string }>;
  }

const ProblemUpdatePage: React.FC<ProblemUpdatePageProps> = (props)  => {
    const params = use(props.params);
    const [isPending, setIsPending] = useState(false);
    const [formData, setFormData] = useState<any>(null);

    useEffect(() => {
        async function FetchData() {
          setIsPending(true);
          try {
            const response = await getProblemById(params.problemId as string );
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
      }, [params.problemId]);

      const methods = useForm<z.infer<typeof problemSchema>>({
        resolver:zodResolver(problemSchema),
        defaultValues:{
            problemTitle: formData?.problemTitle,
            difficultyLevel: formData?.difficultyLevel,
            youtubeLink: formData?.youtubeLink,
            problemLink: formData?.problemLink,
            articleLink: formData?.articleLink,
            status: formData?.status,
        }
    })


    const onSubmit = async(values:z.infer<typeof problemSchema>)=>{
  
        try {
         setIsPending(true)
         const updatedValue = await UpdateDsaProblemByProblemId( params.problemId , values);
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
                <UpdateDsaProblemrFields   problem={formData}/>
            </div>

            <Button disabled={isPending} type="submit">
               {isPending ? "Updating..." :"Update"}
            </Button>
        </form>
    </FormProvider>
</main>
  )
}

export default ProblemUpdatePage