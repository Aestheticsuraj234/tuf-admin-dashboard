import React from 'react'
import Logo from './logo'
import SidebarRoutes from './sidebar-routes'

const Sidebar = () => {
  return (
    <aside className='h-full border-r flex flex-col overflow-y-auto bg-white dark:bg-[#191a19] shadow-sm'>
            <div className='p-6'>
                {/* Logo */}
                <Logo/>
            </div>

            <div className='flex flex-col w-full'>
                {/* sidebarroutes */}
                <SidebarRoutes/>
            </div>
    </aside>
  )
}

export default Sidebar