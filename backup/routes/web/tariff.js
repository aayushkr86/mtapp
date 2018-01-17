var Tariff = require('../../models/tariff');
var b64url = require('b64url');

module.exports = {
  add: function(req,res){

    // var currency = b64url.encode(req.body.currency);
    // console.log('cur',currency)
    //  var minAmount = b64url.encode(req.body.minAmount);
    //  console.log('min',minAmount);
    //  var maxAmount = b64url.encode(req.body.maxAmount);
    //  console.log('max',maxAmount);
    // var taxes = b64url.encode(req.body.tax);
    // var tariff =b64url.encode(req.body.tariff);
    //  console.log('tax',taxes,'t',tariff);
    //  var country = b64url.encode(req.body.country);
    //  console.log(country);

    var country = req.body.country;
    var currency = req.body.currency;
    var minAmount = req.body.minAmount;
    var maxAmount = req.body.maxAmount;
    var taxes = req.body.tax;
    var tariff =req.body.tariff;
    // var tariffExclude = req.body.tariffExclude;
    var branchID = req.body.branchID;

    var min = parseInt(minAmount);
    var max = parseInt(maxAmount);
    var tax = parseInt(taxes);
    var fee = parseInt(tariff);
     var tariffexc = (fee*tax)/100;

       if(!branchID){
            return res.json({error : false , message : 'BranchID can not be empty'});
         }else if(!country){
           return res.json({error : false , message : 'country can not be empty'});
         }
        else if(!currency){
            return res.json({error : false , message : 'currency can not be empty'});
        }else if(!minAmount){
           return res.json({error : false , message : 'minAmount can not be empty'});
         }else if(!maxAmount){
           return res.json({error : false , message : 'maxAmount can not be empty'});
         }else if(!tariff){
           return res.json({error : false , message : 'tariff can not be empty'});
         }else if(!taxes){
           return res.json({error : false , message : 'tax can not be empty'});
         }else if(maxAmount == minAmount){
           return res.json({error : false , message : 'maxAmount and minAmount can not be same,maxAmount should be greater than minAmount'});
         }

         else{    

    Tariff
    // .find({'country':country,'minAmount':min,'maxAmount':max })
    .find({$and: [{"maxAmount":{ $gte: min}},{'country':country}]})
    .exec(function (err, results) {
        if(err){}
      if(results.length){
        return res.json({error : false , message : 'Country with minAmount and maxAmount are already defined,add condition for created amount like 1000--5000 next will be greater than this'});
      }else{
            var data = {
              "country":country,
              "currency":currency,
              "minAmount":min,
              "maxAmount":max,
              "tax":tax,
              "tariff":fee,
              "tariffExclude":tariffexc,
              "branchID":branchID
            }

            var tariff = new Tariff(data);
            tariff.save(function (err, result){
                     if(err){
                           return res.json({error: true , reason: err});
                         } else {
                                 var myJSON = JSON.stringify(result);
                                var a = b64url.encode(myJSON);
                             return res.json({error : false , message: "Tariff add sucessfully",result : a});
                         }

             });

      }

 });
 }
  },
  update: function(req,res){
    var country = req.body.country;
    var minAmount = req.body.minAmount;
    var maxAmount = req.body.maxAmount;
    var tax = req.body.tax;
    var tariff =req.body.tariff;
    
    var currency = req.body.currency;
    var branchID = req.body.branchID;
    delete country;
    delete currency;
    delete branchID;

    var tax1 = parseInt(tax);
    var fee = parseInt(tariff);
    var tariffExclude  = (fee*tax1)/100;

    Tariff
      .findOne({_id: req.params.id})
       .exec()
       .then(function(result){
         if( result.minAmount !== undefined){   //true required
           result.minAmount = minAmount;
         } else {
           result.minAmount = result.minAmount
         }
         if( result.maxAmount !== undefined){   //true required
           result.maxAmount = maxAmount;
         } else {
           result.maxAmount = result.maxAmount;
         }
         if( result.tax !== undefined){   //true required
           result.tax = tax;
         } else {
            result.tax = tax;
         }
         if( result.tariff !== undefined){   //true required
           result.tariff = tariff;
         } else {
           result.tariff = result.tariff;
         }
         if( result.tariffExclude !== undefined){   //true required
           result.tariffExclude = tariffExclude;
         } else {
           result.tariffExclude = result.tariffExclude;
         }

         return result.save();
       })
       .then(function (savedata) {
         var myJSON = JSON.stringify(savedata);
         var a = b64url.encode(myJSON);
         return res.json({error : false , result : a,message:'updated'});
       })
       .catch(function (err) {
         return res.json({error : true , reason: err});
       })
  },
  getOne: function(req,res){
   Tariff
    .findOne({_id : req.params.id})
   .exec(function(err , result){
       if(err){
            return res.json({error : true , reason: err});
       } else{
            //console.log("ok");
            return res.json({error : false , result: result});
       }

   });
 },
  find:function(req,res){

    var cur = b64url.decode(req.body.country);
    var amount = b64url.decode(req.body.amount);
    // var cur = req.body._country;
    // var amount = req.body.amount;
    console.log(cur,amount);
    Tariff
   .findOne({'country' : cur,minAmount: { $lte: amount },maxAmount: { $gte: amount }})
   .exec(function(err , result) {
       if(err){
            return res.json({error : true , reason: err});
        } else{


             var tar = result.tariff;
            //  console.log('tariff',tar);
            var tax = result.tax;
            var cal = (tar*tax)/100;
            // console.log('cal',cal);
            var fee = tar+cal;
            // console.log('fees',fee);
           var fees = parseInt(fee);
           var money = parseInt(amount);
          //  console.log('money',money);
           var total = money + fees;
          //  console.log('total',total);
          //  var myJSON = JSON.stringify(result);
          // var a = b64url.encode(myJSON);
          var t = tar.toString();
          var tarr = b64url.encode(t);
          var to = total.toString();
           var maxAmount = b64url.encode(to);
           var calu = cal.toString();
           var call = b64url.encode(calu);
           var tt = money.toString();
           var transMoney = b64url.encode(tt);
           var cc = b64url.decode(transMoney);
           var taxx = tax.toString();
           var taxrate = b64url.encode(taxx);
           var data = {
            Fees: tar,TotalAmount:total,totalTax:cal,transferMoney:money,taxPencentage:tax
           };

            return res.json({error : false ,  Fees: tarr,TotalAmount:maxAmount,totalTax:call,transferMoney:transMoney,taxPencentage:taxrate,currency:result.currency,result1:data});
        }

    });
  },
  findAll: function(req,res){
    Tariff
   .find()
   .populate('_country')
   .exec(function(err , result) {
       if(err){
            return res.json({error : true , reason: err});
       } else{
         // var myJSON = JSON.stringify(result);
         // var a = b64url.encode(myJSON);
        //  console.log(b64url.decode(a));
            return res.json({error : false , result: result});
       }

    });
  },
  delete: function(req,res){
     Tariff
      .findByIdAndRemove({_id : req.params.id}, function(err,result){
         if(err){
             return res.json({error : true , reason: err});
         } else{
              console.log("delete");
             return res.json({error : false , result: result,message:"Tariff deleted successfully"});
         }
      });
   },
    getallbycountry: function(req,res){
    var country = b64url.decode(req.body.country)
    Tariff
   .find({'country':country})  
   .exec(function(err , result) {
       if(err){
            return res.json({error : true , reason: err});
       } else{

            return res.json({error : false , result: result});
       }

    });
  }
}
