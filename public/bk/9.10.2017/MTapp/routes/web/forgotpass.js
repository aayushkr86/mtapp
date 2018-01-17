var Teller = require('../../models/teller');
var superv = require('../../models/supervisor');
var  mailer = require('express-mailer');
var b64url = require('b64url');
var BulkSMS = require('bulksms');



// var bcrypt = require('bcrypt-nodejs');
// var Cryptr = require('cryptr'),
//     cryptr = new Cryptr('myTotalySecretKey');

module.exports = {
  find: function(req,res){
    // var data = b64url.decode(req.body.email);
    // var mobile = b64url.decode(req.body.phone);
    var data = req.body.email;
    var mobile = req.body.phone;

    Teller
  //  .findOne({email:data || phone:mobile})
   .findOne({$or:[ {'email': data}, {'phone': mobile}]})
   .exec(function(err , result) {
     if(err){
          return res.json({error : true , reason: err});
     } else {
              // console.log(result)
           var pass = result.actual;
           if(result.phone == mobile){
             var name =result.name
             
              var sms = new BulkSMS('bramsdiouf','Saliou11diouf@');
              sms.send(mobile,pass,(err,smsresult)=>{
                if(err){
                     return res.json({error : true , reason: err});
                } else{
                  var teller = result.tellerID;

                  var sup = result._superVisior;
                  console.log(teller,sup);
                  var htmlMsg = `TellerID: ${teller}`;
                    htmlMsg += `  and Name:${name}`;
                   htmlMsg += ` recover his password`;
                  superv
                 .findOne({_id:sup})
                 .exec(function(err , resultsup) {
                   if(err){
                        return res.json({error : true , reason: err});
                   } else {

                      var mail = resultsup.email;
                      res.mailer.send('passvisior', {
                              to: mail,
                              subject: 'Teller recovery password',
                              text:htmlMsg
                            }, function (err, success) {
                              if (err) {
                                res.send({result: 'There was an error sending the email'});
                              }else{
                                     return res.json({error : false , result : 'Your Login Password has been send in Your Phone'});
                              }
                      });
                   }
                 });
                }//else
              });
           }  //if

        if(result.email == data){
          /*email*/
          res.mailer.send('passvisior', {
                  to: data,
                  subject: 'Your Login password',
                  text:pass
                }, function (err, success) {
                  if (err) {
                    res.send({result: 'There was an error sending the email'});
                  }else{
                    var teller = result.tellerID;
                    var sup = result._superVisior;
                    var htmlMsg = `TellerID: ${teller}`;
                      htmlMsg += `  and Name:${result.name}`;
                     htmlMsg += ` recover his password`;
                    superv
                   .findOne({_id:sup})
                   .exec(function(err , results) {
                     if(err){
                          return res.json({error : true , reason: err});
                     } else {

                        var mail = results.email;
                        res.mailer.send('passvisior', {
                                to: mail,
                                subject: 'Teller recovery password',
                                text:htmlMsg
                              }, function (err, success) {
                                if (err) {
                                  res.send({result: 'There was an error sending the email'});
                                }else{
                                       return res.json({error : false , result : 'Your Login Password has been send in Your Email'});
                                }
                        });
                     }
                   });
                  }
          });
        }



       }//else

   });

  },
    changepassword : function(req,res){
    var tellerID = req.params.tellerID;
    var email = req.params.email;
    var old = req.params.oldpassword;
    var newpass = req.body.newPassword;
    var confirmpass = req.body.confirmPassword;
    if(newpass === confirmpass){
      Teller
       .findOne({tellerID : req.params.tellerID,email:req.params.email,actual:req.params.oldpassword })
         .exec()
         .then(function(result){
           if( result.password !== undefined){   //true required
             result.password = confirmpass;
           } else {
             result.password = result.password;
           }
           if( result.actual !== undefined){   //true required
             result.actual = confirmpass;
           } else {
             result.actual = result.actual;
           }
          return result.save();
         }).then(function (savedata) {
           return res.json({error : false , result : savedata,message:'Password change Sucessfully'});
         })
         .catch(function (err) {
           return res.json({error : true , reason: err});
         })

    } else{
      res.json({message:"newpassword and confirm password doesn't match"});
    }

  },
}
