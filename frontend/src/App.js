import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/common/Home.jsx';
import Signup from './pages/common/Signup.jsx';
import Login from './pages/common/Login.jsx';
import Complaint from './pages/user/Complaint.jsx';
import UserHome from './pages/user/UserHome.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';
import AgentHome from './pages/agent/AgentHome.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProfilePage from './pages/common/Profile.jsx';
import AboutPage from './pages/common/About.jsx';

function App() {
    const [user, setUser] = useState(null);

    // Load user from localStorage if available
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/about" element={<AboutPage />} />
                    <Route path="/complaint" element={<Complaint />} />
                    <Route path="/user-home" element={<UserHome />} />
                    <Route path="/admin-home" element={<AdminHome />} />
                    <Route path="/agent-home" element={<AgentHome />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
