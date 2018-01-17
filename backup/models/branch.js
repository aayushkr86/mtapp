var mongoose = require('mongoose');


var branchSchema = new mongoose.Schema({
	branchID: {
		type:String,
		 unique:true
	},
	fullName : {
		type : String,
		required : true,
	},
	contact:{
		type:String,
	},
	telephone: {
		type:String
	},
	country: {
		type: String,
	},
	Address1: {
      type: String,
    },
	Address2: {
	      type: String,
	 },
  email: {
      type: String,
      lowercase: true,
  },
paymentLimit: {
    type:Number
  },
	workdays: [
				{
						type:String
				}
			],

hoursOfWorkDaily: {
				 type: Number
			 },
	isActive:{
		type : Boolean,
		default : true
	},

});

module.exports = mongoose.model('branch',branchSchema);
