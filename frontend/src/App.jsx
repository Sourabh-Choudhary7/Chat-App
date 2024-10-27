import React from 'react';
import MainContainer from './pages/MainContainer';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Welcome from './components/Welcome';
import ChatSection from './components/MainContainerComponents/ChatSection';
import { Navigate, Route, Routes } from 'react-router-dom';
import ErrorNotFound from './pages/ErrorNotFound';
import Home from './components/Home';
import AddFriend from './components/AddFriend';
import CreateGroup from './components/CreateGroup';

const App = () => {
  const isLoggedIn = true; // Set this based on your actual authentication logic
  
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
          <Route path="chat/:id" element={<ChatSection />} />
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
