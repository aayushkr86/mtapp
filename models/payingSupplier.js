var mongoose = require('mongoose');

var payingSupplierSchema = new mongoose.Schema({
	supplierCode:{
		type:String
	},
	supplierName:{
		type:String
	},
	invoiceNumber:{
		type:Number
	},
	invoicedate:{
     type: Date,
     default: Date.now
	},
	amount:{
		type:String
	},
  remitterName: {
  	type:String,
  },
  remittersurName:{
    type:String
  },
  mobileNumber:{
  	type:String
  },
  address:{
  	type:String
  },
  ID:{
  	type:String
  },
  fee:{
  	type:Number
  },
  tax:{
  	type:Number
  },
  total:{
  	type:Number
  },
  isActive: {
   type: Boolean,
   default: true
 } 
  });

  module.exports = mongoose.model('payingSupplier', payingSupplierSchema);
