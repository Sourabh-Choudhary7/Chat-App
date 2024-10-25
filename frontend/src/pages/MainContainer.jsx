import React from 'react'
import Sidebar from '../components/MainContainerComponents/Sidebar'
import ChatSection from '../components/MainContainerComponents/ChatSection'
import ContactSection from '../components/MainContainerComponents/ContactSection'

const MainContainer = () => {
    return (
        <div className="flex h-[90vh] w-[90vw] p-5 rounded-[25px] gap-5 bg-[#EFF6FC]">
            <Sidebar />
            <ContactSection />
            <ChatSection />
        </div>
    )
}

export default MainContainer
