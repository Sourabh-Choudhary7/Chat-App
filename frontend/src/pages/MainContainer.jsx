import React from 'react'
import Sidebar from '../components/MainContainerComponents/Sidebar'
import ChatSection from '../components/MainContainerComponents/ChatSection'
import ContactSection from '../components/MainContainerComponents/ContactSection'

const MainContainer = () => {
    return (
        <div className='main-container'>
            <Sidebar />
            <ContactSection />
            <ChatSection />
        </div>
    )
}

export default MainContainer