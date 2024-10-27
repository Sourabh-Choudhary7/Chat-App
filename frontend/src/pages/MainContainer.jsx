import React from 'react';
import Sidebar from '../components/MainContainerComponents/Sidebar';
import ContactSection from '../components/MainContainerComponents/ContactSection';
import { Outlet, useLocation } from 'react-router-dom';

const MainContainer = () => {
    const location = useLocation();
    
    return (
        <div className="flex h-[90vh] w-[90vw] p-5 rounded-[25px] gap-5 bg-[#EFF6FC]">
            <Sidebar />
            {location.pathname === '/app/home' ? (
                <Outlet />
            ) : (
                <>
                    <ContactSection />
                    <Outlet />
                </>
            )}
        </div>
    );
};

export default MainContainer;
