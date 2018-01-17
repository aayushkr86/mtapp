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
          Beneficiary.findOneAndUpdate({beneficiaryemail: book.beneficiaryemail}, { "$set": {  "beneficiaryidType": bidType, "beneficiaryidNo": bidNo, "bissueCountry": bissueCountry,"bissueDate":bissueDate,"bexpDate":bexpDate}}, { new: true }).exec(function(err, result){
            var rmail = book.remitteremail;
            var benmail = book.beneficiaryemail;
            var rmobile = book.remittermobile;
            var bmobile = book.beneficiarymobile;
            var htmlMsg = `Transaction Number: ${book.transactionNumber}`;
               htmlMsg += `  and amount: ${book.amount}`;
             htmlMsg += `  and Status: ${book.status}`;
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




    
    var transdate =req.body.transactionDate;
    var country = req.body.country;
   // var country = req.body.country;
   var currency = req.body.currency;
    var amount = req.body.amount;

   var fee = req.body.fees;
   var tax = req.body.tax;
   var total =req.body.totalAmount;
   var recieve = req.body.beneficiaryRecieve;
   var remitname = req.body.remittername;
   var remitsurName = req.body.remittersurName;
   var remitmail = req.body.remitteremail;
   var remitaddress =req.body.remitteraddress;
   var remitmobile =req.body.remittermobile;
   var remitidType =req.body.remitteridType;
   var remitidNo =req.body.remitteridNo;
   var issueCountry =req.body.issueCountry;
   var issueDate =req.body.issueDate;
   var expDate = req.body.expDate;

   var mode =  req.body.remittanceMode;

   var bname =  req.body.beneficiaryname;
   var bsurName =  req.body.beneficiarysurName;
   var bmail =  req.body.beneficiaryemail;
   var baddress = req.body.beneficiaryaddress;
   var bmobile = req.body.beneficiarymobile;
   var bidType =req.body.beneficiaryidType;
   var bidNo =req.body.beneficiaryidNo;
   var bissueCountry =req.body.bissueCountry;
   var bissueDate =req.body.bissueDate;
   var bexpDate = req.body.bexpDate;
   var branch = req.body.branchID;
   var teller = req.body.tellerID;