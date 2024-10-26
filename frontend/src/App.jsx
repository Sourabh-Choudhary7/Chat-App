import React from 'react'
import MainContainer from './pages/MainContainer'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Welcome from './components/Welcome'
import ChatSection from './components/MainContainerComponents/ChatSection'
import { Navigate, Route, Routes } from 'react-router-dom'
import ErrorNotFound from './pages/ErrorNotFound'
const App = () => {
  const isLoggedIn = false;
  return (
    <div className="flex items-center justify-center h-screen">
      <Routes>
        {/* Public Routes */}
        <Route path="/signup" element={!isLoggedIn ? <Signup /> : <Navigate to="/app/welcome" />} />
        <Route path="/" element={!isLoggedIn ? <Login /> : <Navigate to="/app/welcome" />} />

        {/* LoggedIn Routes */}
        <Route path="app" element={isLoggedIn ? <MainContainer /> : <Navigate to="/" />}>
          <Route path="welcome" element={<Welcome />} />
          <Route path="chat/:id" element={<ChatSection />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<ErrorNotFound />} />
      </Routes>
    </div>
  )
}

export default App
