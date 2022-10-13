import React, { FC, useContext } from 'react';
import { Link } from "react-router-dom";
import './scss/header.scss';
import { AppContext } from '../index';

const Header: FC<{}> = ({  }) => {
    const {userInfo, setIsLoggedIn, setUserInfo} = useContext(AppContext);

    const doLogout = () =>{
        localStorage.removeItem('userInfo');
        setUserInfo({});
        setIsLoggedIn(false);
        
    }
    return (
        <div className="layout-header">
            <div className="container">
                <div className="header-main">
                    <div className="user-welcome">
                        <p>Welcome <br/>{userInfo.fullName}</p>
                    </div>
                    <div className="user-logout">
                        <button onClick={doLogout}>Logout </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;