var Teller = require('../../models/teller');
var generator = require('generate-password');
var  mailer = require('express-mailer');
var b64url = require('b64url');
var TellerID = require('../../models/tellerID');

var branch = require('../../models/branch');
var Supplier = require('../../models/supplier');

//var mac = require('getmac');


module.exports = {

  getsupplierbyTeller: function(req,res){
     
   Teller
    .findOne({_id : req.params.id})
   .exec(function(err , result){
       if(err){
            return res.json({error : true , reason: err});
       } else{

            branch
             .findOne({branchID : result.branchID})
            .exec(function(err , result1){
              if(err){
                   return res.json({error : true , reason: err});
              } else{
                      Supplier
                       .find({country : result1.country,isActive: true})
                      .exec(function(err , result2){
                        if(err){
                             return res.json({error : true , reason: err});
                        } else{
                              return res.json({error : false , message : 'Supplier found',result:result2});
                           }
                      });
                 }
            });

       }

   });
  },



  add: function(req, res) {        //get is finction name....we can ram in place of get



    var branchID = b64url.decode(req.body.branchID);
    var mail =b64url.decode(req.body.email);
    var limit = b64url.decode(req.body.paymentLimit);
    var tellerID =b64url.decode(req.body.tellerID);
    var name =req.body.name;
    var phone = b64url.decode(req.body.phone);
    var address = req.body.address;
    var superv = b64url.decode(req.body._superVisior);
    var logintime = req.body.logintime;
    var logouttime = req.body.logouttime;
    if(!branchID || !tellerID || !mail ||!name || !limit ||!phone ||!superv ||!logintime || !logouttime){
      return res.json({error : false , result : 'All fields are required'});
    }
    else{

  Teller
  .find({tellerID:tellerID })
  .exec(function (err, results) {
      if(err){}
    if(results.length){
        return res.json({error : false , result : 'This Teller Already Assign'});
    }else{
            var password = generator.generate({
            length: 10,
            numbers: true
        });
console.log('pass',password);
// var encryptedString = cryptr.encrypt(password);
// console.log('1',encryptedString);
         var data = {
            "branchID": branchID,
            "tellerID" :tellerID,
            "name":name,
            "email": mail,
            "phone": phone,
            "tellermac" :"mac",
            "address":address,
            "paymentLimit":limit,
            "password":password, //change
            "_superVisior":superv,
            "actual":password,
            "startTime":logintime,
            "endTime":logouttime,
            "currentbalance":limit
            };
         var htmlMsg = `Login password: ${password}`;
           htmlMsg += `  and ID: ${tellerID}`;

var userr = new Teller(data);
res.mailer.send('passvisior', {
        to: mail,
        subject: 'Your Login ID and password',
        text:htmlMsg
      }, function (err, success) {
        if (err) {
          res.send({result: 'There was an error sending the email'});
        }else{
          userr.save(function (err, result){
                   if(err){
                         return res.json({error: true , reason: err});
                       }
                       TellerID
                       .findOneAndUpdate({tellerID:result.tellerID},{$set:{paymentLimit:result.paymentLimit}},{new: true},function(err, doc){
                         if(err){
                               return res.json({error: true , reason: err});
                             }
                       })
                       return res.json({error : false , result : 'Teller Login Password  and ID was send in his/her Email'});
                   });
        }

});

      }
   });
}//else
 },
   getOne: function(req,res){
   Teller
    .findOne({_id : req.params.id})
   .exec(function(err , result){
       if(err){
            return res.json({error : true , reason: err});
       } else{
            //console.log("ok");
            return res.json({error : false , result: result});
       }

   });
 },
 currentbalance: function(req,res){
   Teller
    .findOne({_id : req.params.id})
   .exec(function(err , result){
       if(err){
            return res.json({error : true , reason: err});
       } else{
            //console.log("ok");
            return res.json({error : false , result: result.currentbalance});
       }

   });
 },
 getbysuper: function(req,res){
  Teller
    .find({_superVisior : req.params.id})
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
  Teller
    .find({branchID : req.params.id})
   .exec(function(err , result){
       if(err){
            return res.json({error : true , reason: err});
       } else{
            //console.log("ok");
            return res.json({error : false , result: result});
       }

   });
 },
 update: function(req,res){

   var branchID = req.body.branchID;
    var limit = req.body.paymentLimit;

   var mac = req.body.macAddress;
   var tellerID =req.body.tellerID;
   var mail =req.body.email;
   var name = req.body.name;
   var phone = req.body.phone;
   var address = req.body.address;
   var superv = req.body._superVisior;
   var password = req.body.password;
   var startTime = req.body.startTime;
   var endTime = req.body.endTime;
   console.log(startTime,endTime)

   if(!mail){
     return res.json({error : false , message : 'email can not be empty'});
   } else if (!phone) {
     return res.json({error : false , message : 'phoneNumbber can not be empty'});
   }else if (!startTime) {
     return res.json({error : false , message : 'logintime can not be empty'});
   }else if (!endTime) {
     return res.json({error : false , message : 'logouttime can not be empty'});
   }else if (!limit) {
     return res.json({error : false , message : 'paymentLimit can not be empty'});
   }
   else{

  Teller
   .findOne({_id: req.params.id})
    .exec()
    .then(function(result){

      delete branchID;
      delete tellerID;
      delete mac;
      delete superv;

      if( result.name !== undefined){   //true required
        result.name = req.body.name;
      } else {
        result.name = result.name;
      }

      if( result.email !== undefined){   //true required
        result.email = mail;
      } else {
        result.email = result.email
      }
      if( result.phone !== undefined){   //true required
        result.phone = phone;
      } else {
        result.phone = result.phone
      }
      if( result.address !== undefined){   //true required
        result.address = address;
      } else {
        result.address = address
      }

      if( result.paymentLimit !== undefined){   //true required
        result.paymentLimit = limit;
      } else {
        result.paymentLimit = result.paymentLimit;
      }
     if( result.startTime !== undefined){   //true required
        result.startTime = startTime;
      } else {
        result.startTime = result.startTime;
      }
      if( result.endTime !== undefined){   //true required
        result.endTime = endTime;
      } else {
        result.endTime = result.endTime;
      }
      if( result.currentbalance !== undefined){   //true required
        result.currentbalance = limit;
      } else {
        result.currentbalance = result.currentbalance;
      }

      return result.save();
    })
    .then(function (savedata) {
      // return res.json({error : false , result : savedata, message:'updated'});
        var htmlMsg = `Your current data--->  ID: ${savedata.tellerID}, \n Email:${savedata.email}, \n Name:${savedata.name}
      \n, Address:${savedata.address},\n ContactNo:${savedata.phone},\n BranchID:${savedata.branchID},
      \n macAddress:${savedata.tellermac}, logintime:${savedata.startTime}, logouttime:${savedata.endTime},paymentLimit:${savedata.paymentLimit}` ;
      res.mailer.send('passvisior', {
              to: savedata.email,
              subject: 'Your account has been updated',
              text:htmlMsg
            }, function (err, success) {
              //console.log(err, success);
              if (err) {
                console.log(err)
                res.send({message: 'There was an error sending the email'});
              }else{
                  TellerID
                .findOneAndUpdate({tellerID:savedata.tellerID},{$set:{paymentLimit:savedata.paymentLimit}},{new: true},function(err, doc1){
                  if(err){
                        return res.json({error: true , reason: err});
                      }
                })
                return res.json({error : false , result : savedata,message:'updated'});
              }

      });
    })
    .catch(function (err) {
      return res.json({error : true , reason: err});
    })
}
 },
 get: function(req,res){
   var query = { };
  //  if(req.query.bid != undefined){
  //    query["_branchID"] = req.query.bid;
  //    console.log(query);
  //  }
   if(req.query.tid != undefined){
     query["tellerID"] = req.query.tid;
     console.log(query);
   }
   if(req.query.mac != undefined){
     query["macAddress"] = req.query.mac;
     console.log(query);
   }
   if(req.query.mail != undefined){
     query["email"] = req.query.mail;
     console.log(query);
   }

  Teller
  .find(query)
  // .populate('_branchID')
  // .populate('_tellerID')
  .exec(function(err , result) {
      if(err){
           return res.json({error : true , reason: err});
      } else{
              var myJSON = JSON.stringify(result);
             var tell = b64url.encode(myJSON);
           return res.json({error : false , result: tell, result1:result});
      }

   });
 },
 delete: function(req,res){
    Teller
     .findByIdAndRemove({_id : req.params.id}, function(err,result){
        if(err){
            return res.json({error : true , reason: err});
        } else{
             console.log("delete");
            return res.json({error : false , result: result,message:"Teller deleted successfully"});
        }
     });
  },
  tellerStatusEdit: function(req,res){
   var isActive = req.body.isActive;
     Teller.findByIdAndUpdate({ _id: req.params.id }, { $set: { isActive: isActive } }, function(err, raw) {
       if (err) return res.json({error: true, reason: err, message: 'The status of tellerid request cannot be updated'})
       console.log(raw)
       return res.json({ error: false, message: 'isActive status of tellerid updated' , isActive: isActive });
     })

  },

}
