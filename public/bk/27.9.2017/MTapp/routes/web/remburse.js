var Transaction = require('../../models/transaction');
var Teller = require('../../models/teller');
var moment = require('moment');
var  mailer = require('express-mailer');
var b64url = require('b64url');
var BulkSMS = require('bulksms');


module.exports = {
  rembusRequest: function(req,res){
    var status = req.body.status;
    var transactionNo = req.body.transactionNumber;
    Transaction.findOneAndUpdate({transactionNumber:transactionNo}, { "$set": { "status": status}  }, { new: true }).exec(function(err, result){
     if(err) {
       return res.json({error : true , reason: err});
     }
     // console.log(result)
     var mail = result.remitteremail;
     var mobile = result.remittermobile;
     var id = result.tellerID;
     Teller
     .findOne({_id:id})
     .populate('_superVisior')
     .exec(function(err,teller){
       if(err) {
         return res.json({error : true , reason: err});
       }

       var supervisiormail = teller._superVisior.email
       console.log(teller.name.full);
       var htmlMsg = `Teller: ${teller.name}`;
               htmlMsg += ` send a reimbursement approved request for transactionNumber: ${transactionNo}`;
               res.mailer.send('passvisior', {
                      to: supervisiormail,
                      subject: 'Reimbursement request',
                      text:htmlMsg
                    }, function (err, success) {
                      if (err) {
                      res.send({result: 'There was an error sending the supervisiormail'});
                    }else{
                      var msg = `You can reimburse your payment  within 24-48hrs and also check status`;
                      res.mailer.send('passvisior', {
                             to: mail,
                             subject: 'MTS',
                             text:msg
                           }, function (err, success) {
                             if (err) {
                               res.send({result: 'There was an error sending the remitteremail'});
                             }else{
                               var sms = new BulkSMS('bramsdiouf','Saliou11diouf@');
                               sms.send(mobile,msg,(err,result1)=>{
                                 if(err){
                                       return res.json({error : true , reason: err});
                                  } else {
                                     res.json({msg:result,message:"Reimbursement request send"})
                                  }

                               })//msg
                             }

                           })//mail
                    }//else
                    }) //supmail
      })//teller

   })//transaction find

 },//fun
 requestApproved: function(req,res){
   var status = req.body.status;
   var transactionNo = req.body.transactionNumber;
   Transaction.findOneAndUpdate({transactionNumber:transactionNo}, { "$set": { "status": status}  }, { new: true }).exec(function(err, result){
    if(err) {
      return res.json({error : true , reason: err});
    }
    var mail = result.remitteremail;
    var mobile = result.remittermobile;
    var msg = `Your reimbursement transactionNumber: ${transactionNo} is approved.Please collect your money from your nearest MTS office`;
    res.mailer.send('passvisior', {
           to: mail,
           subject: 'MTS',
           text:msg
         }, function (err, success) {
           if (err) {
             res.send({message: 'There was an error sending the remitteremail'});
           }else{
             var sms = new BulkSMS('bramsdiouf','Saliou11diouf@');
             sms.send(mobile,msg,(err,result1)=>{
               if(err){
                     return res.json({error : true , reason: err});
                } else {
                   res.json({message:'Reimbursement approved successfully',result:result})
                }

             })//msg
           }

         })//mail
  })//find

},//fun
reimbursementDone: function(req,res){
  var status = req.body.status;
  var transactionNo = req.body.transactionNumber;
  Transaction.findOneAndUpdate({transactionNumber:transactionNo}, { "$set": { "status": status}  }, { new: true }).exec(function(err, result){
    if(err){
          return res.json({error : true , reason: err});
     }
     return res.json({error : false ,message:'Reimbursement done successfully', result: result});
  })
},
}

/*var msg = `Your transaction cancel request has been approved.Please collect your cash from your nearest MTS office`;
res.mailer.send('passvisior', {
       to: mail,
       subject: 'Rembursement status',
       text:msg
     }, function (err, success) {
       if (err) {
         res.send({result: 'There was an error sending the remitteremail'});
       }else{
         var sms = new BulkSMS('bramsdiouf','Saliou11diouf@');
         sms.send(mobile,msg,(err,result)=>{
           if(err){
                 return res.json({error : true , reason: err});
            } else {
               res.json({msg:result})
            }

         })//msg
       }

     })//mail*/
