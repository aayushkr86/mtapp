app.controller('supervisorController',['$location','$timeout','$scope','$base64','$http','$window','$anchorScroll','$translate','$filter', function($location,$timeout,$scope,$base64,$http,$window,$anchorScroll,$translate,$filter){
 $scope.logdata = $window.localStorage.getItem('userInfo-token');
 if($scope.logdata == 'undefined' || $scope.logdata == '' || $scope.logdata == null){
   // new PNotify({
   //     tittle : 'Regular notice',
   //     type :'error',
   //     text :'You are not logged in. Please login again',

   //   });
     
      $window.location.href= "/#/super";
      $window.location.reload();
    }
 else{
   $scope.tokendata = jwt_decode($scope.logdata);
   console.log('token',$scope.tokendata)
     if(!$scope.tokendata.isActive){
        $window.location.href= "/#/super";
         $window.location.reload();
    }else{

   $scope.supervisorbranchID = $scope.tokendata.branchID;   
   $scope.supervisorid = $scope.tokendata.id;
   console.log('id',$scope.supervisorid);


  $(document).ready(function(){
    if($scope.tokendata.supervisiortype == 'Maker'){
       // alert($scope.tokendata.supervisiortype == 'Maker');
       $(".checker").hide();
        $(".maker").show();

        $(".controllerchecker").hide();
         $(".controllermaker").show();


    }  else if ($scope.tokendata.supervisiortype == 'Checker') {
     //  alert($scope.tokendata.supervisiortype);
      $(".maker").hide();
       $(".checker").show();
      var confirmation1 = document.getElementById('confirmation');
      confirmation1.style.display = "block";

      $(".controllerchecker").show();
       $(".controllermaker").hide();

       var controllerconfirmation1 = document.getElementById('confirmationController');
       controllerconfirmation1.style.display = "block";

    }

  });


   /*validation*/
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
   $scope.transactionnumberpattern =  /^[0-9]{12,12}$/;

       /*===translator====*/
/*bahar*/
        $scope.$on('$routeChangeStart', function(scope, next, current) {
      if (next.$$route.controller != "supervisorController") {
        
        $window.location.href = "/#/superdashboard";
        $window.location.reload();
      }
    });
 /*bahar*/
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

/* ===========add new here============ */
function addslashes(str) {
  if(str){
   str = str.replace(/\\/g, '\\\\');
   str = str.replace(/\'/g, '\\\'');
   str = str.replace(/\"/g, '\\"');
   str = str.replace(/\0/g, '\\0');
   return str;
 }else{
   return ;
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
   if(string){
    var entityMap = HtmlEntities.map;
    string = string.replace(/&/g, '&amp;');
    string = string.replace(/"/g, '&quot;');
    for (var key in entityMap) {
        var entity = entityMap[key];
        var regex = new RegExp(key, 'g');
        string = string.replace(regex, entity);
    }
    return string;
  }else{
    return;
  }

   };



/*============end add new here========== */

  setTimeout(function(){
     $(document).ready(function() {
                $('select').material_select();
            });
   },1000)

   $scope.hidesavebtn =function(){
     var btn = document.getElementById('savebtn');
      btn.style.display =  "none"
     var btn5 = document.getElementById('savebtn1');
     btn5.style.display =  "none"
     // var btn10 = document.getElementById('savebtn2');
     // btn10.style.display =  "none"
     // var btn16 = document.getElementById('savebtn5');
     // btn16.style.display =  "none"
     // var btn19 = document.getElementById('savebtn6');
     // btn19.style.display =  "none"

     var canceltellerbtn = document.getElementById('canceltellerbtn');
     canceltellerbtn.style.display = "none";

     // var cancelCountrybtn = document.getElementById('cancelCountrybtn');
     // cancelCountrybtn.style.display = "none";

     // var canceltarifbtn = document.getElementById('canceltarifbtn');
     // canceltarifbtn.style.display = "none";

     // var cancelComisionbtn = document.getElementById('cancelComisionbtn');
     // cancelComisionbtn.style.display ="none"

      var confirmation = document.getElementById('confirmation');
     confirmation.style.display = "none";

      var controllerconfirmation = document.getElementById('confirmationController');
     controllerconfirmation.style.display = "none";




   }


   /* teller
   =============================================================
   */
     /*change*/
      $scope.getvalue1 = function() { //Prateek
       $scope.arr1 = $('#list-title1').val().replace(/[^0-9]/g, ""); //Prateek
     }

  /* get teller*/


  $http({
        method: 'GET',
        url: '/tellerbysuper/'+$scope.supervisorbranchID,
        }).success(function (response) {
       $scope.tellerDetails = response.result;

       $(document).ready(function(){
         if($scope.tokendata.supervisiortype == 'Maker'){
            // alert($scope.tokendata.supervisiortype == 'Maker');
            $(".checker").hide();
             $(".maker").show();


         }  else if ($scope.tokendata.supervisiortype == 'Checker') {
          //  alert($scope.tokendata.supervisiortype);
           $(".maker").hide();
            $(".checker").show();
           var confirmation1 = document.getElementById('confirmation');
           confirmation1.style.display = "block";

         }

       });
       /*ranjitchangge*/

  /* get tellerid*/
   $scope.supervisorownid = $scope.tokendata.supervisiorID;
  $scope.branchID = "";
  $scope.supervisior = "";
  $http({
       method: 'GET',
       url: '/gettelleridbysuper/'+$scope.supervisorownid,
       }).success(function (response) {
      $scope.telleriddata = response.result;
      console.log('telleriddata',$scope.telleriddata)
      $scope.supervisior = $scope.telleriddata[0].supervisiorID;
      $scope.branchID = $scope.telleriddata[0].branchID;
      /*change*/
      $scope.tellerDetails1 = $scope.tellerDetails; //target array
      $scope.telleriddata1 = $scope.telleriddata;  //current array
      console.log('main',$scope.telleriddata1);

      var tellerDetailsarray = $.map($scope.tellerDetails1 , function(value, index) {
      return [value];
      });
      var tellerArray = [] ;
      for(var i=0;i<tellerDetailsarray.length;i++){
        tellerArray.push(JSON.stringify(tellerDetailsarray[i].tellerID))
      }
       var arrayAsString = JSON.stringify(tellerArray);
       var array = JSON.parse(arrayAsString);
       console.log('assign',array)

      var tellerIDArray =[];
      for(var j=0;j<$scope.telleriddata1.length;j++){
        if( array.indexOf($scope.telleriddata1[j].tellerID) == -1 ){
            //tellerIDArray.push($scope.telleriddata1[j].tellerID);
            tellerIDArray[$scope.telleriddata1[j].tellerID] = $scope.telleriddata1[j].tellerID;
        }
      }

      $scope.telleriddata2 = tellerIDArray;
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.reason,
         });
    });

      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response.reason,
          });
     });


     /* get tellerpaymentlimit*/
$scope.getpayment = function(tellerid){
  $http({
       method: 'GET',
       url: '/tellerIDbypayment/'+tellerid,
     }).success(function (response) {
        $scope.tellerlimit = response.result[0].paymentLimit;
        console.log('limit',$scope.tellerlimit)
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.reason,
         });
       });


}//fun
/*end*/

/*get tellerDetails*/
  $scope.changeactivestatusvalue;
$http({
       method: 'GET',
       url: '/tellerbysuper/'+$scope.supervisorbranchID,
    }).success(function (response) {
     $scope.tellerDetails = response.result.reverse();


     $scope.currentPageteller = 0;
      $scope.pageSizeteller = 10;
      $scope.numberOfPagesteller=function(){
        return Math.ceil($scope.tellerDetails.length/$scope.pageSizeteller);
      }
      $(document).ready(function(){
        if($scope.tokendata.supervisiortype == 'Maker'){
           // alert($scope.tokendata.supervisiortype == 'Maker');
           $(".checker").hide();
            $(".maker").show();


        }  else if ($scope.tokendata.supervisiortype == 'Checker') {
         //  alert($scope.tokendata.supervisiortype);
          $(".maker").hide();
           $(".checker").show();
          var confirmation1 = document.getElementById('confirmation');
          confirmation1.style.display = "block";

        }

      });

   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response.reason,
       });
  });


    $scope.tellerid = "";
    $scope.telleremail = "";
    $scope.tellername = "";
    $scope.tellercontact = "";
    $scope.logintime = "";
    $scope.logouttime ="";
    $scope.telleraddress="";

    $scope.createTeller = function (){
      $scope.getvalue1();
     $scope.tellerlimit = $scope.arr1;
      $scope.tel1 = "+" +$scope.tellercontact;
      if(!$scope.tellerid){
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Tellerid can not be empty',
          });
      }else if (!$scope.telleremail) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'Email can not be empty',
          });
      }else if (!$scope.logintime) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'logintime can not be empty',
          });
      }else if (!$scope.logouttime) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :'logouttime can not be empty',
          });
      }else{
      $scope.tellerbranch = $base64.encode(encodeHtmlEntity(addslashes($scope.branchID)));
      $scope.tellerID = $base64.encode($scope.tellerid);
      $scope.tellerEmail = $base64.encode(encodeHtmlEntity(addslashes($scope.telleremail)));
      $scope.tellerpaylimit = $base64.encode($scope.tellerlimit);
      $scope.tellerphone = $base64.encode($scope.tel1);
      $scope.tellersup = $base64.encode($scope.supervisorid);

      $scope.telleradddata = {
            "branchID": $scope.tellerbranch,
            "tellerID" :$scope.tellerID,
            "name":encodeHtmlEntity(addslashes($scope.tellername)),
            "email": $scope.tellerEmail,
            "phone": $scope.tellerphone,
            "address":encodeHtmlEntity(addslashes($scope.telleraddress)),
            "paymentLimit":$scope.tellerpaylimit,
            "_superVisior":$scope.tellersup,
            "logintime":$scope.logintime,
            "logouttime":$scope.logouttime
        };



        $http({
             method: 'POST',
             url: '/tellerController',
             data: $scope.telleradddata,
             }).success(function (response) {
               console.log('res',response)

        if(response.result == 'All fields are required'){
          new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response.result,
            });
        }
        if(response.result == 'This Teller Already Assign'){
          new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response.result,
            });
        }
        if(response.result == 'Teller Login Password  and ID was send in his/her Email'){
          new PNotify({
              tittle : 'Regular notice',
              type :'success',
              text :response.result,
            });
            $scope.tellerid = null;
            $scope.telleremail = null;
            $scope.tellername = null;
            $scope.tellerlimit = null;
            $scope.tellercontact = null;
            $scope.logintime = null;
            $scope.logouttime = null;
            $scope.telleraddress = null;
        }

                   $http({
                       method: 'GET',
                       url: '/tellerbysuper/'+$scope.supervisorbranchID,
                    }).success(function (response) {
                     $scope.tellerDetails = response.result.reverse();

                     $scope.currentPageteller = 0;
        			        $scope.pageSizeteller = 10;
        			        $scope.numberOfPagesteller=function(){
        			          return Math.ceil($scope.tellerDetails.length/$scope.pageSizeteller);
        			        }
       $(document).ready(function(){
         if($scope.tokendata.supervisiortype == 'Maker'){
            // alert($scope.tokendata.supervisiortype == 'Maker');
            $(".checker").hide();
             $(".maker").show();


         }  else if ($scope.tokendata.supervisiortype == 'Checker') {
          //  alert($scope.tokendata.supervisiortype);
           $(".maker").hide();
            $(".checker").show();
           var confirmation1 = document.getElementById('confirmation');
           confirmation1.style.display = "block";

         }

       });
     
                      }).error(function (response) {
                         new PNotify({
                            tittle : 'Regular notice',
                            type :'error',
                            text :response.reason,
                          });
                     });


           }).error(function (response) {
            console.log(response)
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response.reason.errmsg,
               });
          });
      }//else
    };//tellerfun
    $scope.resetTeller = function(){
      $scope.tellerid = null;
      $scope.telleremail = null;
      $scope.tellername = null;
      $scope.tellerlimit = null;
      $scope.tellercontact = null;
       $scope.logintime = null;
      $scope.logouttime = null;
      $scope.telleraddress =null;
    };
    // /*get tellerDetails*/
    // $http({
    //        method: 'GET',
    //        url: '/tellerbysuper/'+$scope.supervisorbranchID,
    //     }).success(function (response) {
    //      $scope.tellerDetails = response.result.reverse();
    //      console.log('tellerdeatils1',$scope.tellerDetails)
    //      $scope.currentPageteller = 0;
    //       $scope.pageSizeteller = 10;
    //       $scope.numberOfPagesteller=function(){
    //         return Math.ceil($scope.tellerDetails.length/$scope.pageSizeteller);
    //       }
    //       $(document).ready(function(){
    //     if($scope.tokendata.supervisiortype == 'Maker'){
    //        // alert($scope.tokendata.supervisiortype == 'Maker');
    //        $(".checker").hide();
    //         $(".maker").show();


    //     }  else if ($scope.tokendata.supervisiortype == 'Checker') {
    //      //  alert($scope.tokendata.supervisiortype);
    //       $(".maker").hide();
    //        $(".checker").show();
    //       var confirmation1 = document.getElementById('confirmation');
    //       confirmation1.style.display = "block";

    //     }

    //   });
    //    }).error(function (response) {
    //       new PNotify({
    //          tittle : 'Regular notice',
    //          type :'error',
    //          text :response.reason,
    //        });


    //   });
    $scope.editTeller = function(tellerinfo){


        $(".hideteller").hide();
      $(".telleridhide").show();


      // alert(tellerinfo._id)
      var btn1 = document.getElementById("addbtn");
      btn1.style.display ="none";
      var btn2 = document.getElementById("resetbtn");
      btn2.style.display ="none";
      var btn3 = document.getElementById('savebtn');
      btn3.style.display =  "block";
      btn3.style.float = "right";
      canceltellerbtn.style.display = "block";
      canceltellerbtn.style.float = "right";

      $scope.cancelTeller = function(){
        $(".hideteller").show();
          $(".telleridhide").hide();
        $scope.tellerid = null;
        $scope.telleremail = null;
        $scope.tellername = null;
        $scope.tellerlimit = null;
        $scope.tellercontact = null;
         $scope.logintime = null;
        $scope.logouttime = null;
        $scope.telleraddress =null;
        btn3.style.display =  "none";
        btn1.style.display ="block";
        btn1.style.float = "right";
        btn2.style.display ="block";
        btn2.style.float = "right";
        canceltellerbtn.style.display = "none";
      }
      $http({
           method: 'GET',
           url: '/teller/'+tellerinfo._id,
           }).success(function (response) {

             $("label").addClass("active")
             $scope.tellerid = response.result.tellerID;
             $scope.telleremail = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.email));
             $scope.tellername = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.name));
             // $scope.tellerlimit = response.result.paymentLimit;
             $scope.tellercontact1 = response.result.phone;

             $scope.telleraddress = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.address));
             $scope.tellercontact = $scope.tellercontact1.slice(1)
              $scope.tellerlimit1 = response.result.paymentLimit;
             $scope.bc = $scope.tellerlimit1.toLocaleString();
             $scope.tellerlimit = $scope.bc;

              $scope.logintime = response.result.startTime;
              $scope.logouttime = response.result.endTime;

         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });

        $scope.updateTeller = function (){
          $(".hideteller").show();
          $(".telleridhide").hide();

          $scope.getvalue1();
          $scope.tellerlimit = $scope.arr1;
           $scope.tel1 = "+" +$scope.tellercontact;
         $scope.tellerupdatedata ={
           "branchID": $scope.tellerbranch,
           "tellerID" :$scope.tellerid,
           "name":encodeHtmlEntity(addslashes($scope.tellername)),
           "email": encodeHtmlEntity(addslashes($scope.telleremail)) ,
           "phone": $scope.tel1,
           "address":encodeHtmlEntity(addslashes($scope.telleraddress)),
           "paymentLimit":$scope.tellerlimit,
           "_superVisior":$scope.tellersup,
           "startTime":$scope.logintime,
          "endTime":$scope.logouttime
         };
         console.log('updateteller', $scope.tellerupdatedata)
         $http({
              method: 'PUT',
              url: '/tellerController/'+tellerinfo._id,
              data: $scope.tellerupdatedata,
              }).success(function (response) {
                console.log('update',response)
                if(response.message == 'email can not be empty'){
                  new PNotify({
                      tittle : 'Regular notice',
                      type :'error',
                      text :response.message,
                    });
                }
                if(response.message == 'phoneNumbber can not be empty'){
                  new PNotify({
                      tittle : 'Regular notice',
                      type :'error',
                      text :response.message,
                    });
                }
                if(response.message == 'logintime can not be empty'){
                  new PNotify({
                      tittle : 'Regular notice',
                      type :'error',
                      text :response.message,
                    });
                }
                if(response.message == 'logouttime can not be empty'){
                  new PNotify({
                      tittle : 'Regular notice',
                      type :'error',
                      text :response.message,
                    });
                }
                if(response.message == 'paymentLimit can not be empty'){
                  new PNotify({
                      tittle : 'Regular notice',
                      type :'error',
                      text :response.message,
                    });
                }
                if(response.message == 'updated'){
                  new PNotify({
                      tittle : 'Regular notice',
                      type :'success',
                      text :response.message,
                    });
                      $scope.tellerid = null;
                      $scope.telleremail = null;
                      $scope.tellername = null;
                      $scope.tellerlimit = null;
                      $scope.tellercontact = null;
                       $scope.logintime = null;
                      $scope.logouttime = null;
                      $scope.telleraddress =null;
                      btn1.style.display ="block";
                      btn1.style.float="right"
                      btn2.style.display ="block";
                      btn2.style.float="right"
                      btn3.style.display ="none";
                      canceltellerbtn.style.display = "none";
                }

                    $http({
                       method: 'GET',
                       url: '/tellerbysuper/'+$scope.supervisorbranchID,
                    }).success(function (response) {
                     $scope.tellerDetails = response.result.reverse();
                     console.log('tellerdeatils1',$scope.tellerDetails);
                      $(document).ready(function(){
         if($scope.tokendata.supervisiortype == 'Maker'){
            // alert($scope.tokendata.supervisiortype == 'Maker');
            $(".checker").hide();
             $(".maker").show();


         }  else if ($scope.tokendata.supervisiortype == 'Checker') {
          //  alert($scope.tokendata.supervisiortype);
           $(".maker").hide();
            $(".checker").show();
           var confirmation1 = document.getElementById('confirmation');
           confirmation1.style.display = "block";

         }

       });
                       }).error(function (response) {
                          new PNotify({
                             tittle : 'Regular notice',
                             type :'error',
                             text :response,
                           });
                      });
            }).error(function (response) {
               new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response,
                });
           });


       }
       $("html, body").animate({ scrollTop: 0 }, "slow");
       }//fun
