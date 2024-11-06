import React from 'react';
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateRoute = () => {
    const admin = localStorage.getItem('admin');
    const location = useLocation();

    if (!admin) {
        return <Navigate to={'/admin/login'} />
    }

    if (location.pathname === '/admin') {
        return <Navigate to={'/admin/home'} />
    }
    
    return <Outlet />
} 

export default PrivateRoute;