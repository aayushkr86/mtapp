var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
   countryName: {
     type: String,

   },
   currency:{
     type:String
   },
   paymentLimit:{
     type:Number
   },
   region:{
    type:String,
    unique:true
   },
   isActive: {
      type: Boolean,
      default: true
    }
});

module.exports = mongoose.model('country', countrySchema);
