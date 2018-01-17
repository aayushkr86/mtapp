app.controller('controlController',['$scope','$base64','$http','$window','$translate', function($scope,$base64,$http,$window,$translate){

  $scope.controllogdata = $window.localStorage.getItem('userInfo-token');
  if($scope.controllogdata == 'undefined' || $scope.controllogdata == '' || $scope.controllogdata == null){
    // new PNotify({
    //     tittle : 'Regular notice',
    //     type :'error',
    //     text :'You are not logged in. Please login again',

    //   });
      
       $window.location.href= "/#/controllerLogin";
       $window.location.reload();
     }
  else{
     $scope.logtokendata = jwt_decode($scope.controllogdata);
     console.log('token',$scope.logtokendata)
     if(!$scope.logtokendata.isActive){
        $window.location.href= "/#/controllerLogin";
         $window.location.reload();
      }else{




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

/*bahar*/

 $scope.$on('$routeChangeStart', function(scope, next, current) {
      if (next.$$route.controller != "controlController") {
        
        $window.location.href = "/#/ControllerDashboard";
        $window.location.reload();
      }
    });
 /*bahar*/


   function addslashes(str) {
     if(!str){
       return str ;
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
     if(!string){
       return string
     }else{

    var entityMap = HtmlEntities.map;
    string = string.replace(/&/g, '&amp;');
    string = string.replace(/"/g, '&quot;');
    for (var key in entityMap) {
        var entity = entityMap[key];
        var regex = new RegExp(key, 'g');
        string = string.replace(regex, entity);
    }
    return string;
   }

   };


     /*teller*/
     /*============================================*/
     $scope.hideclearFiltersearchtellerlist = function(){
       var clearfiltersearchtellerlist = document.getElementById('clearfiltersearchtellerlist');
      clearfiltersearchtellerlist.style.display = "none";
     };
     $scope.searchtellerlist1;
     $scope.searchtellerlistfilter = function(){
        $scope.searchtellerlist = encodeHtmlEntity(addslashes($scope.searchtellerlist1));
        var clearfiltersearchtellerlist1 = document.getElementById('clearfiltersearchtellerlist');
      clearfiltersearchtellerlist1.style.display = "block";
     };
     $scope.clearFiltersearchtellerlist = function(){
       $scope.searchtellerlist1 = null;
       $scope.searchtellerlist = null;
       var clearfiltersearchtellerlist3 = document.getElementById('clearfiltersearchtellerlist');
      clearfiltersearchtellerlist3.style.display = "none";
     };





     /*get tellerDetails*/
     $http({
          method: 'GET',
          url: '/getbybranch/'+$scope.logtokendata.branchID,
          }).success(function (response) {
         $scope.tellerDetails = response.result.reverse();
          // console.log('teller',$scope.tellerDetails);
          $scope.currentPageTeller = 0;
             $scope.pageSizeTeller = 10;
             $scope.numberOfPagesTeller=function(){
               return Math.ceil($scope.tellerDetails.length/$scope.pageSizeTeller);
             }

        }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response.reason,
            });
       });

/*============= end teller ============================================*/

/*============= Report ============================================*/
$scope.hideclearFiltersearchreportlist = function(){
  var clearfiltersearchreportlist = document.getElementById('clearfiltersearchreportlist');
     clearfiltersearchreportlist.style.display = "none";
};
$scope.searchreportlist1;
$scope.searchreportlistfilter = function(){
   $scope.searchreportlist = encodeHtmlEntity(addslashes($scope.searchreportlist1));
   var clearfiltersearchreportlist1 = document.getElementById('clearfiltersearchreportlist');
     clearfiltersearchreportlist1.style.display = "block";
};
$scope.clearFiltersearchreportlist = function(){
  $scope.searchreportlist1 = null;
  $scope.searchreportlist = null;
  var clearfiltersearchreportlist2 = document.getElementById('clearfiltersearchreportlist');
     clearfiltersearchreportlist2.style.display = "none";
};





/*get transactiondata*/
$http({
     method: 'GET',
     url: '/transactionbybranch/'+$scope.logtokendata.branchID,
     }).success(function (response) {
       console.log('trans',response)
       $scope.transactionDetails = response.result.reverse();
       $scope.currentPageReport = 0;
          $scope.pageSizeReport = 10;
          $scope.numberOfPagesReport=function(){
            return Math.ceil($scope.transactionDetails.length/$scope.pageSizeReport);
          }


   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response.reason,
       });
  });

/*============= end Report ============================================*/
/*=============  country ============================================*/
$scope.hideclearFiltersearchcountrylimitlist = function(){
  var clearfiltersearchcountrylimitlist = document.getElementById('clearfiltersearchcountrylimitlist');
     clearfiltersearchcountrylimitlist.style.display = "none";
   };
   $scope.searchcountrylimitlist1;
   $scope.searchcountrylimitlistfilter = function(){
     $scope.searchcountrylimitlist = encodeHtmlEntity(addslashes($scope.searchcountrylimitlist1));
     var clearfiltersearchcountrylimitlist1 = document.getElementById('clearfiltersearchcountrylimitlist');
     clearfiltersearchcountrylimitlist1.style.display = "block";
   };
   $scope.clearFiltersearchcountrylimitlist = function(){
    $scope.searchcountrylimitlist1 = null;
    $scope.searchcountrylimitlist = null;
    var clearfiltersearchcountrylimitlist3 = document.getElementById('clearfiltersearchcountrylimitlist');
     clearfiltersearchcountrylimitlist3.style.display = "none";
   }





$http({
     method: 'GET',
     url: '/countryController',
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.countrylimitDetails = response.result.reverse();
       $scope.currentPagelimit = 0;
          $scope.pageSizelimit = 10;
          $scope.numberOfPageslimit=function(){
            return Math.ceil($scope.countrylimitDetails.length/$scope.pageSizelimit);
          }
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
  });
/*============= end country ============================================*/

/*============= transaction ============================================*/
$scope.hideclearFiltersearchtransactionlist = function(){
   var clearfiltersearchtransactionlist = document.getElementById('clearfiltersearchtransactionlist');
     clearfiltersearchtransactionlist.style.display = "none";
   };
   $scope.searchtransactionlist1;
   $scope.searchtransactionlistfilter = function(){
     $scope.searchtransactionlist = encodeHtmlEntity(addslashes($scope.searchtransactionlist1));
     var clearfiltersearchtransactionlist1 = document.getElementById('clearfiltersearchtransactionlist');
     clearfiltersearchtransactionlist1.style.display = "block";
   };
   $scope.clearFiltersearchtransactionlist = function(){
     $scope.searchtransactionlist1 =null;
     $scope.searchtransactionlist =null;
      var clearfiltersearchtransactionlist = document.getElementById('clearfiltersearchtransactionlist');
     clearfiltersearchtransactionlist.style.display = "none";
   };

$scope.hideclearFiltersearchRemitterList = function(){
  var clearfiltersearchRemitterList = document.getElementById('clearfiltersearchRemitterList');
     clearfiltersearchRemitterList.style.display = "none";
   };
   $scope.searchRemitterList1;
   $scope.searchRemitterListfilter = function(){
     $scope.searchRemitterList = encodeHtmlEntity(addslashes($scope.searchRemitterList1));
     var clearfiltersearchRemitterList1 = document.getElementById('clearfiltersearchRemitterList');
     clearfiltersearchRemitterList1.style.display = "block";
   };
   $scope.clearFiltersearchRemitterList = function(){
    $scope.searchRemitterList1 = null;
    $scope.searchRemitterList = null;
    var clearfiltersearchRemitterList3 = document.getElementById('clearfiltersearchRemitterList');
     clearfiltersearchRemitterList3.style.display = "none";
   }




$http({
     method: 'GET',
     // url: '/remitterbybranchController/'+$scope.logtokendata.branchID,
     url:'/remitterController',
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.remitterDetails = response.result.reverse();
       $scope.currentPageremiter = 0;
          $scope.pageSizeremiter = 10;
          $scope.numberOfPagesremiter=function(){
            return Math.ceil($scope.remitterDetails.length/$scope.pageSizeremiter);
          }
            $scope.currentPageRemitterList = 0;
             $scope.pageSizeRemitterList = 10;
             $scope.numberOfPagesRemitterList=function(){
               return Math.ceil($scope.remitterDetails.length/$scope.pageSizeRemitterList);
             }
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response.reason,
       });
  });
