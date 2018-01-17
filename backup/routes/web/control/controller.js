var Controller = require('../../../models/controller');
var generator = require('generate-password');
var  mailer = require('express-mailer');
var b64url = require('b64url');
//var mac = require('getmac');


module.exports = {
  add: function(req, res) {        
    var branchID = b64url.decode(req.body.branchID);
    var first = b64url.decode(req.body.name);
    var mail = b64url.decode(req.body.email);
    var phone = b64url.decode(req.body.phone);
    var address = b64url.decode(req.body.address);
    var hours = b64url.decode(req.body.hoursOfWorkDaily);
    // var country = b64url.decode(req.body.country);
    var day = req.body.workdays;

  if(!branchID){
       return res.json({error : false , result : 'BranchID can not be empty'});
    } else if(!mail){
        return res.json({error : false , result : 'Email can not be empty'});
    }else if(!first){
    	return res.json({error : false , result : 'Name can not be empty'});
    } else if(!phone){
    	return res.json({error : false , result : 'Phone can not be empty'});
    }else if(!address){
    	return res.json({error : false , result : 'Address can not be empty'});
    }else if(!hours){
    	return res.json({error : false , result : 'Hours can not be empty'});
    }else if(!day){
    	return res.json({error : false , result : 'Working days can not be empty'});
    }else{

  Controller.find({email:mail }).exec(function (err, results) {
      if(err){}
    if(results.length){
        return res.json({error : false , result : 'This Controller Already Exist'});
    }else{
            var password = generator.generate({
            length: 10,
            numbers: true
        });
        console.log(password);
        function getID(idLength)
            {
                  var chars="0,1,2,3,4,5,6,7,8,9";
                  chars=chars.split(",");
                  var min=0;
                  var max=chars.length-1;
                  var id="";
                  for(var i=0; i<idLength;i++)
                  {
                        id+=chars[ Math.floor(Math.random()*(max - min + 1) + min) ];
                  }
            return id;
            }
          var controllerID = getID(6);
          console.log(controllerID);


         var data = {
            "branchID": branchID,
            "controllerID" :controllerID,
             "password":password,
             "name":first,
            "email": mail,
            "phone": phone,
            "address":address,
            "hoursOfWorkDaily":hours,
            "workdays":day,
            // "country":country,
            "controlmac":"nocontrolmac"

            };
         console.log('pass',password);
         var htmlMsg = `You are a Controller and Your Login Credentials is`;
           htmlMsg = `  password: ${password}`;
           htmlMsg += `  and ID: ${controllerID}`;

var userr = new Controller(data);
res.mailer.send('passvisior', {
        to: mail,
        subject: 'Your Login ID and password',
        text:htmlMsg
      }, function (err, success) {
        //console.log(err, success);
        if (err) {
          res.send({result: 'There was an error sending the email'});
        }else{
          userr.save(function (err, result){
                   if(err){
                         return res.json({error: true , reason: err});
                       }
                       return res.json({error : false , result : 'Controller create successfully and Login Password was send controller`s Email'});
                   });
        }

});

      }
   });
    }

 },
  controllerStatusEdit: function(req,res){
  var isActive = req.body.isActive;
    Controller
    .update({ _id: req.params.id }, { $set: { isActive: isActive } }, function(err, raw) {
      if (err) return res.json({error: true, reason: err, message: 'The status of controller request cannot be updated'})
      console.log(raw)
      return res.json({ error: false, message: 'isActive status of controller updated' , isActive: isActive });
    })

 },
 getOne: function(req,res){
   Controller
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
   var data = req.body;

  Controller
   .findOne({_id: req.params.id})
    .exec()
    .then(function(result){
      delete data.branchID;
      delete data.supervisiorID;

      if( result.password !== undefined){   //true required
        result.password = data.password;
      } else {
         result.password = result.password;
      }

      if( result.name !== undefined){   //true required
        result.name = data.name;
      } else {
        result.name = result.name;
      }
     
      if( result.email !== undefined){   //true required
        result.email = data.email;
      } else {
        result.email = result.email
      }
      if( result.phone !== undefined){   //true required
        result.phone = data.phone;
      } else {
        result.phone = result.phone
      }
      if( result.address !== undefined){   //true required
        result.address = data.address;
      } else {
        result.address = result.address
      }
      
      if( result.workdays !== undefined){   //true required
        result.workdays = data.workdays;
      } else {
        result.workdays = result.workdays;
      }
       if( result.hoursOfWorkDaily !== undefined){   //true required
        result.hoursOfWorkDaily = data.hoursOfWorkDaily;
      } else {
        result.hoursOfWorkDaily = result.hoursOfWorkDaily;
      }
      //   if( result.country !== undefined){   //true required
      //   result.country = data.country;
      // } else {
      //   result.country = result.country;
      // }

      return result.save();
    })
    .then(function (savedata) {
      console.log(savedata)
      return res.json({error : false , result : savedata,message:'updated'});
    })
    .catch(function (err) {
      console.log(err);
      return res.json({error : true , reason: err});
    })

 },
 get: function(req,res){
  
	Controller
	 .find()
   // .populate('_branchID')
	 .exec(function(err , result) {
			 if(err){
						return res.json({error : true , reason: err});
			 } else{
						console.log(result);
						return res.json({error : false , result: result});
			 }

	 	});
	},
  delete: function(req,res){
		 Controller
			.findByIdAndRemove({_id : req.params.id}, function(err,result){
				 if(err){
						 return res.json({error : true , reason: err});
				 } else{
							console.log("delete");
						 return res.json({error : false , result: result,message:"Controller deleted successfully"});
				 }
			});
	 },


}
