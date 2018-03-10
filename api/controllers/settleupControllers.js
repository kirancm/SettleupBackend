'use strict';
var settleupData = require('../mockData/settleupDataJson');

exports.addPayment = function(req, res) {
    // let paymentID = Math.random(10,1000);
    // req.body["id"] = paymentID;
    settleupData.data.push(req.body);
    res.json(settleupData.data);
};

exports.getPaymentList = function(req, res) {
    res.json(settleupData.data);
};


exports.getSummary = function(req, res) {
    let summeryObj = {}
    const members = [
        "kiran",
        "santhosh"
    ]

    for(let i=0;i<settleupData.data.length;i++){
        let  amount = settleupData.data[i]["amount"];  

        // if(settleupData.data[i]['towhom'] == "both"){
        //     amount = (settleupData.data[i]["amount"])/members.length;
        // }

        //update who amount
        if(!summeryObj.hasOwnProperty(settleupData.data[i]["who"])){
            summeryObj[settleupData.data[i]["who"]] = amount;
        }
        else{
            summeryObj[settleupData.data[i]["who"]] += amount;
        }


        //update towhoms amount
        if(settleupData.data['towhom'] == "both"){
            let diductAmount = amount/members.length;
            for(let j=0;j<members.length;j++) {
                if(!summeryObj.hasOwnProperty(settleupData.data[i]["who"])){
                    summeryObj[members[j]] = -diductAmount;
                }
                else{
                    summeryObj[members[j]] -= diductAmount;
                }
            }
        }

        else{
            if(!summeryObj.hasOwnProperty(settleupData.data[i]["towhom"])){
                summeryObj[settleupData.data[i]["towhom"]] = -amount;
            }
            else{
                summeryObj[settleupData.data[i]["towhom"]] -= amount;
            }
        }

    }
    res.json(summeryObj);
};


exports.deletePayment = function(req, res) {
    for(let i=0;i<settleupData.data.length;i++){
        if(settleupData.data[i].id == req.query.paymentId){
            settleupData.data.splice(i, 1);
        }
    }
    res.json(settleupData.data);
};