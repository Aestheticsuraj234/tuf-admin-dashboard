import { formatDate } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import { CellAction } from './cell-action';


export interface BlogInfoListProps {
    data: {
      id: string;
      slug: string;
      title: string;
      createdAt: Date;
      content: {
        author: {
          name: string;
          image: string;
        };
      };
    };
  }
  
  const BlogInfoList = ({data}:BlogInfoListProps) => {
  return (
    <div className='w-full bg-white dark:bg-zinc-800 px-4 py-2 border rounded-md flex flex-row justify-between items-center'>
            {/* l.h.s */}
            <div className='flex flex-col items-start justify-center space-y-2'>
                    <h1 className='text-lg font-bold justify-center space-y-2'>
                        {data.title}
                    </h1>
                    <div className='flex flex-row justify-center items-center gap-2'>
                            <div className='flex flex-row items-center gap-2'>
                                <Image 
                                src={data.content.author.image} 
                                alt='author'
                                width={16}
                                height={16}
                                className='w-4 h-4 rounded-full'
                                />
                                <p className='text-xs text-gray-600 dark:text-white font-semibold'>
                                    {data.content.author.name}
                                </p>
                            </div>
                            •
                            <p className='text-xs text-gray-600 dark:text-white font-semibold'>
                                {formatDate(data.createdAt)}
                                </p>     
                    </div>
            </div>
            {/* r.h.s */}
            <div className='flex flex-row items-center gap-4'>
                    <CellAction data={data}/>
            </div>
    </div>
  )
}

export default BlogInfoList