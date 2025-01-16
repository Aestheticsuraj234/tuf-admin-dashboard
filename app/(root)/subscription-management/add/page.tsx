import SubscriptionForm from "@/features/subscription/components/subscription-form";
import { db } from "@/lib/db/db";
import React from "react";

const page = async () => {
    const allUser = await db.user.findMany({
        include:{
            accounts:true
        }
    })
  return (<div className="px-4 py-4 mt-5 flex flex-col">
    <SubscriptionForm
    // @ts-ignore
    users={allUser}
    />
  </div>)
};

export default page;
