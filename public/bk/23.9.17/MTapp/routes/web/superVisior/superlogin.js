var Supervisior = require('../../../models/supervisor');
var jwt = require('jsonwebtoken');
var checkJwt = require('express-jwt');
var config  =  require('../../../config')[process.env.NODE_ENV || 'development'];
var b64url = require('b64url');
var macAdd = require('getmac');
var arp = require('arp-a')
  , tbl = { ipaddrs: {}, ifnames : {} }
  ;


module.exports = {

login: function (req,res){
  var mail = b64url.decode(req.body.email);
  var pass = b64url.decode(req.body.password);
  var id = b64url.decode(req.body.supervisiorID);
  // var mac =req.body.macAddress;

 arp.table(function(err, entry) {
  if (!!err) return console.log('arp: ' + err.message);
  if (!entry) return;

  tbl.ipaddrs[entry.ip] = entry.mac;
  var mac = tbl.ipaddrs[entry.ip];
  if(!mail || !pass || !id ){
      return res.json({ error: true,message: 'Invalid Details' })
   } else {
       // macAdd.getMac(function(err,macAddress1){
       //   if (err)  throw err
       //   var mymac = macAddress1;
       //   console.log('mac',mymac);
       // });
       //  var mac = arped.table();



          Supervisior
          .findOne({'email': mail,  'supervisiorID':id})
          .exec(function(err, user){
            console.log(user)
            if(err){
             return res.json({error : true, reason : err})
            }
           if (user === null || user == undefined) {
             return res.json({error:true, message:"Supervisior does not exist"});
           }else {
             user
             .comparePassword(pass, function(err, isMatch){
               if(err){
                return res.json({error : true, reason : err})
              }else {

                   if (isMatch && !err){
                     var payload = {
                       id: user._id,
                        supervisiorID:user.supervisiorID,
                       branchID:user.branchID,
                       email: user.email,
                       name:user.name,
                      isActive: user.isActive,
                     }
                     // console.log('*********pay',payload);
                     var token = jwt.sign(payload, config.secret, {
                       expiresIn: 3600*24*30
                     });

                    if (user.supermac === null || user.supermac == undefined || user.supermac == '' || user.supermac == 'nomac') {
                     Supervisior.findOneAndUpdate({'email': mail}, {$set:{supermac:mac}}, {new: true}, function(err, doc){
                       if(err){
                         return res.json({error : true, reason : err})
                       }
                       return res.json({error : false, message : "Supervisior Login OK!",token : token});
                     })//update
                    }else if (user.supermac == mac) {
                       return res.json({error : false, message : "Supervisior Login OK!",token : token});
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

   } //else


});//arp

}//login


}

