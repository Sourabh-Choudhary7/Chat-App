import React from 'react';
import MainContainer from './pages/MainContainer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './components/Welcome';
import ChatSection from './components/Layout/ChatSection';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorNotFound from './pages/ErrorNotFound';
import Home from './pages/Home';
import AddFriend from './components/User/AddFriend';
import CreateGroup from './components/Chat/CreateGroup';
import { useSelector } from 'react-redux';
import RecieverDetails from './components/Chat/RecieverDetails';
import Profile from './components/User/Profile';

const App = () => {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn)

  return (
    <div className="flex items-center justify-center h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={isLoggedIn ? <Navigate to="/app/welcome" /> : <Login />} />
        <Route path="/signup" element={isLoggedIn ? <Navigate to="/app/welcome" /> : <Signup />} />

        {/* Protected Routes */}
        <Route path="/app" element={isLoggedIn ? <MainContainer /> : <Navigate to="/" />}>
          <Route path="home" element={<Home />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="profile" element={<Profile />} />
          <Route path="chat/:id" element={<ChatSection />} />
          <Route path="chat/:id/chat-info" element={<RecieverDetails />} />
          <Route path="add-Friend" element={<AddFriend />} />
          <Route path="create-group" element={<CreateGroup />} />

        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