/*delete teller*/
 $scope.deleteTeller = function(tellerinfo){
   var deleteTellerconfirm = confirm("Are you sure want to delete Teller?");
  if(deleteTellerconfirm){
     $http({
          method: 'DELETE',
          url: '/tellerController/'+tellerinfo._id,
         headers: {'Content-Type': 'application/json'
          }
          }).success(function (response) {
            console.log('ssss',response)
             new PNotify({
              tittle : 'Regular notice',
              type :'success',
              text :response.message
            });
            var btn1 = document.getElementById("addbtn");
            btn1.style.display ="block";
            btn1.style.float = "right";
            var btn2 = document.getElementById("resetbtn");
            btn2.style.display ="block";
            btn2.style.float = "right";
            var btn3 = document.getElementById('savebtn');
            btn3.style.display =  "none";

            canceltellerbtn.style.display = "none";
           $http({
                 method: 'GET',
                 url: '/tellerbysuper/'+$scope.supervisorbranchID,
              }).success(function (response) {
               $scope.tellerDetails = response.result;
               console.log('tellerdeatils1',$scope.tellerDetails)
               $scope.currentPageteller = 0;
                $scope.pageSizeteller = 10;
                $scope.numberOfPagesteller=function(){
                  return Math.ceil($scope.tellerDetails.length/$scope.pageSizeteller);
                };
                 $(document).ready(function(){
         if($scope.tokendata.supervisiortype == 'Maker'){
            // alert($scope.tokendata.supervisiortype == 'Maker');
            $(".checker").hide();
             $(".maker").show();


         }  else if ($scope.tokendata.supervisiortype == 'Checker') {
          //  alert($scope.tokendata.supervisiortype);
           $(".maker").hide();
            $(".checker").show();
           var confirmation1 = document.getElementById('confirmation');
           confirmation1.style.display = "block";

         }

       });

                }).error(function (response) {
                   new PNotify({
                      tittle : 'Regular notice',
                      type :'error',
                      text :response,
                    });
               });

          }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response,
            });
        });
      }
   }
