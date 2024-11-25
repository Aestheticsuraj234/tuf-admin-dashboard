import React from 'react'

interface Props{
    title:string;
    description:string
}

const Header = ({title , description}:Props) => {
  return (
    <div className='flex flex-col space-y-4'>
        <h1 className='text-4xl font-semibold text-zinc-700 dark:text-zinc-100'>
            {title}
        </h1>
        <p className='text-sm text-gray-500 dark:text-gray-300'>
            {description}
        </p>
    </div>
  )
}

export default Header