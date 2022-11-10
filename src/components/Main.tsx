import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyAccountPage from '../pages/myAccount/MyAccount';
import TrackersPage from '../pages/trackers/Trackers';
import DashboardPage from '../pages/dashboard/Dashboard';

import './scss/main.scss';
import TransactionsPage from '../pages/transactions/Transactions';
import AddEditTransaction from '../pages/transactions/AddEditTransaction';
import LoginPage from '../pages/login/Login';
import RegisterPage from '../pages/register/Register';
import AddEditTracker from '../pages/trackers/AddEditTracker';

const Main = () => {
    return (
      <div className="layout-main">
        <div className="container">
          <div className="main">
            <Routes>
              <Route path="/dashboard" element={<DashboardPage pageName="Dashboard" />} />
              <Route path="/" element={<TrackersPage pageName="Trackers" />} />
              <Route path="/trackers" element={<TrackersPage pageName="Trackers" />} />
              <Route path="/myAccount" element={<MyAccountPage pageName="My Account" />} />
              <Route path="/tracker/:id" element={<TransactionsPage />} />
              <Route path="/add-edit-transaction/trackerid/:trackerid" element={<AddEditTransaction />} />
              <Route path="/add-edit-tracker" element={<AddEditTracker />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Routes>
          </div>
        </div>
      </div>         
        
    );
}
export default Main;
