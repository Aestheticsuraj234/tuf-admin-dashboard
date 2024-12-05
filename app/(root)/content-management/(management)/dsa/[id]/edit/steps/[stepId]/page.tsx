"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { use, useEffect, useState } from 'react'

import { DsaContentSchema, UpdateDSAStepSchema } from '@/features/content-management/dsa/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '@/components/ui/button';
import { getStepWithChapterByStepId, UpdateDsaStepByStepId } from '@/features/content-management/dsa/actions';
import { ContentStatus } from '@prisma/client';
import UpdateDsaStepFields from '@/features/content-management/dsa/components/steps/update-dsa-steps';


interface StepEditFormProps{
    params:Promise<{id:string ; stepId:string}>
}

const StepUpdatePage:React.FC<StepEditFormProps> = props => {

    const params = use(props.params)
    const [isPending , setIsPending] = useState(false);
    const [formData , setFormData] = useState<any>(null);

    useEffect(()=>{
        async function FetchData(){
            setIsPending(true)
            try {
                const response = await getStepWithChapterByStepId(params.stepId);
                setFormData(response)
                console.log(response)
                toast("Data Fetched successfully✅")
            } catch (error) {
                    console.error("Error fetching step data:" , error)
                    toast("Failed to fetch step data")
            }
            finally{
                setIsPending(false)
            }
        }
        FetchData()
    },[params.stepId])

    const methods = useForm<z.infer<typeof UpdateDSAStepSchema>>({
        resolver:zodResolver(UpdateDSAStepSchema),
        defaultValues:{
            dsaSteps: formData ? [formData.step] : []
        }
    })

    const onSubmit = async(values:z.infer<typeof UpdateDSAStepSchema>)=>{
       try {
        setIsPending(true)
        const updatedValue = await UpdateDsaStepByStepId(params.id , params.stepId , values);
        console.log(updatedValue)
        console.log("updated Values:" , values)
        toast("DSA Step updated Successfully")
       } catch (error) {
            console.error('Error Updating das step' , error)
            toast("Failed to update dsa step")
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
                    <UpdateDsaStepFields steps={formData?.step}  chapters={formData?.chapters}/>
                </div>

                <Button disabled={isPending} type="submit">
                   {isPending ? "Updating..." :"Update"}
                </Button>
            </form>
        </FormProvider>
    </main>
  )
}

export default StepUpdatePage