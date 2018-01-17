app.controller('tellerController',['$timeout','$base64','$http','$window','$scope','$location','$translate',
function($timeout,$base64,$http,$window,$scope,$location,$translate){
  $scope.tellerlogdata = $window.localStorage.getItem('userInfo-token');
  if($scope.tellerlogdata == 'undefined' || $scope.tellerlogdata == '' || $scope.tellerlogdata == null){


         $window.location.href= "/#/teller";
         $window.location.reload();
     }
  else{
      $scope.tellertokendata = jwt_decode($scope.tellerlogdata);
      console.log('token',$scope.tellertokendata.isActive);
      if(!$scope.tellertokendata.isActive){
        $window.location.href= "/#/teller";
         $window.location.reload();
        //  new PNotify({
        //      tittle : 'Regular notice',
        //      type :'error',
        //      text :'You are temporary unable to access this area,please contact your supervisor.',
        //    });
      }else{


     $scope.branch = $scope.tellertokendata.branchID;
     $scope.tellerid = $scope.tellertokendata.id;
    // console.log($scope.tellerid);
    /*===========tariff ========================*/

    /*pattern*/
    $scope.phoneNumbr = /^\+?\d{2,3}[- ]?\d{5}[- ]?\d{5}$/;
     //$scope. usernamepattern = /^[a-zA-Z]{2,30}$/;
     $scope. usernamepattern = "";
     //$scope.address = /^[a-zA-Z, -,0-9,`,~,!,@,#,$,%,^,&,*,(,),°]{5,200}$/;
     $scope.address = "";
     // $scope.emailpattern = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}/;
     $scope.workingpattern = /^[0-9]{1,100}$/;
     $scope.workingdays =  /^[a-z A-Z, ]{1,100}$/;
     $scope.branchpattern = /^[a-zA-Z,0-9]{1,100}$/;
     $scope.payementpattern = /^[0-9,]{1,100}$/;
     $scope.controllerpayementpattern = /^[0-9]{3,100}$/;
     $scope.telnumber = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
     $scope.phoneNumberpattern = /^[0-9]{10,15}/;
     $scope.countrypattern = /^[a-z A-Z àâäèéêëîïôœùûüÿçÀÂÄÈÉÊËÎÏÔŒÙÛÜŸÇ, ]/;
     $scope.countrypatternwithfrench = /[\wÀ-ÿ]/ ;
     $scope.countrypatternwithfrenchsecond = /[^a-zA-ZÀ-ÿ]/;

     $scope.onlynumber = /^([0-9\s])+(,[0-9\s]+)*$/;
     $scope.onlyalphabet = /^[a-zA-ZÀ-ÿ\s]*$/;

     $scope.search = function() {
      $value= $('#list-name1').val()
      if($value !=RegExp(/^[0-9\s]*$/)){
        alert($value);
      }
        
  };

      /*===translator====*/
    $scope.changeLanguage = function(langKey) {
      $translate.use(langKey);
    };
      $("ul > li.closed").click(function() {

     var li = $(this).closest('li');
     li.find(' > ul').slideToggle('fast');
     $(this).toggleClass("closed open");
   });

   $(function() {
     $("li.closed > ul").hide();
   });

/*====end transalator ==*/
function addslashes(str) {
  if(!str){
    return;
  }else{
    str = str.replace(/\\/g, '\\\\');
    str = str.replace(/\'/g, '\\\'');
    str = str.replace(/\"/g, '\\"');
    str = str.replace(/\0/g, '\\0');
    return str;
  }


   }




var HtmlEntities = function() {};

HtmlEntities.map = {
  // "'": "&apos;",
   "<": "&lt;",
   ">": "&gt;",
   //" ": "&nbsp;",
   "¡": "&iexcl;",
   "¢": "&cent;",
   "£": "&pound;",
   "¤": "&curren;",
   "¥": "&yen;",
   "¦": "&brvbar;",
   "§": "&sect;",
   "¨": "&uml;",
   "©": "&copy;",
   "ª": "&ordf;",
   "«": "&laquo;",
   "¬": "&not;",
   "®": "&reg;",
   "¯": "&macr;",
   "°": "&deg;",
   "±": "&plusmn;",
   "²": "&sup2;",
   "³": "&sup3;",
   "´": "&acute;",
   "µ": "&micro;",
   "¶": "&para;",
   "·": "&middot;",
   "¸": "&cedil;",
   "¹": "&sup1;",
   "º": "&ordm;",
   "»": "&raquo;",
   "¼": "&frac14;",
   "½": "&frac12;",
   "¾": "&frac34;",
   "¿": "&iquest;",
   "À": "&Agrave;",
   "Á": "&Aacute;",
   "Â": "&Acirc;",
   "Ã": "&Atilde;",
   "Ä": "&Auml;",
   "Å": "&Aring;",
   "Æ": "&AElig;",
   "Ç": "&Ccedil;",
   "È": "&Egrave;",
   "É": "&Eacute;",
   "Ê": "&Ecirc;",
   "Ë": "&Euml;",
   "Ì": "&Igrave;",
   "Í": "&Iacute;",
   "Î": "&Icirc;",
   "Ï": "&Iuml;",
   "Ð": "&ETH;",
   "Ñ": "&Ntilde;",
   "Ò": "&Ograve;",
   "Ó": "&Oacute;",
   "Ô": "&Ocirc;",
   "Õ": "&Otilde;",
   "Ö": "&Ouml;",
   "×": "&times;",
   "Ø": "&Oslash;",
   "Ù": "&Ugrave;",
   "Ú": "&Uacute;",
   "Û": "&Ucirc;",
   "Ü": "&Uuml;",
   "Ý": "&Yacute;",
   "Þ": "&THORN;",
   "ß": "&szlig;",
   "à": "&agrave;",
   "á": "&aacute;",
   "â": "&acirc;",
   "ã": "&atilde;",
   "ä": "&auml;",
   "å": "&aring;",
   "æ": "&aelig;",
   "ç": "&ccedil;",
   "è": "&egrave;",
   "é": "&eacute;",
   "ê": "&ecirc;",
   "ë": "&euml;",
   "ì": "&igrave;",
   "í": "&iacute;",
   "î": "&icirc;",
   "ï": "&iuml;",
   "ð": "&eth;",
   "ñ": "&ntilde;",
   "ò": "&ograve;",
   "ó": "&oacute;",
   "ô": "&ocirc;",
   "õ": "&otilde;",
   "ö": "&ouml;",
   "÷": "&divide;",
   "ø": "&oslash;",
   "ù": "&ugrave;",
   "ú": "&uacute;",
   "û": "&ucirc;",
   "ü": "&uuml;",
   "ý": "&yacute;",
   "þ": "&thorn;",
   "ÿ": "&yuml;",
   "Œ": "&OElig;",
   "œ": "&oelig;",
   "Š": "&Scaron;",
   "š": "&scaron;",
   "Ÿ": "&Yuml;",
   "ƒ": "&fnof;",
   "ˆ": "&circ;",
   "˜": "&tilde;",
   "Α": "&Alpha;",
   "Β": "&Beta;",
   "Γ": "&Gamma;",
   "Δ": "&Delta;",
   "Ε": "&Epsilon;",
   "Ζ": "&Zeta;",
   "Η": "&Eta;",
   "Θ": "&Theta;",
   "Ι": "&Iota;",
   "Κ": "&Kappa;",
   "Λ": "&Lambda;",
   "Μ": "&Mu;",
   "Ν": "&Nu;",
   "Ξ": "&Xi;",
   "Ο": "&Omicron;",
   "Π": "&Pi;",
   "Ρ": "&Rho;",
   "Σ": "&Sigma;",
   "Τ": "&Tau;",
   "Υ": "&Upsilon;",
   "Φ": "&Phi;",
   "Χ": "&Chi;",
   "Ψ": "&Psi;",
   "Ω": "&Omega;",
   "α": "&alpha;",
   "β": "&beta;",
   "γ": "&gamma;",
   "δ": "&delta;",
   "ε": "&epsilon;",
   "ζ": "&zeta;",
   "η": "&eta;",
   "θ": "&theta;",
   "ι": "&iota;",
   "κ": "&kappa;",
   "λ": "&lambda;",
   "μ": "&mu;",
   "ν": "&nu;",
   "ξ": "&xi;",
   "ο": "&omicron;",
   "π": "&pi;",
   "ρ": "&rho;",
   "ς": "&sigmaf;",
   "σ": "&sigma;",
   "τ": "&tau;",
   "υ": "&upsilon;",
   "φ": "&phi;",
   "χ": "&chi;",
   "ψ": "&psi;",
   "ω": "&omega;",
   "ϑ": "&thetasym;",
   "ϒ": "&Upsih;",
   "ϖ": "&piv;",
   "–": "&ndash;",
   "—": "&mdash;",
   "‘": "&lsquo;",
   "’": "&rsquo;",
   "‚": "&sbquo;",
   "“": "&ldquo;",
   "”": "&rdquo;",
   "„": "&bdquo;",
   "†": "&dagger;",
   "‡": "&Dagger;",
   "•": "&bull;",
   "…": "&hellip;",
   "‰": "&permil;",
   "′": "&prime;",
   "″": "&Prime;",
   "‹": "&lsaquo;",
   "›": "&rsaquo;",
   "‾": "&oline;",
   "⁄": "&frasl;",
   "€": "&euro;",
   "ℑ": "&image;",
   "℘": "&weierp;",
   "ℜ": "&real;",
   "™": "&trade;",
   "ℵ": "&alefsym;",
   "←": "&larr;",
   "↑": "&uarr;",
   "→": "&rarr;",
   "↓": "&darr;",
   "↔": "&harr;",
   "↵": "&crarr;",
   "⇐": "&lArr;",
   "⇑": "&UArr;",
   "⇒": "&rArr;",
   "⇓": "&dArr;",
   "⇔": "&hArr;",
   "∀": "&forall;",
   "∂": "&part;",
   "∃": "&exist;",
   "∅": "&empty;",
   "∇": "&nabla;",
   "∈": "&isin;",
   "∉": "&notin;",
   "∋": "&ni;",
   "∏": "&prod;",
   "∑": "&sum;",
   "−": "&minus;",
   "∗": "&lowast;",
   "√": "&radic;",
   "∝": "&prop;",
   "∞": "&infin;",
   "∠": "&ang;",
   "∧": "&and;",
   "∨": "&or;",
   "∩": "&cap;",
   "∪": "&cup;",
   "∫": "&int;",
   "∴": "&there4;",
   "∼": "&sim;",
   "≅": "&cong;",
   "≈": "&asymp;",
   "≠": "&ne;",
   "≡": "&equiv;",
   "≤": "&le;",
   "≥": "&ge;",
   "⊂": "&sub;",
   "⊃": "&sup;",
   "⊄": "&nsub;",
   "⊆": "&sube;",
   "⊇": "&supe;",
   "⊕": "&oplus;",
   "⊗": "&otimes;",
   "⊥": "&perp;",
   "⋅": "&sdot;",
   "⌈": "&lceil;",
   "⌉": "&rceil;",
   "⌊": "&lfloor;",
   "⌋": "&rfloor;",
   "⟨": "&lang;",
   "⟩": "&rang;",
   "◊": "&loz;",
   "♠": "&spades;",
   "♣": "&clubs;",
 };

  function encodeHtmlEntity(string){

   var entityMap = HtmlEntities.map;
   string = string.replace(/&/g, '&amp;');
   string = string.replace(/"/g, '&quot;');
   for (var key in entityMap) {
       var entity = entityMap[key];
       var regex = new RegExp(key, 'g');
       string = string.replace(regex, entity);
   }
   return string;

  };

/*bahar*/

 $scope.$on('$routeChangeStart', function(scope, next, current) {
      if (next.$$route.controller != "tellerController") {
        $window.location.reload();
        $window.location.href = "/#/tellerdashboard";
      }
    });
 /*bahar*/

    /*pattern*/

    /*manage account */
    $scope.tellerwonid;
    $scope.tellerforgotemail;
    $scope.newpassword;
    $scope.confirmpassword;
    $scope.manageAccount = function (){
     $scope.param1 = $scope.tellerwonid;
     $scope.param2 = $scope.tellerforgotemail;
     $scope.param3 = $scope.oldpassword;
     $scope.changeData = {
       "newPassword":$scope.newpassword,
       "confirmPassword": $scope.confirmpassword
     }

      $http({
           method: 'PUT',
           url: '/tellerchangepassword/'+$scope.param1 +"/"+$scope.param2 +"/"+$scope.param3,
           data: $scope.changeData,
           }).success(function (response) {
               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :response.message,
                 });

         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });

    }//fun
  /*manage account */
  setTimeout(function(){
     $(document).ready(function() {
                $('select').material_select();
            });
   },1000)

     $http({
         method: 'GET',
         url: '/countrycurrencylist',
         }).success(function (response) {
        $scope.countrydata = response.result;
        console.log($scope.countrydata);
        $('select').material_select();
        $('.caret').text("");
        // console.log($scope.countrydata);
       }).error(function (response) {
          new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response,
           });
      });

   /*change*/
      $scope.getvalue1 = function() { //Prateek
       $scope.arr1 = $('#list-title2').val().replace(/[^0-9]/g, ""); //Prateek
     }
     /*prateek*/
      $scope.destination = "";
      $scope.amount = "";
      $scope.calculatefee = function (){
        /*prateek*/
        $scope.getvalue1();
        $scope.amount = $scope.arr1;
    /*prateek*/
        $scope.country = $base64.encode(encodeHtmlEntity(addslashes($scope.destination)));
        $scope.amt = $base64.encode($scope.amount);
        $scope.tariffRecord ={
          "country" : $scope.country,
           "amount":$scope.amt
        };
        $http({
             method: 'POST',
             url: '/tariffSearchController',
             data: $scope.tariffRecord,
             }).success(function (response) {
               $("label").addClass("active")
             $scope.tarifdetails = response.result1;
             $scope.currency = response.currency;

            $scope.comissionfees = $scope.tarifdetails.Fees;
            $scope.totaltax = $scope.tarifdetails.totalTax;
            $scope.TotalAmount= $scope.tarifdetails.TotalAmount;
            $scope.transfermoney = $scope.tarifdetails.transferMoney;
           }).error(function (response) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response,
               });
          });


      };
          $scope.showtariff = function (){
        $scope.country = $base64.encode(encodeHtmlEntity(addslashes($scope.destination)));
        $scope.datacountry = {
          "country":$scope.country
        }
        $http({
             method: 'POST',
             url: '/getalltariffbycountry',
             data: $scope.datacountry,
             }).success(function (response) {
              $scope.tariffbycountrylist = response.result;
            console.log('count',$scope.tariffbycountrylist);
           }).error(function (response) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response,
               });
          });
      };
      $("a").unbind("click").bind("click", function(){
        setTimeout(function () {
        $('select').material_select();
	       $('.caret').text("");
    }, 500);
      });


    /*=========== end tariff ========================*/

    /* ====== sending money ==========================*/
    setTimeout(function () {
       $scope.gotoRemitter = function(){
     $window.location.href = '/#/tellerdashboard#tabsNavigationSimple3';
    }
    },1000)

    $scope.remittername = "";
    $scope.remittersurName = "";
    $scope.remitteraddress = "";
    $scope.remittermobile = "";
    $scope.remitteremail = "";
    $scope.remitteridtype = "";
    $scope.remitterpassport = "";
    $scope.remitterissuecountry = "";
    $scope.remitterexpdate = "";
    $scope.remitterissuedate ="";
    $scope.remittancemode ="";
    $scope.beneficiaryname ="";
    $scope.beneficiarysurname = "";
    $scope.beneficiaryaddress = "";
    $scope.beneficiarymobile = "";
    $scope.beneficiaryemail = "";

   $scope.createTransaction = function(){
    /*prateek*/
        $scope.getvalue1();
        $scope.amount = $scope.arr1;
    /*prateek*/

    $scope.rmobile1 = "+" +$scope.remittermobile;
    $scope.bmobile1 = "+"+$scope.beneficiarymobile
        var date = new Date();
       $scope.transactiondate = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);

      if(!$scope.remittername){
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Remittername can not be empty',
          });
      }else if (!$scope.remittersurName) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'RemittersurName can not be empty',
          });
      }else if (!$scope.remitteraddress) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Remitter address can not be empty',
          });
      }else if (!$scope.remittermobile) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Remitter mobileNumber can not be empty',
          });
      }else if (!$scope.remitteremail) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Remitter email can not be empty',
          });
      }else if (!$scope.remitteridtype) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Remitter idtype can not be empty',
          });
      }else if (!$scope.remitterpassport) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Remitter idno can not be empty',
          });
      }else if (!$scope.remitterissuecountry) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Remitter id issuecountry can not be empty',
          });
      }else if (!$scope.remittancemode) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Remittancemode can not be empty',
          });
      }else if (!$scope.remitterissuedate) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Remitter issuedate can not be empty',
          });
      }else if (!$scope.remitterexpdate) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Remitter expdate can not be empty',
          });
      }else if (!$scope.beneficiaryname) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Beneficiaryname can not be empty',
          });
      }else if (!$scope.beneficiarysurname) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Beneficiarysurname can not be empty',
          });
      }else if (!$scope.beneficiaryaddress) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Beneficiary address can not be empty',
          });
      }else if (!$scope.beneficiarymobile) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Beneficiary mobile can not be empty',
          });
      }else if (!$scope.beneficiaryemail) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Beneficiary email can not be empty',
          });
      }else {

        $scope.country = $base64.encode(encodeHtmlEntity(addslashes($scope.destination))) //destination
        $scope.amt = $base64.encode($scope.amount); //amount
       $scope.cur = $base64.encode($scope.currency);
       $scope.fees = $base64.encode($scope.comissionfees);
       $scope.tax = $base64.encode($scope.totaltax);
       $scope.total = $base64.encode($scope.TotalAmount);

       $scope.rname = $base64.encode(encodeHtmlEntity(addslashes($scope.remittername)));
       $scope.rsurname = $base64.encode(encodeHtmlEntity(addslashes($scope.remittersurName)));
       $scope.raddress = $base64.encode(encodeHtmlEntity(addslashes($scope.remitteraddress)));
       $scope.rmobile = $base64.encode($scope.rmobile1);
       $scope.rmail = $base64.encode(encodeHtmlEntity(addslashes($scope.remitteremail)));
       $scope.ridtype = $base64.encode(encodeHtmlEntity(addslashes($scope.remitteridtype)));
       $scope.rpassport = $base64.encode(encodeHtmlEntity(addslashes($scope.remitterpassport)));
       $scope.rissuecountry = $base64.encode(encodeHtmlEntity(addslashes($scope.remitterissuecountry)));


       $scope.rmode = $base64.encode(encodeHtmlEntity(addslashes($scope.remittancemode)));

       $scope.bname = $base64.encode(encodeHtmlEntity(addslashes($scope.beneficiaryname)));
       $scope.bsurname = $base64.encode(encodeHtmlEntity(addslashes($scope.beneficiarysurname)));
       $scope.baddress = $base64.encode(encodeHtmlEntity(addslashes($scope.beneficiaryaddress)));
       $scope.bmobile = $base64.encode($scope.bmobile1);

       $scope.branchid = $base64.encode(encodeHtmlEntity(addslashes($scope.branch)));
       $scope.tellerID = $base64.encode($scope.tellerid);



       $scope.transactionData = {
      "transactionDate":$scope.transactiondate,
       "country":$scope.country,
      "currency": $scope.cur,
      "amount":$scope.amt,

      "fees":$scope.fees,
      "tax":$scope.tax,
      "totalAmount":$scope.total,
      "beneficiaryRecieve":$scope.amt,
        "remittername":$scope.rname,
        "remittersurName":$scope.rsurname,
        "remitteremail":$scope.rmail,
        "remitteraddress":$scope.raddress,
        "remittermobile":$scope.rmobile,
        "remitteridType":$scope.ridtype,
        "remitteridNo":$scope.rpassport,
        "issueCountry":$scope.rissuecountry,
        "issueDate":$scope.remitterissuedate,
        "expDate":$scope.remitterexpdate,
         "remitteramount":$scope.amt,


        "remittanceMode":$scope.rmode,
        "beneficiaryname":$scope.bname,
        "beneficiarysurName":$scope.bsurname,
        "beneficiaryemail":$scope.beneficiaryemail,
        "beneficiaryaddress":$scope.baddress,
        "beneficiarymobile":$scope.bmobile,
        "beneficiaryidType":"",
        "beneficiaryidNo":"",
        "bissueCountry":"",
        "bissueDate":"",
        "bexpDate":"",
        "beneficiaryamount":$scope.amt,


      "branchID":$scope.branchid,
      "tellerID":$scope.tellerID


       };


       $http({
            method: 'POST',
            url: '/transactionController',
            data: $scope.transactionData,
            }).success(function (response) {
              console.log(response)
                new PNotify({
                    tittle : 'Regular notice',
                    type :'success',
                    text :response.message,
                  });
                $scope.destination = null;
                $scope.amount = null;
                $scope.comissionfees = null;
                $scope.totaltax = null;
                 $scope.remittername = null;
                 $scope.remittersurName = null;
                 $scope.remitteraddress = null;
                 $scope.remittermobile = null;
                 $scope.remitteremail = null;
                 $scope.remitteridtype = null;
                 $scope.remitterpassport = null;
                 $scope.remitterissuecountry = null;
                 $scope.remitterexpdate = null;
                 $scope.remitterissuedate =null;
                 $scope.remittancemode =null;
                 $scope.beneficiaryname =null;
                 $scope.beneficiarysurname = null;
                 $scope.beneficiaryaddress = null;
                 $scope.beneficiarymobile = null;
                 $scope.beneficiaryemail = null;
                 $scope.currency = null;
                 $scope.fees =null;

          }).error(function (response) {
            console.log(response)
             new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response,
              });
         });

  }//else
};//create transaction

    $scope.kycCheck = function(){
      $scope.rname = $base64.encode(encodeHtmlEntity(addslashes($scope.remittername)));
      $scope.rsurname = $base64.encode(encodeHtmlEntity(addslashes($scope.remittersurName)));
      $scope.kycData ={
        "remittername":$scope.rname,
        "remittersurName":$scope.rsurname
      };
      $http({
           method: 'POST',
           url: '/kyccheck',
           data: $scope.kycData,
           }).success(function (response) {
             console.log(response)
               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :response.message,
                 });


         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });

    };
    $scope.cancelTransaction = function(){
      $scope.destination = null;
      $scope.amount = null;
      $scope.comissionfees = null;
      $scope.totaltax = null;
       $scope.remittername = null;
       $scope.remittersurName = null;
       $scope.remitteraddress = null;
       $scope.remittermobile = null;
       $scope.remitteremail = null;
       $scope.remitteridtype = null;
       $scope.remitterpassport = null;
       $scope.remitterissuecountry = null;
       $scope.remitterexpdate = null;
       $scope.remitterissuedate =null;
       $scope.remittancemode =null;
       $scope.beneficiaryname =null;
       $scope.beneficiarysurname = null;
       $scope.beneficiaryaddress = null;
       $scope.beneficiarymobile = null;
       $scope.beneficiaryemail = null;
       $scope.currency = null;
       $scope.fees =null;
    };

    /*=========end sending money =======================*/

    /*======== paying money =========================*/
    $scope.transactionNumber = "";
    $scope.transactionAmount = "";
    $scope.beneficiaryfirstname = "";
    $scope.beneficiarylastname = "";
    $scope.destinationcountry = "";

    $scope.searchTransaction = function(){
      if (!$scope.transactionNumber) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Transaction number can not be empty',
          });
      }else if (!$scope.transactionAmount) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Transaction amount can not be empty',
          });
      }else if (!$scope.beneficiaryfirstname) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Beneficiary firstname can not be empty',
          });
      }else if (!$scope.beneficiarylastname) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Beneficiary lastname can not be empty',
          });
      }else{
      $scope.transno = $base64.encode($scope.transactionNumber);
      $scope.payamount = $base64.encode($scope.transactionAmount);
      $scope.benfisrtname = $base64.encode(encodeHtmlEntity(addslashes($scope.beneficiaryfirstname)));
      $scope.benlastname = $base64.encode(encodeHtmlEntity(addslashes($scope.beneficiarylastname)));

      $scope.searchTransactionData = {
        "transactionNumber":$scope.transno,
        "amount":$scope.payamount,
       "beneficiaryname":$scope.benfisrtname,
       "beneficiarysurName":$scope.benlastname,

      };
      console.log('paid',$scope.searchTransactionData)
      $http({
           method: 'POST',
           url: '/paidTransaction',
           data: $scope.searchTransactionData,
           }).success(function (response) {
             $("label").addClass("active")
             $scope.transactionfounddata = response.result1;
             console.log(response.result1)
             if(response.message == 'Found'){
               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :'Transaction ' +response.message +' and status is '+ response.result1.status,
                 });
             }
             if(response.message == 'This transaction does not exist'){
               new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
             }



         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });
      }//else
    };//fun



      $scope.paidtransaction = function(){
         if (!$scope.beneficiaryid) {
               new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :'Beneficiary idtype can not be empty',
                });
            }else if (!$scope.beneficiaryidno) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :'Beneficiary id number can not be empty',
               });
            }else if (!$scope.beneficiaryissue) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :'Beneficiary id issueDate can not be empty',
               });
            }else if (!$scope.beneficiaryexp) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :'Beneficiary id expDate  can not be empty',
               });
            }else{

      $scope.param = $scope.transactionfounddata._id;
      $scope.bcountry = $scope.transactionfounddata.country;
      $scope.transactionpaidData ={
        "status":"Paid",
        "beneficiaryidType":$scope.beneficiaryid,
        "beneficiaryidNo":$scope.beneficiaryidno,
        "bissueCountry":$scope.bcountry,
        "bissueDate":$scope.beneficiaryissue,
        "bexpDate":$scope.beneficiaryexp
      };

      $http({
           method: 'PUT',
           url: '/transactionController/'+$scope.param,
           data: $scope.transactionpaidData,
           }).success(function (response) {
             $scope.paidtransactionDeatils =response.result1;
             console.log('res',$scope.paidtransactionDeatils);
               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :response.Status,
                 });
                 $scope.transactionNumber = "";
                 $scope.transactionAmount = "";
                 $scope.beneficiaryfirstname = "";
                 $scope.beneficiarylastname = "";
                 $scope.destinationcountry = "";
                 $scope.beneficiaryid ="";
                 $scope.beneficiaryidno = "";
                 $scope.beneficiaryissue = "";
                 $scope.beneficiaryexp = "";

         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });

      }//else

      };//fun

    /*============ end paying money ==================*/

    /*============  Report ==================*/
     $scope.sdate;
     $scope.edate;
     $scope.transactionsearchdate = function(){
      $scope.transdaterange = {
      "startDate":$scope.sdate,
      "endDate":$scope.edate
      };
      $http({
           method: 'POST',
           url: '/searchTransactionDate',
           data: $scope.transdaterange,
           }).success(function (response) {
            //  console.log(response.result1)
             $scope.transactionDaterangeDetails = response.result1;
             console.log($scope.transactionDaterangeDetails);
               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :response.message,
                 });

         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });
     };

     /*============ end Report ==================*/

     /* ========supplier ======================*/

