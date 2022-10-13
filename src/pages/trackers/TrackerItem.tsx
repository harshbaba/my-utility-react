import React, { FC } from 'react';
import { Link } from "react-router-dom";
import './trackerItem.scss';
import { getTotalRs } from '../../utils/commonUtil';

const TrackerItem: FC<{trackerItem:any}> = ({ trackerItem }) => {
    return (
        <div className="tracker-item">
            <div className="tracker-item-inner">
                <h3>{trackerItem.trackerName}</h3>
                {trackerItem.transactions.length > 0 && 
                    <p>{trackerItem.transactions[trackerItem.transactions.length - 1].remarks}</p>
                }
                {trackerItem.transactions.length == 0 &&
                    <p>No transcation made yet</p>
                }
                <span className="rs">Total:<br/> {
                    getTotalRs(trackerItem.transactions)
                } Rs</span>
            </div>
            <Link to={'/tracker/'+trackerItem._id} className="card-link" >&nbsp;</Link>
        </div>
    );
};

export default TrackerItem;