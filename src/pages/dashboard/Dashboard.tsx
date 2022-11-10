import React, { FC } from 'react';
import {useNavigate } from 'react-router-dom';
interface DashboardProps {
    pageName: string;
}

const DashboardPage: FC<DashboardProps> = ({ pageName }) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('userInfo');
    if(!isLoggedIn){
        navigate('/login');
    }

    return (
        <>
            <h1>Welcome {pageName}</h1>
        </>
    );
};

export default DashboardPage;