var Transaction = require('../../models/transaction');
var black = require('../../models/blacklist');
var Branch = require('../../models/branch');
var Teller = require('../../models/teller');
var Remitter = require('../../models/remitter');
var Beneficiary = require('../../models/beneficiary');
var moment = require('moment');
var  mailer = require('express-mailer');
var b64url = require('b64url');
var BulkSMS = require('bulksms');
var Beneficiary = require('../../models/beneficiary');

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


    console.log(transactionNo);

     var transdate =req.body.transactionDate;
     var country = b64url.decode(req.body.country);
    // var country = req.body.country;
    var currency = b64url.decode(req.body.currency);
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
    var bmail =  req.body.beneficiaryemail;
    var baddress = b64url.decode(req.body.beneficiaryaddress);
    var bmobile = b64url.decode(req.body.beneficiarymobile);
    var bidType =req.body.beneficiaryidType;
    var bidNo =req.body.beneficiaryidNo;
    var bissueCountry =req.body.bissueCountry;
    var bissueDate =req.body.bissueDate;
    var bexpDate = req.body.bexpDate;
    var branch = b64url.decode(req.body.branchID);
    var teller = b64url.decode(req.body.tellerID);


    if (moment(transdate, 'YYYY-MM-DD').isValid()){
      transdate = moment(transdate, 'YYYY-MM-DD').toDate();
    }else{
      transdate = undefined;
    }
    if (moment(issueDate, 'YYYY-MM-DD').isValid()){
      issueDate = moment(issueDate, 'YYYY-MM-DD').toDate();
    }else{
      issueDate = undefined;
    }
    if (moment(expDate, 'YYYY-MM-DD').isValid()){
      expDate = moment(expDate, 'YYYY-MM-DD').toDate();
    }else{
      expDate = undefined;
    }
    if (moment(bissueDate, 'YYYY-MM-DD').isValid()){
      bissueDate = moment(bissueDate, 'YYYY-MM-DD').toDate();
    }else{
      bissueDate = undefined;
    }
    if (moment(bexpDate, 'YYYY-MM-DD').isValid()){
      expDate = moment(bexpDate, 'YYYY-MM-DD').toDate();
    }else{
      bexpDate = undefined;
    }

   var dat = moment(Date.now()).format('DD/MM/YYYY');
   var htmlMsg = `Dear Customer,Your transaction deatils-Date:${dat},Transaction Number:${transactionNo},Amount to be paid:${currency} ${total},Recieving amount:${currency} ${amount},Status:Pending`;

  console.log(htmlMsg)

    var data = {
      "transactionNumber":transactionNo,
      "transactionDate":transdate,
      "country":country,
      "currency":currency,
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
        "beneficiaryidType":bidType,
        "beneficiaryidNo":bidNo,
        "bissueCountry":bissueCountry,
        "bissueDate":bissueDate,
        "bexpDate":bexpDate,
        "beneficiaryamount":amount,

      "status":"Pending",
      "branchID":branch,
      "tellerID":teller
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
              .findOne({'beneficiaryname':bname , 'beneficiarysurName':bsurName})
              .exec(function(err, beneficiary){
                if(err){
                     return res.json({error : true, reason : err});
                   }
                   console.log('benefi',beneficiary);
                  if(beneficiary == null) {
                    Branch
                    .findOne({'branchID':branch})
                    .exec(function(err, branchData){
                      if(err){
                           return res.json({error : true, reason : err});
                      }
                      // console.log(branchData.paymentLimit);
                      var date = new Date(), y = date.getFullYear(), m = date.getMonth();
                     var firstDay = new Date(y, m, 1);
                     var now = moment().format();
                    Transaction
                    .find({$and: [{"transactionDate":{ $gte: firstDay, $lte: now }},{"branchID":branch},{"tellerID":teller}]})
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
                                                        "branchID":branch
                                                      };
                                                      var remitter = new Remitter(remitterData);
                                                      console.log(remitterData)
                                                      remitter.save();

                                                      var beneficiaryData ={
                                                        "beneficiaryname":bname,
                                                        "beneficiarysurName":bsurName,
                                                        "beneficiaryemail":bmail,
                                                        "beneficiaryaddress":baddress,
                                                        "beneficiarymobile":bmobile,
                                                        "beneficiaryidType":bidType,
                                                        "beneficiaryidNo":bidNo,
                                                        "bissueCountry":bissueCountry,
                                                        "bissueDate":bissueDate,
                                                        "bexpDate":bexpDate,
                                                        "amount":amount,
                                                        "country":country,
                                                        "branchID":branch
                                                      };
                                                      console.log(beneficiaryData);
                                                      var beneficiary = new Beneficiary(beneficiaryData);
                                                      beneficiary.save();
                                                        /*yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy*/
                                                      Teller
                                                     .find({_id:teller})
                                                     .exec(function(err , tellerdetails) {
                                                         if(err){
                                                              return res.json({error : true , reason: err});
                                                         } else{
                                                             var limit = parseInt(tellerdetails[0].currentbalance);
                                                             var payment = parseInt(amount);
                                                              var currentlimit = limit -amount;
                                                              Teller
                                                              .findByIdAndUpdate({_id:teller},{$set:{currentbalance:currentlimit}},{new: true},function(err, doc){
                                                                if(err){
                                                                    return res.json({error : true, reason : err});
                                                                }
                                                                console.log('update',doc)

                                                              });
                                                           }

                                                         });

                                                      /*uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu*/
                                                      /*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/
                                                      // var htmlMsg = `Dear Customer, Your transaction deatils are- Transaction Number: ${transactionNo}`;
                                                      //   htmlMsg += `  amount to be paid: ${total}`;
                                                      //   htmlMsg += `  recieving amount: ${amount}`;
                                                      //   htmlMsg += `   Status: Pending`;
                                                        res.mailer.send('passvisior', {
                                                           to: remitmail,
                                                           subject: 'Your Transaction Deatils',
                                                           text:htmlMsg
                                                         }, function (err, success) {
                                                           if (err) {
                                                               res.send({message: 'There was an error sending the remitteremail'});
                                                             }else{
                                                               res.mailer.send('passvisior', {
                                                                       to: bmail,
                                                                       subject: 'Your Transaction Deatils',
                                                                       text:htmlMsg
                                                                     }, function (err, success1){
                                                                       if (err) {
                                                                       res.send({message: 'There was an error sending the beneficiaryemail'});
                                                                     }else{
                                                                         var sms = new BulkSMS('bramsdiouf','Saliou11diouf@');
                                                                         sms.send(remitmobile,htmlMsg,(err,result)=>{
                                                                           if(err){
                                                                                return res.json({error : true , reason: err});
                                                                           } else{
                                                                             var sms1 = new BulkSMS('bramsdiouf','Saliou11diouf@');
                                                                             sms1.send(bmobile,htmlMsg,(err,result1)=>{
                                                                               if(err){
                                                                                    return res.json({error : true , reason: err});
                                                                               } else{
                                                                                 return res.json({ message:'Transaction done', result : a});
                                                                               }
                                                                             });

                                                                           }
                                                                         });//msg

                                                                     }//ben else

                                                                   })//bmail
                                                             }//rem else
                                                         })//remitermail
                                                         /****************************/

                                                      }//else
                                                  });//save transaction


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
                      .findOne({'branchID':branch})
                      .exec(function(err, branchData){
                        if(err){
                             return res.json({error : true, reason : err});
                        }
                        // console.log(branchData.paymentLimit);
                        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
                       var firstDay = new Date(y, m, 1);
                       var now = moment().format();
                      Transaction
                      .find({$and: [{"transactionDate":{ $gte: firstDay, $lte: now }},{"branchID":branch},{"tellerID":teller}]})
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
                                                          "branchID":branch
                                                        };
                                                        var remitter = new Remitter(remitterData);
                                                        console.log(remitterData)

                                                        remitter.save();
                                                        var amtt = parseInt(amount);
                                                        var bt = parseInt(bamount);
                                                        var  btotal = bt+amtt;
                                                          /*yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy*/
                                                      Teller
                                                     .find({_id:teller})
                                                     .exec(function(err , tellerdetails) {
                                                         if(err){
                                                              return res.json({error : true , reason: err});
                                                         } else{
                                                             var limit = parseInt(tellerdetails[0].currentbalance);
                                                             var payment = parseInt(amount);
                                                              var currentlimit = limit -amount;
                                                              Teller
                                                              .findByIdAndUpdate({_id:teller},{$set:{currentbalance:currentlimit}},{new: true},function(err, doc){
                                                                if(err){
                                                                    return res.json({error : true, reason : err});
                                                                }
                                                                console.log('update',doc)

                                                              });
                                                           }

                                                         });

                                                      /*uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu*/

                                                        Beneficiary.findOneAndUpdate({beneficiaryemail:bmail}, {$set:{amount:btotal}},{new: true},function(err, doc){
                                                            if(err){
                                                                return res.json({error : true, reason : err});
                                                            }
                                                            // var htmlMsg = `Dear Customer, Your transaction deatils are- Transaction Number: ${transactionNo}`;
                                                            //   htmlMsg += `  amount to be paid: ${total}`;
                                                            //   htmlMsg += `  recieving amount: ${amount}`;
                                                            //   htmlMsg += `   Status: Pending`;
                                                              res.mailer.send('passvisior', {
                                                                 to: remitmail,
                                                                 subject: 'Your Transaction Deatils',
                                                                 text:htmlMsg
                                                               }, function (err, success) {
                                                                 if (err) {
                                                                     res.send({message: 'There was an error sending the remitteremail1'});
                                                                   }else{
                                                                     res.mailer.send('passvisior', {
                                                                             to: bmail,
                                                                             subject: 'Your Transaction Deatils',
                                                                             text:htmlMsg
                                                                           }, function (err, success1){
                                                                             if (err) {
                                                                             res.send({message: 'There was an error sending the beneficiaryemail1'});
                                                                           }else{
                                                                               var sms = new BulkSMS('bramsdiouf','Saliou11diouf@');
                                                                               sms.send(remitmobile,htmlMsg,(err,result)=>{
                                                                                 if(err){
                                                                                      return res.json({error : true , reason: err});
                                                                                 } else{
                                                                                   var sms1 = new BulkSMS('bramsdiouf','Saliou11diouf@');
                                                                                   sms1.send(bmobile,htmlMsg,(err,result1)=>{
                                                                                     if(err){
                                                                                          return res.json({error : true , reason: err});
                                                                                     } else{
                                                                                       return res.json({ message:'Transaction done', result : a});
                                                                                     }
                                                                                   });

                                                                                 }
                                                                               });//msg

                                                                           }//ben else

                                                                         })//bmail
                                                                   }//rem else
                                                               })//remitermail
                                                        });//findOneAndUpdate

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
                .findOne({'beneficiaryname':bname , 'beneficiarysurName':bsurName})
                .exec(function(err, beneficiary){
                    if(beneficiary == null) {
                      Branch
                      .findOne({'branchID':branch})
                      .exec(function(err, branchData){
                        if(err){
                             return res.json({error : true, reason : err});
                        }
                        // console.log(branchData.paymentLimit);
                        var date = new Date(), y = date.getFullYear(), m = date.getMonth();
                       var firstDay = new Date(y, m, 1);
                       var now = moment().format();
                      Transaction
                      .find({$and: [{"transactionDate":{ $gte: firstDay, $lte: now }},{"branchID":branch},{"tellerID":teller}]})
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
                                                        var beneficiaryData ={
                                                          "beneficiaryname":bname,
                                                          "beneficiarysurName":bsurName,
                                                          "beneficiaryemail":bmail,
                                                          "beneficiaryaddress":baddress,
                                                          "beneficiarymobile":bmobile,
                                                          "beneficiaryidType":bidType,
                                                          "beneficiaryidNo":bidNo,
                                                          "bissueCountry":bissueCountry,
                                                          "bissueDate":bissueDate,
                                                          "bexpDate":bexpDate,
                                                          "amount":amount,
                                                          "country":country,
                                                          "branchID":branch
                                                        };

                                                        var beneficiary = new Beneficiary(beneficiaryData);
                                                        beneficiary.save();
                                                        // /***********/
                                                        var amtt = parseInt(amount);
                                                        var ramount = remitter.amount;
                                                        var  btotal = ramount+amtt;
                                                          /*yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy*/
                                                      Teller
                                                     .find({_id:teller})
                                                     .exec(function(err , tellerdetails) {
                                                         if(err){
                                                              return res.json({error : true , reason: err});
                                                         } else{
                                                             var limit = parseInt(tellerdetails[0].currentbalance);
                                                             var payment = parseInt(amount);
                                                              var currentlimit = limit -amount;
                                                              Teller
                                                              .findByIdAndUpdate({_id:teller},{$set:{currentbalance:currentlimit}},{new: true},function(err, doc){
                                                                if(err){
                                                                    return res.json({error : true, reason : err});
                                                                }
                                                                console.log('update',doc)

                                                              });
                                                           }

                                                         });

                                                      /*uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu*/
                                                        Remitter.findOneAndUpdate({remitteremail:remitmail}, {$set:{amount:btotal}},{new: true},function(err, doc){
                                                            if(err){
                                                                return res.json({error : true, reason : err});
                                                            }
                                                            /*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/
                                                    // var htmlMsg = `Dear Customer, Your transaction deatils are- Transaction Number: ${transactionNo}`;
                                                    //   htmlMsg += `  amount to be paid: ${total}`;
                                                    //   htmlMsg += `  recieving amount: ${amount}`;
                                                    //   htmlMsg += `   Status: Pending`;
                                                      res.mailer.send('passvisior', {
                                                         to: remitmail,
                                                         subject: 'Your Transaction Deatils',
                                                         text:htmlMsg
                                                       }, function (err, success) {
                                                         if (err) {
                                                             res.send({message: 'There was an error sending the remitteremail12'});
                                                           }else{
                                                             res.mailer.send('passvisior', {
                                                                     to: bmail,
                                                                     subject: 'Your Transaction Deatils',
                                                                     text:htmlMsg
                                                                   }, function (err, success1){
                                                                     if (err) {
                                                                     res.send({message: 'There was an error sending the beneficiaryemail12'});
                                                                   }else{
                                                                       var sms = new BulkSMS('bramsdiouf','Saliou11diouf@');
                                                                       sms.send(remitmobile,htmlMsg,(err,result)=>{
                                                                         if(err){
                                                                              return res.json({error : true , reason: err});
                                                                         } else{
                                                                           var sms1 = new BulkSMS('bramsdiouf','Saliou11diouf@');
                                                                           sms1.send(bmobile,htmlMsg,(err,result1)=>{
                                                                             if(err){
                                                                                  return res.json({error : true , reason: err});
                                                                             } else{
                                                                               return res.json({ message:'Transaction done', result : a});
                                                                             }
                                                                           });

                                                                         }
                                                                       });//msg

                                                                   }//ben else

                                                                 })//bmail
                                                           }//rem else
                                                       })//remitermail
                                                       /****************************/
                                                        }); //remiter find
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
                        .findOne({'branchID':branch})
                        .exec(function(err, branchData){
                          if(err){
                               return res.json({error : true, reason : err});
                          }
                          // console.log(branchData.paymentLimit);
                          var date = new Date(), y = date.getFullYear(), m = date.getMonth();
                         var firstDay = new Date(y, m, 1);
                         var now = moment().format();
                        Transaction
                        .find({$and: [{"transactionDate":{ $gte: firstDay, $lte: now }},{"branchID":branch},{"tellerID":teller}]})
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
                                                      /*yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy*/
                                                      Teller
                                                     .find({_id:teller})
                                                     .exec(function(err , tellerdetails) {
                                                         if(err){
                                                              return res.json({error : true , reason: err});
                                                         } else{
                                                             var limit = parseInt(tellerdetails[0].currentbalance);
                                                             var payment = parseInt(amount);
                                                              var currentlimit = limit -amount;
                                                              Teller
                                                              .findByIdAndUpdate({_id:teller},{$set:{currentbalance:currentlimit}},{new: true},function(err, doc){
                                                                if(err){
                                                                    return res.json({error : true, reason : err});
                                                                }
                                                                console.log('update',doc)

                                                              });
                                                           }

                                                         });

                                                      /*uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu*/
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
                                                                    /*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/
                                                    // var htmlMsg = `Dear Customer, Your transaction deatils are- Transaction Number: ${transactionNo}`;
                                                    //   htmlMsg += `  amount to be paid: ${total}`;
                                                    //   htmlMsg += `  recieving amount: ${amount}`;
                                                    //   htmlMsg += `   Status: Pending`;
                                                      res.mailer.send('passvisior', {
                                                         to: remitmail,
                                                         subject: 'Your Transaction Deatils',
                                                         text:htmlMsg
                                                       }, function (err, success) {
                                                         if (err) {
                                                             res.send({message: 'There was an error sending the remitteremail22'});
                                                           }else{
                                                             res.mailer.send('passvisior', {
                                                                     to: bmail,
                                                                     subject: 'Your Transaction Deatils',
                                                                     text:htmlMsg
                                                                   }, function (err, success1){
                                                                     if (err) {
                                                                     res.send({message: 'There was an error sending the beneficiaryemail22'});
                                                                   }else{
                                                                       var sms = new BulkSMS('bramsdiouf','Saliou11diouf@');
                                                                       sms.send(remitmobile,htmlMsg,(err,result)=>{
                                                                         if(err){
                                                                              return res.json({error : true , reason: err});
                                                                         } else{
                                                                           var sms1 = new BulkSMS('bramsdiouf','Saliou11diouf@');
                                                                           sms1.send(bmobile,htmlMsg,(err,result1)=>{
                                                                             if(err){
                                                                                  return res.json({error : true , reason: err});
                                                                             } else{
                                                                               return res.json({ message:'Transaction done', result : a});
                                                                             }
                                                                           });

                                                                         }
                                                                       });//msg

                                                                   }//ben else

                                                                 })//bmail
                                                           }//rem else
                                                       })//remitermail
                                                       /****************************/
                                                                });//benef

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
      // console.log(req.body);
      var status = req.body.status;
      var bidType =req.body.beneficiaryidType;
      var bidNo =req.body.beneficiaryidNo;
      var bissueCountry =req.body.bissueCountry;
      var bissueDate =req.body.bissueDate;
      var bexpDate = req.body.bexpDate;
      if (moment(bissueDate, 'YYYY-MM-DD').isValid()){
        bissueDate = moment(bissueDate, 'YYYY-MM-DD').toDate();
      }else{
        bissueDate = undefined;
      }
      if (moment(bexpDate, 'YYYY-MM-DD').isValid()){
        bexpDate = moment(bexpDate, 'YYYY-MM-DD').toDate();
      }else{
        bexpDate = undefined;
      }

      Transaction.findOneAndUpdate({_id: req.params.id}, { "$set": { "status": status, "beneficiaryidType": bidType, "beneficiaryidNo": bidNo, "bissueCountry": bissueCountry,"bissueDate":bissueDate,"bexpDate":bexpDate}}, { new: true }).exec(function(err, book){
   if(err) {
       return res.json({error : true , reason: err});
   } else {
     console.log(book)
          Beneficiary.findOneAndUpdate({beneficiaryemail: book.beneficiaryemail}, { "$set": {  "beneficiaryidType": bidType, "beneficiaryidNo": bidNo, "bissueCountry": bissueCountry,"bissueDate":bissueDate,"bexpDate":bexpDate}}, { new: true }).exec(function(err, result){
            var rmail = book.remitteremail;
            var benmail = book.beneficiaryemail;
            var rmobile = book.remittermobile;
            var bmobile = book.beneficiarymobile;
            var htmlMsg = `Dear Customer,Your refernce transaction number: ${book.transactionNumber} and amount: ${book.currency} ${book.amount} has been successfully: ${book.status} `;
            console.log(htmlMsg)

            res.mailer.send('passvisior', {
                    to: rmail,
                    subject: 'Your Transaction Number and Status',
                    text:htmlMsg
                  }, function (err, success) {
                    if (err) {
                      res.send({result: 'There was an error sending the remitteremail'});
                    }else{
                      res.mailer.send('passvisior', {
                              to: benmail,
                              subject: 'Your Transaction Number and Status',
                              text:htmlMsg
                            }, function (err, success){
                              if (err) {
                                res.send({result: 'There was an error sending the beneficiaryemail'});
                              }else{
                                var sms = new BulkSMS('bramsdiouf','Saliou11diouf@');
                                sms.send(rmobile,htmlMsg,(err,result)=>{
                                  if(err){
                                       return res.json({error : true , reason: err});
                                  } else{
                                    var sms1 = new BulkSMS('bramsdiouf','Saliou11diouf@');
                                    sms1.send(bmobile,htmlMsg,(err,result)=>{
                                      if(err){
                                           return res.json({error : true , reason: err});
                                      } else{
                                        var myJSON = JSON.stringify(book);
                                        var a = b64url.encode(myJSON);
                                        console.log('res',book)
                                        res.json({Status:'Paid',result:a,result1:book})
                                      }
                                    });

                                  }
                                });

                              }
                            });
                    }

            });
          });//bene
   }//else
});


    },
    paidTransaction: function(req,res){
     // console.log('treq',req.body)
      var transno = b64url.decode(req.body.transactionNumber);
      var amount = b64url.decode(req.body.amount);
      var name = b64url.decode(req.body.beneficiaryname);
      var sname = b64url.decode(req.body.beneficiarysurName);
      // var country = b64url.decode(req.body.country);


       Transaction
       .findOne({'transactionNumber':transno,'amount':amount,'beneficiaryname':name,
        'beneficiarysurName':sname})
       .populate('tellerID')
       .exec()
       .then(function (allFee){
        console.log(allFee)
        if(allFee){
           var myJSON = JSON.stringify(allFee);
          var a = b64url.encode(myJSON);
          console.log(allFee)
         return res.json({ error : false ,result: a,result1:allFee,message:'Found'});
        } else{
          return res.json({ message:'This transaction does not exist'});
        }

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })
     },
     find: function(req,res){
      Transaction
      .find()
      .populate('tellerID')
      .exec(function(err , result) {
          if(err){
               return res.json({error : true , reason: err});
          } else{
                  var myJSON = JSON.stringify(result);
                  var a = b64url.encode(myJSON);
               return res.json({error : false , result: a,result1:result});
          }

       });
     },
      mytransaction: function(req,res){
       var id = b64url.decode(req.body.tellerID);
        var dat = moment(Date.now()).format('YYYY-MM-DD');
        // console.log(dat)
       var date = new Date();
       var tomorrow = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
      var nextday =  moment(tomorrow, 'YYYY-MM-DD').format();

       Transaction
      // .find({'tellerID':id,'transactionDate':transactiondate})
      .find({'tellerID':id,'transactionDate':{ $gte: dat , $lte: nextday }})
       .populate('tellerID')
       .exec()
       .then(function (allFee){
         if(allFee.length>0){
           var myJSON = JSON.stringify(allFee);
          var a = b64url.encode(myJSON);
            return res.json({
              error : false ,
              result: a
             });
         } else {
           return res.json({message:"Transaction Not  Found "});
         }


       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })
     },

  getOne: function(req,res){
     Transaction
      .findOne({_id : req.params.id})
      .populate('tellerID')
     .exec(function(err , result){
         if(err){
              return res.json({error : true , reason: err});
         } else{
              //console.log("ok");
              return res.json({error : false , result: result});
         }

     });
   },
   getbybranch: function(req,res){
      Transaction
       .find({branchID : req.params.id})
       .populate('tellerID')
      .exec(function(err , result){
          if(err){
               return res.json({error : true , reason: err});
          } else{
               //console.log("ok");
               return res.json({error : false , result: result});
          }

      });
    },
     kyctransaction: function(req,res){

       var remitname = req.body.remittername;
       var remitsurname =req.body.remittersurName;

       Transaction
       .find({'remittername':remitname,'remittersurName':remitsurname})
       .populate('tellerID')
       .exec()
       .then(function (allFee){;
         return res.json({
           error : false ,
           result: allFee,
           message: 'Transaction record found'
          });

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })

     },
     remitterTransaction: function(req,res){
       var id = b64url.decode(req.body.tellerID);
       console.log(id);
       Transaction
       .find({'tellerID':id})
       .populate('tellerID')
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
       .populate('tellerID')
       .exec()
       .then(function (allFee){
        if(allFee.length>0){
         var myJSON = JSON.stringify(allFee);
       var a = b64url.encode(myJSON);
         return res.json({
           error : false ,
           result: a,
           result1:allFee,
           message:'Transaction found'
          });

        } else {
          return res.json({message:'This Transaction does not exist'});
        }

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })
     },
     searchreimburseTransactionNumber: function(req,res){
       var transno = req.body.transactionNumber;
       console.log(transno);
       Transaction
       .find({'transactionNumber':transno})
       .populate('tellerID')
       .exec()
       .then(function (allFee){
        if(allFee.length>0){
         return res.json({
           error : false ,
           result:allFee,
           message:'Transaction found'
          });

        } else {
          return res.json({message:'This Transaction does not exist'});
        }

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })
     },
     getreimbursetransaction: function (req,res){
      var status = req.body.status;
      Transaction
       .find({'status':status})
       .populate('tellerID')
       .exec()
       .then(function (allFee){
        if(allFee.length>0){
         return res.json({
           error : false ,
           result:allFee,
           message:'Transaction found'
          });

        } else {
          return res.json({message:'This Transaction does not exist'});
        }

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })

     },
  getreimbursetransactionbybranch: function (req,res){
      var status = req.body.status;
      Transaction
       .find({'status':status,'branchID':req.params.id})
       .populate('tellerID')
       .exec()
       .then(function (allFee){
        if(allFee.length>0){
         return res.json({
           error : false ,
           result:allFee,
           message:'Transaction found'
          });

        } else {
          return res.json({message:'This Transaction does not exist'});
        }

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })

     },
     searchTransactionNumberDate: function(req,res){
       var transno = req.body.transactionNumber;
       var amount =req.body.amount;
       var a = req.body.transactionDate;
       var start_date = moment(a, 'YYYY-MM-DD').format();
       console.log(start_date);
       console.log(transno);
       Transaction
       .findOne({'transactionNumber':transno,'transactionDate':start_date,'amount':amount})
       .populate('tellerID')
       .exec()
       .then(function (allFee){
           if(allFee){
        return res.json({
          error : false ,
          result: allFee,
          message: 'Transaction found'
         });
      } else {
      return res.json({message:'Transaction Not Found'});
      }

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })
     },
        searchinvoice: function(req,res){
       var transno = req.body.transactionNumber;
       var amount =req.body.amount;

       console.log(transno,amount);
       Transaction
       .findOne({'transactionNumber':transno,'amount':amount})
       .populate('tellerID')
       .exec()
       .then(function (allFee){
         if(allFee){
           return res.json({
             error : false ,
             result: allFee,
             message:'Transaction Found'
            });
         } else {
           return res.json({
             error : false ,
             message:'Transaction Not Found'
            });
         }


       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })
     },
     // searchinvoice: function(req,res){
     //   var transno = req.body.transactionNumber;
     //   var amount =req.body.amount;
     //   var a = req.body.transactionDate;
     //   var start_date = moment(a, 'YYYY-MM-DD').format();
     //   console.log(start_date);
     //   console.log(transno);
     //   Transaction
     //   .find({'transactionNumber':transno,'amount':amount})

     //   .populate('tellerID','tellerID')
     //   .exec()
     //   .then(function (allFee){
     //   //  var myJSON = JSON.stringify(allFee);
     //   // var a = b64url.encode(myJSON);
     //     return res.json({
     //       error : false ,
     //       result: allFee,
     //       message:'Transaction Found'
     //      });

     //   })
     //   .catch(function (err) {
     //     console.log(err);
     //     return res.json({error : true , reason: err});
     //   })
     // },
     dateRange: function(req,res){
       var a = req.body.startDate;
       var b = req.body.endDate;
       var start_date = moment(a, 'YYYY-MM-DD').format();
       console.log(start_date);
       var end_date = moment(b, 'YYYY-MM-DD').format();
       console.log(end_date);
       Transaction
       .find({"transactionDate":{ $gte: start_date , $lte: end_date }})
       .populate('tellerID')
       .exec()
       .then(function (allFee){
        console.log(allFee.length)
        if(allFee.length>0){
           var myJSON = JSON.stringify(allFee);
       var a = b64url.encode(myJSON);
         return res.json({
           error : false ,
           result: a,
           result1:allFee,
           message:'Transaction found'
          });
       } else{
        return res.json({message:'Transaction does not exist in this dateRange'});
       }


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
         query["tellerID"] = req.query.tid;                               /*FIND BY status*/
         console.log(query);
       }
       if(req.query.country != undefined){
         query["country"] = req.query.country;                               /*FIND BY status*/
         console.log(query);
       }
       //  console.log(query);
       Transaction
       .find(query)
       .populate('tellerID')
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
          searchTransaction: function(req,res){
       var a = req.body.startDate;
       var b = req.body.endDate;
       var start_date = moment(a, 'YYYY-MM-DD').format();
      //  console.log(start_date);
       var end_date = moment(b, 'YYYY-MM-DD').format();
      //  console.log(end_date);
      var min = req.body.minAmount;
      var max = req.body.maxAmount;

       var query = { };

       if(req.body.startDate != undefined && req.body.endDate != undefined ){
         query["transactionDate"] = { $gte: start_date, $lte: end_date };              /*FIND BY DATE RANGE*/

       }
       if(req.body.minAmount != undefined && req.body.maxAmount != undefined ){
         query["amount"] = { $gte: min, $lte: max };                               /*FIND BY Amount RANGE*/

       }
       if(req.body.tellerID != undefined){                                          /*FIND BY tellerID*/
         Teller
         .findOne({tellerID:req.body.tellerID})
         .exec(function(err , result) {
             if(err){
                  return res.json({error : true , reason: err});
             } else{
                  console.log('id',result._id)
                  query["tellerID"] = result._id;
             }
          });
       }
       if(req.body.country != undefined){
         query["country"] = req.body.country;                               /*FIND BY country*/

       }
       if(req.body.branchID != undefined){
         query["branchID"] = req.body.branchID;                               /*FIND BY branchID*/

       }
       if(req.body.status != undefined){
         query["status"] = req.body.status;                               /*FIND BY status*/

       }
       if(req.body.mobile != undefined && req.body.userType == 'remitter'){
         query["remittermobile"] = req.body.mobile;                               /*FIND BY remiter mobileno*/

       }
       if(req.body.mobile != undefined && req.body.userType == 'beneficiary'){
         query["beneficiarymobile"] = req.body.mobile;                               /*FIND BY beneficiary mobileno*/

       }
       if(req.body.email != undefined && req.body.userType == 'remitter'){
         query["remitteremail"] = req.body.email;                               /*FIND BY remiter email*/

       }
       if(req.body.email != undefined && req.body.userType == 'beneficiary'){
         query["beneficiaryemail"] = req.body.email;                               /*FIND BY beneficiary email*/

       }
       if(req.body.name != undefined && req.body.userType == 'remitter'){          /*FIND BY remiter name*/
         var fullname = req.body.name.split(' ');
         var first = fullname[0];
         query["remittername"] = {$regex:first}
         if(fullname[1]){
           var last = fullname[1];
           query["remittersurName"] = {$regex:last};
         }
         console.log(query)
       }
       if(req.body.name != undefined && req.body.userType == 'beneficiary'){          /*FIND BY beneficiary name*/
         var fullname = req.body.name.split(' ');
         var first = fullname[0];
        query["beneficiaryname"]= {$regex:first};
         if(fullname[1]){
          var last = fullname[1];
          query["beneficiarysurName"]= {$regex:last} ;
         }


         console.log(query)
       }

       Transaction
       .find(query)
       .populate('tellerID')
       .exec()
       .then(function (allFee){
        var myJSON = JSON.stringify(allFee);
       var a = b64url.encode(myJSON);
         return res.json({
           error : false ,
           result: allFee
          });

       })
       .catch(function (err) {
         console.log(err);
         return res.json({error : true , reason: err});
       })

     },

   }
