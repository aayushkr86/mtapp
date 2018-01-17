var CountrycurrenctList = require('../../models/countrycurrencylist');
var Country = require('../../models/country');
var Branch = require('../../models/branch');
var Tariff = require('../../models/tariff');


module.exports = {
	add: function(req,res){
      if(!req.body.countryName){
            return res.json({error : false , result : 'countryName can not be empty'});
         }else if(!req.body.currencyName){
           return res.json({error : false , result : 'currency can not be empty'});
         }
    CountrycurrenctList
	.find({"countryName":req.body.countryName})
	.exec(function (err, results) {
			if(err){}
		if(results.length){
			return res.json({error : false , result : 'Country and currency already defined'});
		}else{
			var data = {
				"countryName":req.body.countryName ,
				"currencyName":req.body.currencyName
			}
			var comission = new CountrycurrenctList(data);
        comission.save(function (err, result){
                 if(err){
                       return res.json({error: true , reason: err});
                     }
                     return res.json({error : false , result : 'countrycurrecny added'});
        });
		}
	});

	},
	getAll: function(req,res){
     
     CountrycurrenctList
	 .find()
	 .exec(function(err , result) {
	     if(err){
	          return res.json({error : true , reason: err});
	     } else{ 
	          return res.json({error : false , result: result});
	     }

	  });
	},

	getCurrency: function(req,res){

	CountrycurrenctList
	 .find({'countryName':req.body.countryName})
	 .exec(function(err , result) {
	     if(err){
	          return res.json({error : true , reason: err});
	     } else{ 
	          return res.json({error : false , result: result});
	     }

	  });

	},
	 update: function(req,res){
   var countryName =req.body.countryName;
   var currencyName = req.body.currencyName;
   
  

  CountrycurrenctList
   .findOne({_id: req.params.id})
    .exec()
    .then(function(result){

      if( result.countryName !== undefined){   //true required
        result.countryName = countryName;
      } else {
        result.countryName = result.countryName;
      }
      
      if( result.currencyName !== undefined){   //true required
        result.currencyName = currencyName;
      } else {
        result.currencyName = result.currencyName
      }
     
      return result.save();
    })
    .then(function (savedata) {
      return res.json({error : false , result : savedata, message:'updated'});
    })
    .catch(function (err) {
      return res.json({error : true , reason: err});
    })

 },
   delete: function(req,res){
    CountrycurrenctList
     .findById({_id : req.params.id},function(err,result){
       if(err){
               return res.json({error : true , reason: err});
           } else{
             console.log(result.countryName)
             Country
             .findOne({countryName:result.countryName})
             .exec(function(err , result1) {
                 if(err){
                      return res.json({error : true , reason: err});
                 } else{
                      if(result1){
                        return res.json({error : false , message:'You can not delete country,its use somewhere else'});
                      }else{
                        Branch
                        .findOne({country:result.countryName})
                        .exec(function(err , result2) {
                          if(err){
                              return res.json({error : true , reason: err});
                         } else{
                           if(result2){
                            return res.json({error : false , message:'You can not delete country,its use somewhere else'});
                          }else{
                            Tariff
                            .findOne({country:result.countryName})
                            .exec(function(err , result3) {
                              if(err){
                                  return res.json({error : true , reason: err});
                             } else{
                               if(result3){
                                 return res.json({error : false , message:'You can not delete country,its use somewhere else'});
                               }else{
                                  CountrycurrenctList
                                   .findByIdAndRemove({_id : req.params.id}, function(err,result4){
                                      if(err){
                                          return res.json({error : true , reason: err});
                                      } else{
                                           console.log("delete");
                                          return res.json({error : false , result: result4,message:"CountrycurrencyList deleted successfully"});
                                      }
                                   });

                               }//not tariff
                             }//tariff
                            });//find tariff
                          }//foundbranch
                         }//branchfind else

                        });//branchfind
                      }//country else
                 }//else countryfind

              });//find country

           }//else findById
     });

   },
getOne: function(req,res){
   CountrycurrenctList
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
	

}