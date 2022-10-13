import _ from 'lodash';
export const getTotalRs = (data:any) =>{
    let rs = 0;
    data.forEach((item:any)=> {
        rs = rs + item.amount;
    });

    return rs;
}

export const getPaidByName = (data:any, id:any) =>{
    const x = _.find(data,{_id: id});
    return x?.fullName;
    //return 'Harsh Singh Yadav';
}

export const getTransactionsSummary = (data:any)=>{
    const obj:any = {
        totalRs:0,
        perHead:0,
        membersRs:{},
        membersLength: 0,
        membersData:[]
    }
    if(data && data?.transactions){
        const transaData = data?.transactions;
        for(let i = 0; i < transaData.length; i++){
            obj.totalRs = obj.totalRs + transaData[i].amount;
            if(obj.membersRs.hasOwnProperty(transaData[i].paidBy)){
                obj.membersRs[transaData[i].paidBy] = obj.membersRs[transaData[i].paidBy] + transaData[i].amount;
            }else{
                obj.membersRs[transaData[i].paidBy] = transaData[i].amount;
            }
        }

        obj.membersLength = data?.members.length;
        obj.membersData = data?.members;
        if(obj.membersLength > 1){
            obj.perHead = obj.totalRs/obj.membersLength;
        }
    }
    console.log('==========Summary', obj);
    return obj;
}

export const getTwoDigitDecimal = (value:number)=>{
    return Math.floor(value).toFixed(2);
}