var Invoice = require('../../models/invoice');
var moment = require('moment');
const crypto = require('crypto');
var b64url = require('b64url');

module.exports = {
  add: function(req,res){
    // var d = moment().hour();
    // console.log(d)
    // console.log(Date.now())
    var data = req.body;
    var uID = crypto.randomBytes(2).toString('hex'); //eg.uID = 3d4f
     var current = new Date().getFullYear();
     data.invoiceNumber = "MT"+uID +""+ current;
     console.log(data.invoiceNumber);

    if (moment(data.invoiceDate, 'DD/MM/YYYY').isValid()){
      data.invoiceDate = moment(data.invoiceDate, 'DD/MM/YYYY').toDate();
    }else{
      data.invoiceDate = undefined;
    }
     var invoice = new Invoice(data);
     invoice.save(function (err, result){
              if(err){
                    return res.json({error: true , reason: err});
                  }else{
                    console.log("invoice added")
                      return res.json({error : false , result : result});
                  }
              });


  },
  getInvoicRecord: function(req, res){
  var a = req.query.startDate;
  var b = req.query.endDate;
  var start_date = moment(a, 'DD/MM/YYYY').toDate();
  var end_date = moment(b, 'DD/MM/YYYY').toDate();


  var query = { };
  if(req.query.invoiceNumber != undefined){
    query["invoiceNumber"] = req.query.invoiceNumber;                               /*FIND BY status*/
    console.log(query);
  }
  if(req.query.startDate != undefined && req.query.endDate != undefined ){
    query["invoiceDate"] = { $gte: start_date, $lte: end_date };              /*FIND BY DATE RANGE*/
    //console.log(query);
  }
  //  console.log(query);
  Invoice
  .find(query)
  .populate('_transactionNumber')
  .exec()
  .then(function (allFee){
    var myJSON = JSON.stringify(allFee);
    var a = b64url.encode(myJSON);
    return res.json({
      error : false ,
      result: a
     });

  })
  .catch(function (err) {
    console.log(err);
    return res.json({error : true , reason: err});
  })

},
searchInvoice: function(req,res){
  var number =  req.body.invoiceNumber;
  Invoice
  .find({'invoiceNumber':number})
  .populate('_transactionNumber')
  .exec()
  .then(function (allFee){
    var myJSON = JSON.stringify(allFee);
    var a = b64url.encode(myJSON);
    return res.json({
      error : false ,
      result: a
     });

  })
  .catch(function (err) {
    console.log(err);
    return res.json({error : true , reason: err});
  })
},
// find:function(req,res){
//   var date = new Date(), y = date.getFullYear(), m = date.getMonth();
//   var firstDay = new Date(y, m, 1);
//   console.log('firstDay',firstDay);
//   let now = moment().format();
//    console.log('today',now);
//   Invoice
//   .find({"invoiceDate":{ $gte: firstDay, $lte: now }})
//   .exec(function(err, branchData){
//     if(err){
//         return res.json({error : true, reason : err});
//     }else {
//       return res.json({error : true, result : branchData});
//     }
// });
// },
}
/*
var data = req.body;
     if (data.dateOfBirth !== undefined) {
       var dateTimeMoment = moment(data.dateOfBirth, 'DD/MM/YYYY')
       if (dateTimeMoment.isValid()) {
         data.dateOfBirth = dateTimeMoment.toDate()
       } else {
         return res.json({error: false, message: 'wrong date format1'});
       }
     }


*/
