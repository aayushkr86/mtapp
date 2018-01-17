var Supplier = require('../../models/supplier');
var b64url = require('b64url');
// var moment = require('moment');
// const crypto = require('crypto');


module.exports = {
  add: function(req,res){
    var Name = b64url.decode(req.body.supplierName);
    var mail = b64url.decode(req.body.email);
    var contact = b64url.decode(req.body.contact);
    var country = b64url.decode(req.body.country);
    // var sector = b64url.decode(req.body.sector);
    // var charge = b64url.decode(req.body.charge);
    // let uID = crypto.randomBytes(3).toString('hex');
    // console.log(uID);
    // var data = req.body;
     if(!Name || !mail || !contact ||!country){
            return res.json({error : false , message : 'All fields are required'});
         }else{
   Supplier.find({supplierName:Name }).exec(function (err, results) {
       if(err){}
     if(results.length){
         return res.json({error : false , message : 'This Supplier Already Exist'});
     }else{
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
               supplierCode = getID(6);
           console.log('id',supplierCode);
           var data ={
             "supplierCode":supplierCode,
              "supplierName":Name,
              "email":mail,
              "contact":contact,
              "country":country,
              // "sector":"sector",
             // "charge":charge
           };
           var supplier = new Supplier(data);
           supplier.save(function (err, result){
                    if(err){
                          return res.json({error: true , reason: err});
                        } else {
                          var myJSON = JSON.stringify(result);
                          var a = b64url.encode(myJSON);
                            return res.json({error : false , result : a, message:'supplier added Sucessfully'});
                        }

            });
     }

});
}

  },
  getOne: function(req,res){
   Supplier
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


  supplierStatusEdit: function(req,res){
  var isActive = req.body.isActive;
    Supplier
    .update({ _id: req.params.id }, { $set: { isActive: isActive } }, function(err, raw) {
      if (err) return res.json({error: true, reason: err, message: 'The status of supplier request cannot be updated'})
      console.log(raw)
      return res.json({ error: false, message: 'isActive status of supplier updated' , isActive: isActive });
    })

 },
  getSupplier: function(req, res){
   var sup = b64url.decode(req.body.supplierCode);
   
  Supplier
  .find({supplierCode:sup})
  .exec()
  .then(function (allSupplier){
    if(allSupplier.length>0){
     var myJSON = JSON.stringify(allSupplier);
    var a = b64url.encode(myJSON);
    return res.json({
      error : false ,
      result: a,
      result1:allSupplier,
      message:"Supplier found"
     });
    } else{
       return res.json({message:"This Supplier does not exist"});
    }
    
  })
  .catch(function (err) {
    console.log(err);
    return res.json({error : true , reason: err});
  })

},
findSupplier: function(req, res){
   var sup = b64url.decode(req.body.supplierCode);
   var name = b64url.decode(req.body.supplierName);
  Supplier
  .find({supplierCode:sup,supplierName:name})
  .exec()
  .then(function (allSupplier){
    if(allSupplier.length>0){
     var myJSON = JSON.stringify(allSupplier);
    var a = b64url.encode(myJSON);
    return res.json({
      error : false ,
      result: a,
      result1:allSupplier,
      message:"Supplier found"
     });
    } else{
       return res.json({message:"This Supplier does not exist"});
    }
    
  })
  .catch(function (err) {
    console.log(err);
    return res.json({error : true , reason: err});
  })

},

  getAll: function(req, res){

  Supplier
  .find({isActive :'true'})
  .exec()
  .then(function (allSupplier){
    var myJSON = JSON.stringify(allSupplier);
    var a = b64url.encode(myJSON);
    return res.json({
      error : false ,
      result: a,
      result1:allSupplier
     });

  })
  .catch(function (err) {
    console.log(err);
    return res.json({error : true , reason: err});
  })

},
findall:function(req,res){
   Supplier
  .find()
  .exec()
  .then(function (allSupplier){
    var myJSON = JSON.stringify(allSupplier);
    var a = b64url.encode(myJSON);
    return res.json({
      error : false ,
      result: a,
      result1:allSupplier
     });

  })
  .catch(function (err) {
    console.log(err);
    return res.json({error : true , reason: err});
  })
},
 delete: function(req,res){
     Supplier
      .findByIdAndRemove({_id : req.params.id}, function(err,result){
         if(err){
             return res.json({error : true , reason: err});
         } else{
              console.log("delete");
             return res.json({error : false , result: result,message:"Supplier deleted successfully"});
         }
      });
   },
 update: function(req,res){
   var mail =req.body.email;
   var name = req.body.supplierName;
   var contact = req.body.contact;
   var country = req.body.country;
  var sector = req.body.sector;

  if(!name){
            return res.json({error : false , message : 'Name can not be empty'});
   }else{
  

  Supplier
   .findOne({_id: req.params.id})
    .exec()
    .then(function(result){

      if( result.supplierName !== undefined){   //true required
        result.supplierName = name;
      } else {
        result.supplierName = result.supplierName;
      }
      
      if( result.email !== undefined){   //true required
        result.email = mail;
      } else {
        result.email = result.email
      }
      if( result.contact !== undefined){   //true required
        result.contact = contact;
      } else {
        result.contact = result.contact
      }
      if( result.country !== undefined){   //true required
        result.country = country;
      } else {
        result.country = country
      }
     
      // if( result.sector !== undefined){   //true required
      //   result.sector = sector;
      // } else {
      //   result.sector = result.sector;
      // }
      return result.save();
    })
    .then(function (savedata) {
      return res.json({error : false , result : savedata, message:'updated'});
    })
    .catch(function (err) {
      return res.json({error : true , reason: err});
    })
 }
 },

}