/*delete*/

/*active*/
   $scope.telleractiveCheck = function(tellerinfo){

     $http({
          method : "PUT",
          url : '/tellerStatusEdit/'+tellerinfo._id,
          data: {isActive:false}
        }).success(function (response)  {
          new PNotify({
            tittle : 'Regular notice',
            type :'success',
            text :response.message,
          });
          $http({
             method: 'GET',
             url: '/tellerbysuper/'+$scope.supervisorbranchID,
          }).success(function (response) {
           $scope.tellerDetails = response.result.reverse();
           console.log('tellerdeatils1',$scope.tellerDetails)
           $(document).ready(function(){
               $(".checker").hide();
           });
             }).error(function (response) {
                new PNotify({
                   tittle : 'Regular notice',
                   type :'error',
                   text :response,
                 });
            });

        }).error(function (response) {
         console.log('errorty',response)
      });
   }//fun
/* ============ confirmation ==============*/
$scope.confirmationMSg = function(tellerinfo){
   var confirmmsg = {
     "confirmationMSg": "confirm"
   };
   console.log('confimmsg',confirmmsg)
  $http({
       method : "PUT",
       url : '/tellerStatusfinalupdate/'+tellerinfo._id,
       data: confirmmsg
     }).success(function (response)  {
       new PNotify({
          tittle : 'Regular notice',
          type :'success',
          text :response.message,
        });
        $http({
           method: 'GET',
           url: '/tellerbysuper/'+$scope.supervisorbranchID,
        }).success(function (response) {
         $scope.tellerDetails = response.result.reverse();
         console.log('tellerdeatils1',$scope.tellerDetails);
         $(document).ready(function(){
             $(".maker").hide();
         });

           }).error(function (response) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response,
               });
          });
     }).error(function (response) {
      console.log('errorty',response)
   });
};








/*end active*/


/*active*/
  // $scope.telleractiveCheck = function(tellerinfo){
  //   //alert(tellerid._id)
  //   $(".enabletellerid, .disabletellerid").unbind("click");
  //   $(document).on("click", ".enabletellerid, .disabletellerid", function(){

  //      var $this = $(this);
  //      if($this.hasClass('enabletellerid')){
  //      $this.text('Disable');

  //      $http({
  //        method : "PUT",
  //        url : '/tellerStatusEdit/'+tellerinfo._id,
  //        data: {isActive:false}
  //      }).then(function mySucces(response) {
  //        new PNotify({
  //            tittle : 'Regular notice',
  //            type :'success',
  //            text :response.data.message,
  //          });
  //      }, function myError(response) {
  //        new PNotify({
  //            tittle : 'Regular notice',
  //            type :'error',
  //            text :response.data.message,
  //          });

  //      });
  //      $this.addClass("disabletellerid");
  //      $this.removeClass("enabletellerid");


  //      } else {
  //         $this.text('Enable');

  //        $http({
  //          method : "PUT",
  //          url : '/tellerStatusEdit/'+tellerinfo._id,
  //          data: {isActive:true}
  //        }).then(function mySucces(response) {
  //          new PNotify({
  //              tittle : 'Regular notice',
  //              type :'success',
  //              text :response.data.message,
  //            });
  //        }, function myError(response) {
  //          new PNotify({
  //              tittle : 'Regular notice',
  //              type :'error',
  //              text :response.data.message,
  //            });

  //        });
  //      $this.addClass("enabletellerid");
  //      $this.removeClass("disabletellerid");



  //    }//else
  //    });
  // };//fun
/*end active*/

  /* end teller
  =============================================================
  */
  /*supplier*/
  /* ==============================================*/
 
    $scope.suplieractiveCheck = function (superv){
      //  alert(superv._id)
      $(".enablesuper, .disablesuper").unbind("click");
      $(document).on("click", ".enablesuper, .disablesuper", function(){

         var $this = $(this);
         if($this.hasClass('enablesuper')){

         $http({
           method : "PUT",
           url : '/supplierStatusEdit/'+superv._id,
           data: {isActive:false}
         }).then(function mySucces(response) {
           $this.text('Disable');
           new PNotify({
               tittle : 'Regular notice',
               type :'success',
               text :response.data.message,
             });
         }, function myError(response) {
           new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response.data.message,
             });

         });
         $this.addClass("disablesuper");
         $this.removeClass("enablesuper");


         } else {

           $http({
             method : "PUT",
             url : '/supplierStatusEdit/'+superv._id,
             data: {isActive:true}
           }).then(function mySucces(response) {
               $this.text('Enable');
             new PNotify({
                 tittle : 'Regular notice',
                 type :'success',
                 text :response.data.message,
               });
           }, function myError(response) {
             new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response.data.message,
               });

           });
         $this.addClass("enablesuper");
         $this.removeClass("disablesuper");



       }//else
       });

      };