$scope.suppliername;
$scope.suppliercode;
$scope.findsupplier = function (){
  $scope.sname = $base64.encode(encodeHtmlEntity(addslashes($scope.suppliername)));
  $scope.scode = $base64.encode($scope.suppliercode);
  $scope.supplierfinddata ={
    "supplierName":$scope.sname,
    "supplierCode":$scope.scode
  };
  console.log('supdata',$scope.supplierfinddata)

  $http({
       method: 'POST',
       url: '/findSupplier',
       data: $scope.supplierfinddata,
       }).success(function (response) {
         console.log(response.result1)
           new PNotify({
               tittle : 'Regular notice',
               type :'success',
               text :response.message,
             });

     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });
};

$http({
     method: 'GET',
     url: '/supplierController',
     }).success(function (response) {
       $scope.supplierDetails = response.result1;
      //  console.log($scope.supplierDetails);
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
  });
    /*========= end supplier ===================*/
    /*========  paying supplier =====================*/
    $scope.supsearch;
    $scope.searchsuplier = function (){
      $scope.supsearchdata = $base64.encode($scope.supsearch);
      $scope.supdata = {
        "supplierCode":$scope.supsearchdata
      }
      $http({
           method: 'POST',
           url: '/supplierSearchController',
           data: $scope.supdata,
           }).success(function (response) {
             $scope.supgetdata = response.result1;
             $scope.supplierName = $scope.supgetdata[0].supplierName

               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :response.message,
                 });

         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });
    }//fun
    $scope.invoicenumber;
    $scope.invoicedate;
    $scope.invoiceamount;
      $scope.searchinvoice = function (){
      // alert($scope.invoicedate)
      if(!$scope.invoicenumber){
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Transaction/Invoice number can not be empty',
          });
      }else if (!$scope.invoicedate) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Transaction/Invoice date can not be empty',
          });
      }else if (!$scope.invoiceamount) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Transaction/Invoice amount can not be empty',
          });
      }else{
      $scope.invoicedata = {
       "transactionNumber":$scope.invoicenumber,
       "amount":$scope.invoiceamount,
       "transactionDate":$scope.invoicedate
     },
     $http({
          method: 'POST',
          url: '/searchTransactionNumberDate',
          data: $scope.invoicedata,
          }).success(function (response) {

            if(response.message == 'Transaction found'){
              $("label").addClass("active");
               $scope.getinvoicedata = response.result;
               $scope.invoicedate = $scope.getinvoicedata.transactionDate;
              $scope.remitfirstname = $scope.getinvoicedata.remittername;
              $scope.remitlastname = $scope.getinvoicedata.remittersurName;
              $scope.remitmobile = $scope.getinvoicedata.remittermobile;
              $scope.remitaddress = $scope.getinvoicedata.remitteraddress;
              $scope.idnumber = $scope.getinvoicedata.remitteridNo;
              $scope.feesup = $scope.getinvoicedata.fees;
              $scope.suptax = $scope.getinvoicedata.tax;
              $scope.totalpayment = $scope.getinvoicedata.totalAmount;
                new PNotify({
                    tittle : 'Regular notice',
                    type :'success',
                    text :response.message,
                  });
            }

              if(response.message == 'Transaction Not Found'){
                new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.message,
                });
              }

        }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response,
            });
       });
     }//else
    }//func
    $scope.payingdata;
