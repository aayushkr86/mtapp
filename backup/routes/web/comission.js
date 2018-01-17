var Comission = require('../../models/comission');

module.exports = {
	add: function(req,res){
     
		 var data = req.body;
     if(!req.body.branchID){
        return res.json({error : false , result : 'branchID can not be empty'});
    } else if(!req.body.sendercomision){
           return res.json({error : false , message : 'Sendercomision can not be empty'});
         }
        else if(!req.body.platformcomsion){
            return res.json({error : false , message : 'Platformcomsion can not be empty'});
        }else if(!req.body.benefcomision){
           return res.json({error : false , message : 'Benefcomision can not be empty'});
         }else{
       Comission.find({branchID:req.body.branchID}).exec(function (err, results) {
           if(err){ return;}
         if(results.length){
             return res.json({error : false , result : 'This branch comission already define,please choose different branchID'});
         }else{
             var comission = new Comission(data);
               comission.save(function (err, result){
                        if(err){
                              return res.json({error: true , reason: err});
                            }
                            return res.json({error : false , result : 'comission added'});
               });
         }
       });
    }
			

	},
	getAll: function(req,res){

     Comission
	 .find()
	 .exec(function(err , result) {
	     if(err){
	          return res.json({error : true , reason: err});
	     } else{
	          return res.json({error : false , result: result});
	     }

	  });
	},
  delete: function(req,res){
     Comission
      .findByIdAndRemove({_id : req.params.id}, function(err,result){
         if(err){
             return res.json({error : true , reason: err});
         } else{
              console.log("delete");
             return res.json({error : false , result: result,message:"Comission sharing details deleted successfully"});
         }
      });
   },
getOne: function(req,res){
   Comission
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
    var sendercomision = req.body.sendercomision;
    var platformcomsion = req.body.platformcomsion;
    var benefcomision = req.body.benefcomision;
    var branchID = req.body.branchID;
    delete branchID;
    Comission
      .findOne({_id: req.params.id})
       .exec()
       .then(function(result){
         if( result.sendercomision !== undefined){   //true required
           result.sendercomision = sendercomision;
         } else {
           result.sendercomision = result.sendercomision
         }
         if( result.platformcomsion !== undefined){   //true required
           result.platformcomsion = platformcomsion;
         } else {
           result.platformcomsion = result.platformcomsion;
         }

         if( result.benefcomision !== undefined){   //true required
           result.benefcomision = benefcomision;
         } else {
           result.benefcomision = result.benefcomision;
         }

         return result.save();
       })
       .then(function (savedata) {

         return res.json({error : false , result : savedata,message:'updated'});
       })
       .catch(function (err) {
       	console.log(err)
         return res.json({error : true , reason: err});
       })
  },

}