/* countrlist*/
$http({
     method: 'GET',
     url: '/countrycurrencylist',
     }).success(function (response) {
    $scope.countrylist = response.result;
    console.log($scope.countrylist);
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
  });
  $scope.supplierName = "";
  $scope.supplierEmail = "";
  $scope.superlierCountry = "";
  $scope.superlierRegion = "";
  $scope.suplierContact = "";

  $scope.addSupplier = function(){

    $scope.supliername = $base64.encode($scope.supplierName);
    $scope.suplieremail = $base64.encode($scope.supplierEmail);
    $scope.supliercountry = $base64.encode($scope.superlierCountry);
    $scope.suplierregion = $base64.encode($scope.superlierRegion);
    $scope.suplierphone = $base64.encode($scope.suplierContact);

    $scope.suplierdata ={
              "supplierName":$scope.supliername,
              "email":$scope.suplieremail,
              "contact":$scope.suplierphone,
              "country":$scope.supliercountry,
              "sector":$scope.suplierregion,
             // "charge":charge
     };

     $http({
          method: 'POST',
          url: '/supplierController',
          data: $scope.suplierdata,
          }).success(function (response) {
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.message,
                });
                $http({
                     method: 'GET',
                     url: '/allsupplierController',
                     }).success(function (response) {
                    $scope.suplierDetails = response.result1;

                   }).error(function (response) {
                      new PNotify({
                         tittle : 'Regular notice',
                         type :'error',
                         text :response.reason,
                       });
                  });
                  $scope.supplierName = null;
                  $scope.supplierEmail = null;
                  $scope.superlierCountry = null;
                  $scope.superlierRegion = null;
                  $scope.suplierContact = null;

        }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response.reason.errmsg,
            });
       });


  };
  $scope.resetSupplier = function (){
    $scope.supplierName = null;
    $scope.supplierEmail = null;
    $scope.superlierCountry = null;
    $scope.superlierRegion = null;
    $scope.suplierContact = null;
  };

  $http({
       method: 'GET',
       url: '/allsupplierController',
       }).success(function (response) {
      $scope.suplierDetails = response.result1;
      console.log($scope.suplierDetails);
      //  $scope.tellerDetails = $base64.decode(response.result);
      //  console.log($scope.tellerDetails);
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.reason,
         });
    });

    $scope.editSupplier = function(suplier){
      // alert(suplier._id)
      var btn6 = document.getElementById("addbtn1");
      btn6.style.display ="none";
      var btn7 = document.getElementById("resetbtn1");
      btn7.style.display ="none";
      var btn8 = document.getElementById('savebtn1');
      btn8.style.display =  "block";
      btn8.style.float = "right";
      $http({
           method: 'GET',
           url: '/supplier/'+suplier._id,
           }).success(function (response) {
             console.log(response)
             $("label").addClass("active")
             $scope.supplierName = response.result.supplierName;
             $scope.supplierEmail = response.result.email;
             $scope.superlierCountry = response.result.country;
             $scope.superlierRegion = response.result.sector;
             $scope.suplierContact = response.result.contact;
         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });
        $scope.updateSupplier = function (){
          $scope.supupdatedata ={
             "supplierName":$scope.supplierName,
             "email":$scope.supplierEmail,
             "country":$scope.superlierCountry,
             "sector":$scope.superlierRegion,
             "contact":$scope.suplierContact,
           };
         $http({
              method: 'PUT',
              url: '/supplier/'+suplier._id,
              data: $scope.supupdatedata ,
              }).success(function (response) {
                console.log(response)
                  new PNotify({
                      tittle : 'Regular notice',
                      type :'success',
                      text :response.message,
                    });
                      $scope.supplierName = null;
                      $scope.supplierEmail = null;
                      $scope.superlierCountry = null;
                      $scope.superlierRegion = null;
                      $scope.suplierContact = null;
                      btn6.style.display ="block";
                      btn6.style.float="right"
                      btn7.style.display ="block";
                      btn7.style.float="right"
                      btn8.style.display ="none";
                      $http({
                           method: 'GET',
                           url: '/allsupplierController',
                           }).success(function (response) {
                          $scope.suplierDetails = response.result1;
                         }).error(function (response) {
                            new PNotify({
                               tittle : 'Regular notice',
                               type :'error',
                               text :response.reason,
                             });
                        });
            }).error(function (response) {
               new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response,
                });
           });


       }
       $("html, body").animate({ scrollTop: 0 }, "slow");
    }//fun
  /*end supplier*/
  /* ==============================================*/
  /*remitter*/
  /*==============================================*/

    $scope.remitactiveCheck = function(remit){
     //alert(remit._id)
     $(".enableremit, .disableremit").unbind("click");
      $(document).on("click", ".enableremit, .disableremit", function(){

         var $this = $(this);
         if($this.hasClass('enableremit')){

         $http({
           method : "PUT",
           url : '/remitterController/'+remit._id,
           data: {status:'Blacklist'}
         }).then(function mySucces(response) {
           console.log('remit',response);
           if(response.data.result.status == 'Blacklist'){
             $this.text('Disable');
           }
           new PNotify({
               tittle : 'Regular notice',
               type :'success',
               text :response.data.message,
             });
         }, function myError(response) {
           new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response.data.message,
             });

         });
         $this.addClass("disableremit");
         $this.removeClass("enableremit");


         } else {
           $http({
             method : "PUT",
             url : '/remitterController/'+remit._id,
             data: {status:"Verified"}
           }).then(function mySucces(response) {
             if(response.data.result.status == 'Verified'){
              $this.text('Enable');
             }
             new PNotify({
                 tittle : 'Regular notice',
                 type :'success',
                 text :response.data.message,
               });
           }, function myError(response) {
             new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response.data.message,
               });

           });
         $this.addClass("enableremit");
         $this.removeClass("disableremit");

       }//else
       });
   };//fun

/*beneficiary*/
/*========================================================*/
$http({
     method: 'GET',
     url: '/beneficiarybybranchController/'+$scope.tokendata.branchID,
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.beneficiaryDetails = response.result.reverse();
      // console.log('benef',$scope.beneficiaryDetails);
      $scope.currentPageBenef = 0;
             $scope.pageSizeBenef = 10;
             $scope.numberOfPagesBenef=function(){
               return Math.ceil($scope.beneficiaryDetails.length/$scope.pageSizeBenef);
             }

   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response.reason,
       });
  });


