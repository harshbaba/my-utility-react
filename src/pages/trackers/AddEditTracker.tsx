import React, { FC, useContext, useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { AppContext } from '../../index';
import './trackers.scss';
import {ADD_TRACKER, ADD_MEMBER} from '../../endpoints';
import _ from 'lodash';
import axios from 'axios';

const AddEditTracker: FC<{}> = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const trackerid = searchParams.get("trackerid");
    const operation = trackerid? "EDIT" : "ADD";
    const {trackersData, userInfo}:any = useContext(AppContext);
    const {setTrackersData } =  useContext(AppContext);
    const trackerData = _.find(trackersData?.trackers?.response, {_id: trackerid});    
    const [payload, setPayload] = useState({ _id: userInfo.id, trackerName:'', members:[], trackerId:''});
    const [newMemberEmailPayload, setNewMemberEmailPayload] = useState({memberEmailId:"", trackerId:""});

    const isLoggedIn = localStorage.getItem('userInfo');
    if(!isLoggedIn){
        navigate('/login');
    }
    const onSubmit = () =>{
        if(payload.trackerName == ""){
            alert('Tracker Name is Manadatory')
        }else{
            axios.post(`${ADD_TRACKER}`,payload)
            .then(res => {
                alert('Tracker Add Successfully');
                const addedData = {...trackersData};
                addedData?.trackers?.response.push(res?.data?.data);
                setTrackersData(addedData);
                navigate('/');
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const onAddNewMember = () =>{
        if(newMemberEmailPayload.memberEmailId == ""){
            alert('Member Email Id is Manadatory')
        }else{
            axios.post(`${ADD_MEMBER}`,newMemberEmailPayload)
            .then(res => {
                alert('Member Added Succesfully');
                const addedData = {...trackersData};
                const index = _.findIndex(trackersData?.trackers?.response, {_id: trackerid});
                addedData?.trackers.response[index].members.push(res?.data.data);
                setTrackersData(addedData);
                navigate('/tracker/'+trackerid);
                
            }).catch(err => {
                console.log(err)
                alert(err);
            })
        }
        
    }

    const onChange = (value:any, fieldName:string) => {
        const data:any = {...payload}
        data[fieldName] = value;
        setPayload(data);
    }
    const onAddMemberChange=(value:any, fieldName:string) => {
        const data:any = {...newMemberEmailPayload}
        data[fieldName] = value;
        setNewMemberEmailPayload(data);
    }

    useEffect(()=>{
        if(trackerid){
            console.log('if tracker id');
            console.log(trackerid);
            console.log(trackerData);
            setPayload({ 
                _id: userInfo.id, 
                trackerName:trackerData.trackerName,
                members:trackerData?.members, 
                trackerId:trackerData?.trackerid
            })
            setNewMemberEmailPayload({...newMemberEmailPayload,trackerId:trackerid})
        }
    },[trackerid])
    return (
        <>
            <h3 className="page-heading">Add / Edit Tracker</h3>
            <div className="page-inner add-edit-form">
            <form id="form" className="myform">
                
                <div className="field-box">
                <div className="field-box-inner">
                    <label>Tracker Name</label>
                    <input
                        name='Tracker Name'
                        id='trackerName'
                        type='text'
                        placeholder='Tracker Name'
                        onChange={(e) => onChange(e.target.value, 'trackerName')}
                        value={payload.trackerName}
                        readOnly={trackerid? true: false}
                    />
                </div>
                </div>
                {trackerid && trackerData && 
                    <>
                    <div className="field-box">
                    <div className="field-box-inner members">
                        <label>Members:</label>
                        <ul>
                        {
                            trackerData.members.map((item:any)=>{
                            return <li>{item.fullName}</li>
                            })
                        }
                        </ul>
                        
                    </div>
                    </div>
                    <div className="field-box">
                    <div className="field-box-inner">
                        <label>Add Member</label>
                        <input
                            name='Member Email Id'
                            id='memberEmailId'
                            type='text'
                            placeholder='Member Email Id'
                            onChange={(e) => onAddMemberChange(e.target.value, 'memberEmailId')}
                            value={newMemberEmailPayload.memberEmailId}
                            
                        />
                    </div>
                    </div>
                    <div className="field-box">
                    <div className="field-box-inner control-box">
                    <button type='button' onClick={onAddNewMember}>Add</button>
                    </div>
                    </div>
                    </>
                }
                <div className="field-box">
                <div className="field-box-inner control-box">
                    
                    {!trackerid &&
                        <button type='button' onClick={onSubmit}>Add</button>
                    }
                </div>
                </div>
                </form>
            </div>
        </>
    );
};

export default AddEditTracker;