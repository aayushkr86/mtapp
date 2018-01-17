var express = require('express');
var moment = require('moment');

var router = express.Router();


var jwt = require('jsonwebtoken');
var checkJwt = require('express-jwt');
var config  =  require('../../config')[process.env.NODE_ENV || 'development'];

var first = require('./firstpage');
var admin = require('./superAdmin/superAdmin');
var superAdmin = require('./superAdmin/login');
var changepassadmin = require('./superAdmin/changepass');
var branch = require('./branch');
var supervisior = require('./superVisior/supervisior');
var supervisiorlog = require('./superVisior/superlogin');
var changesuper = require('./superVisior/changepassword');
var teller = require('./teller');
var tellerLogin = require('./userLogin');
var controlforgotpass = require('./tellerchangepass');
var tellerForgot = require('./forgotpass');

var tellerID = require('./tellerID');
var country = require('./country');
var invoice = require('./invoice');
var supplier = require('./supplier');
var tariff = require('./tariff');
var black = require('./blacklist');
var remitter = require('./remitter');
var beneficiary = require('./beneficiary');
var transaction = require('./transaction');
var rembus = require('./remburse.js');

var trans = require('./trans');

var controller = require('./control/controller');
var controllerLogin = require('./control/controllerLogin');
var comission = require('./comission');
var countrycurrencylist =require('./countrycurrencylist');
var payingsupplier = require('./payingSupplier');

