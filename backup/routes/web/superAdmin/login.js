var superAdmin = require('../../../models/superAdmin');
var jwt = require('jsonwebtoken');
var checkJwt = require('express-jwt');
var config  =  require('../../../config')[process.env.NODE_ENV || 'development'];
var b64url = require('b64url');

module.exports = {
    login: function (req,res){
        var mail = b64url.decode(req.body.email);
      	var pass = b64url.decode(req.body.password);
        if(!mail || !pass ){
          return res.json({
            error: true,
            message: 'Invalid Details',
          })
        }
        superAdmin
        .findOne({email: mail})
        .exec(function(err,user){
          if(err){
            return res.json({error : true, reason : err})
          }
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
                          email: mail,
                         isActive: user.isActive,
                        }
                        console.log(payload);
                        var token = jwt.sign(payload, config.secret, {
                          expiresIn: 3600*24*30
                        });
                        var myJSON = JSON.stringify(user);
                       var a = b64url.encode(myJSON);
                        return res.json({error : false,
                            message : "Login OK!",
                            token : token,
                            data: a
                        });
                      } else {
                          return res.json({error:true,
                            result:"Wrong Password"
                          });
                      }
                }
            });
          }


        });


    },

}
