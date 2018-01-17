var mongoose = require('mongoose');



var tellerIDSchema = new mongoose.Schema({
  supervisiorID: {
     type:String
   },
   branchID:{
    type:String
   },
   tellerID: {
     type: String,
     unique:true
   },
   paymentLimit:{
     type:Number
   },
   telleridmac:{
     type:String
   },

   isActive: {
      type: Boolean,
      default: true
    }
});



module.exports = mongoose.model('tellerID', tellerIDSchema);
