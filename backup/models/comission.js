var mongoose = require('mongoose');
var moment = require('moment');
var ComissionSchema = new mongoose.Schema({
  sendercomision:{
    type:Number,
    
  },
platformcomsion: {
     type: Number,  
},
benefcomision:{
  type:Number
} ,
branchID:{
  type:String
} ,
 isActive: {
      type: Boolean,
      default: true
    }   
});

module.exports = mongoose.model('comission', ComissionSchema);