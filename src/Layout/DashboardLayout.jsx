import React from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Components/Sidebar'

export default function DashboardLayout() {

  return (
    <div className='font-primary w-screen h-screen'>
        <Sidebar/>
        this is dashboard
        <div className="relative h-full z-0 left-[20vw] top-20 w-[80vw] p-4 overflow-x-hidden">
            <Outlet />
        </div>
    </div>
  )
}