$scope.payingsupplier = function (){
  $scope.payingdata = {
    "invoiceNumber":$scope.invoicenumber,
    "amount":$scope.invoiceamount,
    "supplierCode":$scope.supsearch,
    "supplierName":  $scope.supplierName,
    "invoicedate":$scope.invoicedate,
    "remitterName":$scope.remitfirstname,
    "remittersurName":$scope.remitlastname,
    "mobileNumber":$scope.remitmobile,
    "address":$scope.remitaddress,
    "ID":$scope.idnumber,
    "fee":$scope.feesup,
    "tax":$scope.suptax,
    "total":$scope.totalpayment
  },
  console.log('payingdata',$scope.payingdata)
  $http({
       method: 'POST',
       url: '/payingsupplier',
       data: $scope.payingdata,
       }).success(function (response) {
         new PNotify({
             tittle : 'Regular notice',
             type :'success',
             text :response.message,
           });
         $scope.invoicenumber = null
         $scope.invoiceamount = null
          $scope.supsearch = null
          $scope.supplierName = null
         $scope.invoicedate = null
         $scope.remitfirstname = null
         $scope.remitlastname = null
         $scope.remitmobile = null
         $scope.remitaddress = null
         $scope.idnumber = null
         $scope.feesup = null
         $scope.suptax = null
         $scope.totalpayment = null

   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
  });

}//fun

    /*======== end paying supplier =====================*/

    /*=========  search transaction ===================*/
   $scope.searchTransactionNumber;
   $scope.searchTransactionNumber1 = function (){
     $scope.stno = $base64.encode($scope.searchTransactionNumber);
     $scope.stdata = {
       "transactionNumber":$scope.stno
     };

     $http({
          method: 'POST',
          url: '/searchTransactionNumber',
          data: $scope.stdata,
          }).success(function (response) {
            $scope.transactionnumberdetails = response.result1;
            console.log($scope.transactionnumberdetails)
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.message,
                });

        }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response,
            });
       });

   };

    /*========= end search transaction ===================*/

    /*======== kyc check for user =====================*/
  $scope.usertype ;
  $scope.firstname;
  $scope.lastname;
  $scope.countrysearch;
  $scope.searchemail;
  console.log($scope.usertype)
  $scope.changeUser = function(usertype){

    $scope.user = usertype;

     if(usertype == 'Beneficiary'){


       $scope.checkUserKyc = function (){
         $scope.fname = $base64.encode(encodeHtmlEntity(addslashes($scope.firstname)));
         $scope.lname = $base64.encode(encodeHtmlEntity(addslashes($scope.lastname)));
         $scope.countt = $base64.encode(encodeHtmlEntity(addslashes($scope.countrysearch)));
         $scope.mail = $base64.encode(encodeHtmlEntity(addslashes($scope.searchemail)));
               $scope.serkycdata = {
             "beneficiaryemail":$scope.mail,
             "beneficiaryname":$scope.fname,
             "beneficiarysurName":$scope.lname,
             "country":$scope.countt,
           };
      console.log('benefyc',$scope.serkycdata)
           $http({
                method: 'POST',
                url: '/findbenef',
                data: $scope.serkycdata,
                }).success(function (res) {
                  console.log('kysres',res)
                    new PNotify({
                        tittle : 'Regular notice',
                        type :'success',
                        text :res.message,
                      });
                      $scope.usertype =null;
                      $scope.firstname=null;
                      $scope.lastname=null;
                      $scope.countrysearch=null;
                      $scope.searchemail=null;

              }).error(function (response) {
                 new PNotify({
                    tittle : 'Regular notice',
                    type :'error',
                    text :response,
                  });
             });
      }//fun
     }//if
     if(usertype== 'Remitter'){


       $scope.checkUserKyc = function (){
         $scope.fname1 = $base64.encode(encodeHtmlEntity(addslashes($scope.firstname)));
         $scope.lname1 = $base64.encode(encodeHtmlEntity(addslashes($scope.lastname)));
         $scope.countt1 = $base64.encode(encodeHtmlEntity(addslashes($scope.countrysearch)));
         $scope.mail1 = $base64.encode(encodeHtmlEntity(addslashes($scope.searchemail)));
             $scope.rkycdata = {
               "remitteremail":$scope.mail1,
               "remittername":$scope.fname1,
               "remittersurName":$scope.lname1,
               "issueCountry":$scope.countt1,
             };
         console.log('remiter',$scope.rkycdata)
             $http({
                  method: 'POST',
                  url: '/findremiiter',
                  data: $scope.rkycdata,
                  }).success(function (response) {
                    console.log('res',response)
                      new PNotify({
                          tittle : 'Regular notice',
                          type :'success',
                          text :response.message,
                        });
                        $scope.usertype =null;
                        $scope.firstname=null;
                        $scope.lastname=null;
                        $scope.countrysearch=null;
                        $scope.searchemail=null;

                }).error(function (response) {
                   new PNotify({
                      tittle : 'Regular notice',
                      type :'error',
                      text :response,
                    });
               });
       }//fun
     }//if
   }//user

   $scope.cancelUserKyc = function(){
    //  $scope.usertype='?';
    $scope.usertype =null;
     console.log('user',$scope.usertype)
     $scope.firstname = null;
     $scope.lastname = null;
     $scope.countrysearch=null;
     console.log('reset',$scope.countrysearch)
     $scope.searchemail = null;
     $scope.region=null
   }

