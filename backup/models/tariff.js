var mongoose = require('mongoose');

var tariffSchema = new mongoose.Schema({
  country:{
    type:String
  },
  currency:{
    type:String
  },
  minAmount:{
    type:Number
  },
  maxAmount:{
    type:Number
  },
  tax:{
    type:Number
  },
  tariff:{
    type:Number
  },
  tariffExclude:{
    type:Number
  },
  branchID:{
    type:String
  },
   isActive: {
      type: Boolean,
      default: true
    }
});

module.exports = mongoose.model('tariff', tariffSchema);
