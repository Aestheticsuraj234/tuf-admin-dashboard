import React from 'react'
import NavbarRoutes from './navbar-routes'
import MobileSidebar from './mobile-sidebar'

const Navbar = () => {
  return (
    <div className='p-4 border-b h-full flex  items-center bg-white dark:bg-[#191a19] shadow-sm'>
    <MobileSidebar/>
    <NavbarRoutes/>
    </div>
  )
}

export default Navbar