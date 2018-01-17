var mongoose = require('mongoose');
var moment = require('moment');
var TransactionSchema = new mongoose.Schema({
  transactionDate: {
   type: Date,
   default: Date.now
  },
  transactionNumber:{
    type:String,
    unique:true
  },
  // country:{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'tariff'
  // },
  country:{
  type:String
  },
  currency:{
   type:String
  },
  amount:{
    type:Number
  },
  fees:{
    type:Number
  },
  tax:{
    type:Number
  },
  totalAmount:{
    type:Number
  },
  beneficiaryRecieve:{
    type:Number
  },
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
    remitteramount:{
      type:Number
    },
  remittanceMode:{
    type:String,
    // enum:['Cash To Cash', 'Cash To Account', 'Cash To E-Wallet']
  },
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
    beneficiaryamount:{
      type:Number
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

  status:{
    type:String,
    enum:['Paid','Pending','Reimbursed Request','Reimbursed Approved','Reimbursed Done']
  },
  branchID:{
    type:String
  },
  tellerID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'teller'
  }


});

module.exports = mongoose.model('transaction', TransactionSchema);