$scope.benefactiveCheck = function(benef){
  // alert(benef._id)
  $(".enablebenef, .disablebenef").unbind("click");
   $(document).on("click", ".enablebenef, .disablbenef", function(){

      var $this = $(this);
      if($this.hasClass('enablebenef')){
      $http({
        method : "PUT",
        url : '/beneficiaryController/'+benef._id,
        data: {status:'Blacklist'}
      }).then(function mySucces(response) {
        if(response.data.result.status == 'Blacklist'){
          $this.text('Disable');
        }
        new PNotify({
            tittle : 'Regular notice',
            type :'success',
            text :response.data.message,
          });
      }, function myError(response) {
        new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response.data.message,
          });

      });
      $this.addClass("disablebenef");
      $this.removeClass("enablebenef");
      } else {
        $http({
          method : "PUT",
          url : '/beneficiaryController/'+benef._id,
          data: {status:"Verified"}
        }).then(function mySucces(response) {
          if(response.data.result.status == 'Verified'){
           $this.text('Enable');
          }
          new PNotify({
              tittle : 'Regular notice',
              type :'success',
              text :response.data.message,
            });

        }, function myError(response) {
          new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response.data.message,
            });

        });
      $this.addClass("enablebenef");
      $this.removeClass("disablebenef");

    }//else
    });
};//fun



  /*KYC*/
  /*==============================================================================*/


  $http({
       method: 'GET',
       url: '/remitterbybranchController/'+$scope.tokendata.branchID,
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
         $scope.remitterDetails = response.result.reverse();
         $scope.currentPageKYC = 0;
 			        $scope.pageSizeKYC = 10;
 			        $scope.numberOfPagesKYC=function(){
 			          return Math.ceil($scope.remitterDetails.length/$scope.pageSizeKYC);
 			     }
           $scope.currentPageRemiter = 0;
   			        $scope.pageSizeRemiter = 10;
   			        $scope.numberOfPagesRemiter=function(){
   			          return Math.ceil($scope.remitterDetails.length/$scope.pageSizeRemiter);
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

  $scope.blacklistadd = function(){
    $scope.rmdata ={
           "name":$scope.remittername,
           "surName":$scope.remittersurName
         };
         $http({
              method: 'POST',
              url: '/blacklistController',
              data: $scope.rmdata,
             headers: {'Content-Type': 'application/json'
              }
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
                  text :response.reason,
                });
           });
  };
  $scope.deleteBlacklist = function(remit){
   //  alert(remit._id)
    $http({
         method: 'DELETE',
         url: '/blacklistController/'+remit._id,
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
             text :response.reason,
           });
      });
  }

  /*end KYC*/
  /*==============================================================================*/

  /*Report*/
  /*==============================================================================*/

  /*get transactiondata*/
  $http({
       method: 'GET',
       url: '/transactionbybranch/'+$scope.tokendata.branchID,
       }).success(function (response) {

         $scope.transactionDetails = response.result.reverse();
         console.log('transactionDetails',$scope.transactionDetails)
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


  /*End Report*/
  /*==============================================================================*/
  /*country*/
  /*==============================================================================*/
  /*change*/
         $scope.getvalue2 = function() { //Prateek
            $scope.arr2 = $('#list-title3').val().replace(/[^0-9]/g, ""); //Prateek
        }


  $scope.getCurrency1 = function(country){
    $scope.currencyfinddata = country;
    $scope.currecysearchData = {
       "countryName": $scope.currencyfinddata
    }
    $http({
         method: 'POST',
         url: '/currencylist',
         data: $scope.currecysearchData,
         }).success(function (response) {
           $scope.getCurrencyData = response.result;
           $("label").addClass("active")
            $scope.currency = $scope.getCurrencyData[0].currencyName;

       }).error(function (response) {
          new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response,
           });
      });

  }//get cur
  $scope.countrylimit = "";
  $scope.currency = "";
  $scope.monthlylimit = "";
  $scope.region = "";

  $scope.createCountry = function (){
     $scope.getvalue2();
     $scope.monthlylimit = $scope.arr2;
     $scope.countryname     = $base64.encode(encodeHtmlEntity(addslashes($scope.countrylimit)));
       $scope.countrycurrency = $base64.encode(encodeHtmlEntity(addslashes($scope.currency)));
       $scope.paylimit        = $base64.encode($scope.monthlylimit);
       $scope.countryregion   = $base64.encode(encodeHtmlEntity(addslashes($scope.region)));

   $scope.countrydata ={
          "countryName":$scope.countryname,
          "currency":$scope.countrycurrency,
          "paymentLimit":$scope.paylimit,
          "region":$scope.countryregion
        };
        $http({
             method: 'POST',
             url: '/countryController',
             data: $scope.countrydata,
            headers: {'Content-Type': 'application/json'
             }
             }).success(function (response) {
               if(response.message == 'Country can not be empty'){
               new PNotify({
                   tittle : 'Regular notice',
                   type :'error',
                   text :response.message,
                 });
             }
             if(response.message == 'Currency can not be empty'){
               new PNotify({
                   tittle : 'Regular notice',
                   type :'error',
                   text :response.message,
                 });
             }
             if(response.message == 'CountryLimit can not be empty'){
               new PNotify({
                   tittle : 'Regular notice',
                   type :'error',
                   text :response.message,
                 });
             }
             if(response.message == 'Region can not be empty'){
               new PNotify({
                   tittle : 'Regular notice',
                   type :'error',
                   text :response.message,
                 });
             }

             if(response.message == 'This countryLimit already define,Please enter another region for this country'){
               new PNotify({
                   tittle : 'Regular notice',
                   type :'error',
                   text :response.message,
                 });
             }
             if(response.message == 'CountryLimit added'){
               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :response.message,
                 });
                $scope.countrylimit = "?";
       		     $scope.currency = null;
       		     $scope.monthlylimit = null;
       		     $scope.region = null;

             }
                   $http({
                        method: 'GET',
                        url: '/countryController',
                       headers: {'Content-Type': 'application/json'
                        }
                        }).success(function (response) {
                          $scope.countrylimitDetails = response.result.reverse();
                           $scope.currentPageClimit = 0;
					         $scope.pageSizeClimit    = 10;
					         $scope.numberOfPagesClimit=function(){
					           return Math.ceil($scope.countrylimitDetails.length/$scope.pageSizeClimit);
					         }
                      }).error(function (response) {
                         new PNotify({
                            tittle : 'Regular notice',
                            type :'error',
                            text :response,
                          });
                     });

           }).error(function (response) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response.reason,
               });
          });

  };
  $scope.resetCountry = function (){
    $scope.countrylimit = "?";
    $scope.currency = null;
    $scope.monthlylimit = null;
    $scope.region = null;
  };

  $http({
       method: 'GET',
       url: '/countryController',
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
         $scope.countrylimitDetails = response.result.reverse();
          $scope.currentPageClimit = 0;
  $scope.pageSizeClimit    = 10;
  $scope.numberOfPagesClimit=function(){
    return Math.ceil($scope.countrylimitDetails.length/$scope.pageSizeClimit);
  }
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });
    $scope.editCountryCurrency = function(country){
    //  alert(country._id)
    var btn11 = document.getElementById("addbtn2");
     btn11.style.display ="none";
     var btn12 = document.getElementById("resetbtn2");
     btn12.style.display ="none";
     var btn13 = document.getElementById('savebtn2');
     btn13.style.display =  "block";
     btn13.style.float = "right";
     cancelCountrybtn.style.display ="block";

     $scope.cancelCountry = function(){
        $scope.countrylimit = "?";
        $scope.currency = null;
        $scope.monthlylimit = null;
        $scope.region = null;
        btn11.style.display ="block";
        btn11.style.float="right"
        btn12.style.display ="block";
        btn12.style.float="right"
        btn13.style.display =  "none";
        cancelCountrybtn.style.display = "none";
      }
     $http({
          method: 'GET',
          url: '/country/'+country._id,
          }).success(function (response) {
            console.log(response)
            $("label").addClass("active")
            $scope.countrylimit  = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.countryName));
            $scope.currency      = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.currency));
            $scope.monthlylimit1 = response.result.paymentLimit;
            $scope.region        = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.region));
            $scope.cl            = $scope.monthlylimit1.toLocaleString();
           $scope.monthlylimit   = $scope.cl;
        }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response,
            });
       });

       $scope.updateCountry = function (){
         $scope.getvalue2();
     $scope.monthlylimit = $scope.arr2;
         $scope.countryupdateRecord ={
           "countryName" : encodeHtmlEntity(addslashes($scope.countrylimit)),
 	        "currency" :  encodeHtmlEntity(addslashes($scope.currency)),
 	        "paymentLimit" :$scope.monthlylimit,
 	        "region" : encodeHtmlEntity(addslashes($scope.region)),
         };
       $http({
            method: 'PUT',
            url: '/country/'+country._id,
            data: $scope.countryupdateRecord,
            }).success(function (response) {
              if(response.message == 'CountryLimit can not be empty'){
             new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response.message,
               });
           }
           if(response.message == 'Region can not be empty'){
             new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response.message,
               });
           }


           if(response.message == 'update'){
             new PNotify({
                 tittle : 'Regular notice',
                 type :'success',
                 text :response.message,
               });
               $scope.countrylimit = "?";
               $scope.currency = null;
               $scope.monthlylimit = null;
               $scope.region = null;
               btn11.style.display ="block";
               btn11.style.float="right"
               btn12.style.display ="block";
               btn12.style.float="right"
               btn13.style.display =  "none";
               cancelCountrybtn.style.display = "none";
           }
                  $http({
                       method: 'GET',
                       url: '/countryController',
                      headers: {'Content-Type': 'application/json'
                       }
                       }).success(function (response) {
                         $scope.countrylimitDetails = response.result.reverse();

                        $scope.currentPageClimit   = 0;
				        $scope.pageSizeClimit      = 10;
				        $scope.numberOfPagesClimit = function(){
				          return Math.ceil($scope.countrylimitDetails.length/$scope.pageSizeClimit);
				        }
                     }).error(function (response) {
                        new PNotify({
                           tittle : 'Regular notice',
                           type :'error',
                           text :response,
                         });
                    });
          }).error(function (response) {
             new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response,
              });
         });
     }
$("html, body").animate({ scrollTop: 0 }, "slow");
   }//edit fun
 $scope.deleteCountry = function(country){
   var deleteconfirmcountrylimt = confirm("Are you sure want to delete countrylimit?");
  if(deleteconfirmcountrylimt){
  $http({
            method: 'DELETE',
            url: '/country/'+country._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({
                tittle : 'Regular notice',
                type :'success',
                text :response.message
              });
              var addbtn11 = document.getElementById("addbtn2");
               addbtn11.style.display ="block";
               addbtn11.style.float = "right";
               var  resetbtn12 = document.getElementById("resetbtn2");
               resetbtn12.style.display ="block";
               resetbtn12.style.float = "right";
               var savebtn13 = document.getElementById('savebtn2');
               savebtn13.style.display =  "none";
               var cancelCountrybtnhide = document.getElementById("cancelCountrybtn");
               cancelCountrybtnhide.style.display ="none";

              $http({
                    method: 'GET',
                    url: '/countryController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.countrylimitDetails = response.result.reverse();
                   $scope.currentPageClimit = 0;
			       $scope.pageSizeClimit    = 10;
			       $scope.numberOfPagesClimit=function(){
			          return Math.ceil($scope.countrylimitDetails.length/$scope.pageSizeClimit);
			       }

                  }).error(function (response) {
                     new PNotify({
                        tittle : 'Regular notice',
                        type :'error',
                        text :response,
                      });
                 });
                  // $window.location.reload();
            }).error(function (response) {
             new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response,
              });
          });
}
 }//fun
  /*end country*/
  /*==============================================================================*/
  /*controller*/
  /*===============================================*/


  $http({
       method: 'GET',
       url: '/controllerbybranch/'+$scope.tokendata.branchID
       }).success(function (response) {
        $scope.controllerDetails = response.result.reverse();
        $scope.currentPageController = 0;
			        $scope.pageSizeController = 10;
			        $scope.numberOfPagesController=function(){
			          return Math.ceil($scope.controllerDetails.length/$scope.pageSizeController);
			        };
  $(document).ready(function(){
    if($scope.tokendata.supervisiortype == 'Maker'){
       // alert($scope.tokendata.supervisiortype == 'Maker');
       $(".checker").hide();
        $(".maker").show();

        $(".controllerchecker").hide();
         $(".controllermaker").show();


    }  else if ($scope.tokendata.supervisiortype == 'Checker') {
     //  alert($scope.tokendata.supervisiortype);
      $(".maker").hide();
       $(".checker").show();
      var confirmation1 = document.getElementById('confirmation');
      confirmation1.style.display = "block";

      $(".controllerchecker").show();
       $(".controllermaker").hide();

       var controllerconfirmation1 = document.getElementById('confirmationController');
       controllerconfirmation1.style.display = "block";

    }

  });
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.reason.errmsg,
         });
    });
   /*============================================================*/
