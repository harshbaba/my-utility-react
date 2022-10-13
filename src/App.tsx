import React, {useEffect, useState}from 'react';
import logo from './logo.svg';
import './App.scss';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import axios from 'axios';

import Menu from './components/Menu';
import Main from './components/Main';
import Header from './components/Header';
import {AppContext, INITIAL_STATE} from './index';
import { GET_TRACKERS_BY_USER_ID } from './endpoints';
import LoginPage from './pages/login/Login';

function App() {
  const [trackersData, setTrackersData] = useState({...INITIAL_STATE});
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState<any>({});
  const value = {
    isLoggedIn,
    setIsLoggedIn,
    trackersData,
    setTrackersData,
    userInfo,
    setUserInfo,
  }
  useEffect(()=>{
    const isLoggedIn = localStorage.getItem('userInfo');
    if(isLoggedIn){
      setIsLoggedIn(true);
      setUserInfo(JSON.parse(isLoggedIn));
    }

    axios.post(`${GET_TRACKERS_BY_USER_ID}`,{_id: userInfo?.id})
      .then(res => {
        if(res.data?.success){
          setTrackersData(
            {...trackersData, trackers:
              {errorMsg:"", isLoading:false, isError: false, response:res.data.trackers}
            })
        }else{
          setTrackersData(
            {...trackersData, trackers:
              {errorMsg:res.data.message, isLoading:false, isError: true, response:[]}
            })
        }
      }).catch(err => {
        console.log(err)
      })
  },[isLoggedIn])

  console.log('appcontext', value);
  
  return (
    <Router>
      <AppContext.Provider value={value}>
        <div className="page-wrapper">
        {isLoggedIn &&
          <>
            <Header />
            <Main />
            <Menu />
            </>
        }
        {!isLoggedIn &&
          <LoginPage />
        }
          
          
        </div>
      </AppContext.Provider>
      
    </Router>
  );
}

export default App;