/* Middlewares */
router.use(function(req, res, next) {   //Enabling CORS
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD, OPTIONS, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

/*firstpage*/
router.post('/first',first.add);
router.post('/firstpage',first.find);

/*currencycountry*/
router.post('/countrycurrencylist',countrycurrencylist.add);
router.get('/countrycurrencylist',countrycurrencylist.getAll);
router.post('/currencylist',countrycurrencylist.getCurrency);
router.delete('/countrycurrencylist/:id',countrycurrencylist.delete);
router.put('/countrycurrencylist/:id',countrycurrencylist.update);
router.get('/countrycurrencylist/:id',countrycurrencylist.getOne);

/*superAdmin*/
router.post('/superAdmin',admin.add);
//router.put('/superAdmin/:id',admin.update);
router.post('/superAdminLogin',superAdmin.login);
 router.put('/forgot/:email',admin.forgot); /*not possible*/


/* superAdmin Change password  */
// router.post('/adminsendchangepassmail', changepassadmin.postSendChangePassMail);
// router.get('/adminchangepass/:token', changepassadmin.getChangePass);
// router.post('/adminchangepass', changepassadmin.postChangePass);

/*supervisior*/
router.post('/supervisiorLogin',supervisiorlog.login);
/* supervisior Change password  */
router.post('/supervisiorsendchangepassmail', changesuper.postSendChangePassMail);
router.get('/supervisiorchangepass/:token', changesuper.getChangePass);
router.post('/supervisiorchangepass', changesuper.postChangePass);

/*controller*/
  router.post('/controllerLogin',controllerLogin.login);


/* controller Change password  */
router.post('/controllersendchangepassmail', controlforgotpass.postSendChangePassMail);
router.get('/controllerchangepass/:token', controlforgotpass.getChangePass);
router.post('/controllerchangepass', controlforgotpass.postChangePass);

/* teller*/
// router.post('/api/tellerLogin',tellerLogin.login);
router.post('/tellerLogin',tellerLogin.login);
router.post('/tellerForgot',tellerForgot.find);
router.put('/tellerchangepassword/:tellerID/:email/:oldpassword',tellerForgot.changepassword);
// /*forgot*/
// router.post('/tellersendchangepassmail', forgotpass.postSendChangePassMail);
// router.get('/tellerchangepass/:token', forgotpass.getChangePass);
// router.post('/tellerchangepass', forgotpass.postChangePass);


// router.post('/country',country.find);
//after jwt



router.use(checkJwt({ secret: config.secret})
  .unless({
    path: [
        {url : config.apiPath + '/tellerLogin', methods : ['GET','POST']},
        {url : config.apiPath + '/superAdminLogin', methods : ['GET','POST']},
        {url : config.apiPath + '/forgot', methods : ['GET','POST','PUT']},
        {url : config.apiPath + '/supervisiorLogin', methods : ['GET','POST']},

    ]
  })
);

/*payingsupplier*/
router.post('/payingsupplier',payingsupplier.add);

/*branch*/
router.post('/branchController',branch.add);
router.put('/branchController/:id',branch.update);
router.get('/branch/:id',branch.getOne);
router.get('/branchController/:id?', branch.findAll);
router.delete('/branchController/:id',branch.deleteBranch);
router.put('/branchStatusEdit/:id',branch.branchStatusEdit);
router.get('/branchactiveController', branch.findActive);

/*supervisior*/

 router.post('/supervisiorController',supervisior.add);
 router.put('/supervisiorController/:id',supervisior.update);
 router.get('/supervisiorController', supervisior.get);
 router.delete('/supervisiorController/:id',supervisior.delete);
 router.put('/superStatusEdit/:id',supervisior.superStatusEdit);
 router.get('/supervisor/:id',supervisior.getOne);
 router.post('/getsupervisor',supervisior.getSupervisor);
 router.get('/supervisioractiveController', supervisior.getbyactive);
 router.get('/supervisorsupplier/:id',supervisior.getsupplierbysupervisior);
 router.post('/getsupervisiorbyBranch',supervisior.getsupervisiorbyBranch);

  /*TellerID*/
  router.post('/tellerIDController',tellerID.add);
   router.get('/tellerID/:id',tellerID.get);
  router.put('/tellerIDController/:id',tellerID.update);
  router.get('/tellerIDController/:id?',tellerID.getAll);
  router.put('/telleridStatusEdit/:id',tellerID.telleridStatusEdit);
  router.delete('/tellerID/:id',tellerID.delete);
  router.get('/gettelleridbysuper/:supervisiorID',tellerID.getbysuper);
  router.get('/tellerIDbypayment/:id',tellerID.getpaymentlimit);


  /* controller*/
 router.post('/controller',controller.add);
 router.get('/controller',controller.get);
 router.get('/controller/:id',controller.getOne);
 router.put('/controllerStatusEdit/:id',controller.controllerStatusEdit);
 router.put('/controller/:id',controller.update);
 router.delete('/controller/:id',controller.delete);
 router.get('/controllerbybranch/:id',controller.getbybranch);
 router.get('/getsupplierbyController/:id',controller.getsupplierbyController);
 router.post('/getControllerbyBranch',controller.getControllerbyBranch);

 /*country*/
    router.post('/countryController',country.add);
   router.get('/countryController/:id?',country.get);
   router.get('/country/:id',country.getOne);
   router.put('/country/:id',country.update);
   router.post('/smsController',country.find);
   router.delete('/country/:id',country.delete);


      /*transaction*/
   router.post('/transactionController',transaction.add);
   router.put('/transactionController/:id',transaction.update);
   router.get('/allTransaction',transaction.find);
   router.get('/transactionController/:id?',transaction.findAll);
   router.post('/tellerowntransaction',transaction.mytransaction);
   router.post('/searchTransactionNumber',transaction.searchTransactionNumber);
   router.post('/searchTransactionDate',transaction.dateRange);
   router.post('/searchTransactionNumberDate',transaction.searchTransactionNumberDate);
   router.post('/kyctransaction',transaction.kyctransaction);
   router.post('/paidTransaction',transaction.paidTransaction);
   router.post('/searchinvoice',transaction.searchinvoice);
   // router.get('/tellerTransaction/:tellerID/:date?',transaction.findTransaction);
   // router.post('/trans',trans.add);
   router.get('/transaction/:id',transaction.getOne);
   router.post('/searchreimburseTransactionNumber',transaction.searchreimburseTransactionNumber);
   router.post('/getreimbursetransaction',transaction.getreimbursetransaction);
   router.get('/transactionbybranch/:id',transaction.getbybranch);
   router.post('/getreimbursetransactionbybranch/:id',transaction.getreimbursetransactionbybranch);
   router.post('/searchTransaction',transaction.searchTransaction);

   /*tariff*/
   router.post('/tariffController',tariff.add);
   router.put('/tariffController/:id',tariff.update);
   router.get('/tariffController',tariff.findAll);
   router.get('/tariffController/:id',tariff.getOne);
   router.post('/tariffSearchController',tariff.find);
   router.post('/getalltariffbycountry',tariff.getallbycountry);
   router.delete('/tariffController/:id',tariff.delete);
   router.get('/tariffControllerbybranch/:id',tariff.getbybranch);

   /*comission*/
   router.post('/comissionController',comission.add);
   router.get('/comissionController',comission.getAll);
   router.get('/comissionController/:id',comission.getOne);
   router.put('/comissionController/:id',comission.update);
   router.delete('/comissionController/:id',comission.delete);
   router.get('/comissionbybranchController/:id',comission.getbybranch);
   router.get('/getmac',comission.getmac);

   /*remitter*/
   router.post('/remitterController',remitter.add);
   router.post('/remiterkycController',remitter.find);
   router.put('/remitterController/:id',remitter.update);
   router.get('/remitterController',remitter.findAll);
   router.post('/findremiiter',remitter.findremiiter);
   router.post('/checkkycremitter',remitter.checkkycremitter);
   router.get('/remitterbybranchController/:id',remitter.findbybranchAll);

   /*beneficiary*/
   router.post('/beneficiaryController',beneficiary.add);
   router.post('/beneficiarykycController',beneficiary.find);
   router.put('/beneficiaryController/:id',beneficiary.update);
   router.get('/beneficiaryController',beneficiary.findAll);
   router.post('/findbenef',beneficiary.findbenef);
  router.post('/checkkycbenef',beneficiary.checkkycbenef);
  router.get('/beneficiarybybranchController/:id',beneficiary.findbybranchAll);

   /* blacklist*/
   router.post('/blacklistController',black.add);
   router.put('/blacklistController/:id',black.update);
   router.get('/blacklistController',black.getAll);
   router.delete('/blacklistController/:id',black.delete);
   router.post('/kyccheck',black.kyccheck);
 


 /*teller*/
 router.post('/tellerController',teller.add);
router.put('/tellerController/:id',teller.update);
router.get('/tellerController/:id?', teller.get);
router.get('/teller/:id',teller.getOne);
router.delete('/tellerController/:id',teller.delete);
router.put('/tellerStatusEdit/:id',teller.tellerStatusEdit);
router.get('/tellerbysuper/:id',teller.getbysuper);
router.get('/getbybranch/:id',teller.getbybranch);
router.get('/getcurrentbalance/:id',teller.currentbalance);
router.get('/getsupplierbyTeller/:id',teller.getsupplierbyTeller);



  /*invoice*/
  router.post('/invoiceController',invoice.add);
  router.get('/invoiceController/:id?',invoice.getInvoicRecord);
  router.post('/invoiceSearchController',invoice.searchInvoice);
  // router.get('/invoice',invoice.find);

  /*supplier*/
  router.post('/supplierController',supplier.add);
  router.get('/supplierController/:id?',supplier.getAll);
  router.get('/supplier/:id',supplier.getOne);
  router.put('/supplier/:id',supplier.update);
  router.get('/allsupplierController',supplier.findall);
  router.post('/supplierSearchController',supplier.getSupplier);
  router.put('/supplierStatusEdit/:id',supplier.supplierStatusEdit);
  router.post('/findSupplier',supplier.findSupplier);
  router.delete('/supplier/:id',supplier.delete);


  //  router.post('/sms',country.decode);







router.post('/rembusRequest',rembus.rembusRequest);
router.post('/rembustApprove',rembus.requestApproved);
router.post('/rembusDone',rembus.reimbursementDone);

module.exports = router;
