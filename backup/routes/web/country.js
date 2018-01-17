var Country = require('../../models/country');
var b64url = require('b64url');
var BulkSMS = require('bulksms');






module.exports = {

add:function(req,res){

  var country = b64url.decode(req.body.countryName);
  var currency = b64url.decode(req.body.currency);
  var limit = b64url.decode(req.body.paymentLimit);
  var region = b64url.decode(req.body.region);
  if(!country){
            return res.json({error : false , message : 'country can not be empty'});
         }else if(!currency){
           return res.json({error : false , message : 'currency can not be empty'});
         }
        else if(!limit){
            return res.json({error : false , message : 'paymentLimit can not be empty'});
        }else{
 Country.find({countryName:country,region:region}).exec(function (err, results) {
     if(err){}
   if(results.length){
       return res.json({error : false , message : 'This countryLimit already define,Please enter another region for this country'});
   }else{

       var data ={
         "countryName":country,
         "currency":currency,
         "paymentLimit":limit,
         "region":region
       };
     var teller = new Country(data);
     teller.save(function (err, result){
              if(err){
                    return res.json({error: true , reason: err});
                  }
                  var myJSON = JSON.stringify(result);
                  var a = b64url.encode(myJSON);
                  return res.json({error : false , message : 'Country added' ,result:a});
              });
   }

});
}
},
getOne: function(req,res){
   Country
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
     Country
      .findByIdAndRemove({_id : req.params.id}, function(err,result){
         if(err){
             return res.json({error : true , reason: err});
         } else{
              console.log("delete");
             return res.json({error : false , result: result,message:" Countrylimit details deleted successfully"});
         }
      });
   },
 update: function(req,res){
  var country = req.body.countryName;
  var currency = req.body.currency;
  var limit = req.body.paymentLimit;
  var region = req.body.region;
  delete  country;
  delete currency;


  Country
    .findOne({_id: req.params.id})
     .exec()
     .then(function(result){
      
       if( result.region !== undefined){   //true required
         result.region = region;
       } else {
         result.region = result.region
       }
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

get:function(req,res){
 //  Country
 // .find()
 // .exec(function(err , result) {
 //     if(err){
 //          return res.json({error : true , reason: err});
 //     } else{
 //             // var myJSON = JSON.stringify(result);
 //             // var a = b64url.encode(myJSON);
 //          return res.json({error : false , result: result});
 //     }

 //  });
 var query = { };
   if(req.query.bid != undefined){
     query["currency"] = req.query.bid;
     console.log(query);
   }
   if(req.query.sid != undefined){
     query["paymentLimit"] = req.query.sid;
     console.log(query);
   }

  Country
   .find(query)
   // .populate('_branchID')
   .exec(function(err , result) {
       if(err){
            return res.json({error : true , reason: err});
       } else{
            // var myJSON = JSON.stringify(result);
      //       var a = b64url.encode(myJSON);
            return res.json({error : false , result: result});
       }

    });
},
find: function(req,res){
  /*
  const SMS = new BulkSMS('[USER]', '[PASSWORD]')
SMS.send('[NUMBER]', 'Hello, this is just a test!', (err, result) => {
  if (err)
    return console.error(err)

  console.log(result)
})
  */
  var number = req.body.phone;
  var sms = new BulkSMS('bramsdiouf','Saliou11diouf@');
  sms.send(number,'hello',(err,result)=>{
    if(err){
         return res.json({error : true , reason: err});
    } else{
      console.log(111);
      console.log(result);
    }
  });

},
// decode: function(req,res){
//   var data = b64url.decode(req.body.result);
//   console.log(data);
// }
}
