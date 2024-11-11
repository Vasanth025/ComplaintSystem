import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/common/Home.jsx';
import Signup from './pages/common/Signup.jsx';
import Login from './pages/common/Login.jsx';
import Complaint from './pages/user/Complaint.jsx';
import UserHome from './pages/user/UserHome.jsx';
import AdminHome from './pages/admin/AdminHome.jsx';
import AgentHome from './pages/agent/AgentHome.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [user, setUser] = useState(null);

    // Load user from localStorage if available
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        setUser(storedUser);
    }, []);

    // Redirects user to login if not authenticated or to Home if wrong role
    const RequireAuth = ({ children, allowedRole }) => {
        if (!user) {
            return <Navigate to="/login" />;
        }
        if (user.userType !== allowedRole) {
            return <Navigate to="/" />;
        }
        return children;
    };

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />

                    {/* Protected Routes */}
                    <Route
                        path="/user-home"
                        element={
                            <RequireAuth allowedRole="Ordinary">
                                <UserHome />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/admin-home"
                        element={
                            <RequireAuth allowedRole="Admin">
                                <AdminHome />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/agent-home"
                        element={
                            <RequireAuth allowedRole="Agent">
                                <AgentHome />
                            </RequireAuth>
                        }
                    />
                    <Route
                        path="/complaint"
                        element={
                            <RequireAuth allowedRole="Ordinary">
                                <Complaint />
                            </RequireAuth>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
