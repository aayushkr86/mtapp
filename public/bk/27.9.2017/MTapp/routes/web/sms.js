var client = require('twilio')(
  process.env.AC29c1c79b4e4ddefe72d25cfa24450c91,
  process.env.b84ff58d58544003a3272d562c3f2edd
);

client.messages.create({
  from: process.env.+16198708119,
  to: process.env.+917047012590,
  body: "You just sent an SMS from Node.js using Twilio!"
}, function(err, message) {
  if(err) {
    console.error(err.message);
  }
});


var client = require('twilio')(
"AC399f0f0193717a1720c8bac8b5a86474",
"761455dfed02476ca72a1ac2e9810d20"
);


/*


var Country = require('../../models/country');

 // var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
 // var crypt = require('cryptlib');
// var cryptLib = require('cryptlib');
var b64url = require('b64url');



var client = require('twilio')(
"AC399f0f0193717a1720c8bac8b5a86474",
"761455dfed02476ca72a1ac2e9810d20"
);


module.exports = {
  add:function(req,res){
    //  var phone = req.body.phone;
    // client.messages.create({
    //   to: phone,
    //   from: "+16198708119",
    //   body: "hello"
    // }, function(err, message) {
    //   if(err) {
    //     console.error(err);
    //   }
    //   console.log(message);
    // });
    // var a = b64url.encode(req.body.name)
    // console.log(a);

console.log(b64url.decode(req.body.name));

// console.log(b64url.encode(req.body.surName));
// console.log(b64url.encode(req.body.email));
// console.log(b64url.encode(req.body.b));
  //  var country = b64url.encode(req.body._country);
  //  var amount = b64url.encode(req.body.amount);
  //  var fee = b64url.encode(req.body.fees);
  //  var tax = b64url.encode(req.body.tax);
  //  var total =b64url.encode (req.body.totalAmount);
  //  var recieve = b64url.encode(req.body.beneficiaryRecieve);
  //  var remitname = b64url.encode(req.body.remitterDetails.name);
  //  var remitsurName = b64url.encode(req.body.remitterDetails.surName);
  //  var remitmail = b64url.encode(req.body.remitterDetails.email);
  //  var remitaddress =b64url.encode(req.body.remitterDetails.address);
  //  var remitmobile =b64url.encode(req.body.remitterDetails.mobile);
  //  var remitidType =b64url.encode(req.body.remitterDetails.idType);
  //  var remitidNo =b64url.encode(req.body.remitterDetails.idNo);
  //  var issueCountry =b64url.encode(req.body.remitterDetails.issueCountry);
  //  var issueDate =b64url.encode(req.body.remitterDetails.issueDate);
  //  var expDate = b64url.encode(req.body.remitterDetails.expDate);
   //
  //  var mode =  b64url.encode(req.body.remittanceMode);
   //
  //  var bname =  b64url.encode(req.body.beneficiaryDetails.name);
  //  var bsurName =  b64url.encode(req.body.beneficiaryDetails.surName);
  //  var bmail =  b64url.encode(req.body.beneficiaryDetails.email);
  //  var baddress = b64url.encode(req.body.beneficiaryDetails.address);
  //  var bmobile = b64url.encode(req.body.beneficiaryDetails.mobile);
  //  var status = b64url.encode (req.body.status);
  //  var supplier = b64url.encode(req.body._supplierCode);
  //  var branch = b64url.encode(req.body._branchID);
  //  var teller = b64url.encode(req.body._tellerID);
   //
  //   console.log('country',country,'amount',amount,'fee',fee,'tax',tax,'total',total,'recieve',recieve,'remitname',remitname,
  //   'remitmail',remitmail,'remitidType',remitidType,'bname',bname,'bmail',bmail);

    // var type = b64url.encode(req.body.userType);
    // var Name = b64url.encode(req.body.name);
    // var last = b64url.encode(req.body.surName);
    // var mail = b64url.encode(req.body.email);
    // var region = b64url.encode(req.body.region);
    // var country = b64url.encode(req.body.country);
    // var status = b64url.encode(req.body.status);
    // console.log('t',type,'na',Name,'last',last,'mail',mail,'region',region,'count',country,'st',status);



  //   var country = req.body.countryName;
  //     var currency = req.body.currency;
  //   var data ={
  //           "countryName":country,
  //           "currency":currency
  //         };
  //        var myJSON = JSON.stringify(data);
  //  var a = b64url.decode(myJSON);
  //  console.log(a);
    // var transdate =req.body.transactionDate;
    // var country = b64url.encode(req.body._country);
    // console.log('1',country);
    // var amount =b64url.encode(req.body.amount);
    // console.log('2',amount);
    // var fee = b64url.encode(req.body.fees);
    // console.log('3',fee);
    // var tax =b64url.encode(req.body.tax);
    // console.log('4',tax);
    // var total =b64url.encode(req.body.totalAmount);
    // console.log('5',total);
    // var recieve = b64url.encode(req.body.beneficiaryRecieve);console.log('aa',recieve);
    // var remitname = b64url.encode(req.body.remitterDetails.name);console.log('\n',remitname);
    // var remitsurName = b64url.encode(req.body.remitterDetails.surName);console.log('\n',remitsurName);
    // var remitmail = b64url.encode(req.body.remitterDetails.email);console.log('\n',remitmail);
    // var remitaddress =b64url.encode(req.body.remitterDetails.address);console.log('\n',remitaddress);
    // var remitmobile =b64url.encode(req.body.remitterDetails.mobile);console.log('\n',remitmobile);
    // var remitidType =b64url.encode(req.body.remitterDetails.idType);console.log('\n',remitidType);
    // var remitidNo =b64url.encode(req.body.remitterDetails.idNo);console.log('\n',remitidNo);
    // var issueCountry =b64url.encode(req.body.remitterDetails.issueCountry);console.log('\n',issueCountry);
    // var issueDate =b64url.encode(req.body.remitterDetails.issueDate);console.log('\n',issueDate);
    // var expDate = b64url.encode(req.body.remitterDetails.expDate);console.log('\n',expDate);
    //
    // var mode =  b64url.encode(req.body.remittanceMode);console.log('\n',mode);
    //
    // var bname =  b64url.encode(req.body.beneficiaryDetails.name);console.log('\n',bname);
    // var bsurName =  b64url.encode(req.body.beneficiaryDetails.surName);console.log('\n',bsurName);
    // var bmail =  b64url.encode(req.body.beneficiaryDetails.email);console.log('\n',bmail);
    // var baddress = b64url.encode(req.body.beneficiaryDetails.address);console.log('\n',baddress);
    // var bmobile = b64url.encode(req.body.beneficiaryDetails.mobile);console.log('\n',bmobile);
    // var status =b64url.encode (req.body.status);console.log('\n',status);
    // var supplier = b64url.encode(req.body._supplierCode);console.log('\n',supplier);
    // var branch = b64url.encode(req.body._branchID);console.log('\n',branch);
    // var teller = b64url.encode(req.body._tellerID);console.log('\n',teller);
//     var data = req.body;
//    Country.find({countryName:req.body.countryName }).exec(function (err, results) {
//        if(err){}
//      if(results.length){
//          return res.json({error : false , result : 'This Country Already Exist'});
//      }else{
//        var teller = new Country(data);
//        teller.save(function (err, result){
//                 if(err){
//                       return res.json({error: true , reason: err});
//                     }
//                     return res.json({error : false , result : 'Country added'});
//                 });
//      }
//
// });
},
// add:function(req,res){
//   var country = req.body.countryName;
//   var currency = req.body.currency;
//  Country.find({countryName:country }).exec(function (err, results) {
//      if(err){}
//    if(results.length){
//        return res.json({error : false , result : 'This Country Already Exist'});
//    }else{
//
//        var data ={
//          "countryName":country,
//          "currency":currency
//        };
//       var myJSON = JSON.stringify(data);
// var a = b64url.encode(myJSON);
//        console.log(a);
//      var teller = new Country(a);
//      teller.save(function (err, result){
//               if(err){
//                     return res.json({error: true , reason: err});
//                   }
//                   return res.json({error : false , result : 'Country added'});
//               });
//    }
//
// });
// },

get:function(req,res){
  Country
 .find()
 .exec(function(err , result) {
     if(err){
          return res.json({error : true , reason: err});
     } else{
          // console.log(result[0].countryName);
          //  var backAgain = urlCrypt.decryptObj(result[0].countryName);
          // console.log('data',backAgain);
          return res.json({error : false , result: result});
     }

  });
},
}
// find:function(req,res){
//   var data = req.body.text;
//   // var encoded = b64url.encode(data);
//   // console.log(encoded);
//  var decoded = b64url.decode(data);
//  console.log('de',decoded);
// },
// find:function(req,res){
//  var mail = req.body.email;
//
//  var iv = crypt.generateRandomIV(16);//16 bytes = 128 bit
//  var key = crypt.getHashSha256('my secret key', 32);
//  cypherText = crypt.encrypt(mail, key, iv);
//  var text = crypt.decrypt(cypherText, key, iv);
//  console.log(text);
// // var base64 = urlCrypt.cryptObj(mail);
// //console.log(base64);
//
//     // var iv = cryptLib.generateRandomIV(16); //16 bytes = 128 bit
//     // var key =cryptLib.getHashSha256('my secret key', 32); //32 bytes = 256 bits
//     // // var encryptedText = cryptLib.encrypt(mail, key, iv);
//     // // console.log(encryptedText);
//     // var a = cryptLib.decrypt(mail, key, iv);
//     // console.log(a);
//
//
//
// },


/*var backAgain = urlCrypt.decryptObj(mail);
console.log(backAgain);*/
/*
var crypt = require('cryptlib');
var CryptoJS = require("crypto-js");
// var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');
........................................................

//  var base64 = urlCrypt.cryptObj(mail);
//  console.log(base64);
//  var phone = req.body.currency;
// var data ={
//   "countryName":base64,
//    "currency":phone
//
// }

// // Encrypt
// var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123');
//   console.log('mail',ciphertext);
// // Decrypt
// var bytes  = CryptoJS.AES.decrypt(ciphertext.toString(), 'secret key 123');
// var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
//
// console.log(decryptedData);

// Get some data
// var data = { hello: 'world', this: 'is a test', of: 'url-crypt' };

// Encrypt your data
//
// var teller = new Country(data);
// console.log('tel',teller);
// teller.save(function (err, result){
//          if(err){
//                return res.json({error: true , reason: err});
//              }
//              return res.json({error : false , result : 'Country added'});
//          });
// var backAgain = urlCrypt.decryptObj(base64);
// console.log('data',base64);
// console.log('back',backAgain);
*/

// add:function(req,res){
//   var country = req.body.countryName;
//   var currency = req.body.currency;
//  Country.find({countryName:req.body.country }).exec(function (err, results) {
//      if(err){}
//    if(results.length){
//        return res.json({error : false , result : 'This Country Already Exist'});
//    }else{
//      var base64 = urlCrypt.cryptObj(country);
//      var data = {
//        "countryName":base64,
//        "currency":currency
//      };
//      var teller = new Country(data);
//      teller.save(function (err, result){
//               if(err){
//                     return res.json({error: true , reason: err});
//                   }
//                   return res.json({error : false , result : 'Country added'});
//               });
//    }
//
// });
// },