/*======== end kyc check for user =====================*/
/*======== reimburement =====================*/

$scope.transactionNumberFind;
$scope.searchTransactionNO = function (){
  // alert($scope.transactionNumberFind);
  $scope.trnsno = $base64.encode($scope.transactionNumberFind);
  $scope.data1 = {
    "transactionNumber":$scope.trnsno
  }
  $http({
       method: 'POST',
       url: '/searchTransactionNumber',
       data: $scope.data1,
       }).success(function (response) {
          $("label").addClass("active")
         $scope.findData = response.result1;
        if($scope.findData[0].status == 'Paid'){
           var btn3 = document.getElementById('statusid');
           var btn4 = document.getElementById('submitbtn');
           btn3.style.display =  "none";
          btn4.style.display =  "none"
         } else{
           var btn3 = document.getElementById('statusid');
           var btn4 = document.getElementById('submitbtn');
          btn4.style.display =  "block"
           btn3.style.display =  "block"
         }

           new PNotify({
               tittle : 'Regular notice',
               type :'success',
               text :response.result1[0].status,
             });

     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });
}
// $scope.changeStatusvalue;

$scope.statuschnage = function(changeStatusvalue){
  // alert(changeStatusvalue)
  $scope.getStatus = changeStatusvalue;
  if($scope.getStatus == 'Reimbursed Request'){
    $scope.sumbitreimbursement = function (){
      // alert($scope.getStatus)
      $scope.datachange = {
        "transactionNumber": $scope.findData[0].transactionNumber,
        "status":$scope.getStatus
      }
      $http({
           method: 'POST',
           url: '/rembusRequest',
           data: $scope.datachange,
           }).success(function (response) {
             console.log(response.message);
               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :response.message,
                 });

         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });
    }//fun
  }//if
  if($scope.getStatus == 'Reimbursed Done'){
    $scope.sumbitreimbursement = function (){
      $scope.datachange = {
        "transactionNumber": $scope.findData[0].transactionNumber,
        "status":$scope.getStatus
      }
      $http({
           method: 'POST',
           url: '/rembusDone',
           data: $scope.datachange,
           }).success(function (response) {
             console.log(response.message);
               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :response.message,
                 });

         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });
    }//fun
  }//if

}//fun


/*======== end reimburement=====================*/


$scope.myFunction = function(table1){
  // window.print();
  var printContents = document.getElementById(table1).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.location.reload();
    document.body.innerHTML = originalContents;
}//fun

$scope.printReport = function(table2){
  var printContents = document.getElementById(table2).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.location.reload();
    document.body.innerHTML = originalContents;
}

$scope.printInvoice = function(table3){
  var printContents = document.getElementById(table3).innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    window.location.reload();
    document.body.innerHTML = originalContents;
}

/*prateek*/
 var el = document.querySelector('input.number');
    el.addEventListener('keyup', function(event) {
      if (event.which >= 37 && event.which <= 40) return;

      this.value = this.value.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
/*prateek*/

$scope.tellerLogout = function(){
  $window.localStorage.removeItem('userInfo-token');

  // $location.path('/teller');
  $window.location.href = "/#/teller";
  $window.location.reload();
}



  } //else active

  }//else

}])
