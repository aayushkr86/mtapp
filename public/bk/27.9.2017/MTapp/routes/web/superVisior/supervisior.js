var supervisior = require('../../../models/supervisor');
var generator = require('generate-password');
var  mailer = require('express-mailer');
var b64url = require('b64url');
//var mac = require('getmac');
var branch = require('../../../models/branch');

var Supplier = require('../../../models/supplier');


module.exports = {

    getsupervisiorbyBranch: function(req,res){

     supervisior
      .find({branchID : req.body.branchID})
     .exec(function(err , result){
         if(err){
              return res.json({error : true , reason: err});
         } else{
           console.log(result.length)
           return res.json({error : false , message : 'supervisior found',result:result.length});
         }
       });
   },

  getsupplierbysupervisior: function(req,res){

   supervisior
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
                       .find({country : result1.country,isActive:true})
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


  add: function(req, res) {
    var branchID = b64url.decode(req.body.branchID);
    var name = b64url.decode(req.body.name);
    var mail = b64url.decode(req.body.email);
    var phone = b64url.decode(req.body.phone);
    var address = b64url.decode(req.body.address);
    // var country = b64url.decode(req.body.country);
    var hours = b64url.decode(req.body.hoursOfWorkDaily);
    var day = req.body.workdays;

    if(!branchID){
       return res.json({error : false , result : 'BranchID can not be empty'});
    } else if(!mail){
        return res.json({error : false , result : 'Email can not be empty'});
    }
    else if(!name){
        return res.json({error : false , result : 'FullName can not be empty'});
    }
    else if(!phone){
        return res.json({error : false , result : 'ContactNo can not be empty'});
    }
    else if(!address){
        return res.json({error : false , result : 'Address can not be empty'});
    }
    else if(!hours){
        return res.json({error : false , result : 'Workinghours can not be empty'});
    }
    else if(!day){
        return res.json({error : false , result : 'Workdays can not be empty'});
    }
    else{
      supervisior.find({email:mail}).exec(function (err, results) {
      if(err){
        return res.json({error: true , reason: err});
      }
    if(results.length){
        return res.json({error : false , result : 'This Supervisior Already alllocated,please enter different email'});
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
          var supervisiorID = getID(6);
          console.log(supervisiorID);


         var data = {
            "branchID": branchID,
            "supervisiorID" :supervisiorID,
             "password":password,
             "name":name,
            "email": mail,
            "phone": phone,
            "address":address,
            // "country":country,
            "hoursOfWorkDaily":hours,
            "workdays":day,
            "supermac":"nomac"

            };
         console.log('pass',password);
         var htmlMsg = `Login password: ${password}`;
           htmlMsg += `  and ID: ${supervisiorID}`;

var userr = new supervisior(data);
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
                       return res.json({error : false , result : 'Supervisior created successfully'});
                   });
        }

});

      }
   });

    } //else

  
 },
  superStatusEdit: function(req,res){
  var isActive = req.body.isActive;
    supervisior
    .update({ _id: req.params.id }, { $set: { isActive: isActive } }, function(err, raw) {
      if (err) return res.json({error: true, reason: err, message: 'The status of supervisor request cannot be updated'})
      console.log(raw)
      return res.json({ error: false, message: 'isActive status of supervisor updated' , isActive: isActive });
    })

 },
 update: function(req,res){
   var data = req.body;
  supervisior
   .findOne({_id: req.params.id})
    .exec()
    .then(function(result){
      delete data.branchID;
      delete data.supervisiorID;
      if( result.name !== undefined){   //true required
        result.name = data.name;
      } else {
        result.name = result.name;
      }
      // if( result.country !== undefined){   //true required
      //   result.country = data.country;
      // } else {
      //   result.country = result.country;
      // }
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


      return result.save();
    })
    .then(function (savedata) {
        var htmlMsg = `Your current data  ID: ${savedata.supervisiorID}, \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t Email:${savedata.email}, \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t Name:${savedata.name}
      \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t, Address:${savedata.address},\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t ContactNo:${savedata.phone},\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t BranchID:${savedata.branchID},
      \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t HoursOfWorkDaily:${savedata.hoursOfWorkDaily}, \t\t\t\t\t\t\t\t\t\t\t\t\t\t\t Workdays:${savedata.workdays},\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t macAddress:${savedata.supermac}` ;
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
                return res.json({error : false , result : savedata,message:'updated'});
              }

      });
    })
    .catch(function (err) {
      console.log(err);
      return res.json({error : true , reason: err});
    })

 },
 get: function(req,res){
	supervisior
	 .find()
	 .exec(function(err , result) {
			 if(err){
						return res.json({error : true , reason: err});
			 } else{

						return res.json({error : false , result: result});
			 }

	 	});
	},
getbyactive: function(req,res){
   supervisior
    .find({isActive:true})
    .exec(function(err , result) {
        if(err){
             return res.json({error : true , reason: err});
        } else{

             return res.json({error : false , result: result});
        }

     });
   },
  getOne: function(req,res){
   supervisior
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
 getSupervisor : function(req,res){
  supervisior
   .findOne({'branchID':req.body.branchID})
   .exec(function(err , result) {
       if(err){
            return res.json({error : true , reason: err});
       } else{
            return res.json({error : false , result: result});
       }

    });

 },
  delete: function(req,res){
		 supervisior
			.findByIdAndRemove({_id : req.params.id}, function(err,result){
				 if(err){
						 return res.json({error : true , reason: err});
				 } else{
							console.log("delete");
						 return res.json({error : false , result: result,message:"Supervisior  deleted successfully"});
				 }
			});
	 },


}
