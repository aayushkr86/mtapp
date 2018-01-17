
var mongoose = require('mongoose');

var supplierSchema = new mongoose.Schema({
  supplierCode: {
		type:String,
		 unique:true
	},
	supplierName : {
		type : String,
		required : true,
	},
  email: {
      type: String,
      lowercase: true,
  },
	contact:{
		type:String,
	},
	sector: {
		type:String
	},
	country: {
		type: String,
	},
isActive: {
   type: Boolean,
   default: true
 },
  charge:{
    type:Number
  }

});

module.exports = mongoose.model('supplier',supplierSchema);
