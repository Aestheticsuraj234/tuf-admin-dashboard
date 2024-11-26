"use client";
import Hint from '@/components/shared/hint';
import { Button } from '@/components/ui/button';
import { create_content } from '@/features/content-management/add/actions';
import ContentFields from '@/features/content-management/add/components/content-fields';
import { ContentSchema } from '@/features/content-management/add/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { ContentStatus, ContentType } from '@prisma/client';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const AddContentPage = () => {
  const [isPending , setIsPending] = useState(false);

  const router = useRouter();

  const method = useForm<z.infer<typeof ContentSchema> >({
    resolver:zodResolver(ContentSchema),
    defaultValues:{
      title:"",
      description:"",
      image:"",
      status:ContentStatus.UNPUBLISHED,
      type:ContentType.DSA
    }

    
   
  })

  async function onSubmit(values:z.infer<typeof ContentSchema>) {
        try {
          setIsPending(true);
          const content = await create_content(values);
          toast("Content Added Successfully✅")
          console.log(content)
        } catch (error) {
          console.log(error);
          toast("Something went wrong❌")
        } finally{
          setIsPending(false);
          router.push("/content-management")
        }
  }

  const onBack = ()=>{
    router.back()
  }

  return (
    <div className='flex flex-col justify-start items-start mt-4 mx-4'>
      <Hint
      label='Go Back'
      align='center'
      side='right'
      sideOffset={10}

      >
        <Button onClick={onBack} variant={"outline"} size={"icon"}>
          <ArrowLeft size={24}/>
        </Button>
      </Hint>

      <main className='flex flex-col items-center justify-center w-full h-full space-y-8 px-4 py-4'>

      <FormProvider {...method}>
        <form onSubmit={method.handleSubmit(onSubmit)} 
        className='space-y-8 w-full'
        >
            <ContentFields/>
            <Button  disabled={isPending} type='submit'>
              Submit
            </Button>
        </form>
      </FormProvider>

      </main>

    

    </div>
  )
}

export default AddContentPage