import React, { FC, useContext } from 'react';
import './trackers.scss';
import TrackerItem from './TrackerItem';
import { AppContext } from '../../index';
interface TrackersProps {
    pageName: string;
}

const TrackersPage: FC<TrackersProps> = ({ pageName }) => {
    const {trackersData} = useContext(AppContext);
    return (
            <>
            <h3 className="page-heading">Trackers</h3>
                <div className="page-inner trackers-inner">
                    {!trackersData.trackers.isLoading  && 
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