$scope.transaction_history = function(firstname,lastname){
  $scope.remittername = firstname;
  $scope.remittersurName = lastname;
  $scope.rdata ={
         "remittername":$scope.remittername,
         "remittersurName":$scope.remittersurName
       };
       $http({
            method: 'POST',
            url: '/kyctransaction',
            data: $scope.rdata,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
              $scope.kyctransaction = response.result;
              // console.log($scope.kyctransaction)
                new PNotify({
                    tittle : 'Regular notice',
                    type :'success',
                    text :response.message,
                  });

          }).error(function (response) {
             new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.reason,
              });
         });
};


/*============= end transaction ============================================*/

/*============= tariff ============================================*/
$scope.hideclearFiltersearchtarifflist = function(){
  var clearfiltersearchtarifflist = document.getElementById('clearfiltersearchtarifflist');
     clearfiltersearchtarifflist.style.display = "none";
};
$scope.searchtarifflist1;
$scope.searchtarifflistfilter = function(){
   $scope.searchtarifflist = encodeHtmlEntity(addslashes($scope.searchtarifflist1));
   var clearfiltersearchtarifflist1 = document.getElementById('clearfiltersearchtarifflist');
     clearfiltersearchtarifflist1.style.display = "block";
};
$scope.clearFiltersearchtarifflist = function(){
  $scope.searchtarifflist1 = null;
  $scope.searchtarifflist = null;
  var clearfiltersearchtarifflist3 = document.getElementById('clearfiltersearchtarifflist');
     clearfiltersearchtarifflist3.style.display = "none";
}