/*ranjitgorai*/
   $scope.controlactiveCheck = function(control){

         $http({
           method : "PUT",
           url : '/controllerStatusEdit/'+control._id,
           data: {isActive:false}
         }).success(function (response)  {
          new PNotify({
            tittle : 'Regular notice',
            type :'success',
            text :response.message,
          });
          $http({
               method: 'GET',
               url: '/controllerbybranch/'+$scope.tokendata.branchID
               }).success(function (response) {
                $scope.controllerDetails = response.result.reverse();
                $(document).ready(function(){
                   $(".controllerchecker").hide();
               });

             }).error(function (response) {
                new PNotify({
                   tittle : 'Regular notice',
                   type :'error',
                   text :response.reason.errmsg,
                 });
            });
        }).error(function (response) {
         console.log('errorty',response)
       });
   }; //fun

   $scope.confirmationMessage = function(control){
   var confirmMess = {
     "confirmationMSg": "confirm"
   };
   console.log('confimmsg',confirmMess)
  $http({
       method : "PUT",
       url : '/controllerStatusfinalupdate/'+control._id,
       data: confirmMess
     }).success(function (response)  {
       new PNotify({
          tittle : 'Regular notice',
          type :'success',
          text :response.message,
        });
        $http({
             method: 'GET',
             url: '/controllerbybranch/'+$scope.tokendata.branchID
             }).success(function (response) {
              $scope.controllerDetails = response.result.reverse();
              $(document).ready(function(){
                 $(".controllermaker").hide();
             });
           }).error(function (response) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response.reason.errmsg,
               });
          });
      }).error(function (response)  {
        new PNotify({
           tittle : 'Regular notice',
           type :'success',
           text :response.message,
         });
      });
  }//fun


  /*end active controller*/
  /*==============================================================================*/
  /*end controller*/
  /*==============================================================================*/


  /*tariff*/
  /*==============================================================================*/


  /*change*/
         $scope.getvalue4 = function() { //Prateek
            $scope.arr4 = $('#list-title4').val().replace(/[^0-9]/g, ""); //Prateek
        }

        $scope.getvalue5 = function() { //Prateek
           $scope.arr5 = $('#list-title5').val().replace(/[^0-9]/g, ""); //Prateek
       }

  $scope.tariffcountry = "";
  $scope.tariffcurrency = "";
  $scope.tariffmin = "";
  $scope.tariffmax = "";
  $scope.tariff = "";
  $scope.tax ="";
  $scope.tariffexclude = "";
  $scope.tariffbranchid = $scope.tokendata.branchID;
  $scope.getCurrency2 = function(country){
    $scope.currencyfinddata = country;
    $scope.currecysearchData = {
       "countryName": $scope.currencyfinddata
    }
    $http({
         method: 'POST',
         url: '/currencylist',
         data: $scope.currecysearchData,
         }).success(function (response) {
           $scope.getCurrencyData = response.result;
           $("label").addClass("active")
            $scope.tariffcurrency = $scope.getCurrencyData[0].currencyName;

       }).error(function (response) {
          new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response,
           });
      });

  }//get cur
  $scope.createTariff = function (){
      $scope.getvalue4();
    $scope.tariffmin = $scope.arr4;
    $scope.getvalue5();
   $scope.tariffmax = $scope.arr5;
    $scope.tariffdata2 ={
          "country":encodeHtmlEntity(addslashes($scope.tariffcountry)),
          "currency":encodeHtmlEntity(addslashes($scope.tariffcurrency)),
          "minAmount":$scope.tariffmin,
          "maxAmount":$scope.tariffmax,
          "tax":$scope.tax,
          "tariff":$scope.tariff,
          "tariffExclude":$scope.tariffexclude,
          "branchID":encodeHtmlEntity(addslashes($scope.tariffbranchid))
         };
         $http({
              method: 'POST',
              url: '/tariffController',
              data: $scope.tariffdata2 ,
             headers: {'Content-Type': 'application/json'
              }
              }).success(function (response) {
                console.log('res',response)
                if(response.message == 'Country can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'BranchID can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'Currency can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'MinAmount can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'MaxAmount can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'Tariff can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'Tax can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
           if(response.message == 'maxAmount and minAmount can not be same,maxAmount should be greater than minAmount'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
           if(response.message == 'Country with minAmount and maxAmount are already defined,add condition for created amount like 1000--5000 next will be greater than this'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'Tariff add sucessfully'){
            new PNotify({
                tittle : 'Regular notice',
                type :'success',
                text :response.message,
              });
              $scope.tariffcountry = null;
              $scope.tariffcurrency = null;
              $scope.tariffmin = null;
              $scope.tariffmax = null;
              $scope.tariff = null;
              $scope.tax =null;
              $scope.tariffexclude = null;
          }

                    $scope.tariffbranchid = $scope.tokendata.branchID;
                    $http({
                         method: 'GET',
                         url: '/tariffControllerbybranch/'+$scope.tokendata.branchID,
                        headers: {'Content-Type': 'application/json'
                         }
                         }).success(function (response) {
                           $scope.tariffdata = response.result.reverse();
                           $scope.currentPageTarif = 0;
              			        $scope.pageSizeTarif = 10;
              			        $scope.numberOfPagesTarif=function(){
              			          return Math.ceil($scope.tariffdata.length/$scope.pageSizeTarif);
              			        }
                          //  console.log($scope.tariffdata);
                       }).error(function (response) {
                          new PNotify({
                             tittle : 'Regular notice',
                             type :'error',
                             text :response,
                           });
                      });

            }).error(function (response) {
               new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response,
                });
           });
  };
  $scope.resetTariff = function (){
    $scope.tariffcountry = null;
    $scope.tariffcurrency = null;
    $scope.tariffmin = null;
    $scope.tariffmax = null;
    $scope.tariff = null;
    $scope.tax =null;
    $scope.tariffexclude = null;
    $scope.tariffbranchid = $scope.tokendata.branchID;
  };
  $http({
       method: 'GET',
      url: '/tariffControllerbybranch/'+$scope.tokendata.branchID,
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
         $scope.tariffdata = response.result.reverse();
         $scope.currentPageTarif = 0;
          $scope.pageSizeTarif = 10;
          $scope.numberOfPagesTarif=function(){
            return Math.ceil($scope.tariffdata.length/$scope.pageSizeTarif);
          }
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });

    $scope.editTariff = function(tariff){
     //  alert(tariff._id)
  var btn26 = document.getElementById("addbtn5");
  btn26.style.display ="none";
  var btn27 = document.getElementById("resetbtn5");
  btn27.style.display ="none";
  var btn28 = document.getElementById('savebtn5');
  btn28.style.display =  "block";
  btn28.style.float = "right";
  var canceltarifbtnshow = document.getElementById('canceltarifbtn');
  canceltarifbtnshow.style.display ="block"
  canceltarifbtnshow.style.float ="right"

  $scope.cancelTarif = function(){
       $scope.tariffcountry = null;
       $scope.tariffcurrency = null;
       $scope.tariffmin = null;
       $scope.tariffmax = null;
       $scope.tariff = null;
       $scope.tax =null;
       // $scope.tariffexclude = null;
       $scope.tariffbranchid = $scope.tokendata.branchID;
       btn26.style.display ="block";
       btn27.style.display ="block";
       btn26.style.float = "right";
       btn27.style.float = "right";
       btn28.style.display =  "none";
       canceltarifbtnshow.style.display ="none"
  }

  $http({
       method: 'GET',
       url: '/tariffController/'+tariff._id,
       }).success(function (response) {
         console.log(response)
         $("label").addClass("active")
         $scope.tariffcountry = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.country));
         $scope.tariffcurrency = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.currency));
         $scope.tariffmin1 = response.result.minAmount;
         $scope.tariffmax1 = response.result.maxAmount;
         $scope.tariff = response.result.tariff;
         $scope.tax =response.result.tax;
         $scope.tariffexclude = response.result.tariffExclude;
         $scope.tariffbranchid = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.branchID));
         $scope.min = $scope.tariffmin1.toLocaleString();
          $scope.tariffmin = $scope.min;
          $scope.max = $scope.tariffmax1.toLocaleString();
          $scope.tariffmax = $scope.max;
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });

    $scope.updateTariff = function (){
        $scope.getvalue4();
    $scope.tariffmin = $scope.arr4;
    $scope.getvalue5();
   $scope.tariffmax = $scope.arr5;
      $scope.tariffupdatedata ={
            "country":encodeHtmlEntity(addslashes($scope.tariffcountry)),
            "currency":encodeHtmlEntity(addslashes($scope.tariffcurrency)),
            "minAmount":$scope.tariffmin,
            "maxAmount":$scope.tariffmax,
            "tax":$scope.tax,
            "tariff":$scope.tariff,
            "tariffExclude":$scope.tariffexclude,
            "branchID":encodeHtmlEntity(addslashes($scope.tariffbranchid))
           };
     $http({
          method: 'PUT',
          url: '/tariffController/'+tariff._id,
          data: $scope.tariffupdatedata,
          }).success(function (response) {
            if(response.message == 'MinAmount can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'MaxAmount can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'Tariff can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'Tax can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
           if(response.message == 'maxAmount and minAmount can not be same,maxAmount should be greater than minAmount'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message == 'updated'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.message,
                });
                $scope.tariffcountry = null;
                $scope.tariffcurrency = null;
                $scope.tariffmin = null;
                $scope.tariffmax = null;
                $scope.tariff = null;
                $scope.tax =null;
                $scope.tariffexclude = null;
                $scope.tariffbranchid = $scope.tokendata.branchID;
                btn26.style.display ="block";
                btn27.style.display ="block";
                btn26.style.float = "right";
                btn27.style.float = "right";
                btn28.style.display =  "none";
                canceltarifbtnshow.style.display ="none"
            }

                $http({
                     method: 'GET',
                    url: '/tariffControllerbybranch/'+$scope.tokendata.branchID,
                    headers: {'Content-Type': 'application/json'
                     }
                     }).success(function (response) {
                       $scope.tariffdata = response.result.reverse();
                       $scope.currentPageTarif = 0;
                        $scope.pageSizeTarif = 10;
                        $scope.numberOfPagesTarif=function(){
                          return Math.ceil($scope.tariffdata.length/$scope.pageSizeTarif);
                        }
                   }).error(function (response) {
                      new PNotify({
                         tittle : 'Regular notice',
                         type :'error',
                         text :response,
                       });
                  });
        }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response,
            });
       });


   }
   $("html, body").animate({ scrollTop: 0 }, "slow");
  }//edit
