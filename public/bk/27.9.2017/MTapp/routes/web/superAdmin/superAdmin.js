var Admin = require('../../../models/superAdmin');
var generator = require('generate-password');
var  mailer = require('express-mailer');
var bcrypt = require('bcrypt-nodejs');
var b64url = require('b64url');
//var mac = require('getmac');


module.exports = {

  add: function(req, res) {        //get is finction name....we can ram in place of get

     var umail = b64url.decode(req.body.email);
     console.log(umail);
  Admin.find({email:umail }).exec(function (err, results) {
      if(err){}
    if(results.length){
        return res.json({error : false , result : 'This User Already Exist'});
    }else{
            var password = generator.generate({
            length: 10,
            numbers: true
        });
       //console.log(password);
       var data = {
               'email' : umail,
               'password' : password,
            };
         console.log(password);

var userr = new Admin(data);
console.log(userr);
res.mailer.send('passw', {
        to: umail,
        subject: 'Your Login Password',
        text:password
      }, function (err, success) {
        //console.log(err, success);
        if (err) {

          res.send({result: 'There was an error sending the email'});
        }else{
          userr.save(function (err, result){
                   console.log(result);
                   if(err){
                         return res.json({error: true , reason: err});
                       }
                       return res.json({error : false , result : 'Your Login Password was send in Your Email'});
                   });
        }

});

      }
   });
 },
 forgot: function(req,res){
 var newpass = req.body.newPassword;
 var confirmpass = req.body.confirmPassword;
 if(newpass === confirmpass){
   Admin
    .findOne({email:req.params.email})
      .exec()
      .then(function(result){
        if(result == null || result == ''){
          res.json({message:"User doesn't exist"});
        }else{
          if( result.password !== undefined){   //true required
            result.password = confirmpass;
          } else {
            result.password = result.password;
          }
         return result.save();
      }
      }).then(function (savedata) {
        return res.json({error : false , result : savedata,message:'Password change Sucessfully'});
      })
      .catch(function (err) {
        console.log(err)
        return res.json({error : true , reason: err});
      })

 } else{
   res.json({message:"newpassword and confirm password doesn't match"});
 }

 },

}
