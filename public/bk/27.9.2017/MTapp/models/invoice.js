var mongoose = require('mongoose');
var moment = require('moment');
var InvoiceSchema = new mongoose.Schema({
  invoiceNumber:{
    type:String,
    unique:true
  },
    invoiceDate: {
     type: Date,
     default: Date.now
    },
    _transactionNumber:{
      type: mongoose.Schema.Types.ObjectId,
      // required: true,
      ref: 'transaction'
    }


});

module.exports = mongoose.model('invoice', InvoiceSchema);