$http({
     method: 'GET',
     // url: '/tariffControllerbybranch/'+$scope.logtokendata.branchID,
     url:'/tariffController',
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.tariffdata = response.result.reverse();
       $scope.currentPagetarif = 0;
          $scope.pageSizetarif = 10;
          $scope.numberOfPagestarif=function(){
            return Math.ceil($scope.tariffdata.length/$scope.pageSizetarif);
          }
      //  console.log($scope.tariffdata);
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
  });

/*============= end tariff ============================================*/

/*============= end comission ============================================*/


$http({
     method: 'GET',
     url: '/comissionbybranchController/'+$scope.logtokendata.branchID,
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.comissiondata1 = response.result;
       $scope.currentPagecom = 0;
          $scope.pageSizecom = 10;
          $scope.numberOfPagescom=function(){
            return Math.ceil($scope.comissiondata1.length/$scope.pageSizecom);
          }
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
  });

/*============= end comission ============================================*/
/*============= Remitter ============================================*/

/*============= end Remitter ============================================*/

/* =========== beneficiary =====================================*/
$scope.hideclearFiltersearchbeneflist = function(){
  var clearfiltersearchbeneflist = document.getElementById('clearfiltersearchbeneflist');
     clearfiltersearchbeneflist.style.display = "none";
   };
   $scope.searchbeneflist1;
   $scope.searchbeneflistfilter = function(){
     $scope.searchbeneflist = encodeHtmlEntity(addslashes($scope.searchbeneflist1));
     var clearfiltersearchbeneflist1 = document.getElementById('clearfiltersearchbeneflist');
     clearfiltersearchbeneflist1.style.display = "block";
   };
   $scope.clearFiltersearchbeneflist = function(){
    $scope.searchbeneflist1 = null;
    $scope.searchbeneflist = null;
    var clearfiltersearchbeneflist3 = document.getElementById('clearfiltersearchbeneflist');
     clearfiltersearchbeneflist3.style.display = "none";
   };





