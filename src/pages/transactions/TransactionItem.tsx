import React, { FC } from 'react';
import { Link } from "react-router-dom";
import Moment from 'moment';

interface TransactionItemInterFace {
    transactionItem:any, paidBy:string, trackerId:string | undefined
}

const getDate =  (date1:any)=>{
    const MONTH = ["","JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    if(!date1) return "DD-MM-YYYY";
    const date = new Date(date1);
    const str = date.getDate() + '-'+ MONTH[date.getMonth()+1]+'-'+ date.getFullYear();
    return str;
}

const TransactionItem: FC<TransactionItemInterFace> = (
    { transactionItem, paidBy, trackerId}) => {
    return (
        <div className="transaction-item">
            <div className="t-item-top">
                <h3>Paid For </h3>
                <p>{transactionItem.remarks}</p>
                <span className="rs">Rs {transactionItem.amount}</span>
            </div>
            <div className="t-item-bottom">
                {transactionItem.updatedAt &&
                    <h3>Update At: {getDate(transactionItem.updatedAt)}</h3>
                }
                {!transactionItem.updatedAt &&
                    <h3>Created At: {getDate(transactionItem.createdAt)}</h3>
                }
                
                <h4>By: <span>{paidBy}</span></h4>
            </div>
            <Link to={'/add-edit-transaction/trackerid/'+trackerId+'?transactionid='+transactionItem._id} className="card-link" >&nbsp;</Link>
        </div>
    );
};

export default TransactionItem;