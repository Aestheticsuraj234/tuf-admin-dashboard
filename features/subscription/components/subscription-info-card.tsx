import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PLAN } from "@prisma/client";
import { LucideIcon } from "lucide-react";

interface SubscriptionInfoCardProps {
  SubscriptionType: PLAN;
  NumberOfPeople: number;
  Icon: LucideIcon;
  backgroundColor: string;

}


export const SubscriptionInfoCard = ({SubscriptionType , NumberOfPeople ,Icon , backgroundColor}:SubscriptionInfoCardProps)=>{
    return(
        <Card  >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            <Badge variant={SubscriptionType}>

            {SubscriptionType} USER
            </Badge>
          </CardTitle>
          <Icon size={30} style={{"backgroundColor":`${backgroundColor}` , "opacity":"80%"}}  className=" rounded-full px-1 py-1 text-white"/>
        </CardHeader>
        <CardContent>
          <div className="text-2xl  inline-flex font-bold border px-4 py-2 rounded-md shadow-md hover:shadow-xl">
            {NumberOfPeople}
          </div>
         
        </CardContent>
      </Card>
    )
}