$http({
     method: 'GET',
     url: '/beneficiarybybranchController/'+$scope.logtokendata.branchID,
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.beneficiaryDetails1 = response.result.reverse();
       $scope.currentPagebenef = 0;
          $scope.pageSizebenef = 10;
          $scope.numberOfPagesbenef=function(){
            return Math.ceil($scope.beneficiaryDetails1.length/$scope.pageSizebenef);
          }
      // console.log('benef',$scope.beneficiaryDetails);
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response.reason.errmsg,
       });
  });





/*================end beneficiary =============================*/

/* ======= reimburesement ===================*/


$scope.data = {
 "status": "Reimbursed Approved"
};
$http({
     method: 'POST',
     url: '/getreimbursetransactionbybranch/'+$scope.logtokendata.branchID,
     data:$scope.data,
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.reimburesementTransaction = response.result;
       console.log('rem',$scope.reimburesementTransaction);
       $scope.currentPagereimburse = 0;
          $scope.pageSizereimburse = 10;
          $scope.numberOfPagesreimburse=function(){
            return Math.ceil($scope.reimburesementTransaction.length/$scope.pageSizereimburse);
          }
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
  });
  $scope.transactionHistory = function(transaction){
    // alert(transaction._id)
    $http({
         method: 'GET',
         url: '/transaction/'+transaction._id,
         }).success(function (response) {
          $scope.transactionHistoryDeatils = response.result;
          // console.log('trans',$scope.transactionHistoryDeatils.transactionNumber);
       }).error(function (response) {
          new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response,
           });
      });
  };


/* ======= end reimburesement ===================*/



$("a").unbind("click").bind("click", function(){
  setTimeout(function () {
  $('select').material_select();
$('.caret').text("");
}, 1000);
});

$scope.controllerLogout = function(){
  $window.localStorage.removeItem('userInfo-token');
  
  
  $window.location.href= "/#/controllerLogin";
  $window.location.reload();
}

/* ====================== start supplierCode========================*/
$scope.hideclearFiltersearchsupplierlist = function(){
  var clearfiltersearchsupplierlist = document.getElementById('clearfiltersearchsupplierlist');
  clearfiltersearchsupplierlist.style.display = "none";
};
$scope.searchsupplierlist1 ;
$scope.searchsupplierlistfilter = function(){
  $scope.searchsupplierlist = encodeHtmlEntity(addslashes($scope.searchsupplierlist1));
  var clearfiltersearchsupplierlist1 = document.getElementById('clearfiltersearchsupplierlist');
  clearfiltersearchsupplierlist1.style.display = "block";
};
$scope.clearFiltersearchsupplierlist = function(){
 $scope.searchsupplierlist1 = null ;
 $scope.searchsupplierlist = null ;
 var clearfiltersearchsupplierlist3 = document.getElementById('clearfiltersearchsupplierlist');
  clearfiltersearchsupplierlist3.style.display = "none";
};




$scope.controllerloginid = $scope.logtokendata.id;
$http({
    method: 'GET',
    // url: '/getsupplierbyController/'+$scope.controllerloginid,
    url:'/supplierController'
 }).success(function (response) {
  $scope.suplierRecord = response.result1.reverse();

  $scope.currentPageSupplier = 0;
   $scope.pageSizeSupplier = 10;
   $scope.numberOfPagesSupplier=function(){
     return Math.ceil($scope.suplierRecord.length/$scope.pageSizeSupplier);
   }

   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response.reason,
       });
  });

/* ====================== end suppliercode========================*/



  }//elseactive
 }//else

}])
