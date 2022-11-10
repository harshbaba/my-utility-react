import React, { FC, useContext } from 'react';
import {useNavigate } from 'react-router-dom';
import './trackers.scss';
import TrackerItem from './TrackerItem';
import { AppContext } from '../../index';
import { Link } from "react-router-dom";
interface TrackersProps {
    pageName: string;
}

const TrackersPage: FC<TrackersProps> = ({ pageName }) => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('userInfo');
    if(!isLoggedIn){
        navigate('/login');
    }
    const {trackersData} = useContext(AppContext);
    return (
            <>
            <h3 className="page-heading">Trackers</h3>
            <Link to={'/add-edit-tracker'} className="add-tracker">Add Tracker</Link>
                <div className="page-inner trackers-inner">
                    {!trackersData.trackers.isLoading  && trackersData.trackers.response.length > 0 &&
                    trackersData.trackers.response.map((tracker:any,key:any) => {
                        return <div className="" key={key}>
                            <TrackerItem trackerItem={tracker}/>
                        </div>
                        
                    })}                    
                </div>
            </>
        
    );
};

export default TrackersPage;