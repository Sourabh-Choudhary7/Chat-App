import React, { useEffect } from 'react';
import Sidebar from '../components/MainContainerComponents/Sidebar';
import ContactSection from '../components/MainContainerComponents/ContactSection';
import { Outlet, useLocation } from 'react-router-dom';
import { getAllChats } from '../redux/Slices/ChatSlice';
import { getFriendsList } from '../redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';

const MainContainer = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFriendsList());
        dispatch(getAllChats());
    }, [dispatch])


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
