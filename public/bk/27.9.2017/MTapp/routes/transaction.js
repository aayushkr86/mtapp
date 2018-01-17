    black
    .find({$or:[ {'email': remitmail, 'name':remitname , 'surName':remitsurName}, {'email': bmail, 'name':bname , 'surName':bsurName} ]})
    .exec(function(err, result){
      if(err){
        return res.json({error : true, reason : err});
      }else{
        // console.log(result);
        if(result.length){
           if(result.length == 1){
             if(result[0].status == 'Verified'){
               Branch
               .find({'_id':branch})
               .exec(function(err, branchData){
                 if(err){
                     return res.json({error : true, reason : err});
                 }else {
                     var date = new Date(), y = date.getFullYear(), m = date.getMonth();
                     var firstDay = new Date(y, m, 1);
                     let now = moment().format();
                     Transaction
                      //  .find({"transactionDate":{ $gte: firstDay, $lte: now }})
                     .find({$and: [{"transactionDate":{ $gte: firstDay, $lte: now }},{"_branchID":branch}]})
                     .exec(function(err, transData){
                       console.log('transData',transData);
                       if(err){
                           return res.json({error : true, reason : err});
                       }else {
                         var sum = 0;
                         for(var i =0;i<transData.length;i++){
                           sum = sum+transData.amount;
                         }
                         var total = sum+amount;
                         if(total<branchData[0].paymentLimit){
                           //teller
                           Transaction
                           .find({$and: [{"transactionDate":{ $gte: firstDay, $lte: now }},{"_tellerID":teller}]})
                           .exec(function(err, tellerData){
                             console.log('tellerdata',tellerData);
                             if(err){
                               return res.json({error : true, reason : err});
                             }else {
                               var summ =0;
                               for(var i =0;i<tellerData.length;i++){
                                 summ = summ+tellerData.amount;
                               }
                               var total1 = summ+amount;
                               if(total1<branchData[0].paymentLimit){
                                 console.log(1234);
                               }else {
                                return res.json({message:'Teller paymentLimit overflow'});
                               }
                             }//else
                           });
                         }else{
                           return res.json({message:'Branch paymentLimit overflow'});
                         }
                       }
                   });//transaction find



                 }//else
               }); //branch find
             }else {
               return res.json({message:'Not Verified'});
             }
           } else {
             if(result.length ==2){
               if(result[0].status == 'Verified' && result[1].status == 'Verified'){
                 //code
               }else {
                 if(result[0].status == 'Blacklist'){
                       return res.json({message:'Remitter Not Verified'});
                     }
                 if(result[1].status == 'Blacklist'){
                       return res.json({message:'Beneficiary Not Verified'});
                     }
               }//else
             }//lenth2
           }//lenth 1 else

        }else {
          //first time transaction
          console.log(11111);
        }

      } //else
    });