$scope.deleteTariff = function(tariff){
  var confirmdeleteTariffdata = confirm("Are you sure want to delete tariffdata?");
  if(confirmdeleteTariffdata){
    $http({
            method: 'DELETE',
            url: '/tariffController/'+tariff._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({
                tittle : 'Regular notice',
                type :'success',
                text :response.message
              });
              var addbtn26 = document.getElementById("addbtn5");
              addbtn26.style.display ="block";
              addbtn26.style.float ="right"
              var resetbtn27 = document.getElementById("resetbtn5");
              resetbtn27.style.display ="block";
              resetbtn27.style.float = "right";
              var savebtn28 = document.getElementById('savebtn5');
              savebtn28.style.display =  "none";

              var canceltarifbtnhide = document.getElementById('canceltarifbtn');
              canceltarifbtnhide.style.display ="none"

              $http({
                    method: 'GET',
                    url: '/tariffControllerbybranch/'+$scope.tokendata.branchID,
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                  $scope.tariffdata = response.result.reverse();
                  $scope.currentPageTarif = 0;
                   $scope.pageSizeTarif = 10;
                   $scope.numberOfPagesTarif=function(){
                     return Math.ceil($scope.tariffdata.length/$scope.pageSizeTarif);
                   }

                  }).error(function (response) {
                     new PNotify({
                        tittle : 'Regular notice',
                        type :'error',
                        text :response,
                      });
                 });
                  // $window.location.reload();
            }).error(function (response) {
             new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response,
              });
          });
}
}//fun
  /*end tariff*/
  /*==============================================================================*/




  /*comission*/
  /*==============================================================================*/

  $http({
       method: 'GET',
       url: '/branchController',
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
      $scope.branchdata = response.result.reverse();
      // $scope.selectedBranch=$scope.branchdata[0];
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });

  $scope.platformcomision = "";
  $scope.sendercomision = "";
  $scope.benefcomision = "";
  $scope.comisionbranchid = $scope.tokendata.branchID;

  $scope.createshare = function (){
    $scope.sharedata = {
    "sendercomision":$scope.sendercomision,
    "platformcomsion":$scope.platformcomision,
    "benefcomision":$scope.benefcomision,
    "branchID":$scope.comisionbranchid
    };
    $http({
         method: 'POST',
         url: '/comissionController',
         data: $scope.sharedata ,
        headers: {'Content-Type': 'application/json'
         }
         }).success(function (response) {
           if(response.result == 'branchID can not be empty'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.result,
              });
          }
       if(response.result == 'Sendercomision can not be empty'){
         new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response.result,
           });
       }
       if(response.result == 'Platformcomsion can not be empty'){
      new PNotify({
          tittle : 'Regular notice',
          type :'error',
          text :response.result,
        });
    }
    if(response.result == 'Benefcomision can not be empty'){
      new PNotify({
          tittle : 'Regular notice',
          type :'error',
          text :response.result,
        });
    }
     if(response.result == 'This branch comission already define,please choose different branchID'){
      new PNotify({
          tittle : 'Regular notice',
          type :'error',
          text :response.result,
        });
    }

    if(response.result == 'comission added'){
      new PNotify({
          tittle : 'Regular notice',
          type :'success',
          text :response.result,
        });
      $scope.platformcomision = null;
      $scope.sendercomision = null;
      $scope.benefcomision = null;
      $scope.comisionbranchid = $scope.tokendata.branchID;
    }
            //  new PNotify({
            //      tittle : 'Regular notice',
            //      type :'success',
            //      text :response.result,
            //    });
               $http({
                    method: 'GET',
                    url: '/comissionbybranchController/'+ $scope.tokendata.branchID,
                   headers: {'Content-Type': 'application/json'
                    }
                    }).success(function (response) {
                      $scope.comissiondata = response.result.reverse();
                      $scope.currentPagecomission = 0;
                       $scope.pageSizecomission = 10;
                       $scope.numberOfPagescomission=function(){
                         return Math.ceil($scope.comissiondata.length/$scope.pageSizecomission);
                       }
                     //  console.log($scope.comissiondata);
                  }).error(function (response) {
                     new PNotify({
                        tittle : 'Regular notice',
                        type :'error',
                        text :response,
                      });
                 });

       }).error(function (response) {
          new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response,
           });
      });

  };
  $scope.resetshare = function (){
    $scope.platformcomision = null;
    $scope.sendercomision = null;
    $scope.benefcomision = null;
    $scope.comisionbranchid = $scope.tokendata.branchID;
  };
  $http({
       method: 'GET',
       url: '/comissionbybranchController/'+ $scope.tokendata.branchID,
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
         $scope.comissiondata = response.result;
         console.log('com',$scope.comissiondata)
         $scope.currentPagecomission = 0;
         $scope.pageSizecomission = 10;
         $scope.numberOfPagescomission=function(){
           return Math.ceil($scope.comissiondata.length/$scope.pageSizecomission);
         }
        //  console.log($scope.comissiondata);
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });
    $scope.editComision = function(comision){
     // alert(comision._id)
     var btn31 = document.getElementById("addbtn6");
   btn31.style.display ="none";
   var btn32 = document.getElementById("resetbtn6");
   btn32.style.display ="none";
   var btn33 = document.getElementById('savebtn6');
   btn33.style.display =  "block";
   btn33.style.float = "right";
   var cancelComisionbtnshow = document.getElementById('cancelComisionbtn');
   cancelComisionbtnshow.style.display = "block";
   cancelComisionbtnshow.style.float = "right";
   $scope.cancelComision = function(){
      $scope.platformcomision = null;
      $scope.sendercomision = null;
      $scope.benefcomision = null;
      $scope.comisionbranchid = $scope.tokendata.branchID;
      btn31.style.display ="block";
      btn31.style.float = "right";
      btn32.style.display ="block";
      btn32.style.float = "right";
      btn33.style.display =  "none";
      cancelComisionbtnshow.style.display = "none";

    }
   $http({
        method: 'GET',
        url: '/comissionController/'+comision._id,
        }).success(function (response) {
          console.log(response)
          $("label").addClass("active")
          $scope.platformcomision = response.result.platformcomsion;
          $scope.sendercomision = response.result.sendercomision;
          $scope.benefcomision = response.result.benefcomision;
          $scope.comisionbranchid = response.result.branchID;
      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response,
          });
     });

     $scope.updateComision = function (){
       $scope.shareupdatedata = {
       "sendercomision":$scope.sendercomision,
       "platformcomsion":$scope.platformcomision,
       "benefcomision":$scope.benefcomision,
       "branchID":$scope.comisionbranchid
       };
         $http({
              method: 'PUT',
              url: '/comissionController/'+comision._id,
              data: $scope.shareupdatedata,
              }).success(function (response) {
                console.log(response);
                  new PNotify({
                      tittle : 'Regular notice',
                      type :'success',
                      text :response.message,
                    });
                    $scope.platformcomision = null;
                    $scope.sendercomision = null;
                    $scope.benefcomision = null;
                    $scope.comisionbranchid = $scope.tokendata.branchID;
                    btn31.style.display ="block";
                    btn31.style.float="right"
                    btn32.style.display ="block";
                    btn32.style.float="right"
                    btn33.style.display ="none";
                    cancelComisionbtnshow.style.display = "none";
                    $http({
                         method: 'GET',
                         url: '/comissionbybranchController/'+ $scope.tokendata.branchID,
                        headers: {'Content-Type': 'application/json'
                         }
                         }).success(function (response) {
                           $scope.comissiondata = response.result.reverse();
                           $scope.currentPagecomission = 0;
                       $scope.pageSizecomission = 10;
                       $scope.numberOfPagescomission=function(){
                         return Math.ceil($scope.comissiondata.length/$scope.pageSizecomission);
                       }
                          //  console.log($scope.comissiondata);
                       }).error(function (response) {
                          new PNotify({
                             tittle : 'Regular notice',
                             type :'error',
                             text :response,
                           });
                      });
            }).error(function (response) {
               new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response,
                });
           });
       }
