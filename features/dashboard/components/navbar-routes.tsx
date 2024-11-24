import React from 'react'
import { ModeToggle } from './mode-toggle'
import UserButton from '@/features/auth/components/user-button'

const NavbarRoutes = () => {
  return (
    <div className='flex gap-x-2 ml-auto justify-center items-center'>
        <ModeToggle/>
        <UserButton/>
    </div>
  )
}

export default NavbarRoutes