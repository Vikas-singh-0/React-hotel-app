import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import DashBoard from '../User/DashBoard';

const PrivateRoute = () => {
    const {auth} = useSelector(state=>({...state})); // determine if authorized, from context or however you're doing it

    // If authorized, return an outlet that will render child elements
    // If not, return element that will navigate to login page
    return auth ? <DashBoard /> : <Navigate to="/login" />;
}

export default PrivateRoute;