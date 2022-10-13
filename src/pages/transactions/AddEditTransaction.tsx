import React, { FC, useContext, useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

import { AppContext } from '../../index';
import './transactions.scss';
import {ADD_TRANSACTION, UPDATE_TRANSACTION} from '../../endpoints';
import _ from 'lodash';
import axios from 'axios';

const AddEditTransaction: FC<{}> = () => {
    const navigate = useNavigate();
    const {trackerid} = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const transactionId = searchParams.get("transactionid");
    const operation = transactionId? "EDIT" : "ADD";
    const {trackersData}:any = useContext(AppContext);
    const {setTrackersData } =  useContext(AppContext);
    const trackerData = _.find(trackersData?.trackers?.response, {_id: trackerid});
    const transactionData = _.find(trackerData?.transactions, {_id: transactionId});
    const [payload, setPayload] = useState({ paidBy:'', amount:0, remarks:'', trackerId:trackerid});
    
    const onSubmit = () =>{
        if((payload.amount == 0) || payload.paidBy == "" || payload.trackerId == ""){
            alert('amount, paidBy, trackerId is manadatory')
        }else{
            axios.post(`${ADD_TRANSACTION}`,payload)
            .then(res => {
                alert('Transaction Add Successfully');
                const addedData = {...trackersData};
                const index = _.findIndex(trackersData.trackers?.response, {_id: trackerid});
                addedData?.trackers?.response[index].transactions?.push({...res.data?.data});
                setTrackersData(addedData);
                navigate('/tracker/'+trackerid);
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const onUpdate = () =>{
        if((payload.amount == 0) || payload.paidBy == "" || payload.trackerId == ""){
            alert('amount, paidBy, trackerId is manadatory')
        }else{
            axios.post(`${UPDATE_TRANSACTION}`,{...payload, transactionId: transactionId})
            .then(res => {
                alert('Transaction Update Successfully');
                const addedData = {...trackersData};
                const index = _.findIndex(trackersData?.trackers?.response, {_id: trackerid});
                const transIndex = _.findIndex(addedData?.trackers?.response[index].transactions, {_id: transactionId})
                addedData.trackers.response[index].transactions[transIndex] = res.data.data;
                setTrackersData(addedData);
                navigate('/tracker/'+trackerid);
                
            }).catch(err => {
                console.log(err)
            })
        }
    }

    const onChange = (value:any, fieldName:string) => {
        const data:any = {...payload}
        data[fieldName] = value;
        setPayload(data);
    }

    const onReset = ()=>{
        setPayload({ paidBy:'', amount:0, remarks:'', trackerId:trackerid});
    }

    useEffect(()=>{
        if(transactionId){
            setPayload({ paidBy:transactionData?.paidBy, amount:transactionData?.amount, remarks:transactionData?.remarks, trackerId:trackerid})
        }else{
            
        }
    },[trackerid])
    return (
        <>
            <h3 className="page-heading">Add / Edit Transaction</h3>
            <div className="page-inner add-edit-form">
            <form id="form" className="myform">
                <div className="field-box">
                    <div className="field-box-inner">
                        <label>Paid By</label>
                        <select name="paidBy" id="paidBy" disabled={transactionId? true: false}
                        onChange={(e) => onChange(e.target.value, 'paidBy')}>
                            <option value="">Select</option>

                            {trackerData &&
                                trackerData.members.map((item:any)=>{
                                return <option 
                                            key={item._id} value={item._id} 
                                            selected={item._id == transactionData?.paidBy? true : false}
                                        >{item.fullName}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="field-box">
                <div className="field-box-inner">
                    <label>Amount</label>
                    <input
                        name='Amount'
                        id='amount'
                        type='text'
                        placeholder='Amount'
                        onChange={(e) => onChange(e.target.value, 'amount')}
                        value={payload.amount}
                    />
                </div>
                </div>
                <div className="field-box">
                <div className="field-box-inner">
                    <label>Remarks</label>
                    <input
                        name='Remarks'
                        id='remarks'
                        type='text'
                        placeholder='Remarks'
                        onChange={(e) => onChange(e.target.value, 'remarks') }
                        value={payload.remarks}
                        />
                </div>
                </div>
                <div className="field-box">
                <div className="field-box-inner control-box">
                    <button type='reset' onClick={onReset}>Reset</button>
                    {transactionId &&
                        <button type='button' onClick={onUpdate}>Update</button>
                    }
                    {!transactionId &&
                        <button type='button' onClick={onSubmit}>Add</button>
                    }
                </div>
                </div>
                </form>
            </div>
        </>
    );
};

export default AddEditTransaction;