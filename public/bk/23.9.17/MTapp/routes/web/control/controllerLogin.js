var Controller = require('../../../models/controller');
var jwt = require('jsonwebtoken');
var checkJwt = require('express-jwt');
var config  =  require('../../../config')[process.env.NODE_ENV || 'development'];
var b64url = require('b64url');
var macAdd = require('getmac');

module.exports = {

login: function (req,res){
  var mail = b64url.decode(req.body.email);
  var pass = b64url.decode(req.body.password);
 var id = b64url.decode(req.body.controllerID);
 var mac =req.body.macAddress;

 if(!mail || !pass || !id ){
     return res.json({ error: true,message: 'Invalid Details' })
  } else {
      macAdd.getMac(function(err,macAddress1){
        if (err)  throw err
        var mymac = macAddress1;
        console.log(mymac);
         Controller
         .findOne({'email': mail,  'controllerID':id})
         // .populate("_branchID")
         .exec(function(err, user){
           if(err){
            return res.json({error : true, reason : err})
           }
          if (user === null || user == undefined) {
            return res.json({error:true, message:"Controller does not exist"});
          }else {
            user
            .comparePassword(pass, function(err, isMatch){
              if(err){
               return res.json({error : true, reason : err})
             }else {
                 
                  if (isMatch && !err){
                    var payload = {
                      id: user._id,
                      email: mail,
                       name: user.name,
                      phone: user.phone,
                      controllerID:user.controllerID,
                      branchID:user.branchID,
                     isActive: user.isActive,
                    }
                    // console.log('*********pay',payload);
                    var token = jwt.sign(payload, config.secret, {
                      expiresIn: 3600*24*30
                    });
                   if (user.controlmac === null || user.controlmac == undefined || user.controlmac == '' || user.controlmac == 'nocontrolmac') {
                    Controller.findOneAndUpdate({'email': mail}, {$set:{controlmac:mymac}}, {new: true}, function(err, doc){
                      if(err){
                        return res.json({error : true, reason : err})
                      }
                      return res.json({error : false, message : "Controller Login OK!",token : token});
                    })//update
                   }else if (user.controlmac == mymac) {
                      return res.json({error : false, message : "Controller1 Login OK!",token : token});
                    } else {
                      return res.json({error : true, message : "This System is not registerd"});
                    }
                } else {
                        return res.json({error:true,message:"Wrong Password" });
                }
             }
            })
          }//else user
         });//find
      });//mac
  } //else

}//login


}
