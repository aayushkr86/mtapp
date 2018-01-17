var mongoose = require('mongoose');
var moment = require('moment');

var beneficiarySchema = new mongoose.Schema({
    beneficiaryname:{
      type:String
    },
    beneficiarysurName:{
      type:String
    },
    beneficiaryemail:{
      type:String,
      lowercase: true,
    },
    beneficiaryaddress:{
      type:String
    },
    beneficiarymobile:{
      type:String
    },
    beneficiaryidType:{
    type:String,
    // enum:['ID','Passport','Other']
  },
  beneficiaryidNo:{
    type:String
  },
  bissueCountry:{
    type:String
  },
  bissueDate:{
    type:Date,
    default:Date.now
  },
  bexpDate:{
    type:Date,
    default:Date.now
  },
    amount:{
      type:Number
    },
    country:{
     type:String
    },
    // country:{
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: 'country'
    // },
    status:{
      type:String,
      enum:['Blacklist','Verified'],
      default:'Verified'
    },
    branchID:{
      type:String
    }

});

module.exports = mongoose.model('beneficiary', beneficiarySchema);
