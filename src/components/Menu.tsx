import React, { FC } from 'react';
import { Link } from "react-router-dom";
import './scss/menu.scss';

const Menu: FC<{}> = ({  }) => {
    return (
      <div className="layout-menu">
        <div className="container">
          <div className="menu-main">
            <ul>
              <li>
                <Link to="/dashboard" >Dashboard</Link>
              </li>
              <li>
                <Link to="/" className="active">Trackers</Link>
              </li>
              <li>
                <Link to="/myAccount">My Account</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
        
    );
};

export default Menu;