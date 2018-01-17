var mongoose = require('mongoose');


var countrycurrencylistSchema = new mongoose.Schema({
	
	countryName: {
		type: String,
	},
	currencyName: {
      type: String,
    },
	
	isActive:{
		type : Boolean,
		default : true
	},

});

module.exports = mongoose.model('countrycurrencylist',countrycurrencylistSchema);