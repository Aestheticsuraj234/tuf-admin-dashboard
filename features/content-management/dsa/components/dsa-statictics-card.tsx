import { LucideIcon } from 'lucide-react';
import React from 'react'
import {
    Card,
    CardContent , 
    CardHeader , 
    CardTitle
}
from "@/components/ui/card"
interface DsaStaticticsCardProps{
    title:string;
    totalLength:number;
    icon:LucideIcon;
    backgroundColor:string;
}
const DsaStaticticsCard = ({title , totalLength , icon:Icon , backgroundColor}:DsaStaticticsCardProps) => {
  return (
    <Card>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
            <CardTitle className='text-sm font-medium'>
                {title}
            </CardTitle>
            <Icon size={30} style={{backgroundColor:`${backgroundColor}`}}
            className='rounded-full px-1 py-1 text-white'
            />
        </CardHeader>
        <CardContent>
            <div className='text-2xl inline-flex font-bold px-4 py-2 rounded-md shadow-md hover:shadow-xl'>
                {totalLength}
            </div>
        </CardContent>
    </Card>
  )
}

export default DsaStaticticsCard