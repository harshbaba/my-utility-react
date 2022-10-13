import React, { FC } from 'react';
import { Link } from "react-router-dom";

interface TransactionItemInterFace {
    transactionItem:any, paidBy:string, trackerId:string | undefined
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
                <h3>DD-MMM-YYYY</h3>
                <h4>By: <span>{paidBy}</span></h4>
            </div>
            <Link to={'/add-edit-transaction/trackerid/'+trackerId+'?transactionid='+transactionItem._id} className="card-link" >&nbsp;</Link>
        </div>
    );
};

export default TransactionItem;