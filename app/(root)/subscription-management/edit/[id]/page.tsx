import SubscriptionUpdateForm from '@/features/subscription/components/subscription-update-form'
import { db } from '@/lib/db/db'
import React from 'react'

const SubscriptionEditPage = async(props:{params:Promise<{id:string}>}) => {
    const params = await props.params

    const subscribedUser = await db.subscription.findUnique({
        where:{
            id:params.id
        },
        include:{
            user:true
        }
    })

    if(!subscribedUser){
        return(
            <div className='px-4 py-4 mt-5 flex flex-col justify-center items-center'>
                <p className='text-2xl font-semibold text-red-500 '>
                    Subscription not Found😵
                </p>
            </div>
        )
    }

  return (
    <div className='px-4 py-4 mt-5 flex flex-col'>
            <SubscriptionUpdateForm
            // @ts-ignore
            subscribedUser={subscribedUser}
            
        />
    </div>
  )
}

export default SubscriptionEditPage