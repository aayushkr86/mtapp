    /*xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx*/
                                                      var htmlMsg = `Dear Customer, Your transaction deatils are- Transaction Number: ${transactionNo}`;
                                                        htmlMsg += `  amount to be paid: ${total}`;
                                                        htmlMsg += `  recieving amount: ${amount}`;
                                                        htmlMsg += `   Status: Pending`;
                                                        res.mailer.send('passvisior', {
                                                           to: remitmail,
                                                           subject: 'Your Transaction Deatils',
                                                           text:htmlMsg
                                                         }, function (err, success) {
                                                           if (err) {
                                                               res.send({result: 'There was an error sending the remitteremail'});
                                                             }else{
                                                               res.mailer.send('passvisior', {
                                                                       to: bmail,
                                                                       subject: 'Your Transaction Deatils',
                                                                       text:htmlMsg
                                                                     }, function (err, success1){
                                                                       if (err) {
                                                                       res.send({result: 'There was an error sending the beneficiaryemail'});
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