var PayingSupplier = require('../../models/payingSupplier');
var moment = require('moment');

module.exports = {

  add: function(req,res){
  	var data = req.body;

  	PayingSupplier.find({supplierCode:req.body.supplierCode }).exec(function (err, results) {
		    if(err){}
		  if(results.length){
		      return res.json({error : false , message : 'This payingSupplier Already Exist'});
		  }else{
		  	 var payingSupplier = new PayingSupplier(data);
		      payingSupplier.save(function (err, result){
		              if(err){
		                    return res.json({error: true , reason: err});
		                  }else{              
		                      return res.json({error : false , result : result,message:'PayingSupplier done'});
		                  }
		              });
		 }
     })
  	
  },


}