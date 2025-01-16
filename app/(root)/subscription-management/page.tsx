import Header from "@/components/shared/header";
import Hint from "@/components/shared/hint";
import { Button } from "@/components/ui/button";
import { SubscriptionClient } from "@/features/subscription/components/client";
import { SubscriptionInfoCard } from "@/features/subscription/components/subscription-info-card";
import { db } from "@/lib/db/db";
import { PlusIcon, ShieldEllipsis } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {};

const page = async(props: Props) => {

  const premiumCount = await db.subscription.count({
    where:{
      plan:"PREMIUM"
    }
  })


  const subscriber = await db.subscription.findMany({
    select:{
      id:true,
      userId:true,
      status:true,
      user:{
        select:{
          image:true,
          name:true,
          email:true
        }
      },
      plan:true,
      startDate:true,
      endDate:true
    }
  })

  
  // Format the subscribers data
  const formattedSubscribers = subscriber.map((subscriber) => ({
    id: subscriber.id,
    name: subscriber.user.name,
    email: subscriber.user.email,
    image: subscriber.user.image,
    plan: subscriber.plan,
    status: subscriber?.status,
    startDate: subscriber?.startDate.toISOString().split('T')[0],
    endDate: subscriber?.endDate?.toISOString().split('T')[0],
  }));
  return (
    <main className="px-4 py-4 flex flex-col">
      <div className="flex flex-row justify-between items-center px-4">
        <Header
          title="Subscription Management"
          description="Manage all subscription in the system"
        />
        <Link href={"/subscription-management/add"} passHref>
          <Hint
            label="Add New Subscriber"
            align="center"
            alignOffset={18}
            side="left"
            sideOffset={18}
          >
            <Button variant={"outline"} size={"icon"}>
              <PlusIcon size={20} />
            </Button>
          </Hint>
        </Link>
      </div>

      <div className="grid gap-5 md:grid-cols-1 lg:grid-cols-1 mt-10 mx-10">
          <SubscriptionInfoCard
          SubscriptionType="PREMIUM"
          NumberOfPeople={premiumCount}
          Icon={ShieldEllipsis}
          backgroundColor="#ff6347"
          
          />
      </div>

      <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
          {/* @ts-ignore */}
        <SubscriptionClient data={formattedSubscribers}/>
        </div>
      </div>
    </main>
  );
};

export default page;
