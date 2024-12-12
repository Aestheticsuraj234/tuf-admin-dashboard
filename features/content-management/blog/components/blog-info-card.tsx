import { ContentStatus } from '@prisma/client'
import { LucideIcon } from 'lucide-react';
import React from 'react'
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
type Props = {
    blogType:ContentStatus;
    numberOfBlogs:number;
    Icon:LucideIcon;
    backgroundColor:string;
}

const BlogInfoCard = ({Icon , backgroundColor , blogType ,numberOfBlogs}: Props) => {
  return (
    <Card  >
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">
        <Badge variant={blogType}>

        {blogType}
        </Badge>
      </CardTitle>
      <Icon size={30} style={{"backgroundColor":`${backgroundColor}` , "opacity":"80%"}}  className=" rounded-full px-1 py-1 text-white"/>
    </CardHeader>
    <CardContent>
      <div className="text-2xl  inline-flex font-bold border px-4 py-2 rounded-md shadow-md hover:shadow-xl">
        {numberOfBlogs}
      </div>
     
    </CardContent>
  </Card>
  )
}

export default BlogInfoCard