import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { TRACKERS_DATA } from './mock/trackers';
import { useState, createContext } from "react";
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

export const INITIAL_STATE = {
  trackers:{
    isLoading:true,
    isError:false,
    errorMsg:"",
    response:[]
  }
}

export const AppContext = createContext<any>(INITIAL_STATE);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
