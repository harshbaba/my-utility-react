import React, {createContext, useContext, useState, useEffect} from 'react';

export const AppContext = createContext<any>(null);

export const AppProvider = (children:any) =>{
    const [trackers, setTrackers] = useState({isLoading: true, isError:false, error:"", response:{}});

    const getTrackers = () => { 
        setTrackers({...trackers,response:[1,2,3]})
    }

    useEffect(()=>{
        getTrackers();
    })

    
}