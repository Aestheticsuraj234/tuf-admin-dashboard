"use client";
import { Cable, CircleDollarSign, Home, PencilRuler, User } from 'lucide-react';
import React from 'react'
import SidebarItem from './sidebar-item';

const SidebarRoutes = () => {

    const Routes = [
        {
            icon:Home,
            label:"Home",
            href:"/"
        },
        {
            icon:User,
            label:"User",
            href:"/user-management"
        },
        {
            icon:PencilRuler,
            label:"Content",
            href:"/content-management"
        },
        {
            icon:CircleDollarSign,
            label:"Subscriptions",
            href:"/subscription-management"
        },
        {
            icon:Cable,
            label:"Support & Feedback",
            href:'/support-feedback'
        }
    ]


  return (
    <div className='flex flex-col w-full'>
            {
                Routes.map((route)=>(
                    <SidebarItem
                    key={route.href || route.label}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                    />
                ))
            }
    </div>
  )
}

export default SidebarRoutes