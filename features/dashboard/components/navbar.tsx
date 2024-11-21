import React from 'react'
import NavbarRoutes from './navbar-routes'

const Navbar = () => {
  return (
    <div className='p-4 border-b h-full flex  items-center bg-white dark:bg-[#191a19] shadow-sm'>
    <NavbarRoutes/>
    </div>
  )
}

export default Navbar