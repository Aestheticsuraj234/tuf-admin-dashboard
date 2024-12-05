"use client";
import { getDsaSheetDataBySheetId, update_dsa_sheet } from '@/features/content-management/dsa/actions';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'


import { DsaContentSchema } from '@/features/content-management/dsa/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

import { Button } from '@/components/ui/button';
import UpdateDsaContentFields from '@/features/content-management/dsa/components/update-dsa-content-fields';

const DsaSheetEditForm = () => {
    const params = useParams();
    const [isLoading , setIsLoading] = useState(false)
    const [isPending , setIsPending] = useState(false);
    const [formData ,setFormData] = useState(null);

    const router = useRouter()

  
 
    useEffect(()=>{
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await getDsaSheetDataBySheetId(params.id as string);
                setFormData(response)
              
                toast("Data Fetched Successfully✅")
            } catch (error) {
                console.error("Error Fetching dsa sheet data:", (error as Error).message)
                toast("Failed to fetch dsa sheet data")
            }
            finally{
                setIsPending(false)
            }

        }
        fetchData()
    },[params.id])

    const methods = useForm<z.infer<typeof DsaContentSchema>>({
        resolver:zodResolver(DsaContentSchema),
        defaultValues:{
            title:formData?.title,
            description:formData?.description,
            dsaSteps:formData?.dsaSteps,
            status:formData?.status
        }
    })


    async function onSubmit(values:z.infer<typeof DsaContentSchema>) {
        try {
          setIsPending(true);
          const UpdatedSheet = await update_dsa_sheet(values , params.id as string);
          toast("Sheet Updated Successfully✅")
          console.log(UpdatedSheet)
        } catch (error) {
          console.log(error);
          toast("Something went wrong❌")
        } finally{
          setIsPending(false);
          router.push(`/content-management/dsa/${params.id}`)
        }
  }

  
    return (
        <main className='flex flex-col items-center justify-center w-full h-full space-y-8 px-4 py-4'>
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className='space-y-8 w-full'>
                <div>
                <UpdateDsaContentFields data={formData}/>
                </div>
                <Button disabled={isPending} type="submit">
                    Submit
                </Button>
            </form>
        </FormProvider>
    </main>
  )
}

export default DsaSheetEditForm