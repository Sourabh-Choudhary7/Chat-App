import React from 'react'
import Sidebar from '../components/MainContainerComponents/Sidebar'
import ChatSection from '../components/MainContainerComponents/ChatSection'
import ContactSection from '../components/MainContainerComponents/ContactSection'
import Welcome from '../components/Welcome'

const MainContainer = () => {
    return (
        <div className="flex h-[90vh] w-[90vw] p-5 rounded-[25px] gap-5 bg-[#EFF6FC]">
        {/* <div className="flex h-[90vh] w-[90vw] p-5 rounded-[25px] gap-5 bg-gray-700"> */}
            <Sidebar />
            <ContactSection />
            {/* <ChatSection /> */}
            <Welcome />
        </div>
    )
}

export default MainContainer
