import React, { FC } from 'react';

interface MyAccountProps {
    pageName: string;
}

const MyAccountPage: FC<MyAccountProps> = ({ pageName }) => {
    return (
        <>
            <h1>Welcome {pageName}</h1>
        </>
    );
};

export default MyAccountPage;