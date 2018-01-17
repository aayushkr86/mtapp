var mongoose = require('mongoose');
var moment = require('moment');

var remitterSchema = new mongoose.Schema({
  remittername:{
      type:String
    },
    remittersurName:{
      type:String
    },
    remitteremail:{
      type:String,
      lowercase: true,
    },
    remitteraddress:{
      type:String
    },
    remittermobile:{
      type:String
    },
    remitteridType:{
      type:String,
      // enum:['ID','Passport','Other']
    },
    remitteridNo:{
      type:String
    },
    issueCountry:{
      type:String
    },
    issueDate:{
      type:Date,
      default:Date.now
    },
    expDate:{
      type:Date,
      default:Date.now
    },
    amount:{
      type:Number
    },
    region:{
      type:String,
    },
    status:{
      type:String,
      enum:['Blacklist','Verified'],
      default:'Verified'
    },
    branchID:{
      type:String
    },
    blacklist:{
      type:String
    }

});

module.exports = mongoose.model('remitter', remitterSchema);