$("html, body").animate({ scrollTop: 0 }, "slow");
   } //fun

$scope.deleteComision = function(comision){
  var confirmdeletecomissiondata = confirm("Are you sure want to delete comissiondata?");
  if(confirmdeletecomissiondata){
  $http({
            method: 'DELETE',
            url: '/comissionController/'+comision._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({
                tittle : 'Regular notice',
                type :'success',
                text :response.message
              });
              var addbtn31 = document.getElementById("addbtn6");
               addbtn31.style.display ="block";
               addbtn31.style.float = "right";

               var resetbtn32 = document.getElementById("resetbtn6");
               resetbtn32.style.display ="block";
               resetbtn32.style.float = "right";

               var savebtn33 = document.getElementById('savebtn6');
               savebtn33.style.display =  "none";

               var cancelComisionbtnhide = document.getElementById('cancelComisionbtn');
               cancelComisionbtnhide.style.display = "none"
              $http({
                    method: 'GET',
                    url: '/comissionbybranchController/'+ $scope.tokendata.branchID,
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.comissiondata = response.result.reverse();
                   $scope.currentPagecomission = 0;
                       $scope.pageSizecomission = 10;
                       $scope.numberOfPagescomission=function(){
                         return Math.ceil($scope.comissiondata.length/$scope.pageSizecomission);
                       }

                  }).error(function (response) {
                     new PNotify({
                        tittle : 'Regular notice',
                        type :'error',
                        text :response,
                      });
                 });
                  // $window.location.reload();
            }).error(function (response) {
             new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response,
              });
          });
    }
}
  /*end comission*/
  /*==============================================================================*/
  /*reimburement*/
  /*==============================================================================*/

  $http({
    method: 'GET',
    url: '/transactionbybranch/'+$scope.tokendata.branchID,
    }).success(function (response) {

             $scope.transactionDetails = response.result.reverse();

            $scope.currentPageremburse = 0;
             $scope.pageSizeremburse = 10;
             $scope.numberOfPagesremburse=function(){
               return Math.ceil($scope.transactionDetails.length/$scope.pageSizeremburse);
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

 $scope.statusList = [{"name":"Reimbursed Approved","value":"ReimbursedApproved"},{"name":"Reimbursed Request","value":"ReimbursedRequest"},{"name":"Paid","value":"Paid"},
 {"name":"Pending","value":"Pending"}]


    $scope.searchTransactionNo;
    $scope.changeStatus;

    $scope.changeTransactionStatus = function(){
      $scope.changestatusdata = {
      "transactionNumber":$scope.searchTransactionNo,
      "status":$scope.changeStatus,
      };
      $http({
           method: 'POST',
           url: '/rembustApprove',
           data: $scope.changestatusdata ,
          headers: {'Content-Type': 'application/json'
           }
           }).success(function (response) {
               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :response.message,
                 });
                 $http({
                      method: 'GET',
                      url: '/allTransaction',
                      }).success(function (response) {
                        $scope.transactionDetails = response.result1;
                       //  console.log($scope.transactionDetails)
                    }).error(function (response) {
                       new PNotify({
                          tittle : 'Regular notice',
                          type :'error',
                          text :response,
                        });
                   });
                   $scope.searchTransactionNo = null;
                   $scope.changeStatus = null;

         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });

    };
    $scope.checkTransactionStatus = function (){
      $scope.changedata = {
      "transactionNumber":$scope.searchTransactionNo,
      };
      $http({
           method: 'POST',
           url: '/searchreimburseTransactionNumber',
           data: $scope.changedata ,
          headers: {'Content-Type': 'application/json'
           }
           }).success(function (response) {
               new PNotify({
                   tittle : 'Regular notice',
                   type :'success',
                   text :response.result[0].status,
                 });
               $scope.changeStatus = response.result[0].status;


               }).error(function (response) {
                  new PNotify({
                     tittle : 'Regular notice',
                     type :'error',
                     text :response,
                   });
              });
    }

  /*end reimburement*/
  /*==============================================================================*/
  $("a").unbind("click").bind("click", function(){
    setTimeout(function () {

    $('select').material_select();
    $('.caret').text("");
    }, 1000);


  });

$scope.supervisorLogout = function(){
  $window.localStorage.removeItem('userInfo-token');
  
  
  $window.location.href= "/#/super";
  $window.location.reload();
}
$scope.$watch("changeStatus", function(newValue, oldValue) {
           $timeout(function() {

              $("#statuschange").material_select();
              $('.caret').text("");
              $("#statuschange").val(newValue);
           },0);
});


$scope.$watch("tellerid", function(newValue, oldValue) {
           $timeout(function() {

             $scope.tellerid = newValue;
              $("#tell").material_select();
              $('.caret').text("");
              $("#tell").val(newValue);
              document.getElementById("tell").open = true;
           }, 0);
       });

   $scope.$watch("superlierCountry", function(newValue, oldValue) {
              $timeout(function() {

                $scope.superlierCountry = newValue;
                 $("#suplr").material_select();
                 $('.caret').text("");
                 $("#suplr").val(newValue);


              }, 0);
          });
     $scope.$watch("countrylimit", function(newValue, oldValue) {
                     $timeout(function() {

                       $scope.countrylimit = newValue;
                        $("#cont").material_select();
                        $('.caret').text("");
                        $("#cont").val(newValue);


                     }, 0);
                 });
        $scope.$watch("tariffcountry", function(newValue, oldValue) {
                            $timeout(function() {

                              $scope.tariffcountry = newValue;
                               $("#tarif").material_select();
                               $('.caret').text("");
                               $("#tarif").val(newValue);


                            }, 0);
                        });
          $scope.$watch("tariffbranchid", function(newValue, oldValue) {
                                   $timeout(function() {

                                     $scope.tariffbranchid = newValue;
                                      $("#trifbranch").material_select();
                                      $('.caret').text("");
                                      $("#trifbranch").val(newValue);


                                   }, 0);
                               });
             $scope.$watch("comisionbranchid", function(newValue, oldValue) {
                                          $timeout(function() {

                                            $scope.comisionbranchid = newValue;
                                             $("#comisionbranch").material_select();
                                             $('.caret').text("");
                                             $("#comisionbranch").val(newValue);


                                          }, 0);
                                      });
             /*change*/
   var el = document.querySelector('input.number');
    el.addEventListener('keyup', function(event) {
      if (event.which >= 37 && event.which <= 40) return;

      this.value = this.value.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });


       // var el = document.querySelector('input.number3');
       // el.addEventListener('keyup', function(event) {
       //   if (event.which >= 37 && event.which <= 40) return;

       //   this.value = this.value.replace(/\D/g, '')
       //     .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
       // });

   // var el = document.querySelector('input.number4');
   //    el.addEventListener('keyup', function(event) {
   //      if (event.which >= 37 && event.which <= 40) return;

   //      this.value = this.value.replace(/\D/g, '')
   //        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   //    });
   //    var el = document.querySelector('input.number5');
   //     el.addEventListener('keyup', function(event) {
   //       if (event.which >= 37 && event.which <= 40) return;

   //       this.value = this.value.replace(/\D/g, '')
   //         .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
   //     });


     /* ====================== start supplierCode========================*/
        $http({
            method: 'GET',
            url: '/supervisorsupplier/'+$scope.supervisorid,
         }).success(function (response) {
          $scope.suplierRecord = response.result.reverse();

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
 }


}])
