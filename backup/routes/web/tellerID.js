var TellerID = require('../../models/tellerID');
var b64url = require('b64url');

module.exports = {
  add:function(req,res){
    // var branchID = b64url.encode(req.body._branchID);
    // var limit = b64url.encode(req.body.paymentLimit);
    // var mac =b64url.encode( req.body.macAddress);
    // console.log(mac,limit,branchID);
    var branchID = b64url.decode(req.body.branchID);
    var limit = b64url.decode(req.body.paymentLimit);
    var superv = b64url.decode(req.body.supervisiorID);
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
         var id = getID(4);
         if(!branchID){
            return res.json({error : false , result : 'BranchID can not be empty'});
         }else if(!limit){
           return res.json({error : false , result : 'PaymentLimit can not be empty'});
         }
        else if(!superv){
            return res.json({error : false , result : 'SupervisiorID can not be empty'});
        } else {
	  TellerID.find({tellerID:id }).exec(function (err, results) {
		    if(err){}
		  if(results.length){
		      return res.json({error : false , result : 'This tellerID Already Exist'});
		  }else{
        var data = {
          "branchID":branchID,
          "tellerID":id,
          "paymentLimit":limit,
          "supervisiorID":superv,
          "telleridmac":""
        }
          // data.tellerID = id;
        var teller = new TellerID(data);
        teller.save(function (err, result){
                 if(err){
                       return res.json({error: true , reason: err});
                     }
                     return res.json({error : false , result : 'tellerID added'});
                 });
      }

});
  }
},
get:function(req,res){
  TellerID
 .find()
 .exec(function(err , result) {
     if(err){
          return res.json({error : true , reason: err});
     } else{
          var myJSON = JSON.stringify(result);
         var a = b64url.encode(myJSON);
          return res.json({error : false , result: result});
     }

  });
},
 telleridStatusEdit: function(req,res){
  var isActive = req.body.isActive;
    TellerID
    .update({ _id: req.params.id }, { $set: { isActive: isActive } }, function(err, raw) {
      if (err) return res.json({error: true, reason: err, message: 'The status of tellerid request cannot be updated'})
      console.log(raw)
      return res.json({ error: false, message: 'isActive status of tellerid updated' , isActive: isActive });
    })

 },
  get: function(req,res){
   TellerID
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
 
 delete: function(req,res){
     TellerID
      .findByIdAndRemove({_id : req.params.id}, function(err,result){
         if(err){
             return res.json({error : true , reason: err});
         } else{
              console.log("delete");
             return res.json({error : false , result: result,message:"TellerID  deleted successfully"});
         }
      });
   },
update: function(req,res){
  var branchID = req.body.branchID;
  var teller = req.body.tellerID;
  var limit = req.body.paymentLimit;
  delete branchID;
  delete teller;

  TellerID
    .findOne({_id: req.params.id})
     .exec()
     .then(function(result){
       if( result.paymentLimit !== undefined){   //true required
         result.paymentLimit = limit;
       } else {
         result.paymentLimit = result.paymentLimit
       }
       

       return result.save();
     })
     .then(function (savedata) {
       var myJSON = JSON.stringify(savedata);
      var a = b64url.encode(myJSON);
       return res.json({error : false , result : a,message:'update'});
     })
     .catch(function (err) {
       return res.json({error : true , reason: err});
     })
},
getAll: function(req, res){
var query = { };
if(req.query.bid != undefined){
  query["branchID"] = req.query.bid;
}
if(req.query.tid != undefined){
  query["tellerID"] = req.query.tid;
}
if(req.query.mac != undefined){
  query["macAddress"] = req.query.mac;
}
//  console.log(query);
TellerID
.find(query)
// .populate('_supervisiorID')
.exec()
.then(function (allteller){
  var myJSON = JSON.stringify(allteller);
 var tell = b64url.encode(myJSON);
  return res.json({
    error : false ,
    result: allteller
   });

})
.catch(function (err) {
  return res.json({error : true , reason: err});
})

},
}
