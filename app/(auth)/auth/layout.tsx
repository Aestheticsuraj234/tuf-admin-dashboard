import React from 'react'

const AuthLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='flex justify-center items-center h-screen flex-col bg-zinc-800'>
        {children}
    </main>
  )
}

export default AuthLayout