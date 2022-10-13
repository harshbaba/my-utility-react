import React, { FC, useContext } from 'react';
import { useParams } from 'react-router-dom';
import TransactionItem from './TransactionItem';
import './transactionItem.scss';
import './transactions.scss';
import { AppContext } from '../../index';
import { getPaidByName, getTransactionsSummary, getTwoDigitDecimal } from '../../utils/commonUtil';
import _ from 'lodash';
import { Link } from "react-router-dom";
const TransactionsPage: FC<{}> = ({ }) => {
    const {id} = useParams();

    const {trackersData}:any = useContext(AppContext);
    const index = _.findIndex(trackersData.trackers?.response, {_id: id});
    const trackerData = trackersData.trackers?.response[index];
    const transactionsSummary = getTransactionsSummary(trackerData);
    return (
        <>
            <h3 className="page-heading">{trackerData?.trackerName}</h3>
            <Link to={'/add-edit-transaction/trackerid/'+trackerData?._id} className="add-transaction" >Add / Edit Transaction</Link>
            <div className="page-inner transactions-inner">
                {trackerData?.transactions.map((transaction:any, key=0) => {
                    return <div className="" key={key++}>
                        <TransactionItem 
                            transactionItem={transaction} 
                            paidBy={getPaidByName(trackerData?.members, transaction.paidBy)}
                            trackerId={id}
                        />
                    </div>
                })}
                {trackerData?.transactions?.length &&
                    <div className="transaction-item summary">
                        <ul>
                            {transactionsSummary?.membersLength > 1 && 
                                transactionsSummary.membersData.map((member:any)=>{
                                return <li>
                                        <div>
                                            <h3>{member.fullName}</h3>
                                        </div>
                                        <div>
                                            <p>{transactionsSummary.membersRs[member._id]? 
                                                transactionsSummary.membersRs[member._id] : 0}
                                            Rs</p>
                                        </div>
                                    </li>
                                })
                            }
                            {transactionsSummary?.membersLength > 1 &&
                                <li>
                                    <div>
                                        <h3>Per Head:</h3>
                                    </div>
                                    <div>
                                        <p>{getTwoDigitDecimal(transactionsSummary?.perHead)} Rs</p>
                                    </div>
                                </li>
                            }
                            <li>
                                <div>
                                    <h3>Total Rs:</h3>
                                </div>
                                <div>
                                    <p>{transactionsSummary?.totalRs} Rs</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                }
                
            </div>
        </>
    );
};

export default TransactionsPage;