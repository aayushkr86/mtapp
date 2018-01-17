var Transaction = require('../../models/transaction');
var black = require('../../models/blacklist');
var Branch = require('../../models/branch');
var Teller = require('../../models/teller');
var Remitter = require('../../models/remitter');
var Beneficiary = require('../../models/beneficiary');
var moment = require('moment');
var  mailer = require('express-mailer');
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
    var remitname = b64url.decode(req.body.remittername);
    var remitsurName = b64url.decode(req.body.remittersurName);
    var remitmail = b64url.decode(req.body.remitteremail);
    var remitaddress =b64url.decode(req.body.remitteraddress);
    var remitmobile =b64url.decode(req.body.remittermobile);
    var remitidType =b64url.decode(req.body.remitteridType);
    var remitidNo =b64url.decode(req.body.remitteridNo);
    var issueCountry =b64url.decode(req.body.issueCountry);
    var issueDate =req.body.issueDate;
    var expDate = req.body.expDate;

    var mode =  b64url.decode(req.body.remittanceMode);

    var bname =  b64url.decode(req.body.beneficiaryname);
    var bsurName =  b64url.decode(req.body.beneficiarysurName);
    var bmail =  b64url.decode(req.body.beneficiaryemail);
    var baddress = b64url.decode(req.body.beneficiaryaddress);
    var bmobile = b64url.decode(req.body.beneficiarymobile);
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

        "remittername":remitname,
        "remittersurName":remitsurName,
        "remitteremail":remitmail,
        "remitteraddress":remitaddress,
        "remittermobile":remitmobile,
        "remitteridType":remitidType,
        "remitteridNo":remitidNo,
        "issueCountry":issueCountry,
        "issueDate":issueDate,
        "expDate":expDate,
        "remitteramount":amount,

        "remittanceMode":mode,
        "beneficiaryname":bname,
        "beneficiarysurName":bsurName,
        "beneficiaryemail":bmail,
        "beneficiaryaddress":baddress,
        "beneficiarymobile":bmobile,
        "beneficiaryamount":amount,

      "status":"Pending",
      "_branchID":branch,
      "_tellerID":teller
    }

    Remitter
    .findOne({'remitteremail': remitmail, 'remittername':remitname , 'remittersurName':remitsurName})
    .exec(function(err, remitter){
      if(err){
           return res.json({error : true, reason : err});
         }else{
           console.log('remiteer',remitter);
            if(remitter == null) {
              //first time remitter
              Beneficiary
              .findOne({'beneficiaryemail': bmail, 'beneficiaryname':bname , 'beneficiarysurName':bsurName})
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

                                                      var remitterData = {
                                                        "remittername":remitname,
                                                        "remittersurName":remitsurName,
                                                        "remitteremail":remitmail,
                                                        "remitteraddress":remitaddress,
                                                        "remittermobile":remitmobile,
                                                        "remitteridType":remitidType,
                                                        "remitteridNo":remitidNo,
                                                        "issueCountry":issueCountry,
                                                        "issueDate":issueDate,
                                                        "expDate":expDate,
                                                        "amount":amount,
                                                      };
                                                      var remitter = new Remitter(remitterData);
                                                      remitter.save();
                                                      var beneficiaryData ={
                                                        "beneficiaryname":bname,
                                                        "beneficiarysurName":bsurName,
                                                        "beneficiaryemail":bmail,
                                                        "beneficiaryaddress":baddress,
                                                        "beneficiarymobile":bmobile,
                                                        "amount":amount
                                                      };
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
                    var bamount = beneficiary.amount;
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
                                                        var remitterData = {
                                                          "remittername":remitname,
                                                          "remittersurName":remitsurName,
                                                          "remitteremail":remitmail,
                                                          "remitteraddress":remitaddress,
                                                          "remittermobile":remitmobile,
                                                          "remitteridType":remitidType,
                                                          "remitteridNo":remitidNo,
                                                          "issueCountry":issueCountry,
                                                          "issueDate":issueDate,
                                                          "expDate":expDate,
                                                          "amount":amount,
                                                        };
                                                        var remitter = new Remitter(remitterData);
                                                        remitter.save();
                                                        var amtt = parseInt(amount);
                                                        var bt = parseInt(bamount);
                                                        var  btotal = bt+amtt;

                                                        Beneficiary.findOneAndUpdate({beneficiaryemail:bmail}, {$set:{amount:btotal}},{new: true},function(err, doc){
                                                            if(err){
                                                                return res.json({error : true, reason : err});
                                                            }
                                                            console.log("updated1");
                                                            return res.json({error : false , result : a,message:'Transaction done'});
                                                        });

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
              var ramount = remitter.amount;
              if(remitter.status === 'Verified'){
                Beneficiary
                .findOne({'beneficiaryemail': bmail, 'beneficiaryname':bname , 'beneficiarysurName':bsurName})
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

                                                        var beneficiaryData ={
                                                          "beneficiaryname":bname,
                                                          "beneficiarysurName":bsurName,
                                                          "beneficiaryemail":bmail,
                                                          "beneficiaryaddress":baddress,
                                                          "beneficiarymobile":bmobile,
                                                          "amount":amount
                                                        };

                                                        var beneficiary = new Beneficiary(beneficiaryData);
                                                        beneficiary.save();
                                                        // /***********/
                                                        var amtt = parseInt(amount);
                                                        var ramount = remitter.amount;
                                                        var  btotal = ramount+amtt;
                                                        Remitter.findOneAndUpdate({remitteremail:remitmail}, {$set:{amount:btotal}},{new: true},function(err, doc){
                                                            if(err){
                                                                return res.json({error : true, reason : err});
                                                            }
                                                            console.log("updated12");
                                                            var myJSON = JSON.stringify(result);
                                                            var a = b64url.encode(myJSON)
                                                            return res.json({error : false , result : a,message:'Transaction done'});
                                                        });
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
                      var ramount = remitter.amount;
                      var beamount = beneficiary.amount;
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
                                                          var amtt = parseInt(amount);
                                                          var rt = parseInt(ramount);
                                                          var rtotal = rt+amtt;
                                                          var bt = parseInt(beamount);
                                                          var  btotal = bt+amtt;
                                                          Remitter.findOneAndUpdate({remitteremail:remitmail}, {$set:{amount:rtotal}},{new: true},function(err, doc){
                                                              if(err){
                                                                  return res.json({error : true, reason : err});
                                                              } else {
                                                                Beneficiary.findOneAndUpdate({beneficiaryemail:bmail}, {$set:{amount:rtotal}},{new: true},function(err, docc){
                                                                  if(err){
                                                                      return res.json({error : true, reason : err});
                                                                    }
                                                                    return res.json({error : false , result : a,message:'Transaction done'});
                                                                });

                                                              }


                                                          });
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

        // var status = b64url.decode (req.body.status);
        var status = req.body.status

       Transaction
         .findOne({_id: req.params.id})
          .exec()
          .then(function(result){

            if( result.status !== undefined){   //true required
              result.status = status;
            } else {
               result.status = result.status;
            }
            return result.save();
          })
          .then(function (savedata) {
            console.log(savedata);
            var rmail = savedata.remitterDetails[0].email;
            var benmail = savedata.beneficiaryDetails[0].email;
            var htmlMsg = `Transaction Number: ${savedata.transactionNumber}`;
               htmlMsg += `  and amount: ${savedata.amount}`;
   					 htmlMsg += `  and Status: ${savedata.status}`;

            console.log(rmail,benmail);
            res.mailer.send('passvisior', {
                    to: rmail,
                    subject: 'Your Transaction Number and Status',
                    text:htmlMsg
                  }, function (err, success) {
                    if (err) {
                      res.send({result: 'There was an error sending the email'});
                    }else{
                      res.mailer.send('passvisior', {
                              to: benmail,
                              subject: 'Your Transaction Number and Status',
                              text:htmlMsg
                            }, function (err, success){
                              if (err) {
                                res.send({result: 'There was an error sending the email'});
                              }else{
                                var myJSON = JSON.stringify(savedata);
                                var a = b64url.encode(myJSON);
                                res.json({Status:'Paid',result:a})
                              }
                            });
                    }

            });
          //   var myJSON = JSON.stringify(savedata);
          //  var result = b64url.encode(myJSON);
            // return res.json({error : false , result : savedata});
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
