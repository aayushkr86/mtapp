var mongoose = require('mongoose');
var moment = require('moment');


var blacklistSchema = new mongoose.Schema({
  
  name: {
  	type:String,
  },
  surName:{
    type:String
  },
 


  });

  module.exports = mongoose.model('blacklist', blacklistSchema);
