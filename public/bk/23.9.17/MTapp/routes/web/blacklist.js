var Blacklist = require('../../models/blacklist');
var b64url = require('b64url');
var Remitter = require('../../models/remitter');

module.exports = {
  add: function(req, res) {
   
    var Name = req.body.name;
    var last = req.body.surName;

 Blacklist.find({name:Name,surName:last }).exec(function (err, results) {
     if(err){}
   if(results.length){
       return res.json({error : false , message : ' Already Blacklisted'});
   }else{

    var data = {
    "name":Name,
    "surName":last
    };
    var black = new Blacklist(data);
    black.save(function (err, result){
             if(err){
                   return res.json({error: true , reason: err});
                 }
                 var myJSON = JSON.stringify(result);
                 var a = b64url.encode(myJSON);
                 return res.json({error : false , result : a, message:'Blacklisted'});
     });
  }

  });
  },
  kyccheck : function(req,res){
     var Name = b64url.decode(req.body.remittername);
    var last = b64url.decode(req.body.remittersurName);

 Blacklist.find({name:Name,surName:last }).exec(function (err, results) {
  if(err){return res.json({error : true , reason: err});}
   if(results.length){
       return res.json({error : false , message : 'Blacklisted'});
   }else{
    return res.json({error : false , message : 'Verified'});
   }

 })

  },
  update: function(req,res){
    var type = b64url.decode(req.body.userType);
    var Name = b64url.decode(req.body.name);
    var last = b64url.decode(req.body.surName);
    var mail = b64url.decode(req.body.email);
    var region = b64url.decode(req.body.region);
    var country = b64url.decode(req.body.country);
    var status = b64url.decode(req.body.status);
    Blacklist
      .findOne({_id: req.params.id})
       .exec()
       .then(function(result){
         if( result.userType !== undefined){   //true required
           result.userType = type;
         } else {
           result.userType = result.userType
         }
         if( result.name !== undefined){   //true required
           result.name = Name;
         } else {
           result.name = result.name
         }
         if( result.surName !== undefined){   //true required
           result.surName = last;
         } else {
           result.surName = result.surName
         }
         if( result.country !== undefined){   //true required
           result.country = country;
         } else {
           result.country = result.country
         }
         if( result.email !== undefined){   //true required
           result.email = mail;
         } else {
           result.email = result.email
         }
         if( result.region !== undefined){   //true required
           result.region = region;
         } else {
           result.region = result.region
         }
         if( result.status !== undefined){   //true required
           result.status = status;
         } else {
           result.status = result.status
         }
         return result.save();
       })
       .then(function (savedata) {
         var myJSON = JSON.stringify(savedata);
         var a = b64url.encode(myJSON);
         return res.json({error : false , result : a,message:"update Sucessfully"});
       })
       .catch(function (err) {
                 return res.json({error : true , reason: err});
       })
  },
  getAll : function(req, res){
   Blacklist.find({}).exec(function(err, data){
     if(err){
       return res.json({error : true, reason : err});
     }else{
       var myJSON = JSON.stringify(data);
       var a = b64url.encode(myJSON);
      //  console.log(b64url.decode(a));
       return res.json({error : false, data : a});
     }
   })
  },
  delete: function(req,res){
    Remitter.findOne({_id : req.params.id}).exec(function(err, data){
     if(err){
       return res.json({error : true, reason : err});
     }
     if(data){
       var name = data.remittername;
       var last = data.remittersurName;
       Blacklist.findOne({'name':name,'surName':last}).exec(function(err, data1){
        if(err){
          return res.json({error : true, reason : err});
        }
        if(data1){
          var id =data1._id;
          Blacklist
          .findByIdAndRemove({_id : id}, function(err,result){
            if(err){
             return res.json({error : true , reason: err});
            } else{
                  console.log("delete");
                 return res.json({error : false , result: result,message:"Remove from Blacklisted "});
            }
          })
        } else{
          return res.json({message:"No user in Blacklisted "});
        }

       })//black
     }
     
   });// remitter

     
   },
}
