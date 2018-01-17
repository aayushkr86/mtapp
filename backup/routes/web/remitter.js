var Remitter = require('../../models/remitter');
var moment = require('moment');
var b64url = require('b64url');
var Country = require('../../models/country');
var Blacklist = require('../../models/blacklist');

module.exports = {
  add: function(req, res) {
    // var remitname = req.body.name;
    // var remitsurName = req.body.surName;
    // var remitmail = req.body.email;
    // var remitaddress =req.body.address;
    // var remitmobile =req.body.mobile;
    // var remitidType = req.body.idType;
    // var remitidNo =req.body.idNo;
    // var issueCountry =req.body.issueCountry;
    // var issueDate =req.body.issueDate;
    // var expDate = req.body.expDate;
    // var status = req.body.status;
    //
    // if (moment(issueDate, 'DD/MM/YYYY').isValid()){
    //   issueDate = moment(issueDate, 'DD/MM/YYYY').toDate();
    // }else{
    //   issueDate = undefined;
    // }
    // if (moment(expDate, 'DD/MM/YYYY').isValid()){
    //   expDate = moment(expDate, 'DD/MM/YYYY').toDate();
    // }else{
    //   expDate = undefined;
    // }
    // var data = {
    //     "name":remitname,
    //     "surName":remitsurName,
    //     "email":remitmail,
    //     "address":remitaddress,
    //     "mobile":remitmobile,
    //     "idType":remitidType,
    //     "idNo":remitidNo,
    //     "issueCountry":issueCountry,
    //     "issueDate":issueDate,
    //     "expDate":expDate,
    //     "status":status
    //   };
    //   var remiter = new Remitter(data);
    //
    //    remiter.save(function (err, result){
    //             if(err){
    //                   return res.json({error: true , reason: err});
    //                 }else{
    //                     return res.json({error : false , result : result,message:'Remitter added'});
    //                 }
    //   });
  },
   findAll: function(req,res){
    Remitter
       .find()
       .exec(function (err, result) {
         if(err){
           return res.json({error: true , reason: err});
         }
         return res.json({error: false , result: result})
       });


},
  find: function(req,res){
    var remitname = b64url.decode(req.body.remittername);
     // var remitsurName = b64url.decode(req.body.remittersurName);
    var remitmail = b64url.decode(req.body.remitteremail);
    // var country = b64url.decode(req.body.issueCountry);
    console.log(remitmail,remitname);
    Remitter
       .find({'remitteremail': remitmail, 'remittername':remitname  })
       .exec(function (err, result) {
         if(err){
           return res.json({error: true , reason: err});
         }
         console.log(result.length);
       if(result.length){
           if(result[0].status == 'Verified'){
             return res.json({message:'Verified'})
           }
           if(result[0].status == 'Blacklist'){
             return res.json({message:'Blacklisted'})
           }
       }else{
         return res.json({ message:"You are new Remitter/Verified"});
       }

       });


},
checkkycremitter: function (req,res){
  var remitname = req.body.remittername;
  var remitmail = req.body.remitteremail;
  var country = req.body.issueCountry;

  Remitter
     .findOne({'remitteremail': remitmail, 'remittername':remitname ,'issueCountry':country })
     .exec(function (err, result) {
       if(err){
         return res.json({error: true , reason: err});
       }
       if(result){
         var name = result.remittername;
         var amount = result.amount;
         var country = result.issueCountry;
         Blacklist
         .findOne({'name':name })
         .exec(function (err, blacklist) {
           if(err){
             return res.json({error: true , reason: err});
           }
           if(blacklist){
               return res.json({error : false , message : ' You are Blacklisted'});
           }else{
             Country
             .findOne({'countryName':country })
             .exec(function (err, country) {
               if(err){
                 return res.json({error: true , reason: err});
               }
               var limit = country.paymentLimit;
               if(amount<limit){
                 return res.json({error : false , message : ' You are Verified'});
               } else{
                  return res.json({ message:"You  are not Verified user because your transaction amount exceed  from country paymentLimit"});
               }
             })
           }
        })
       } else{
         return res.json({error : false , message : ' You are New Remitter'});
       }

    })//remitter

},
findremiiter: function(req,res){
    var name = b64url.decode(req.body.remittername);
    var surName = b64url.decode(req.body.remittersurName);
    var mail = b64url.decode(req.body.remitteremail);
    var country = b64url.decode(req.body.issueCountry);
    Remitter
       .findOne({'remitteremail': mail, 'remittername':name ,'remittersurName':surName,'issueCountry':country })
       .exec(function (err, result) {
         if(err){
           return res.json({error: true , reason: err});
         }
       if(result){
           if(result.status === 'Verified'){
             return res.json({message:'Verified'})
           }else {
             return res.json({message:'Not Verified'})
           }
       }else{
         return res.json({ message:"You are new Beneficiary/Verified"});
       }

       });


},
update: function(req,res){
       var data = req.body;
        delete  data.remittername;
         delete data.remittersurName;
         delete data.remitteremail;
         delete data.remitteraddress;
         delete data.remittermobile;
         delete data.remitteridType;
         delete data.remitteridNo;
         delete data.remitterissueCountry;
         delete data.remitterissueDate;
         delete data.remitterexpDate;
         var status = req.body.status;

         Remitter
           .findOne({_id: req.params.id})
            .exec()
            .then(function(result){
              var country =result.issueCountry;
              Country
              .findOne({'countryName':country})
              .exec(function (err, country) {

                if(err){
                  return res.json({error: true , reason: err});
                }
                if(result.amount <= country.paymentLimit){
                   Remitter.findOneAndUpdate({remitteremail:result.remitteremail}, {$set:{status:'Verified'}},{new: true},function(err, doc){
                      if(err){
                          return res.json({error : true, reason : err});
                      }
                      return res.json({message:'Remitter amount has less than country paymentlimit',result:doc});
                  });
                } else{
                    Remitter.findOneAndUpdate({remitteremail:result.remitteremail}, {$set:{status:'Blacklist'}},{new: true},function(err, doc){
                      if(err){
                          return res.json({error : true, reason : err});
                      }
                      return res.json({message:'Blacklisted done',result:doc});
                  });
                }
              });
            });


},
}
