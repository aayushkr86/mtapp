var branch = require('../../models/branch');
var b64url = require('b64url');
var supervisior = require('../../models/supervisor');
var TellerID = require('../../models/tellerID');
var Controller = require('../../models/controller');
var Tariff = require('../../models/tariff');
module.exports = {
 add: function(req,res){


  //  var branchID = b64url.encode(req.body.branchID);
  //  var Name = b64url.encode(req.body.fullName);
  //  var country =b64url.encode( req.body.country);
  //  var Address1 =b64url.encode( req.body.Address1);
  //  var Address2 = b64url.encode(req.body.Address2);
  //  var contact = b64url.encode(req.body.contact);
  //  var phone = b64url.encode(req.body.telephone);
  //  var mail = b64url.encode(req.body.email);
  //  var payment =b64url.encode( req.body.paymentLimit);
  //  var hours = b64url.encode(req.body.hoursOfWorkDaily);
  //  var day = b64url.encode(req.body.workdays);
  //  console.log(branchID,Name,country,Address1,Address2,contact,phone,mail,payment,hours,day);

      var branchID = b64url.decode(req.body.branchID);
      var Name = b64url.decode(req.body.fullName);
      var country = b64url.decode(req.body.country);
      var Address1 =b64url.decode(req.body.Address1);
      var Address2 = b64url.decode(req.body.Address2);
      var contact = b64url.decode(req.body.contact);
      var phone = b64url.decode(req.body.telephone);
      var mail = b64url.decode(req.body.email);
      var payment =b64url.decode( req.body.paymentLimit);
      var hours = b64url.decode(req.body.hoursOfWorkDaily);
      var day = req.body.workdays;
      
      
      if(!req.body.branchID){
        return res.json({error : false , message : 'BranchID can not be empty'});

      }  else if(!req.body.country|| req.body.country == '?'){
        return res.json({error : false , message : 'Country can not be empty'});
      }else if(!day){
        return res.json({error : false , message : 'Workingdays can not be empty'});
      } else if(!req.body.Address1){
        return res.json({error : false , message : 'Address1 can not be empty'});
      } else if(!req.body.Address2){
        return res.json({error : false , message : 'Address2 can not be empty'});
      } else if(!mail){
        return res.json({error : false , message : 'Email can not be empty'});
      }else if(!payment){
        return res.json({error : false , message : 'PaymentLimit can not be empty'});
      }else if(!phone){
        return res.json({error : false , message : 'Telephone can not be empty'});
      } else if(!hours){
        return res.json({error : false , message : 'Workinghours can not be empty'});
      }  else if(!req.body.fullName){
        return res.json({error : false , message : 'InstituteName can not be empty'});
      }  else if(!contact){
        return res.json({error : false , message : 'ContactName can not be empty'});
      } 
      else{
           var data = {
      "branchID": branchID,
      "fullName":Name,
      "country":country,
      "Address1": Address1,
      "Address2" : Address2,
      "contact":contact,
      "telephone": phone,
      "email": mail,
      "paymentLimit":payment,
      "hoursOfWorkDaily":hours,
      "workdays":day
      };
   branch.find({branchID:branchID}).exec(function (err, results) {
       if(err){ return;}
     if(results.length){
         return res.json({error : false , message : 'branch already exist'});
     }else{
         var branchh = new branch(data);
           branchh.save(function (err, result){
                    if(err){
                          return res.json({error: true , reason: err});
                        }
                        var myJSON = JSON.stringify(result);
                                 var a = b64url.encode(myJSON);
                                 console.log(b64url.decode(a));
                                //  var b = b64url.decode(a)
                                //  console.log(b);
                                 return res.json({error : false , result : a,message:'Branch added successfully'});
           });
     }
   });

      }//else


  },
 update: function(req, res) {
   var branchID = b64url.decode(req.body.branchID);
   var Name = b64url.decode(req.body.fullName);
   var country =b64url.decode( req.body.country);
   var Address1 =b64url.decode( req.body.Address1);
   var Address2 = b64url.decode(req.body.Address2);
   var contact = b64url.decode(req.body.contact);
   var phone = b64url.decode(req.body.telephone);
   var mail = b64url.decode(req.body.email);
   var payment =b64url.decode( req.body.paymentLimit);
   var hours = b64url.decode(req.body.hoursOfWorkDaily);
   var day = req.body.workdays;
    if(!req.body.branchID){
        return res.json({error : false , message : 'BranchID can not be empty'});

      }  else if(!req.body.country){
        return res.json({error : false , message : 'Country can not be empty'});
      }else if(!day){
        return res.json({error : false , message : 'Workingdays can not be empty'});
      } else if(!req.body.Address1){
        return res.json({error : false , message : 'Address1 can not be empty'});
      } else if(!req.body.Address2){
        return res.json({error : false , message : 'Address2 can not be empty'});
      } else if(!mail){
        return res.json({error : false , message : 'Email can not be empty'});
      }else if(!payment){
        return res.json({error : false , message : 'PaymentLimit can not be empty'});
      }else if(!phone){
        return res.json({error : false , message : 'Telephone can not be empty'});
      } else if(!hours){
        return res.json({error : false , message : 'Workinghours can not be empty'});
      }  else if(!req.body.fullName){
        return res.json({error : false , message : 'InstituteName can not be empty'});
      }  else if(!contact){
        return res.json({error : false , message : 'ContactName can not be empty'});
      } 
      else{

   branch
     .findOne({_id: req.params.id})
      .exec()
      .then(function(result){
         if( result.branchID !== undefined){   //true required
          result.branchID =branchID;
        } else {
          result.branchID = result.branchID
        }
        if( result.fullName !== undefined){   //true required
          result.fullName =Name;
        } else {
          result.fullName = result.fullName
        }
        if( result.country !== undefined){   //true required
          result.country = country;
        } else {
          result.country = result.country;
        }
        if( result.Address1 !== undefined){   //true required
          result.Address1 = Address1;
        } else {
           result.Address1 = result.Address1;
        }

        if( result.Address2 !== undefined){   //true required
          result.Address2 = Address2;
        } else {
          result.Address2 = result.Address2;
        }

        if( result.telephone !== undefined){   //true required
          result.telephone = phone;
        } else {
          result.telephone = result.telephone;
        }
        if( result.email !== undefined){   //true required
           result.email = mail;
         } else {
           result.email = result.email;
         }
         if( result.contact !== undefined){   //true required
           result.contact = contact;
         } else {
           result.contact = result.contact;
         }
         if( result.paymentLimit !== undefined){   //true required
         result.paymentLimit = payment;
         } else {
             result.paymentLimit = result.paymentLimit;
         }
         if( result.hoursOfWorkDaily !== undefined){   //true required
           result.hoursOfWorkDaily = hours;
         } else {
           result.hoursOfWorkDaily = result.hoursOfWorkDaily;
         }
         if( result.workdays !== undefined){   //true required
           result.workdays = day;
         } else {
           result.workdays = result.workdays;
         }

        return result.save();
      })
      .then(function (savedata) {
        console.log("update")
        var myJSON = JSON.stringify(savedata);
       var a = b64url.encode(myJSON);
       var b = b64url.decode(a);
       console.log(b);
        return res.json({error : false , result : a,message:'updated'});
      })
      .catch(function (err) {
        console.log(err);
        return res.json({error : true , reason: err});
      })
   }//else
 },
 branchStatusEdit: function(req,res){
  var isActive = req.body.isActive;
    branch
    .update({ _id: req.params.id }, { $set: { isActive: isActive } }, function(err, raw) {
      if (err) return res.json({error: true, reason: err, message: 'The status of branch request cannot be updated'})
      console.log(raw)
      return res.json({ error: false, message: 'isActive status of branch updated' , isActive: isActive });
    })

 },
 getOne: function(req,res){
   branch
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
 findAll: function(req,res){
   
   branch
    .find()
    .exec(function(err , result) {
        if(err){
             return res.json({error : true , reason: err});
        } else{
              var myJSON = JSON.stringify(result);
             var a = b64url.encode(myJSON);
             var b = b64url.decode(a);
             console.log(b);
             return res.json({error : false , result: result});
        }

     });
   },
findActive: function(req,res){
     branch
      .find({isActive:true})
      .exec(function(err , result) {
          if(err){
               return res.json({error : true , reason: err});
          } else{
                var myJSON = JSON.stringify(result);
               var a = b64url.encode(myJSON);
               var b = b64url.decode(a);
               console.log(b);
               return res.json({error : false , result: result});
          }

       });
     },
   deleteBranch: function(req,res){
    branch
     .findById({_id : req.params.id}, function(err,result){
        if(err){
            return res.json({error : true , reason: err});
        } else{
             supervisior
            .findOne({branchID:result.branchID})
            .exec(function(err , result1) {
              if(err){
                   return res.json({error : true , reason: err});
              }else {
                if(result1){
                  return res.json({error : false , message:'You can not delete branch,its use somewhere else'});
                }else{
                TellerID
                 .findOne({branchID:result.branchID})
                 .exec(function(err , result2) {
                   if(err){
                        return res.json({error : true , reason: err});
                   }else {
                     if(result2){
                       return res.json({error : false , message:'You can not delete branch,its use somewhere else'});
                     }else{
                       Controller
                        .findOne({branchID:result.branchID})
                        .exec(function(err , result3) {
                          if(err){
                               return res.json({error : true , reason: err});
                          }else {
                            if(result3){
                              return res.json({error : false , message:'You can not delete branch,its use somewhere else'});
                            }else{
                              Tariff
                               .findOne({branchID:result.branchID})
                               .exec(function(err , result4) {
                                 if(err){
                                      return res.json({error : true , reason: err});
                                 }else {
                                   if(result4){
                                     return res.json({error : false , message:'You can not delete branch,its use somewhere else'});
                                   }else{
                                     branch
                                      .findByIdAndRemove({_id : req.params.id}, function(err,result5){
                                        if(err){
                                            return res.json({error : true , reason: err});
                                        } else{
                                             console.log("delete");
                                            return res.json({error : false , result: result,message:"Deleted successfully"});
                                        }
                                      })
                                   }//else not tarif
                                 }//tarif else
                               })//tariff
                            }//else not conteller
                          }//else controller
                        })//controller find
                     }//tellerid else
                   }//tellerid find else
                 })//tellerid find
                }//not found else super
              }//super else
            });//supervisior find

        }//branch else
     });//branch find
  },//fun
}
