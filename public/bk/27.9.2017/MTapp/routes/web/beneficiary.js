var Beneficiary = require('../../models/beneficiary');
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
    // var status = req.body.status;
    // var data = {
    //     "name":remitname,
    //     "surName":remitsurName,
    //     "email":remitmail,
    //     "address":remitaddress,
    //     "mobile":remitmobile,
    //     "status":status
    //   };
    //   var remiter = new Beneficiary(data);
    //    remiter.save(function (err, result){
    //             if(err){
    //                   return res.json({error: true , reason: err});
    //                 }else{
    //                     return res.json({error : false , result : result,message:'Beneficiary added'});
    //                 }
    //   });
  },
   findAll: function(req,res){
    Beneficiary
       .find()
       .exec(function (err, result) {
         if(err){
           return res.json({error: true , reason: err});
         }
         return res.json({error: false , result: result})
       });


},
findbybranchAll: function(req,res){
   Beneficiary
    .find({branchID : req.params.id})
    .exec(function (err, result) {
      if(err){
        return res.json({error: true , reason: err});
      }
      return res.json({error: false , result: result})
    });


},
  find: function(req,res){
    var name = b64url.decode(req.body.beneficiaryname);
     // var remitsurName = b64url.decode(req.body.beneficiarysurName);
    var mail = b64url.decode(req.body.beneficiaryemail);
    // var country = b64url.decode(req.body.country);
    Beneficiary
       .findOne({'beneficiaryemail': mail, 'beneficiaryname':name })
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
         return res.json({ message:"You are new User/Verified"});
       }

       });


},
findbenef: function(req,res){
    var name = b64url.decode(req.body.beneficiaryname);
    var surName = b64url.decode(req.body.beneficiarysurName);
    var mail = b64url.decode(req.body.beneficiaryemail);
    var country = b64url.decode(req.body.country);
    console.log(name,surName,mail,country)
    Beneficiary
       .find({$and : [{beneficiaryemail: mail}, {beneficiaryname:name },{beneficiarysurName:surName},{country:country}] })
       .exec(function (err, result) {

         console.log(result.length)
         
         if(err){
           return res.json({error: true , reason: err});
         }
       if(result.length>0){
           if(result[0].status == 'Verified'){
             return res.json({message:'Verified'})
           }
           if(result[0].status == 'Blacklist') {
             return res.json({message:'Blacklisted'})
           }
       }else{
         return res.json({ message:"You are new Beneficiary/Verified"});
       }

       });


},
checkkycbenef : function(req,res) {
  var name = req.body.beneficiaryname;
  var mail = req.body.beneficiaryemail;
  var country = req.body.country;

  Beneficiary
     .findOne({'beneficiaryemail': mail, 'beneficiaryname':name ,'country':country })
     .exec(function (err, result) {
       if(err){
         return res.json({error: true , reason: err});
       }
       if(result){
          var countryfound = result.country;
          var amount = result.amount;
          console.log(amount);
         Country
         .findOne({'countryName':country })
         .exec(function (err, country) {
           if(err){
             return res.json({error: true , reason: err});
           }
           var limit = country.paymentLimit;
           console.log(limit);
           if(amount<limit){
             Blacklist
             .findOne({'name':name })
             .exec(function (err, blacklist) {
               if(err){
                 return res.json({error: true , reason: err});
               }
               if(blacklist){
                   return res.json({error : false , message : ' You are Blacklisted'});
               }else{
                 return res.json({error : false , message : ' You are Verified'});
               }
            })
           } else{
             return res.json({ message:"You  are not Verified user because your transaction amount exceed  from country paymentLimit"});
           }
         })
       } else{
         return res.json({ message:"You are new Beneficiary/Verified"});
       }

    });

},
update: function(req,res){
       var data = req.body;
         delete  data.beneficiaryname;
         delete data.beneficiarysurName;
         delete data.beneficiaryemail;
         delete data.beneficiaryaddress;
         delete data.beneficiarymobile;
         var status = data.status;
         console.log(req.body.status)


         Beneficiary
           .findOne({_id: req.params.id})
            .exec()
            .then(function(result){
              console.log(result)
              // var country =result.country.countryName;
               var country =result.country;
              Country
              .findOne({'countryName':country})
              .exec(function (err, country) {
                 console.log('11',err)
                if(err){
                  return res.json({error: true , reason: err});
                }
                if(result.amount <= country.paymentLimit){
                    Beneficiary.findOneAndUpdate({beneficiaryemail:result.beneficiaryemail}, {$set:{status:'Verified'}},{new: true},function(err, doc){
                      if(err){
                          return res.json({error : true, reason : err});
                      }
                      return res.json({message:'Enable,paymentlimit less than countrylimit',result:doc});
                  });

                } else{
                    Beneficiary.findOneAndUpdate({beneficiaryemail:result.beneficiaryemail}, {$set:{status:'Blacklist'}},{new: true},function(err, doc1){
                    	console.log('22',err)
                      if(err){
                          return res.json({error : true, reason : err});
                      }
                      return res.json({message:'Disable,paymentlimit exceed to countrylimit',result:doc1});
                  });
                }
              });
            });
},
}
