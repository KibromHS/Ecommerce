import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const token = localStorage.getItem('admin');
    const location = useLocation();

    if (!token) {
        return <Navigate to={'/admin/login'} />
    }

    if (location.pathname === '/admin') {
        return <Navigate to={'/admin/home'} />
    }
    
    return <Outlet />
} 

export default PrivateRoute;