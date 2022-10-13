import React, { FC } from 'react';

interface DashboardProps {
    pageName: string;
}

const DashboardPage: FC<DashboardProps> = ({ pageName }) => {
    return (
        <>
            <h1>Welcome {pageName}</h1>
        </>
    );
};

export default DashboardPage;