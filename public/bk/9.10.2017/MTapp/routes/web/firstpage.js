var Firstpage = require('../../models/firstpage');
var jwt = require('jsonwebtoken');
var checkJwt = require('express-jwt');
var config  =  require('../../config')[process.env.NODE_ENV || 'development'];

module.exports = {
  add: function(req, res) {
    var data = req.body;
    var first = new Firstpage(data);
      first.save(function (err, result){
               if(err){
                     return res.json({error: true , reason: err});
                   }
              return res.json({error : false , result : result,message:'First page created successfully'});
      });
  },

  find:function(req,res){
    var mail = req.body.username;
    var pass = req.body.password;
    if(!mail || !pass ){
      return res.json({  error: true,message: 'Invalid Details'})
    }
    Firstpage
    .findOne({username: mail})
    .exec(function(err,user){
      if(err){
        return res.json({error : true, reason : err})
      }
      console.log(user)
      if (user === null || user == undefined) {
        return res.json({error:true, result:"User does not exist"});
      } else {
        user
        .comparePassword(pass, function(err, isMatch){
            if (err) {
              return res.json({error : true, reason : err});
            } else {
                   console.log(isMatch)
                  if (isMatch && !err){
                      var payload = {
                        id: user._id,
                        username: mail,
                       isActive: user.isActive,
                      }
                      console.log(payload);
                      var token = jwt.sign(payload, config.secret, {
                        expiresIn: 3600*24*2
                      });
                    return res.json({error : false,message : "Access Granted",token : token,data:user});
                  } else {
                      return res.json({error:true,result:"Wrong Password"});
                  }
            }
        });
      }


    });


},//fun

}
