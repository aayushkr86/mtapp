
var Users = require('../../models/teller');
var branch = require('../../models/branch');
var tellerid = require('../../models/tellerID');

var jwt = require('jsonwebtoken');
var checkJwt = require('express-jwt');
var b64url = require('b64url');
var macAdd = require('getmac');

var config  =  require('../../config')[process.env.NODE_ENV || 'development'];



module.exports = {


  login: function(req,res){

    var mail = b64url.decode(req.body.email);
    var pass = b64url.decode(req.body.password);
    var mac =req.body.macAddress;
     var id = b64url.decode(req.body.tellerID);
      var logtime = req.body.logintime;

     if(!mail || !pass || !id ){
       return res.json({
         error: true,
         message: 'Invalid Details',

       })
    } else {
          macAdd.getMac(function(err,macAddress1){
            if (err)  throw err
            var mymac = macAddress1;
            console.log(mymac);
            Users
              .findOne({'email': mail,  'tellerID':id})
              .exec(function(err, user){
                    if(err){
                      return res.json({error : true, reason : err})
                    }
                    if (user === null || user == undefined) {
                      return res.json({error:true, message:"User does not exist"});
                    } else {
                          user
                          .comparePassword(pass, function(err, isMatch){
                            if (err) {
                                      return res.json({error : true, reason : err});
                                    } else {
                                              if(logtime>= user.startTime && logtime<=user.endTime){
                                                if (isMatch && !err){
                                                  var payload = {
                                                    id: user._id,
                                                    email: mail,
                                                     name: user.name,
                                                    phone: user.phone,
                                                    tellerID:user.tellerID,
                                                    branchID:user.branchID,
                                                    supervisior:user._superVisior,
                                                   isActive: user.isActive,
                                                  }

                                                  console.log('*********pay',payload);
                                                  var token = jwt.sign(payload, config.secret, {
                                                    expiresIn: 3600*24*30
                                                  });
                                               console.log('mac',user.tellermac);
                                                  if (user.tellermac === null || user.tellermac == undefined || user.tellermac == '' || user.tellermac == 'mac') {
                                                    Users.findOneAndUpdate({'email': mail}, {$set:{tellermac:mymac}}, {new: true}, function(err, doc){
                                                      if(err){
                                                        console.log(err);
                                                                return res.json({error:true, message:"macAddress not set"});
                                                              }
                                                           tellerid.findOneAndUpdate({'tellerID': id}, {$set:{telleridmac:mymac}}, {new: true}, function(err, doc){
                                                          if(err){
                                                            console.log(err);
                                                            return res.json({error:true, message:"teller macAddress not set"});
                                                          }
                                                          return res.json({error : false, message : "Teller Login OK!",token : token});
                                                        });
                                                    });
                                                  } else if (user.tellermac == mymac) {
                                                    return res.json({error : false, message : "Teller1 Login OK!",token : token});
                                                  } else {
                                                    return res.json({error : true, message : "This System is not registerd"});
                                                  }

                                              }else {
                                                    return res.json({error:true,message:"Wrong Password" });
                                                    }
                                        } else{
                                           var htmlMsg = `You do not have login permission in this time.`;
                                           htmlMsg += `  Your login time permission between ${user.startTime} and ${user.endTime}` ;
                                           return res.json({message:htmlMsg,message1:"not login time" });
                                        }
                                    } //esle
                          }); //compare
                    }//esle
              }); //findOne
         });//mac
    } //else



  }//login
}
