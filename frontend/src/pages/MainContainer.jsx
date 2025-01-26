import { useEffect } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import ContactSection from '../components/Layout/ContactSection';
import { Outlet, useLocation } from 'react-router-dom';
import { fetchGroupsForLoggedInUser, getAllChats } from '../redux/Slices/ChatSlice';
import { getFriendsList } from '../redux/Slices/AuthSlice';
import { useDispatch } from 'react-redux';

const MainContainer = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getFriendsList());
        dispatch(getAllChats());
        dispatch(fetchGroupsForLoggedInUser());
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
