var Transaction = require('../../models/transaction');
var black = require('../../models/blacklist');
var Branch = require('../../models/branch');
var Teller = require('../../models/teller');
var Remitter = require('../../models/remitter');
var Beneficiary = require('../../models/beneficiary');
var moment = require('moment');
var b64url = require('b64url');

module.exports = {
  add: function(req, res) {
    function transID(idLength)
          {
                var chars="0,1,2,3,4,5,6,7,8,9";
                chars=chars.split(",");
                var min=0;
                var max=chars.length-1;
                var id="";
                for(var i=0; i<idLength;i++)
                {
                      id+=chars[ Math.floor(Math.random()*(max - min + 1) + min) ];
                }
          return id;
          }
    var transactionNo =transID(12);


    // console.log(transactionNo);

     var transdate =req.body.transactionDate;
    var country = b64url.decode(req.body._country);
    var amount = b64url.decode(req.body.amount);
    var fee = b64url.decode(req.body.fees);
    var tax = b64url.decode(req.body.tax);
    var total =b64url.decode (req.body.totalAmount);
    var recieve = b64url.decode(req.body.beneficiaryRecieve);
    var remitname = b64url.decode(req.body.remitterDetails.name);
    var remitsurName = b64url.decode(req.body.remitterDetails.surName);
    var remitmail = b64url.decode(req.body.remitterDetails.email);
    var remitaddress =b64url.decode(req.body.remitterDetails.address);
    var remitmobile =b64url.decode(req.body.remitterDetails.mobile);
    var remitidType =b64url.decode(req.body.remitterDetails.idType);
    var remitidNo =b64url.decode(req.body.remitterDetails.idNo);
    var issueCountry =b64url.decode(req.body.remitterDetails.issueCountry);
    var issueDate =req.body.remitterDetails.issueDate;
    var expDate = req.body.remitterDetails.expDate;

    var mode =  b64url.decode(req.body.remittanceMode);

    var bname =  b64url.decode(req.body.beneficiaryDetails.name);
    var bsurName =  b64url.decode(req.body.beneficiaryDetails.surName);
    var bmail =  b64url.decode(req.body.beneficiaryDetails.email);
    var baddress = b64url.decode(req.body.beneficiaryDetails.address);
    var bmobile = b64url.decode(req.body.beneficiaryDetails.mobile);
    var branch = b64url.decode(req.body._branchID);
    var teller = b64url.decode(req.body._tellerID);
    console.log(teller);

    if (moment(transdate, 'DD/MM/YYYY').isValid()){
      transdate = moment(transdate, 'DD/MM/YYYY').toDate();
    }else{
      transdate = undefined;
    }
    if (moment(issueDate, 'DD/MM/YYYY').isValid()){
      issueDate = moment(issueDate, 'DD/MM/YYYY').toDate();
    }else{
      issueDate = undefined;
    }
    if (moment(expDate, 'DD/MM/YYYY').isValid()){
      expDate = moment(expDate, 'DD/MM/YYYY').toDate();
    }else{
      expDate = undefined;
    }

    var data = {
      "transactionNumber":transactionNo,
      "transactionDate":transdate,
      "_country":country,
      "amount":amount,
      "fees":fee,
      "tax":tax,
      "totalAmount":total,
      "beneficiaryRecieve":recieve,
      "remitterDetails":{
        "name":remitname,
        "surName":remitsurName,
        "email":remitmail,
        "address":remitaddress,
        "mobile":remitmobile,
        "idType":remitidType,
        "idNo":remitidNo,
        "issueCountry":issueCountry,
        "issueDate":issueDate,
        "expDate":expDate,
        "amount":amount
      },
      "remittanceMode":mode,
      "beneficiaryDetails":{
        "name":bname,
        "surName":bsurName,
        "email":bmail,
        "address":baddress,
        "mobile":bmobile,
        "amount":amount
      },
      "status":"Pending",
      "_branchID":branch,
      "_tellerID":teller
    }

    Remitter
    .findOne({'email': remitmail, 'name':remitname , 'surName':remitsurName})
    .exec(function(err, remitter){
      if(err){
           return res.json({error : true, reason : err});
         }else{
           console.log('remiteer',remitter);
            if(remitter == null) {
              //first time remitter
              Beneficiary
              .findOne({'email': bmail, 'name':bname , 'surName':bsurName})
              .exec(function(err, beneficiary){
                if(err){
                     return res.json({error : true, reason : err});
                   }
                   console.log('benefi',beneficiary);
                  if(beneficiary == null) {
                    Branch
                    .findOne({'_id':branch})
                    .exec(function(err, branchData){
                      if(err){
                           return res.json({error : true, reason : err});
                      }
                      // console.log(branchData.paymentLimit);
                      var date = new Date(), y = date.getFullYear(), m = date.getMonth();
                     var firstDay = new Date(y, m, 1);
                     var now = moment().format();
                    Transaction
                    .find({$and: [{"transactionDate":{ $gte: firstDay, $lte: now }},{"_branchID":branch},{"_tellerID":teller}]})
                    .exec(function(err, transData){
                      if(err){
                          return res.json({error : true, reason : err});
                      }
                      var sum =0;
                        for(var i =0;i<transData.length;i++){
                          sum = sum + transData[i].amount;
                        }
                        var amt = parseInt(amount);
                       var total = sum + amt;
                       if(total <= branchData.paymentLimit){
                         Teller
                           .findOne({'_id':teller})
                           .exec(function(err, tellerData){
                             if(err){
                                  return res.json({error : true, reason : err});
                              }
                              if(total <= tellerData.paymentLimit){
                                var transac = new Transaction(data);
                                 transac.save(function (err, result){
                                          if(err){
                                                return res.json({error: true , reason: err});
                                              }else{
                                                      var myJSON = JSON.stringify(result);
                                                      var a = b64url.encode(myJSON);
                                                      var remitterData = data.remitterDetails;
                                                      var remitter = new Remitter(remitterData);
                                                      remitter.save();
                                                      var beneficiaryData = data.beneficiaryDetails;
                                                      var beneficiary = new Beneficiary(beneficiaryData);
                                                      beneficiary.save();
                                                  return res.json({error : false , result : a,message:'Transaction done'});
                                              }
                                });


                              }else {
                                var b = tellerData.paymentLimit;
                                return res.json({message:'Teller PaymentLimit Overflow',lastTransaction:sum,Amount:amount,totalAmount:total,TellerLimit:b});
                              }
                           }); //teller
                       }else {
                              var c =  branchData.paymentLimit;
                             return res.json({message:'Branch PaymentLimit Overflow',lastTransaction:sum,Amount:amount,totalAmount:total,BranchLimit:c});
                       }
                    });//transaction find

                    });//branch find

                  } else{
                    //beneficiary found
                    if(beneficiary.status === 'Verified'){
                      Branch
                      .findOne({'_id':branch})
                      .exec(function(err, branchData){
                        if(err){
                             return res.json({error : true, reason : err});
                        }
                        // console.log(branchData.paymentLimit);
                        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
                       var firstDay = new Date(y, m, 1);
                       var now = moment().format();
                      Transaction
                      .find({$and: [{"transactionDate":{ $gte: firstDay, $lte: now }},{"_branchID":branch},{"_tellerID":teller}]})
                      .exec(function(err, transData){
                        if(err){
                            return res.json({error : true, reason : err});
                        }
                        var sum =0;
                          for(var i =0;i<transData.length;i++){
                            sum = sum + transData[i].amount;
                          }
                          var amt = parseInt(amount);
                         var total = sum + amt;
                         if(total <= branchData.paymentLimit){
                           Teller
                             .findOne({'_id':teller})
                             .exec(function(err, tellerData){
                               if(err){
                                    return res.json({error : true, reason : err});
                                }
                                if(total <= tellerData.paymentLimit){
                                  var transac = new Transaction(data);
                                   transac.save(function (err, result){
                                            if(err){
                                                  return res.json({error: true , reason: err});
                                                }else{
                                                        var myJSON = JSON.stringify(result);
                                                        var a = b64url.encode(myJSON);
                                                        var remitterData = data.remitterDetails;
                                                        var remitter = new Remitter(remitterData);
                                                        remitter.save();
                                                    return res.json({error : false , result : a,message:'Transaction done'});
                                                }
                                  });


                                }else {
                                  var b = tellerData.paymentLimit;
                                  return res.json({message:'Teller PaymentLimit Overflow',lastTransaction:sum,Amount:amount,totalAmount:total,TellerLimit:b});
                                }
                             }); //teller
                         }else {
                                var c =  branchData.paymentLimit;
                               return res.json({message:'Branch PaymentLimit Overflow',lastTransaction:sum,Amount:amount,totalAmount:total,BranchLimit:c});
                         }
                      });//transaction find

                      });//branch find
                    } else {
                      return res.json({message:"Beneficiary not verified"});
                    }
                  }//beneficiary found
              });//beneficiary find

            } else {
              //remiterr verified
              if(remitter.status === 'Verified'){
                Beneficiary
                .findOne({'email': bmail, 'name':bname , 'surName':bsurName})
                .exec(function(err, beneficiary){
                    if(beneficiary == null) {
                      Branch
                      .findOne({'_id':branch})
                      .exec(function(err, branchData){
                        if(err){
                             return res.json({error : true, reason : err});
                        }
                        // console.log(branchData.paymentLimit);
                        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
                       var firstDay = new Date(y, m, 1);
                       var now = moment().format();
                      Transaction
                      .find({$and: [{"transactionDate":{ $gte: firstDay, $lte: now }},{"_branchID":branch},{"_tellerID":teller}]})
                      .exec(function(err, transData){
                        if(err){
                            return res.json({error : true, reason : err});
                        }
                        var sum =0;
                          for(var i =0;i<transData.length;i++){
                            sum = sum + transData[i].amount;
                          }
                          var amt = parseInt(amount);
                         var total = sum + amt;
                         if(total <= branchData.paymentLimit){
                           Teller
                             .findOne({'_id':teller})
                             .exec(function(err, tellerData){
                               if(err){
                                    return res.json({error : true, reason : err});
                                }
                                if(total <= tellerData.paymentLimit){
                                  var transac = new Transaction(data);
                                   transac.save(function (err, result){
                                            if(err){
                                                  return res.json({error: true , reason: err});
                                                }else{
                                                        var myJSON = JSON.stringify(result);
                                                        var a = b64url.encode(myJSON)
                                                        var beneficiaryData = data.beneficiaryDetails;
                                                        var beneficiary = new Beneficiary(beneficiaryData);
                                                        beneficiary.save();
                                                    return res.json({error : false , result : a,message:'Transaction done'});
                                                }
                                  });


                                }else {
                                  var b = tellerData.paymentLimit;
                                  return res.json({message:'Teller PaymentLimit Overflow',lastTransaction:sum,Amount:amount,totalAmount:total,TellerLimit:b});
                                }
                             }); //teller
                         }else {
                                var c =  branchData.paymentLimit;
                               return res.json({message:'Branch PaymentLimit Overflow',lastTransaction:sum,Amount:amount,totalAmount:total,BranchLimit:c});
                         }
                      });//transaction find

                      });//branch find
                    } else{
                      //beneficiary found
                      if(beneficiary.status === 'Verified'){
                        Branch
                        .findOne({'_id':branch})
                        .exec(function(err, branchData){
                          if(err){
                               return res.json({error : true, reason : err});
                          }
                          // console.log(branchData.paymentLimit);
                          var date = new Date(), y = date.getFullYear(), m = date.getMonth();
                         var firstDay = new Date(y, m, 1);
                         var now = moment().format();
                        Transaction
                        .find({$and: [{"transactionDate":{ $gte: firstDay, $lte: now }},{"_branchID":branch},{"_tellerID":teller}]})
                        .exec(function(err, transData){
                          if(err){
                              return res.json({error : true, reason : err});
                          }
                          var sum =0;
                            for(var i =0;i<transData.length;i++){
                              sum = sum + transData[i].amount;
                            }
                            var amt = parseInt(amount);
                           var total = sum + amt;
                           if(total <= branchData.paymentLimit){
                             Teller
                               .findOne({'_id':teller})
                               .exec(function(err, tellerData){
                                 if(err){
                                      return res.json({error : true, reason : err});
                                  }
                                  if(total <= tellerData.paymentLimit){
                                    var transac = new Transaction(data);
                                     transac.save(function (err, result){
                                              if(err){
                                                    return res.json({error: true , reason: err});
                                                  }else{
                                                          var myJSON = JSON.stringify(result);
                                                          var a = b64url.encode(myJSON);
                                                      return res.json({error : false , result : a,message:'Transaction done'});
                                                  }
                                    });


                                  }else {
                                    var b = tellerData.paymentLimit;
                                    return res.json({message:'Teller PaymentLimit Overflow',lastTransaction:sum,Amount:amount,totalAmount:total,TellerLimit:b});
                                  }
                               }); //teller
                           }else {
                                  var c =  branchData.paymentLimit;
                                 return res.json({message:'Branch PaymentLimit Overflow',lastTransaction:sum,Amount:amount,totalAmount:total,BranchLimit:c});
                           }
                        });//transaction find

                        });//branch find
                      } else {
                        return res.json({message:"Beneficiary not verified"});
                      }
                    }
                });//beneficiary
              } else {
                return res.json({message:"Remitter not verified"});
              }//remitter not verified
            } // remiteer found
         } //else remitter
    });//remiter fin



     },
     update: function(req, res) {
      //  var number = b64url.decode(req.body.transactionNumber);
      //  var transdate =b64url.decode(req.body.transactionDate);
      // var country = b64url.decode(req.body._country);
      // var amount = b64url.decode(req.body.amount);
      // var fee = b64url.decode(req.body.fees);
      // var tax = b64url.decode(req.body.tax);
      // var total =b64url.decode (req.body.totalAmount);
      // var recieve = b64url.decode(req.body.beneficiaryRecieve);
      // var remitname = b64url.decode(req.body.remitterDetails.name);
      // var remitsurName = b64url.decode(req.body.remitterDetails.surName);
      // var remitmail = b64url.decode(req.body.remitterDetails.email);
      // var remitaddress =b64url.decode(req.body.remitterDetails.address);
      // var remitmobile =b64url.decode(req.body.remitterDetails.mobile);
      // var remitidType =b64url.decode(req.body.remitterDetails.idType);
      // var remitidNo =b64url.decode(req.body.remitterDetails.idNo);
      // var issueCountry =b64url.decode(req.body.remitterDetails.issueCountry);
      // var issueDate =b64url.decode(req.body.remitterDetails.issueDate);
      // var expDate = b64url.decode(req.body.remitterDetails.expDate);
      //
      // var mode =  b64url.decode(req.body.remittanceMode);
      //
      // var bname =  b64url.decode(req.body.beneficiaryDetails.name);
      // var bsurName =  b64url.decode(req.body.beneficiaryDetails.surName);
      // var bmail =  b64url.decode(req.body.beneficiaryDetails.email);
      // var baddress = b64url.decode(req.body.beneficiaryDetails.address);
      // var bmobile = b64url.decode(req.body.beneficiaryDetails.mobile);
      // var status = b64url.decode (req.body.status);
      // var supplier = b64url.decode(req.body._supplierCode);
      // var branch = b64url.decode(req.body._branchID);
      // var teller = b64url.decode(req.body._tellerID);
       //
      //  delete transdate;
      //  delete number;
      //  delete branch;
      //  delete teller;
      //  delete country;
      //  delete amount;
      //  delete
        var status = b64url.decode (req.body.status);

       Transaction
         .findOne({_id: req.params.id})
          .exec()
          .then(function(result){
            // if( result._country !== undefined){   //true required
            //   result._country = country;
            // } else {
            //   result._country = result._country;
            // }
            // if( result.amount !== undefined){   //true required
            //   result.amount = amount;
            // } else {
            //   result.amount = result.amount;
            // }
            // if( result.tax !== undefined){   //true required
            //   result.tax = tax;
            // } else {
            //    result.tax = result.tax;
            // }
            // if( result.fees !== undefined){   //true required
            //   result.fees = fee;
            // } else {
            //   result.fees = result.fees;
            // }
            // if( result.totalAmount !== undefined){   //true required
            //   result.totalAmount = total;
            // } else {
            //    result.totalAmount = result.totalAmount;
            // }
            // if( result.beneficiaryRecieve !== undefined){   //true required
            //   result.beneficiaryRecieve = recieve;
            // } else {
            //    result.beneficiaryRecieve = result.beneficiaryRecieve;
            // }
            // if( result.remitterDetails !== undefined){   //true required
            //   result.remitterDetails = data.remitterDetails;
            // } else {
            //    result.remitterDetails = result.remitterDetails;
            // }
            // if( result.remittanceMode !== undefined){   //true required
            //   result.remittanceMode = data.remittanceMode;
            // } else {
            //    result.remittanceMode = result.remittanceMode;
            // }
            // if( result.beneficiaryDetails !== undefined){   //true required
            //   result.beneficiaryDetails = data.beneficiaryDetails;
            // } else {
            //    result.beneficiaryDetails = result.beneficiaryDetails;
            // }
            if( result.status !== undefined){   //true required
              result.status = status;
            } else {
               result.status = result.status;
            }
            return result.save();
          })
          .then(function (savedata) {
            var myJSON = JSON.stringify(savedata);
           var result = b64url.encode(myJSON);
            return res.json({error : false , result : result});
          })
          .catch(function (err) {
            return res.json({error : true , reason: err});
          })
     },
     find: function(req,res){
      Transaction
      .find()
      .populate('_country')
      .populate('_supplierCode','supplierCode')
      .populate('_branchID','branchID')
      .populate('_tellerID','_tellerID')
      .exec(function(err , result) {
          if(err){
               return res.json({error : true , reason: err});
          } else{
                  var myJSON = JSON.stringify(result);
                  var a = b64url.encode(myJSON);
               return res.json({error : false , result: a});
          }

       });
     },
     mytransaction: function(req,res){
       var id = b64url.decode(req.body._tellerID);
       console.log(id);
       Transaction
       .find({'_tellerID':id})
       .populate('_country')
       .populate('_branchID','branchID')
       .populate('_tellerID','_tellerID')
       .exec()
       .then(function (allFee){
        var myJSON = JSON.stringify(allFee);
       var a = b64url.encode(myJSON);
         return res.json({
           error : false ,
           result: a
          });

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })
     },
     searchTransactionNumber: function(req,res){
       var transno = b64url.decode(req.body.transactionNumber);
       console.log(transno);
       Transaction
       .find({'transactionNumber':transno})
       .populate('_country')
       .populate('_branchID','branchID')
       .populate('_tellerID','_tellerID')
       .exec()
       .then(function (allFee){
        var myJSON = JSON.stringify(allFee);
       var a = b64url.encode(myJSON);
         return res.json({
           error : false ,
           result: a
          });

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })
     },
     dateRange: function(req,res){
       var a = req.body.startDate;
       var b = req.body.endDate;
       var start_date = moment(a, 'DD/MM/YYYY').format();
       console.log(start_date);
       var end_date = moment(b, 'DD/MM/YYYY').format();
       console.log(end_date);
       Transaction
       .find({"transactionDate":{ $gte: start_date , $lte: end_date }})
       .populate('_country')
       .populate('_branchID','branchID')
       .populate('_tellerID','_tellerID')
       .exec()
       .then(function (allFee){
        var myJSON = JSON.stringify(allFee);
       var a = b64url.encode(myJSON);
         return res.json({
           error : false ,
           result: a
          });

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })
     },
     findAll: function(req,res){
       var a = req.query.startDate;
       var b = req.query.endDate;
       var start_date = moment(a, 'DD/MM/YYYY').format();
       console.log(start_date);
       var end_date = moment(b, 'DD/MM/YYYY').format();
       console.log(end_date);

       var query = { };
       if(req.query.tno != undefined){
         query["transactionNumber"] = req.query.tno;                               /*FIND BY status*/
         //console.log(query);
       }
       if(req.query.startDate != undefined && req.query.endDate != undefined ){
         query["transactionDate"] = { $gte: start_date, $lte: end_date };              /*FIND BY DATE RANGE*/
         console.log(query);
       }
       if(req.query.amount != undefined){
         query["amount"] = req.query.amount;                               /*FIND BY status*/
         console.log(query);
       }
       if(req.query.tid != undefined){
         query["_tellerID"] = req.query.tid;                               /*FIND BY status*/
         console.log(query);
       }
       if(req.query.country != undefined){
         query["_country"] = req.query.country;                               /*FIND BY status*/
         console.log(query);
       }
       //  console.log(query);
       Transaction
       .find(query)
       .populate('_country')
       .populate('_branchID','branchID')
       .populate('_tellerID','_tellerID')
       .exec()
       .then(function (allFee){
        var myJSON = JSON.stringify(allFee);
       var a = b64url.encode(myJSON);
         return res.json({
           error : false ,
           result: a
          });

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })

     },
    //  findTransaction: function(req,res){
    //    var a = req.query.startDate;
    //    var b = req.query.endDate;
    //    var start_date = moment(a, 'DD/MM/YYYY').toDate();
    //    var end_date = moment(b, 'DD/MM/YYYY').toDate();
     //
     //
    //    var query = { };
     //
    //    if(req.query.startDate != undefined && req.query.endDate != undefined ){
    //      query["transactionDate"] = { $gte: start_date, $lte: end_date };              /*FIND BY DATE RANGE*/
    //      //console.log(query);
    //    }
    //    //  console.log(query);
    //    Transaction
    //    .find({_tellerID : req.params.tellerID,query})
    //    .populate('_country')
    //    .populate('_supplierCode','supplierCode')
    //    .populate('_branchID','branchID')
    //    .populate('_tellerID','_tellerID')
    //    .exec()
    //    .then(function (allFee){
    //      return res.json({
    //        error : false ,
    //        result: allFee
     //
    //       });
     //
    //    })
    //    .catch(function (err) {
    //      console.log(err);
    //      return res.json({error : true , reason: err});
    //    })
     //
    //  },
   }

