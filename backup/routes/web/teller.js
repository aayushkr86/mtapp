var Teller = require('../../models/teller');
var generator = require('generate-password');
var  mailer = require('express-mailer');
var b64url = require('b64url');

//var mac = require('getmac');


module.exports = {
  add: function(req, res) {        //get is finction name....we can ram in place of get

    

    var branchID = b64url.decode(req.body.branchID);
    var limit = b64url.decode(req.body.paymentLimit);
    var tellerID =b64url.decode(req.body.tellerID);
    var mail =b64url.decode(req.body.email);
    var name =req.body.name;
    var phone = b64url.decode(req.body.phone);
    var address = req.body.address;
    var superv = b64url.decode(req.body._superVisior);
    var logintime = req.body.logintime;
    var logouttime = req.body.logouttime;
      if(!branchID){
       return res.json({error : false , result : 'BranchID can not be empty'});
    }else if(!limit){
      return res.json({error : false , result : 'PaymentLimit can not be empty'});
    }else if(!tellerID){
      return res.json({error : false , result : 'tellerID can not be empty'});
    }else if(!mail){
      return res.json({error : false , result : 'Email can not be empty'});
    }else if(!name){
      return res.json({error : false , result : 'Name can not be empty'});
    }else if(!phone){
      return res.json({error : false , result : 'Phone can not be empty'});
    }else if(!address){
      return res.json({error : false , result : 'Address can not be empty'});
    }else if(!logintime){
      return res.json({error : false , result : 'Logintime can not be empty'});
    }else if(!logouttime){
      return res.json({error : false , result : 'Logouttime can not be empty'});
    }else{

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
   var logintime = req.body.logintime;
   var logouttime = req.body.logouttime;

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
        result.startTime = logintime;
      } else {
        result.startTime = result.startTime;
      }
      if( result.endTime !== undefined){   //true required
        result.endTime = logouttime;
      } else {
        result.endTime = result.endTime;
      }
     
      return result.save();
    })
    .then(function (savedata) {
      return res.json({error : false , result : savedata, message:'updated'});
    })
    .catch(function (err) {
      return res.json({error : true , reason: err});
    })

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
