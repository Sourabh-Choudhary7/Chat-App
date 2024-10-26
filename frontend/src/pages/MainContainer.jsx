import React from 'react'
import Sidebar from '../components/MainContainerComponents/Sidebar'
import ContactSection from '../components/MainContainerComponents/ContactSection'
import { Outlet } from 'react-router-dom'

const MainContainer = () => {
    return (
        <div className="flex h-[90vh] w-[90vw] p-5 rounded-[25px] gap-5 bg-[#EFF6FC]">
        {/* <div className="flex h-[90vh] w-[90vw] p-5 rounded-[25px] gap-5 bg-gray-700"> */}
            <Sidebar />
            <ContactSection />
            <Outlet />
        </div>
    )
}

export default MainContainer
