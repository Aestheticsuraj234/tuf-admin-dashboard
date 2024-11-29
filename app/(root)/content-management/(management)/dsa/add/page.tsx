"use client"
import { Button } from '@/components/ui/button'
import { create_dsa } from '@/features/content-management/dsa/actions'
import DsaContentFields from '@/features/content-management/dsa/components/dsa-content-fields'
import { DsaContentSchema } from '@/features/content-management/dsa/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

const DsaAddForm = () => {
    const [isPending , setIsPending] =useState(false)

    const methods = useForm<z.infer<typeof DsaContentSchema>>({
        resolver:zodResolver(DsaContentSchema),
        defaultValues:{
            title:"",
            description:"",
            dsaSteps:[],
        }
    })

    async function onSubmit(values:z.infer<typeof DsaContentSchema>) {
          try {
            setIsPending(true);
            const response = await create_dsa(values);
            console.log(response);
            methods.reset();
            toast(response.message || "DSA Sheet Created Succesfully")
          } catch (error) {
            console.log(error);
            toast("An Error Occurred");
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
                <DsaContentFields/>
                </div>
                <Button disabled={isPending} type="submit">
                    Submit
                </Button>
            </form>
        </FormProvider>
    </main>
  )
}

export default DsaAddForm