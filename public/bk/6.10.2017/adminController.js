app.controller('adminController',['$location','$timeout','$base64','$http','$window','$scope','$translate', '$filter', function($location,$timeout,$base64,$http,$window,$scope,$translate, $filter){

   $scope.admindata = $window.localStorage.getItem('userInfo-token');
   console.log('token',$scope.admindata)
   if($scope.admindata == 'undefined' || $scope.admindata == '' || $scope.admindata == null){
     // new PNotify({
     //     tittle : 'Regular notice',
     //     type :'error',
     //     text :'You are not logged in. Please login again',

     //   });
      // $window.location.reload();
      $window.location.href= "/#/admin";
      }
   else{

    //  $scope.filterValue=function(obj){
    //    return $filter('date')(obj.OrderDate, 'dd/MM/yyyy') == $filter('date')($scope.searchtransactionlist, 'dd/MM/yyyy')
    //   }

      $scope.decoded = jwt_decode($scope.admindata);
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




/*====end transalator ==*/
/*bahar*/

 $scope.$on('$routeChangeStart', function(scope, next, current) {
      if (next.$$route.controller != "adminController") {
        // $window.location.reload();
        $window.location.href = "/#/adminDashboard";
      }
    });
 /*bahar*/

 setTimeout(function(){
     $(document).ready(function() {
                $('select').material_select();
            });
   },1000)


/*edithide button*/
$scope.hidesavebtn =function(){
  var btn3 = document.getElementById('savebtn');
  btn3.style.display =  "none"
  var btn5 = document.getElementById('savebtn1');
  btn5.style.display =  "none"
  var btn9 = document.getElementById('savebtn2');
  btn9.style.display =  "none"
  var btn15 = document.getElementById('savebtn3');
  btn15.style.display =  "none"
  var btn20 = document.getElementById('savebtn4');
  btn20.style.display =  "none"
  var btn25 = document.getElementById('savebtn5');
  btn25.style.display =  "none"
  var btn30 = document.getElementById('savebtn6');
  btn30.style.display =  "none"

  var btn55 = document.getElementById('savebtn12345');
     btn55.style.display =  "none";

     var btn75 = document.getElementById('savebtn12345678');
     btn75.style.display =  "none";

      var cancelbranchbtn = document.getElementById('cancelbranchbtn');
     cancelbranchbtn.style.display = "none";

     var cancelsupervisorbtn = document.getElementById('cancelsupervisorbtn');
     cancelsupervisorbtn.style.display = "none";

     var cancelTellerbtn = document.getElementById('cancelTellerbtn');
     cancelTellerbtn.style.display = "none";
     cancelTellerbtn.style.float = "right";

     var cancelControllerbtn = document.getElementById('cancelControllerbtn');
     cancelControllerbtn.style.display = "none"

      var cancelCountrybtn = document.getElementById('cancelCountrybtn');
     cancelCountrybtn.style.display = "none";

     var cancelTariffbtn = document.getElementById('cancelTariffbtn');
     cancelTariffbtn.style.display = "none";
     cancelTariffbtn.style.float = "right";

      var cancelSupplierbtn = document.getElementById('cancelSupplierbtn');
     cancelSupplierbtn.style.display = "none";

     var cancelComisionbtn = document.getElementById('cancelComisionbtn');
     cancelComisionbtn.style.display = "none";

     var cancelCountryCurrencybtn = document.getElementById('cancelCountryCurrencybtn');
     cancelCountryCurrencybtn.style.display = "none";
     cancelCountryCurrencybtn.style.float = "right";

     var clearfilterbranchlist = document.getElementById('clearfilterbranchlist');
      clearfilterbranchlist.style.display = "none";

      // var clearFiltersearchsupervisorlist = document.getElementById('clearFiltersearchsupervisorlist');
      // clearFiltersearchsupervisorlist.style.display = "none";
  

}







       $scope.superactiveCheck = function (superv){
         // alert(superv._id)
         $(".enablesuper, .disablesuper").unbind("click");
         $(document).on("click", ".enablesuper, .disablesuper", function(){

            var $this = $(this);
            if($this.hasClass('enablesuper')){

            $http({
              method : "PUT",
              url : '/superStatusEdit/'+superv._id,
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
                url : '/superStatusEdit/'+superv._id,
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

  // }, 0);



     $scope.activeCheck = function (branch){
       // alert(branch._id)
       $(".enablebranch, .disablebranch").unbind("click");
       $(document).on("click", ".enablebranch, .disablebranch", function(){

          var $this = $(this);
          if($this.hasClass('enablebranch')){
          $http({
            method : "PUT",
            url : '/branchStatusEdit/'+branch._id,
            data: {isActive:false}
          }).then(function mySucces(response) {
            if(response.data.isActive === false){
               $this.text('Disable');
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.data.message,
                });
            };

          }, function myError(response) {
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.data.message,
              });

          });
          $this.addClass("disablebranch");
          $this.removeClass("enablebranch");


          } else {

            $http({
              method : "PUT",
              url : '/branchStatusEdit/'+branch._id,
              data: {isActive:true}
            }).then(function mySucces(response) {
              if(response.data.isActive == true){
                $this.text('Enable');
                new PNotify({
                    tittle : 'Regular notice',
                    type :'success',
                    text :response.data.message,
                  });
              }

            }, function myError(response) {
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.data.message,
                });

            });
          $this.addClass("enablebranch");
          $this.removeClass("disablebranch");



        }//else
        });

       };

     $scope.telleractiveCheck = function(tellerid){
       //alert(tellerid._id)
       $(".enabletellerid, .disabletellerid").unbind("click");
       $(document).on("click", ".enabletellerid, .disabletellerid", function(){

          var $this = $(this);
          if($this.hasClass('enabletellerid')){
          $this.text('Disable');
          $http({
            method : "PUT",
            url : '/telleridStatusEdit/'+tellerid._id,
            data: {isActive:false}
          }).then(function mySucces(response) {
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
          $this.addClass("disabletellerid");
          $this.removeClass("enabletellerid");


          } else {
             $this.text('Enable');
            $http({
              method : "PUT",
              url : '/telleridStatusEdit/'+tellerid._id,
              data: {isActive:true}
            }).then(function mySucces(response) {
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
          $this.addClass("enabletellerid");
          $this.removeClass("disabletellerid");



        }//else
        });
     };//fun

   $scope.controlactiveCheck = function(control){
     // alert(control._id)
     $(".enablecontrol, .disablecontrol").unbind("click");
      $(document).on("click", ".enablecontrol, .disablecontrol", function(){

         var $this = $(this);
         if($this.hasClass('enablecontrol')){
         $this.text('Disable');
         $http({
           method : "PUT",
           url : '/controllerStatusEdit/'+control._id,
           data: {isActive:false}
         }).then(function mySucces(response) {
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
         $this.addClass("disablecontrol");
         $this.removeClass("enablecontrol");


         } else {
            $this.text('Enable');
           $http({
             method : "PUT",
             url : '/controllerStatusEdit/'+control._id,
             data: {isActive:true}
           }).then(function mySucces(response) {
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
         $this.addClass("enablecontrol");
         $this.removeClass("disablecontrol");



       }//else
       });

   }; //fun





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
            //console.log(response);
            if(response.data.message == 'Disable,paymentlimit exceed to countrylimit'){
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
              if(response.data.message == 'Enable,paymentLimit less than countrylimit'){
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







   $scope.benefactiveCheck = function(benef){

     $(".enablebenef, .disablebenef").unbind("click");
      $(document).on("click", ".enablebenef, .disablbenef", function(){


         var $this = $(this);
         if($this.hasClass('enablebenef')){

         $http({
           method : "PUT",
           url : '/beneficiaryController/'+benef._id,
           data: {status:'Blacklist'}
         }).then(function mySucces(response) {


           console.log('benefkyc',response)
           if(response.data.message == 'Disable,paymentlimit exceed to countrylimit'){
             $this.text('Disable');
           }
           new PNotify({
               tittle : 'Regular notice',
               type :'success',
               text :response.data.message,
             });
         }, function myError(response) {
          console.log('benefresponseerror',response)
           new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response.config.data.status,
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
             if(response.data.message == 'Enable,paymentLimit less than countrylimit'){
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



/* countrlist*/
$http({
     method: 'GET',
     url: '/countrycurrencylist',
     }).success(function (response) {
    $scope.countrylist = response.result.reverse();
    //console.log($scope.countrylist);
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
  });

        $http({
             method: 'GET',
             url: '/supervisiorController',
            headers: {'Content-Type': 'application/json'
             }
             }).success(function (response) {
               $scope.supervisiorDetails = response.result.reverse();

           }).error(function (response) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response,
               });
          });

   /*======================Branch===========================*/

   /*=======================================================*/
     $scope.searchbranchlist1;
     $scope.searchbranchlistfilter = function (){
      $scope.searchbranchlist = encodeHtmlEntity(addslashes($scope.searchbranchlist1));
        var clearfilterbranchlist1 = document.getElementById('clearfilterbranchlist');
        clearfilterbranchlist1.style.display = "block";
     };
     $scope.clearFilterbranchlist = function (){
      $scope.searchbranchlist1 = null;
       $scope.searchbranchlist = null;
       var clearfilterbranchlist2 = document.getElementById('clearfilterbranchlist');
        clearfilterbranchlist2.style.display = "none";
     }
   /*=======================================================*/


     /* get all branch data from database*/

     $http({
          method: 'GET',
          url: '/branchactiveController',
          headers: {'Content-Type': 'application/json'
          }
          }).success(function (response) {

         $scope.branchdata4 = response.result.reverse();
      //    $scope.branchdata1 = $scope.branchdata4;

        

      // var supervisiorDetailsarray = $.map($scope.supervisiorDetails , function(value, index) {
      //  return [value];
      //  });

      //  var supervisoridmyArray = [];
      //  for(var i=0;i<supervisiorDetailsarray.length;i++){
      //    supervisoridmyArray.push(supervisiorDetailsarray[i].branchID);
      //  }
      



      // var branchIDArray =[];
      // for(i=0;i<$scope.branchdata1.length;i++){
      //   if($.inArray($scope.branchdata1[i].branchID,supervisoridmyArray ) == -1){
      //      branchIDArray.push($scope.branchdata1[i].branchID);
      //    }
      //  }
      //  $scope.branchdata2 = branchIDArray;
     

        }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response,
            });
       });
       /*all branch*/
       $http({
            method: 'GET',
            url: '/branchController',
           headers: {'Content-Type': 'application/json'
            }
        }).success(function (response) {

           $scope.branchdata = response.result.reverse();
           $scope.selectedBranch=$scope.branchdata[0];

            $scope.currentPageBranch = 0;
             $scope.pageSizeBranch = 10;
             $scope.numberOfPagesBranch=function(){
               return Math.ceil($scope.branchdata.length/$scope.pageSizeBranch);
             }



          }).error(function (response) {
             new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response,
              });
         });
      /*change*/
      $scope.getvalue = function() { //Prateek
        $scope.arr = $('#list-title1').val().replace(/[^0-9]/g, ""); //Prateek
      }

       $scope.branchID="",
       $scope.fullName="",
       $scope.country ="",
       $scope.Address1="",
       $scope.Address2="",
       $scope.contact ="",
       $scope.email="",
       $scope.email="",
       $scope.paymentLimit="",
       $scope.hoursOfWorkDaily="",
       $scope.workdays="",
       $scope.telephone="",


   $scope.addBranch = function(){

    $scope.getvalue();
     $scope.paymentLimit = $scope.arr;

     $scope.tel1 = "+" +$scope.telephone;
     // encodeHtmlEntity(addslashes($scope.countryName))
      if($scope.country == '?'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :'Country can not be empty',
         });
     }else{
     $scope.abc = $scope.workdays;
     $scope.branch = $base64.encode(encodeHtmlEntity(addslashes($scope.branchID)));
     $scope.countr = $base64.encode(encodeHtmlEntity(addslashes($scope.country)));
     $scope.full = $base64.encode(encodeHtmlEntity(addslashes($scope.fullName)));
     $scope.Add1 = $base64.encode(encodeHtmlEntity(addslashes($scope.Address1)));
     $scope.Add2= $base64.encode(encodeHtmlEntity(addslashes($scope.Address2)));
     $scope.phone = $base64.encode(encodeHtmlEntity(addslashes($scope.contact)));
     $scope.mail = $base64.encode(encodeHtmlEntity(addslashes($scope.email)));
     $scope.payment= $base64.encode($scope.paymentLimit);
     $scope.hours= $base64.encode($scope.hoursOfWorkDaily);
     $scope.tel= $base64.encode($scope.tel1);

     $scope.newrecord = {
       "branchID" :$scope.branch,
       "fullName" : $scope.full,
       "country" : $scope.countr,
       "Address1" :$scope.Add1,
       "Address2" : $scope.Add2,
       "contact" :$scope.phone,
       "email" : $scope.mail,
       "paymentLimit" : $scope.payment,
       "hoursOfWorkDaily" : $scope.hours,
       "workdays" :$scope.abc,
       "telephone" :$scope.tel,
     };

     $http({
          method: 'POST',
          url: '/branchController',
          data: $scope.newrecord,
         headers: {'Content-Type': 'application/json'

          }
          }).success(function (response) {
                  if(response.message == 'BranchID can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'Country can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'Workingdays can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'Address1 can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }if(response.message == 'Address2 can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'Email can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'PaymentLimit can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'Telephone can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'Workinghours can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'InstituteName can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'ContactName can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'branch already exist'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'Branch added successfully'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.message,
                });
                  $scope.branchID=null;
                 $scope.fullName=null;
                 $scope.country ="?";
                 $scope.Address1=null;
                 $scope.Address2=null;
                 $scope.contact =null;
                 $scope.email=null;
                 $scope.email=null;
                 $scope.paymentLimit=null;
                 $scope.hoursOfWorkDaily=null;
                 $scope.workdays=null;
                 $scope.telephone=null;
            }
            
                $http({
                     method: 'GET',
                     url: '/branchController',
                    headers: {'Content-Type': 'application/json'
                     }
                 }).success(function (response) {

                    $scope.branchdata = response.result.reverse();
                    $scope.selectedBranch=$scope.branchdata[0];

                     $scope.currentPageBranch = 0;
                      $scope.pageSizeBranch = 10;
                      $scope.numberOfPagesBranch=function(){
                        return Math.ceil($scope.branchdata.length/$scope.pageSizeBranch);
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
    }//else
   };//fun


   /*reset branch data*/
   $scope.resetBranch = function(){
      $scope.branchID = null;
      $scope.country = "?";
      $scope.fullName = null;
      $scope.Address1 = null;
      $scope.Address2 = null;
      $scope.contact = null;
      $scope.email= null;
      $scope.paymentLimit = null;
      $scope.hoursOfWorkDaily = null;
      $scope.workdays = null;
      $scope.telephone = null;
   };


setTimeout(function(){
  $('.dropdown-button').unbind();
  $('.dropdown-button').dropdown();
}, 0);
$scope.branchid;
/*edit branch*/
$scope.editBranch = function(branch){
  var btn1 = document.getElementById("addbtn");
  btn1.style.display ="none";
  // btn1.style.float = "right";
  var btn2 = document.getElementById("resetbtn");
  btn2.style.display ="none";
  var btn4 = document.getElementById('savebtn');
  btn4.style.display =  "block";
   btn4.style.float = "right";

  var cancelbranchbtnshow = document.getElementById('cancelbranchbtn');
  cancelbranchbtnshow.style.display="block";
   cancelbranchbtnshow.style.float="right";

  $scope.cancelBranch = function(){
    $scope.branchID = null;
    $scope.country = "?";
    $scope.fullName = null;
    $scope.Address1 = null;
    $scope.Address2 = null;
    $scope.contact = null;
    $scope.email= null;
    $scope.paymentLimit = null;
    $scope.hoursOfWorkDaily = null;
    $scope.workdays = null;
    $scope.telephone = null;
    btn1.style.display ="block";
    btn1.style.float="right"
    btn2.style.display ="block";
    btn2.style.float="right"
    btn4.style.display ="none";
    cancelbranchbtnshow.style.display="none";

  }


  $scope.branchid = branch._id;
  $http({
       method: 'GET',
       url: '/branch/'+branch._id,
       }).success(function (response) {

         $("label").addClass("active");
         $scope.branchID = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.branchID));
         $scope.country  = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.country));
         $scope.fullName = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.fullName));
         $scope.contact  = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.contact));
         $scope.Address1 = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.Address1));
         $scope.Address2 = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.Address2));
         $scope.email    = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.email));
         $scope.paymentLimit1 = response.result.paymentLimit;
         $scope.telephone1 = response.result.telephone;
         $scope.hoursOfWorkDaily = response.result.hoursOfWorkDaily;
         $scope.workdays = response.result.workdays;
         $scope.telephone = $scope.telephone1.slice(1);
         $scope.b = $scope.paymentLimit1.toLocaleString();
         $scope.paymentLimit = $scope.b; //Prateek
       // console.log('lll',$scope.paymentLimit)

     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });
  //alert(branch._id)
  $scope.saveBranch = function() {
    // alert($scope.branchid);
     // $scope.abc = $scope.workdays.split(",");
     $scope.getvalue();
     $scope.paymentLimit = $scope.arr;

     $scope.tel1 = "+" +$scope.telephone;
     $scope.abc = $scope.workdays;
    $scope.branch = $base64.encode(encodeHtmlEntity(addslashes($scope.branchID)));
    $scope.countr = $base64.encode(encodeHtmlEntity(addslashes($scope.country)));
    $scope.full = $base64.encode(encodeHtmlEntity(addslashes($scope.fullName)));
    $scope.Add1 = $base64.encode(encodeHtmlEntity(addslashes($scope.Address1)));
    $scope.Add2= $base64.encode(encodeHtmlEntity(addslashes($scope.Address2)));
    $scope.phone = $base64.encode(encodeHtmlEntity(addslashes($scope.contact)));
    $scope.mail = $base64.encode(encodeHtmlEntity(addslashes($scope.email)));
    $scope.payment= $base64.encode($scope.paymentLimit);
    $scope.hours= $base64.encode($scope.hoursOfWorkDaily);
    $scope.tel= $base64.encode($scope.tel1);
    $scope.newrecord = {
      "branchID" :$scope.branch,
      "fullName" : $scope.full,
      "country" : $scope.countr,
      "Address1" :$scope.Add1,
      "Address2" : $scope.Add2,
      "contact" :$scope.phone,
      "email" : $scope.mail,
      "paymentLimit" : $scope.payment,
      "hoursOfWorkDaily" : $scope.hours,
      "workdays" :$scope.abc,
      "telephone" :$scope.tel,
    };
    $http({
         method: 'PUT',
         url: '/branchController/'+$scope.branchid,
         data: $scope.newrecord,
        headers: {'Content-Type': 'application/json'

         }
         }).success(function (response) {
                if(response.message == 'BranchID can not be empty'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.message,
         });
     }
     if(response.message == 'Country can not be empty'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.message,
         });
     }
     if(response.message == 'Workingdays can not be empty'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.message,
         });
     }
     if(response.message == 'Address1 can not be empty'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.message,
         });
     }if(response.message == 'Address2 can not be empty'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.message,
         });
     }
     if(response.message == 'Email can not be empty'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.message,
         });
     }
     if(response.message == 'PaymentLimit can not be empty'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.message,
         });
     }
     if(response.message == 'Telephone can not be empty'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.message,
         });
     }
     if(response.message == 'Workinghours can not be empty'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.message,
         });
     }
     if(response.message == 'InstituteName can not be empty'){
       new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.message,
         });
     }
     if(response.message == 'ContactName can not be empty'){
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

                   $scope.branchID = null;
                    $scope.country = "?";
                   $scope.fullName = null;
                   $scope.Address1 = null;
                   $scope.Address2 = null;
                   $scope.contact = null;
                   $scope.email= null;
                   $scope.paymentLimit = null;
                   $scope.hoursOfWorkDaily = null;
                   $scope.workdays = null;
                   $scope.telephone = null;
                   btn1.style.display ="block";
                   btn1.style.float="right"
                   btn2.style.display ="block";
                   btn2.style.float="right"
                   btn4.style.display ="none";
                   cancelbranchbtn.style.display = "none";
     }

               $http({
                    method: 'GET',
                    url: '/branchController',
                   headers: {'Content-Type': 'application/json'
                    }
                    }).success(function (response) {
                   //    $scope.result = response.result;
                   //   $scope.branchdetail = $base64.decode($scope.result);
                   //   // console.log($scope.branchdetail);
                   //  $scope.branchdata = JSON.parse($scope.branchdetail);
                   $scope.branchdata = response.result.reverse();
                   $scope.selectedBranch=$scope.branchdata[0];

                    $scope.currentPageBranch = 0;
              $scope.pageSizeBranch = 10;
              $scope.numberOfPagesBranch=function(){
                return Math.ceil($scope.branchdata.length/$scope.pageSizeBranch);
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

  }//saveBranch fun

  $("html, body").animate({ scrollTop: 0 }, "slow");
};//edit fun

$scope.deleteBranch = function(branch){
  var deleteBranchconfirm = confirm("Are you sure want to delete branch?");
  if(deleteBranchconfirm){
    $http({
            method: 'DELETE',
            url: '/branchController/'+branch._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({
                tittle : 'Regular notice',
                type :'success',
                text :response.message
              });
              var addbtn1 = document.getElementById("addbtn");
              addbtn1.style.display ="block";
              addbtn1.style.float = "right";

              var resetbtn2 = document.getElementById("resetbtn");
              resetbtn2.style.display ="block";
              resetbtn2.style.float = "right";
              var savebtn4 = document.getElementById('savebtn');
              savebtn4.style.display =  "none";



              var cancelbranchbtnhide = document.getElementById('cancelbranchbtn');
              cancelbranchbtnhide.style.display="none";
              $http({
                    method: 'GET',
                    url: '/branchController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.branchdata = response.result.reverse();
                   $scope.selectedBranch=$scope.branchdata[0];

                    $scope.currentPageBranch = 0;
              $scope.pageSizeBranch = 10;
              $scope.numberOfPagesBranch=function(){
                return Math.ceil($scope.branchdata.length/$scope.pageSizeBranch);
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
    }//if
}

   //branch functions end

   /*==============================================================================*/
   /*==============================================================================*/
  $scope.hideclearFiltersearchsupervisor = function (){
     var clearfiltersupervisorlist = document.getElementById('clearfiltersupervisorlist');
     clearfiltersupervisorlist.style.display = "none";
   };
    $scope.searchsupervisorlist1;
    $scope.searchsupervisorlistfilter = function(){
      $scope.searchsupervisorlist = encodeHtmlEntity(addslashes($scope.searchsupervisorlist1));
      var clearfiltersupervisorlist1 = document.getElementById('clearfiltersupervisorlist');
      clearfiltersupervisorlist1.style.display = "block";
    };
    $scope.clearFiltersearchsupervisorlist = function(){
        $scope.searchsupervisorlist1 = null;
        $scope.searchsupervisorlist = null;
        var clearfiltersupervisorlist2 = document.getElementById('clearfiltersupervisorlist');
        clearfiltersupervisorlist2.style.display = "none";
    };
  /*==============================================================================*/ 

   /*supervisior*/
$scope.supervisiordatatype = [{"value":"Maker","name":"Maker"},{"value":"Checker","name":"Checker"}]

   $scope.supbranchID="";
   $scope.superEmail = "";
   $scope.superName = "";
   $scope.superPhone = "";
   $scope.superAddress = "";
   $scope.superCountry = "";
   $scope.superHours = "";
   $scope.superdays = "";
   $scope.supervisiorType = "";

   $scope.createSupervisior = function(){

    $scope.supervisiorsize = {
      "branchID":$scope.supbranchID
    }
       $http({
            method: 'POST',
            url: '/getsupervisiorbyBranch',
            data:$scope.supervisiorsize,
            headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {

            $scope.supervisioraddlimit = response.result;
             if($scope.supervisioraddlimit<2){
              $scope.phone1 = "+"+$scope.superPhone;
     $scope.superday = $scope.superdays;
     $scope.branchid = $base64.encode(encodeHtmlEntity(addslashes($scope.supbranchID)));
     //$scope.country = $base64.encode($scope.superCountry);
     $scope.full = $base64.encode(encodeHtmlEntity(addslashes($scope.superName)));
     $scope.Address = $base64.encode(encodeHtmlEntity(addslashes($scope.superAddress)));
     $scope.phone = $base64.encode(encodeHtmlEntity(addslashes($scope.phone1)));
     $scope.email = $base64.encode(encodeHtmlEntity(addslashes($scope.superEmail)));
     $scope.hours= $base64.encode($scope.superHours);
     $scope.superRecord ={
       "branchID": $scope.branchid,
       "name":$scope.full,
       "email": $scope.email,
       "phone": $scope.phone,
       "address":$scope.Address,
       // "country":$scope.country,
       "hoursOfWorkDaily":$scope.hours,
       "workdays":$scope.superday,
       "supervisiortype":$scope.supervisiorType
     };

     $http({
          method: 'POST',
          url: '/supervisiorController',
          data: $scope.superRecord,
         headers: {'Content-Type': 'application/json'

          }
          }).success(function (response) {
              if(response.result == 'BranchID can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'Email can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'FullName can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'ContactNo can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'Address can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'Workinghours can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'Workdays can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'Supervisiortype can not be empty'){
               new PNotify({
                   tittle : 'Regular notice',
                   type :'error',
                   text :response.result,
                 });
             }
             if(response.result == 'This Supervisior Already alllocated,please enter different email'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'There was an error sending the email'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'Supervisior created successfully'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.result,
                });
               $scope.supbranchID=null;
               $scope.superEmail = null;
               $scope.superName = null;
               $scope.superPhone = null;
               $scope.superAddress = null;
               // $scope.superCountry = null;
               $scope.superHours = null;
               $scope.superdays = null;
               $scope.supervisiorType = null;
            }
            
                $http({
                     method: 'GET',
                     url: '/supervisiorController',
                     headers: {'Content-Type': 'application/json'
                     }
                     }).success(function (response) {
                      console.log('suprvisior',response)
                         $scope.supervisiorDetails = response.result.reverse();
                       //pagination code
                 $scope.currentPageSupervisor = 0;
                 $scope.pageSizeSupervisor = 10;
                 $scope.numberOfPagesSupervisor=function(){
                   return Math.ceil($scope.supervisiorDetails.length/$scope.pageSizeSupervisor);
                 }
                //end
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
              text :response.result,
            });
       });
            }else{
               new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :"Two Supervisior for this branchID already added,You can't add more",
                });
             }//else
           }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
         });

     

   };//fun createSupervisior
   $scope.resetSupervisior = function(){
     $scope.supbranchID=null;
     $scope.superEmail = null;
     $scope.superName = null;
     $scope.superPhone = null;
     $scope.superAddress = null;
     // $scope.superCountry = null;
     $scope.superHours = null;
     $scope.superdays = null;
      $scope.supervisiorType = null;
   };

    $http({
      method: 'GET',
      url: '/supervisioractiveController',
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
        $scope.activesupervisiorDetails = response.result.reverse();

        //end
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
   });

   /*get supervisior data from database*/
    $http({
       method: 'GET',
       url: '/supervisiorController',
       headers: {'Content-Type': 'application/json'
        }
        }).success(function (response) {
         $scope.supervisiorDetails = response.result.reverse();


          //pagination code
         $scope.currentPageSupervisor = 0;
         $scope.pageSizeSupervisor = 10;
         $scope.numberOfPagesSupervisor=function(){
           return Math.ceil($scope.supervisiorDetails.length/$scope.pageSizeSupervisor);
         }
         //end
      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response,
          });
    });

     $scope.editsupervisor = function (superv){
         $(".hidebranch").hide();
       $(".branchidhide").show();
        $(".hidesupervisior").hide();
      $(".supervisioertypehide").show();
       var btn6 = document.getElementById("addbtn1");
       btn6.style.display ="none";
       var btn7 = document.getElementById("resetbtn1");
       btn7.style.display ="none";
       var btn8 = document.getElementById('savebtn1');
       btn8.style.display =  "block";
       btn8.style.float = "right";
       //console.log($scope.branchdata);

       var cancelsupervisorbtnshow = document.getElementById('cancelsupervisorbtn');
       cancelsupervisorbtnshow.style.display = "block";
       cancelsupervisorbtnshow.style.float ="right"

    $scope.cancelSupervisor = function(){
       $(".hidebranch").show();
      $(".branchidhide").hide();
      $scope.supbranchID=null;
      $scope.superEmail = null;
      $scope.superName = null;
      $scope.superPhone = null;
      $scope.superAddress = null;
      // $scope.superCountry = null;
      $scope.superHours = null;
      $scope.superdays = null;
      btn6.style.display ="block";
      btn6.style.float="right"
      btn7.style.display ="block";
      btn7.style.float="right"
      btn8.style.display ="none";
      cancelsupervisorbtnshow.style.display = "none";
      $scope.supervisiorType = null;
     
       $(".hidesupervisior").show();
       $(".supervisioertypehide").hide();
    }



      // alert(superv._id)
      $http({
           method: 'GET',
           url: '/supervisor/'+superv._id,
           }).success(function (response) {

             $("label").addClass("active")
             $scope.supbranchID= $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.branchID));
             $scope.superEmail = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.email));
             $scope.superName =  $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.name));

             $scope.superPhone1 =  $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.phone));
             $scope.superAddress =  $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.address));
             // $scope.superCountry =  response.result.country;
             $scope.superHours =  response.result.hoursOfWorkDaily;
             $scope.superdays =  response.result.workdays;
             $scope.superPhone = $scope.superPhone1.slice(1);
             $scope.supervisiorType = response.result.supervisiortype;

         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });
        $scope.updatesupervisor = function(){
          // $scope.superday = $scope.superdays;
          $(".hidebranch").show();
          $(".branchidhide").hide();
          $(".hidesupervisior").show();
         $(".supervisioertypehide").hide();
          $scope.phone1 = "+"+$scope.superPhone;
          $scope.superRecord ={
            "branchID": encodeHtmlEntity(addslashes($scope.supbranchID)),
            "name": encodeHtmlEntity(addslashes($scope.superName)),
            "email": encodeHtmlEntity(addslashes($scope.superEmail)),
            "phone": $scope.phone1,
            "address":encodeHtmlEntity(addslashes($scope.superAddress)),
            // "country":$scope.superCountry,
            "hoursOfWorkDaily":$scope.superHours,
            "workdays":$scope.superdays,
            "supervisiortype":$scope.supervisiorType
          };
          $http({
               method: 'PUT',
               url: '/supervisiorController/'+superv._id,
               data: $scope.superRecord,
               }).success(function (response) {
                   new PNotify({
                       tittle : 'Regular notice',
                       type :'success',
                       text :response.message,
                     });
                     $scope.supbranchID=null;
                     $scope.superEmail = null;
                     $scope.superName = null;
                     $scope.superPhone = null;
                     $scope.superAddress = null;
                     $scope.supervisiorType = null;
                     $scope.superHours = null;
                     $scope.superdays = null;
                     btn6.style.display ="block";
                     btn6.style.float="right"
                     btn7.style.display ="block";
                     btn7.style.float="right"
                     btn8.style.display ="none";
                     cancelsupervisorbtn.style.display = "none";
                     $http({
                          method: 'GET',
                          url: '/supervisiorController',
                         headers: {'Content-Type': 'application/json'
                          }
                          }).success(function (response) {
                            $scope.supervisiorDetails = response.result.reverse();

                             //pagination code
                   $scope.currentPageSupervisor = 0;
                   $scope.pageSizeSupervisor = 10;
                   $scope.numberOfPagesSupervisor=function(){
                     return Math.ceil($scope.supervisiorDetails.length/$scope.pageSizeSupervisor);
                   }
                   //end
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
     }//editfun

     $scope.deletesupervisor = function(superv){
      var deletesupervisorconfirm = confirm("Are you sure want to delete supervisior?");
     if(deletesupervisorconfirm){
      $http({
            method: 'DELETE',
            url: '/supervisiorController/'+superv._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({
                tittle : 'Regular notice',
                type :'success',
                text :response.message
              });
               var addbtn6 = document.getElementById("addbtn1");
              addbtn6.style.display ="block";
              addbtn6.style.float = "right";
              var resetbtn7 = document.getElementById("resetbtn1");
              resetbtn7.style.display ="block";
              resetbtn7.style.float = "right";
              var savebtn8 = document.getElementById('savebtn1');
              savebtn8.style.display =  "none";
              var cancelsupervisorbtnhide = document.getElementById('cancelsupervisorbtn');
              cancelsupervisorbtnhide.style.display = "none";

              $http({
                    method: 'GET',
                    url: '/supervisiorController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.supervisiorDetails = response.result.reverse();

                   //pagination code
               $scope.currentPageSupervisor = 0;
               $scope.pageSizeSupervisor = 10;
               $scope.numberOfPagesSupervisor=function(){
                 return Math.ceil($scope.supervisiorDetails.length/$scope.pageSizeSupervisor);
               }
               //end

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
      }//if
};
$scope.$watch("supervisiorType", function(newValue, oldValue) {
           $timeout(function() {

             $scope.supervisiorType = newValue;
              $("#supervisiortype").material_select();
              $('.caret').text("");
              $("#supervisiortype").val(newValue);


           }, 0);
 });
   /*end supervisior*/
   /*==============================================================================*/

   /*create tellerid*/
   /*==============================================================================*/

   /*change*/
      $scope.getvalue1 = function() { //Prateek
       $scope.arr1 = $('#list-title2').val().replace(/[^0-9]/g, ""); //Prateek
     }

   $scope.tellerbranch = "";
   $scope.tellersupervisor = "";
   $scope.tellerlimit = "";

   $scope.getSupervisor = function(tellerbranch){
    $scope.getBranchid = tellerbranch;
    $scope.supersearchData = {
        "branchID": $scope.getBranchid
     }
      $http({
          method: 'POST',
          url: '/getsupervisor',
          data: $scope.supersearchData,
          }).success(function (response) {
            $scope.getSupervisorData = response.result;
            $("label").addClass("active")
              $scope.tellersupervisor = $scope.getSupervisorData.supervisiorID;


        }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response,
            });
       });
   }//fun

   $scope.createTeller = function (){
     $scope.getvalue1();
     $scope.tellerlimit = $scope.arr1;

     $scope.branchid = $base64.encode( encodeHtmlEntity(addslashes($scope.tellerbranch)));
     $scope.supervisiorid = $base64.encode( encodeHtmlEntity(addslashes($scope.tellersupervisor)));
     $scope.payment = $base64.encode($scope.tellerlimit);

     $scope.telleridRecord ={
       "branchID": $scope.branchid,
       "paymentLimit":$scope.payment,
       "supervisiorID":$scope.supervisiorid
     };
     $http({
          method: 'POST',
          url: '/tellerIDController',
          data: $scope.telleridRecord,
         headers: {'Content-Type': 'application/json'

          }
          }).success(function (response) {
              if(response.result == 'BranchID can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'PaymentLimit can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'SupervisiorID can not be empty'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }
            if(response.result == 'This tellerID Already Exist'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.result,
                });
            }

            if(response.result == 'tellerID added'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.result,
                });
            }
                $http({
                     method: 'GET',
                     url: '/tellerIDController',
                    headers: {'Content-Type': 'application/json'
                     }
                     }).success(function (response) {
                     $scope.telleriddata = response.result.reverse();

                     $scope.currentPageTeller = 0;
               $scope.pageSizeTeller = 10;
               $scope.numberOfPagesTeller=function(){
                 return Math.ceil($scope.telleriddata.length/$scope.pageSizeTeller);
               }
               $scope.tellerbranch = "";
               $scope.tellersupervisor = "";
               $scope.tellerlimit = "";

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
   $scope.resetTeller = function(){
     $scope.tellerbranch = "?";
     $scope.tellersupervisor = null;
     $scope.tellerlimit = null;

   }

   $http({
        method: 'GET',
        url: '/tellerIDController',
       headers: {'Content-Type': 'application/json'
        }
        }).success(function (response) {
        $scope.telleriddata = response.result.reverse();
        // console.log($scope.telleriddata[0].supervisiorID.supervisiorID)

        $scope.currentPageTeller = 0;
      $scope.pageSizeTeller = 10;
      $scope.numberOfPagesTeller=function(){
          return Math.ceil($scope.telleriddata.length/$scope.pageSizeTeller);
      }

      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response,
          });
     });

     $scope.editTeller = function(tellerid){
      // $("#tellersuper").hide();
      //  alert(tellerid._id)
      var btn10 = document.getElementById("addbtn2");
      btn10.style.display ="none";
      var btn11 = document.getElementById("resetbtn2");
      btn11.style.display ="none";
      var btn12 = document.getElementById('savebtn2');
      btn12.style.display =  "block";
      btn12.style.float = "right";

      var cancelTellerbtnshow = document.getElementById('cancelTellerbtn');
      cancelTellerbtnshow.style.display = "block";
      cancelTellerbtnshow.style.float = "right";
      $scope.cancelTeller = function(){
        $scope.tellerbranch = "?";
        $scope.tellersupervisor = null;
        $scope.tellerlimit = null;
        btn10.style.display ="block";
        btn10.style.float="right"
        btn11.style.display ="block";
        btn11.style.float="right"
        btn12.style.display ="none";
        cancelTellerbtnshow.style.display = "none";
      }


      $http({
           method: 'GET',
           url: '/tellerID/'+tellerid._id,
           }).success(function (response) {
            // console.log(response)
             $("label").addClass("active")
             $scope.tellerbranch = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.branchID));
             $scope.tellersupervisor = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.supervisiorID));
             $scope.tellerlimit1 = response.result.paymentLimit;
             $scope.bc = $scope.tellerlimit1.toLocaleString();
             $scope.tellerlimit = $scope.bc; //Prateek
             console.log('tellerbranch',$scope.tellerbranch)
         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
        });
        $scope.updateTeller = function (){
          $("#tellersuper").show();
            $scope.getvalue1();
          $scope.tellerlimit = $scope.arr1;
          $scope.tellerupdateRecord ={
            "branchID": encodeHtmlEntity(addslashes($scope.tellerbranch)),
            "tellerID": encodeHtmlEntity(addslashes($scope.tellersupervisor)),
            "paymentLimit": $scope.tellerlimit,
          };
          $http({
               method: 'PUT',
               url: '/tellerIDController/'+tellerid._id,
               data: $scope.tellerupdateRecord,
               }).success(function (response) {
                   new PNotify({
                       tittle : 'Regular notice',
                       type :'success',
                       text :response.message,
                     });
                     $scope.tellerbranch = "?";
                     $scope.tellersupervisor = null;
                     $scope.tellerlimit = null;
                     btn10.style.display ="block";
                     btn10.style.float="right"
                     btn11.style.display ="block";
                     btn11.style.float="right"
                     btn12.style.display ="none";
                    cancelTellerbtn.style.display = "none";
                     $http({
                          method: 'GET',
                          url: '/tellerIDController',
                         headers: {'Content-Type': 'application/json'
                          }
                          }).success(function (response) {

                          $scope.telleriddata = response.result.reverse();
                          $scope.currentPageTeller = 0;
                $scope.pageSizeTeller = 10;
                $scope.numberOfPagesTeller=function(){
                  return Math.ceil($scope.telleriddata.length/$scope.pageSizeTeller);
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
    }//fun
$scope.deleteTeller = function(tellerid){
  var tellerdeleteconfirm = confirm("Are you sure want to delete teller?");
  if(tellerdeleteconfirm){
   $http({
            method: 'DELETE',
            url: '/tellerID/'+tellerid._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({
                tittle : 'Regular notice',
                type :'success',
                text :response.message
              });
                 var addbtn10 = document.getElementById("addbtn2");
              addbtn10.style.display ="block";
              addbtn10.style.float = "right";
              var resetbtn11 = document.getElementById("resetbtn2");
              resetbtn11.style.display ="block";
              resetbtn11.style.float = "right";
              var savebtn12 = document.getElementById('savebtn2');
              savebtn12.style.display =  "none";
              var cancelTellerbtnhide = document.getElementById('cancelTellerbtn');
              cancelTellerbtnhide.style.display = "none";
              $http({
                    method: 'GET',
                    url: '/tellerIDController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.telleriddata = response.result.reverse();

            $scope.currentPageTeller = 0;
             $scope.pageSizeTeller = 10;
             $scope.numberOfPagesTeller=function(){
              return Math.ceil($scope.telleriddata.length/$scope.pageSizeTeller);
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
    }//if
}

   /*end teller*/

   /*==============================================================================*/

   /*create controller*/
   $scope.hideclearFiltersearchcontroller = function(){
    var clearFiltersearchcontroller = document.getElementById('clearFiltersearchcontroller');
     clearFiltersearchcontroller.style.display = "none";
   };
   $scope.searchcontroller1;
   $scope.searchcontrollerfilter = function(){
    $scope.searchcontroller = encodeHtmlEntity(addslashes($scope.searchcontroller1));
    var clearFiltersearchcontroller1 = document.getElementById('clearFiltersearchcontroller');
     clearFiltersearchcontroller1.style.display = "block";
   };
   $scope.clearFiltersearchsearchcontroller = function(){
    $scope.searchcontroller1 = null;
    $scope.searchcontroller = null;
    var clearFiltersearchcontroller2 = document.getElementById('clearFiltersearchcontroller');
     clearFiltersearchcontroller2.style.display = "none";
   }


   /*==============================================================================*/
   $http({
        method: 'GET',
        url: '/branchactiveController',
        headers: {'Content-Type': 'application/json'
        }
        }).success(function (response) {

       $scope.controlbranchdata = response.result.reverse();

      }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });


   $scope.controllerBranch = "";
   $scope.controlleremail = "";
   $scope.controllerename = "";
   $scope.controllerphone = "";
   $scope.controlleraddress = "";
   // $scope.controllercountry = "";
   $scope.controllerhours = "";
   $scope.controllerdays ="";

   $scope.createController = function(){

    $scope.controllersize = {
       "branchID":$scope.controllerBranch
     }
        $http({
             method: 'POST',
             url: '/getControllerbyBranch',
             data:$scope.controllersize,
            headers: {'Content-Type': 'application/json'
             }
             }).success(function (response) {

             $scope.controlleraddlimit = response.result;
              if($scope.controlleraddlimit<2){
                $scope.cphone1 = "+"+$scope.controllerphone;
                 $scope.cday = $scope.controllerdays;
                 $scope.cbranch = $base64.encode(encodeHtmlEntity(addslashes($scope.controllerBranch)));
                 $scope.cemail = $base64.encode(encodeHtmlEntity(addslashes($scope.controlleremail)));
                 $scope.cname = $base64.encode(encodeHtmlEntity(addslashes($scope.controllerename)));
                 $scope.cphone = $base64.encode(encodeHtmlEntity(addslashes($scope.cphone1)));
                 $scope.caddress = $base64.encode(encodeHtmlEntity(addslashes($scope.controlleraddress)));
                 // $scope.ccountry = $base64.encode($scope.controllercountry);
                 $scope.chours = $base64.encode($scope.controllerhours);

               $scope.controllerRecord = {
                 "workdays": $scope.cday,
                 "branchID":$scope.cbranch,
                 "email":$scope.cemail,
                 "name":$scope.cname,
                 "phone": $scope.cphone,
                 "address": $scope.caddress,
                 // "country": $scope.ccountry,
                 "hoursOfWorkDaily":$scope.chours,
                 };

                 $http({
                      method: 'POST',
                      url: '/controller',
                      data: $scope.controllerRecord,
                     headers: {'Content-Type': 'application/json'
                      }
                      }).success(function (response) {
                           if(response.result == 'BranchID can not be empty'){
                          new PNotify({
                              tittle : 'Regular notice',
                              type :'error',
                              text :response.result,
                            });
                        }
                        if(response.result == 'Email can not be empty'){
                          new PNotify({
                              tittle : 'Regular notice',
                              type :'error',
                              text :response.result,
                            });
                        }
                        if(response.result == 'Name can not be empty'){
                          new PNotify({
                              tittle : 'Regular notice',
                              type :'error',
                              text :response.result,
                            });
                        }
                         if(response.result == 'ContactNo. can not be empty'){
                          new PNotify({
                              tittle : 'Regular notice',
                              type :'error',
                              text :response.result,
                            });
                        }
                         if(response.result == 'Address can not be empty'){
                          new PNotify({
                              tittle : 'Regular notice',
                              type :'error',
                              text :response.result,
                            });
                        }
                         if(response.result == 'Working hours can not be empty'){
                          new PNotify({
                              tittle : 'Regular notice',
                              type :'error',
                              text :response.result,
                            });
                        }
                        if(response.result == 'Working days can not be empty'){
                          new PNotify({
                              tittle : 'Regular notice',
                              type :'error',
                              text :response.result,
                            });
                        }
                        if(response.result == 'This Controller Already Exist'){
                          new PNotify({
                              tittle : 'Regular notice',
                              type :'error',
                              text :response.result,
                            });
                        }

                        if(response.result == 'Controller create successfully and Login Password was send controller`s Email'){
                          new PNotify({
                              tittle : 'Regular notice',
                              type :'success',
                              text :response.result,
                            });
                          $scope.controllerBranch = "?";
                         $scope.controlleremail = null;
                         $scope.controllerename = null;
                         $scope.controllerphone = null;
                         $scope.controlleraddress = null;
                         // $scope.controllercountry = null;
                         $scope.controllerhours = null;
                         $scope.controllerdays =null;
                        }

                            $http({
                                 method: 'GET',
                                 url: '/controller',
                                headers: {'Content-Type': 'application/json'
                                 }
                                 }).success(function (response) {

                                     $scope.controllerDetails = response.result.reverse();
                                   //pagination code
                             $scope.currentPageController = 0;
                             $scope.pageSizeController = 10;
                             $scope.numberOfPagesController=function(){
                               return Math.ceil($scope.controllerDetails.length/$scope.pageSizeController);
                             }
                           //end

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

              }else{
               new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :"Two Controller for this branchID already added,You can't add more",
                });
             }//else
           }).error(function (response) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response,
               });
          });


    


   };
   $scope.resetController = function(){
     $scope.controllerBranch = "?";
     $scope.controlleremail = null;
     $scope.controllerename = null;
     $scope.controllerphone = null;
     $scope.controlleraddress = null;
     // $scope.controllercountry = null;
     $scope.controllerhours = null;
     $scope.controllerdays =null;
   };

   $http({
        method: 'GET',
        url: '/controller',
       headers: {'Content-Type': 'application/json'
        }
        }).success(function (response) {
          $scope.controllerDetails = response.result.reverse();
          //pagination code
           $scope.currentPageController = 0;
           $scope.pageSizeController = 10;
           $scope.numberOfPagesController=function(){
             return Math.ceil($scope.controllerDetails.length/$scope.pageSizeController);
           }
         //end

      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response,
          });
     });

     $scope.editController = function(control){
      //  alert(control._id)
      var btn16 = document.getElementById("addbtn3");
      btn16.style.display ="none";
      var btn17 = document.getElementById("resetbtn3");
      btn17.style.display ="none";
      var btn18 = document.getElementById('savebtn3');
      btn18.style.display =  "block";
      btn18.style.float = "right";

      var cancelControllerbtnshow = document.getElementById('cancelControllerbtn');
      cancelControllerbtnshow.style.display = "block";
      cancelControllerbtnshow.style.float = "right";

      $scope.cancelController = function(){
        $scope.controllerBranch = "?";
        $scope.controlleremail = null;
        $scope.controllerename = null;
        $scope.controllerphone = null;
        $scope.controlleraddress = null;
        // $scope.controllercountry = null;
        $scope.controllerhours = null;
        $scope.controllerdays =null;
        btn16.style.display ="block";
        btn16.style.float="right"
        btn17.style.display ="block";
        btn17.style.float="right"
        btn18.style.display ="none";
        cancelControllerbtnshow.style.display = "none";
      }


      $http({
        method: 'GET',
        url: '/controller/'+control._id,
        }).success(function (response) {
         // console.log(response.result)
          $("label").addClass("active")
          $scope.controllerBranch = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.branchID));
          $scope.controlleremail  = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.email));
          $scope.controllerename  = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.name));
          $scope.controllerphone1 = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.phone));
          $scope.controlleraddress = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.address));
          // $scope.controllercountry = response.result.country;
          $scope.controllerhours = response.result.hoursOfWorkDaily;
          $scope.controllerdays =response.result.workdays;
           $scope.controllerphone =  $scope.controllerphone1.slice(1);
      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response,
          });
     });
     $scope.updateController = function (){

       $scope.cday      = $scope.controllerdays;
       $scope.cbranch   = encodeHtmlEntity(addslashes($scope.controllerBranch));
       $scope.cemail    = encodeHtmlEntity(addslashes($scope.controlleremail));
       $scope.cname     = encodeHtmlEntity(addslashes($scope.controllerename));
       $scope.cphone    = "+"+$scope.controllerphone;
       // $scope.cphone = $scope.controllerphone;
        $scope.caddress = encodeHtmlEntity(addslashes($scope.controlleraddress));
      // $scope.ccountry  = encodeHtmlEntity(addslashes($scope.controllercountry));
       $scope.chours    = $scope.controllerhours;

     $scope.controllerupdateRecord = {
       "workdays": $scope.cday,
       "branchID":$scope.cbranch,
       "email":$scope.cemail,
       "name":$scope.cname,
       "phone": $scope.cphone,
       "address": $scope.caddress,
       // "country": $scope.ccountry,
       "hoursOfWorkDaily":$scope.chours,
       };
       //console.log('putdata',$scope.controllerupdateRecord)
       $http({
            method: 'PUT',
            url: '/controller/'+control._id,
            data: $scope.controllerupdateRecord,
            }).success(function (response) {
              //console.log('putcontroller',response)
                new PNotify({
                    tittle : 'Regular notice',
                    type :'success',
                    text :response.message,
                  });
                  $scope.controllerBranch = "?";
                  $scope.controlleremail = null;
                  $scope.controllerename = null;
                  $scope.controllerphone = null;
                  $scope.controlleraddress = null;
                  // $scope.controllercountry = null;
                  $scope.controllerhours = null;
                  $scope.controllerdays =null;
                  btn16.style.display ="block";
                  btn16.style.float="right"
                  btn17.style.display ="block";
                  btn17.style.float="right"
                  btn18.style.display ="none";
                  cancelControllerbtn.style.display = "none"

                  $http({
                       method: 'GET',
                       url: '/controller',
                      headers: {'Content-Type': 'application/json'
                       }
                       }).success(function (response) {
                         $scope.controllerDetails = response.result.reverse();
                         //pagination code
                 $scope.currentPageController = 0;
                 $scope.pageSizeController = 10;
                 $scope.numberOfPagesController=function(){
                   return Math.ceil($scope.controllerDetails.length/$scope.pageSizeController);
                 }
               //end

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
$scope.deleteController = function(control){
  var controllerdeleteconfirm = confirm("Are you sure want to delete controller?");
  if(controllerdeleteconfirm){
     $http({
            method: 'DELETE',
            url: '/controller/'+control._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({

                tittle : 'Regular notice',
                type :'success',
                text :response.message
              });
                var addbtn16 = document.getElementById("addbtn3");
          addbtn16.style.display ="block";
          addbtn16.style.float = "right";
          var resetbtn17 = document.getElementById("resetbtn3");
          resetbtn17.style.display ="block";
          resetbtn17.style.float = "right";
          var savebtn18 = document.getElementById('savebtn3');
          savebtn18.style.display =  "none";


          var cancelControllerbtnhide = document.getElementById('cancelControllerbtn');
          cancelControllerbtnhide.style.display = "none";

              $http({
                    method: 'GET',
                    url: '/controller',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.controllerDetails = response.result.reverse();
                   //pagination code
               $scope.currentPageController = 0;
               $scope.pageSizeController = 10;
               $scope.numberOfPagesController=function(){
                 return Math.ceil($scope.controllerDetails.length/$scope.pageSizeController);
               }
             //end

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
     }//if
}
   /*end controller*/
   /*==============================================================================*/

   /*country*/
    $scope.hideclearFiltersearchcountrylimit = function(){
     var clearfiltersearchcountrylimit = document.getElementById('clearfiltersearchcountrylimit');
     clearfiltersearchcountrylimit.style.display = "none";
    };

    $scope.searchcountrylimit1;

    $scope.searchcountrylimitfilter = function(){
      $scope.searchcountrylimit = encodeHtmlEntity(addslashes($scope.searchcountrylimit1));
      var clearfiltersearchcountrylimit1 = document.getElementById('clearfiltersearchcountrylimit');
      clearfiltersearchcountrylimit1.style.display = "block";
    };

    $scope.clearFiltersearchcountrylimit = function(){
      $scope.searchcountrylimit1 = null;
      $scope.searchcountrylimit = null;
      var clearfiltersearchcountrylimit2 = document.getElementById('clearfiltersearchcountrylimit');
     clearfiltersearchcountrylimit2.style.display = "none";
    }


   /*==============================================================================*/
      /*change*/
         $scope.getvalue2 = function() { //Prateek
            $scope.arr2 = $('#list-title3').val().replace(/[^0-9]/g, ""); //Prateek
        }
   $scope.countrylimit = "";
   $scope.currency = "";
   $scope.monthlylimit = "";
   $scope.region = "";

   $scope.getCurrency = function(country){
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
             $scope.tariffcurrency = $scope.getCurrencyData[0].currencyName;

        }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response,
            });
       });

   }//get cur



   $scope.createCountry = function (){

    $scope.getvalue2();
    $scope.monthlylimit    = $scope.arr2;
    $scope.countryname     = $base64.encode($scope.countrylimit);
    $scope.countrycurrency = $base64.encode(encodeHtmlEntity(addslashes($scope.currency)));
    $scope.paylimit        = $base64.encode($scope.monthlylimit);
    $scope.countryregion   = $base64.encode(encodeHtmlEntity(addslashes($scope.region)));

    // $scope.countryname     = $base64.encode(encodeHtmlEntity(addslashes($scope.countrylimit)));

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

            if(response.message == 'This countryLimit already define,Please choose another country'){
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
                   //end
                       }).error(function (response) {
                          new PNotify({
                             tittle : 'Regular notice',
                             type :'error',
                             text :response.reason.errmsg,
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
     $scope.countrylimit = null;
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
          //pagination code
         $scope.currentPageClimit = 0;
         $scope.pageSizeClimit    = 10;
         $scope.numberOfPagesClimit=function(){
           return Math.ceil($scope.countrylimitDetails.length/$scope.pageSizeClimit);
         }
         //end
      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response,
          });
     });

 $scope.editCountry = function(country){
  // alert(country._id)
  $("#currencyhide").hide();
     var btn21 = document.getElementById("addbtn4");
      btn21.style.display ="none";
      var btn22 = document.getElementById("resetbtn4");
      btn22.style.display ="none";
      var btn23 = document.getElementById('savebtn4');
      btn23.style.display =  "block";
      btn23.style.float = "right";

      var cancelCountrybtnshow = document.getElementById('cancelCountrybtn');
      cancelCountrybtnshow.style.display = "block";
      cancelCountrybtnshow.style.float = "right";

      $scope.cancelCountry = function(){
        $scope.countrylimit = null;
        $scope.currency = null;
        $scope.monthlylimit = null;
        $scope.region = null;
        btn21.style.display ="block";
        btn21.style.float="right"
        btn22.style.display ="block";
        btn22.style.float="right"
        btn23.style.display ="none";
        cancelCountrybtnshow.style.display = "none";
      }


      $http({
           method: 'GET',
           url: '/country/'+country._id,
           }).success(function (response) {
            // console.log(response)
             $("label").addClass("active")
             $scope.countrylimit  = response.result.countryName;
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
          $("#currencyhide").show();
          $scope.getvalue2();
          $scope.monthlylimit = $scope.arr2;
        $scope.countryupdateRecord = {
          "countryName" : encodeHtmlEntity(addslashes($scope.countrylimit)),
          "currency" :  encodeHtmlEntity(addslashes($scope.currency)),
          "paymentLimit" :$scope.monthlylimit,
          "region" : encodeHtmlEntity(addslashes($scope.region)),
        };
      $http({
           method: 'PUT',
           url: '/country/'+country._id,
           data:$scope.countryupdateRecord,
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
                 btn21.style.display ="block";
                 btn21.style.float="right"
                 btn22.style.display ="block";
                 btn22.style.float="right"
                 btn23.style.display ="none";
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
                 //end
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

 }; //editnfun
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
               var addbtn21 = document.getElementById("addbtn4");
          addbtn21.style.display ="block";
          addbtn21.style.float = "right";
          var resetbtn22 = document.getElementById("resetbtn4");
          resetbtn22.style.display ="block";
          resetbtn22.style.float = "right";
          var savebtn23 = document.getElementById('savebtn4');
          savebtn23.style.display =  "none";


          var cancelCountrybtnhide = document.getElementById('cancelCountrybtn');
          cancelCountrybtnhide.style.display = "none";
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
               //end

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
    }//if
 }//fun

   /*end country*/
   /*==============================================================================*/

   /*KYC*/
   /*==============================================================================*/
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
                 $scope.kyctransaction = response.result.reverse();
                 console.log('kyctra',$scope.kyctransaction)

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
   $scope.hideclearFiltersearchkyclist = function(){
    var clearfiltersearchkyclist = document.getElementById('clearfiltersearchkyclist');
     clearfiltersearchkyclist.style.display = "none";

   };
   $scope.searchkyclist1;
   $scope.searchkyclistfilter = function(){
    $scope.searchkyclist = encodeHtmlEntity(addslashes($scope.searchkyclist1));
    var clearfiltersearchkyclist1 = document.getElementById('clearfiltersearchkyclist');
     clearfiltersearchkyclist1.style.display = "block";
   };

   $scope.clearFiltersearchkyclist = function(){
     $scope.searchkyclist1 = null;
     $scope.searchkyclist = null;
     var clearfiltersearchkyclist2 = document.getElementById('clearfiltersearchkyclist');
     clearfiltersearchkyclist2.style.display = "none";
   };

   $scope.hideclearFiltersearchremitterlist = function(){
    var clearfiltersearchremitterlist = document.getElementById('clearfiltersearchremitterlist');
     clearfiltersearchremitterlist.style.display = "none";
   };
   $scope.searchremitterlist1;
   $scope.searchremitterlistfilter = function(){
     $scope.searchremitterlist = encodeHtmlEntity(addslashes($scope.searchremitterlist1));
     var clearfiltersearchremitterlist1 = document.getElementById('clearfiltersearchremitterlist');
     clearfiltersearchremitterlist1.style.display = "block";
   };
   $scope.clearFiltersearchsearchremitterlist = function(){
     $scope.searchremitterlist1 = null;
      $scope.searchremitterlist = null;
       var clearfiltersearchremitterlist2 = document.getElementById('clearfiltersearchremitterlist');
     clearfiltersearchremitterlist2.style.display = "none";
   }


   /*Remitter*/
   /*==============================================================================*/
   $http({
        method: 'GET',
        url: '/remitterController',
       headers: {'Content-Type': 'application/json'
        }
        }).success(function (response) {
          $scope.remitterDetails = response.result.reverse();
        $scope.currentPageKYC = 0;
        $scope.pageSizeKYC = 10;
        $scope.numberOfPagesKYC=function(){
          return Math.ceil($scope.remitterDetails.length/$scope.pageSizeKYC);
        }

      /*remitter*/
      $scope.currentPageRemiter = 0;
      $scope.pageSizeRemiter = 10;
      $scope.numberOfPagesRemiter=function(){
        return Math.ceil($scope.remitterDetails.length/$scope.pageSizeKYC);
      }

      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response.reason,
          });
     });

   /*end Remitter*/
   /*==============================================================================*/
   /*Beneficiary*/

   $scope.hideclearFiltersearchbeneficiarylist = function(){
    var clearfiltersearchbeneficiarylist = document.getElementById('clearfiltersearchbeneficiarylist');
     clearfiltersearchbeneficiarylist.style.display = "none";
   };
   $scope.searchbeneficiarylist1;
   $scope.searchbeneficiarylistfilter = function(){
     $scope.searchbeneficiarylist = encodeHtmlEntity(addslashes($scope.searchbeneficiarylist1));
     var clearfiltersearchbeneficiarylist1 = document.getElementById('clearfiltersearchbeneficiarylist');
     clearfiltersearchbeneficiarylist1.style.display = "block";
   };
   $scope.clearFiltersearchbeneficiarylist = function(){
     $scope.searchbeneficiarylist1 = null;
      $scope.searchbeneficiarylist = null;
       var clearfiltersearchbeneficiarylist2 = document.getElementById('clearfiltersearchbeneficiarylist');
     clearfiltersearchbeneficiarylist2.style.display = "none";
   }
   /*==============================================================================*/
   $http({
        method: 'GET',
        url: '/beneficiaryController',
       headers: {'Content-Type': 'application/json'
        }
        }).success(function (response) {
          $scope.beneficiaryDetails = response.result.reverse();
          $scope.currentPageBeneficiary = 0;
          $scope.pageSizeBeneficiary = 10;
          $scope.numberOfPagesBeneficiary=function(){
            return Math.ceil($scope.beneficiaryDetails.length/$scope.pageSizeBeneficiary);
          }

      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response.reason,
          });
     });

   /*end Beneficiary*/
   /*==============================================================================*/

   /*report*/
   /*==============================================================================*/
   $http({
        method: 'GET',
        url: '/allTransaction',
       headers: {'Content-Type': 'application/json'
        }
        }).success(function (response) {
          $scope.transactiondata = response.result1.reverse();
          $scope.currentPagereport = 0;
              $scope.pageSizereport = 10;
              $scope.numberOfPagesreport=function(){
                return Math.ceil($scope.transactiondata.length/$scope.pageSizereport);
              }



      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response,
          });
     });

   /*end report*/
   /*==============================================================================*/

   /*tariff*/
    $scope.hideclearFiltersearchtarifflist = function (){
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
     var clearfiltersearchtarifflist2 = document.getElementById('clearfiltersearchtarifflist');
     clearfiltersearchtarifflist2.style.display = "none";
   };
   
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
   // $scope.tariffexclude = "";
   $scope.tariffbranchid = "";
   $scope.createTariff = function (){

     $scope.getvalue4();
    $scope.tariffmin = $scope.arr4;
    $scope.getvalue5();
   $scope.tariffmax = $scope.arr5;
     $scope.tariffdata1 ={
          //  "country":encodeHtmlEntity(addslashes($scope.tariffcountry)),
          "country":$scope.tariffcountry,
           "currency":$scope.tariffcurrency,
           "minAmount":$scope.tariffmin,
           "maxAmount":$scope.tariffmax,
           "tax":$scope.tax,
           "tariff":$scope.tariff,
           "branchID":encodeHtmlEntity(addslashes($scope.tariffbranchid))
          };
          $http({
               method: 'POST',
               url: '/tariffController',
               data: $scope.tariffdata1 ,
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
            if(response.message == 'Tariff add sucessfullyy'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.message,
                });

            }
                $scope.tariffcountry = null;
                     $scope.tariffcurrency = null;
                     $scope.tariffmin = null;
                     $scope.tariffmax = null;
                     $scope.tariff = null;
                     $scope.tax =null;
                     // $scope.tariffexclude = null;
                     $scope.tariffbranchid = null;
                     $http({
                          method: 'GET',
                          url: '/tariffController',
                         headers: {'Content-Type': 'application/json'
                          }
                          }).success(function (response) {
                            $scope.tariffdata = response.result.reverse();
                            $scope.currentPageTariff = 0;
                           $scope.pageSizeTariff = 10;
                           $scope.numberOfPagesTariff=function(){
                             return Math.ceil($scope.tariffdata.length/$scope.pageSizeTariff);
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
   };
   $scope.resetTariff = function (){
     $scope.tariffcountry = "?";
     $scope.tariffcurrency = null;
     $scope.tariffmin = null;
     $scope.tariffmax = null;
     $scope.tariff = null;
     $scope.tax =null;
     // $scope.tariffexclude = null;
     $scope.tariffbranchid = null;
   };
   $http({
        method: 'GET',
        url: '/tariffController',
       headers: {'Content-Type': 'application/json'
        }
        }).success(function (response) {
          $scope.tariffdata = response.result.reverse();
          $scope.currentPageTariff = 0;
         $scope.pageSizeTariff = 10;
         $scope.numberOfPagesTariff=function(){
           return Math.ceil($scope.tariffdata.length/$scope.pageSizeTariff);
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

   var cancelTariffbtnshow = document.getElementById('cancelTariffbtn');
   cancelTariffbtnshow.style.display = "block";
   cancelTariffbtnshow.style.float = "right";

     $scope.cancelTariff = function(){
       $scope.tariffcountry = "?";
       $scope.tariffcurrency = null;
       $scope.tariffmin = null;
       $scope.tariffmax = null;
       $scope.tariff = null;
       $scope.tax =null;
       // $scope.tariffexclude = null;
       $scope.tariffbranchid = null;
       btn26.style.display ="block";
       btn26.style.float="right"
       btn27.style.display ="block";
       btn27.style.float="right"
       btn28.style.display ="none";
       cancelTariffbtnshow.style.display = "none";
     }



   $http({
        method: 'GET',
        url: '/tariffController/'+tariff._id,
        }).success(function (response) {
          //console.log(response)
          $("label").addClass("active")
          $scope.tariffcountry = response.result.country;
          $scope.tariffcurrency = response.result.currency;
          $scope.tariffmin1 = response.result.minAmount;
          $scope.tariffmax1 = response.result.maxAmount;
          $scope.tariff = response.result.tariff;
          $scope.tax =response.result.tax;
          // $scope.tariffexclude = response.result.tariffExclude;
          $scope.tariffbranchid = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.branchID));
          $scope.min = $scope.tariffmin1.toLocaleString();
          $scope.tariffmin = $scope.min;
          $scope.max = $scope.tariffmax1.toLocaleString();
          $scope.tariffmax = $scope.max;
          console.log('tarifcountry',$scope.tariffcountry)
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
             "currency":$scope.tariffcurrency,
             "minAmount":$scope.tariffmin,
             "maxAmount":$scope.tariffmax,
             "tax":$scope.tax,
             "tariff":$scope.tariff,
             // "tariffExclude":$scope.tariffexclude,
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
                $scope.tariffcountry = "?";
                 $scope.tariffcurrency = null;
                 $scope.tariffmin = null;
                 $scope.tariffmax = null;
                 $scope.tariff = null;
                 $scope.tax =null;
                 // $scope.tariffexclude = null;
                 $scope.tariffbranchid = "?";
                 btn26.style.display ="block";
                 btn26.style.float="right"
                 btn27.style.display ="block";
                 btn27.style.float="right"
                 btn28.style.display ="none";
                 cancelTariffbtn.style.display = "none";
            }

                 $http({
                      method: 'GET',
                      url: '/tariffController',
                     headers: {'Content-Type': 'application/json'
                      }
                      }).success(function (response) {
                        $scope.tariffdata = response.result.reverse();
                        $scope.currentPageTariff = 0;
                       $scope.pageSizeTariff = 10;
                       $scope.numberOfPagesTariff=function(){
                         return Math.ceil($scope.tariffdata.length/$scope.pageSizeTariff);
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
                   //  alert(tariff._id)
   var addbtn26 = document.getElementById("addbtn5");
   addbtn26.style.display ="block";
    addbtn26.style.float = "right";
   var resetbtn27 = document.getElementById("resetbtn5");
   resetbtn27.style.display ="block";
    resetbtn27.style.float = "right";
   var savebtn28 = document.getElementById('savebtn5');
   savebtn28.style.display =  "none";


   var cancelTariffbtnhide = document.getElementById('cancelTariffbtn');
   cancelTariffbtnhide.style.display = "none";
              $http({
                    method: 'GET',
                    url: '/tariffController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                  $scope.tariffdata = response.result.reverse();
                  $scope.currentPageTariff = 0;
                 $scope.pageSizeTariff = 10;
                 $scope.numberOfPagesTariff=function(){
                   return Math.ceil($scope.tariffdata.length/$scope.pageSizeTariff);
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
   }//if
}//fun
   /*end tariff*/
   /*==============================================================================*/

   /*comission*/
   /*==============================================================================*/
   $scope.platformcomision = "";
   $scope.sendercomision = "";
   $scope.benefcomision = "";
   $scope.comisionbranchid = "";

   $scope.createshare = function (){
     $scope.sharedata = {
     "sendercomision":$scope.sendercomision,
     "platformcomsion":$scope.platformcomision,
     "benefcomision":$scope.benefcomision,
     "branchID":encodeHtmlEntity(addslashes($scope.comisionbranchid))
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
     $scope.comisionbranchid = null;
         }
                $http({
                     method: 'GET',
                     url: '/comissionController',
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
     $scope.comisionbranchid = "?";
   };
   $http({
        method: 'GET',
        url: '/comissionController',
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
    cancelComisionbtnshow.style.display = "block"
    cancelComisionbtnshow.style.float = "right"

    $scope.cancelComision = function(){
      $scope.platformcomision = null;
      $scope.sendercomision = null;
      $scope.benefcomision = null;
      $scope.comisionbranchid = "?";
      btn31.style.display ="block";
      btn31.style.float="right"
      btn32.style.display ="block";
      btn32.style.float="right"
      btn33.style.display ="none";
      cancelComisionbtnshow.style.display = "none"
    }

    $http({
         method: 'GET',
         url: '/comissionController/'+comision._id,
         }).success(function (response) {
           //console.log(response)
           $("label").addClass("active")
           $scope.platformcomision = response.result.platformcomsion;
           $scope.sendercomision = response.result.sendercomision;
           $scope.benefcomision = response.result.benefcomision;
           $scope.comisionbranchid = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.branchID));;
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
        "branchID":encodeHtmlEntity(addslashes($scope.comisionbranchid))
        };
        console.log('comission data',$scope.shareupdatedata)
          $http({
               method: 'PUT',
               url: '/comissionController/'+comision._id,
               data: $scope.shareupdatedata,
               }).success(function (response) {
                   new PNotify({
                       tittle : 'Regular notice',
                       type :'success',
                       text :response.message,
                     });
                     $http({
                          method: 'GET',
                          url: '/comissionController',
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
                     $scope.platformcomision = null;
                     $scope.sendercomision = null;
                     $scope.benefcomision = null;
                     $scope.comisionbranchid = "?";
                     btn31.style.display ="block";
                     btn31.style.float="right"
                     btn32.style.display ="block";
                     btn32.style.float="right"
                     btn33.style.display ="none";
                     cancelComisionbtn.style.display = "none";

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
                    url: '/comissionController',
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
    $scope.countrylist = response.result.reverse();
    //console.log($scope.countrylist);
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
  });
   /* ===========supplier ====================*/
   $scope.hideclearFiltersearchsupplierlist = function(){
     var clearfiltersearchsupplierlist = document.getElementById('clearfiltersearchsupplierlist');
     clearfiltersearchsupplierlist.style.display = "none";
   };
   $scope.searchsupplierlist1;
   $scope.searchsupplierlistfilter = function(){
    $scope.searchsupplierlist = encodeHtmlEntity(addslashes($scope.searchsupplierlist1));
    var clearfiltersearchsupplierlist1 = document.getElementById('clearfiltersearchsupplierlist');
     clearfiltersearchsupplierlist1.style.display = "block";

   };
   $scope.clearFiltersearchsupplierlist = function(){
     $scope.searchsupplierlist1 =null;
     $scope.searchsupplierlist =null;
     var clearfiltersearchsupplierlist2 = document.getElementById('clearfiltersearchsupplierlist');
     clearfiltersearchsupplierlist2.style.display = "none";
   };


  $scope.supplierName = "";
  $scope.supplierEmail = "";
  $scope.superlierCountry = "";
  // $scope.superlierRegion = "";
  $scope.suplierContact = "";

  $scope.addSupplier = function(){
    console.log('name',$scope.supplierName)

    $scope.supliername = $base64.encode(encodeHtmlEntity(addslashes($scope.supplierName)));
    $scope.suplieremail = $base64.encode(encodeHtmlEntity(addslashes($scope.supplierEmail)));
     $scope.supliercountry = $base64.encode($scope.superlierCountry);
     // $scope.supliercountry = $base64.encode(encodeHtmlEntity(addslashes($scope.superlierCountry)));
    // $scope.suplierregion = $base64.encode($scope.superlierRegion);
    $scope.suplierphone = $base64.encode($scope.suplierContact);

    $scope.suplierdata ={
              "supplierName":$scope.supliername,
              "email":$scope.suplieremail,
              "contact":$scope.suplierphone,
              "country":$scope.supliercountry,
              // "sector":$scope.suplierregion,
             // "charge":charge
     };
 console.log('suplierdata',$scope.suplierdata)
     $http({
          method: 'POST',
          url: '/supplierController',
          data: $scope.suplierdata,
          }).success(function (response) {
              if(response.message == 'All fields are required'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            // }if(response.message == 'Email can not be empty'){
            //   new PNotify({
            //       tittle : 'Regular notice',
            //       type :'error',
            //       text :response.message,
            //     });
            // }
            // if(response.message == 'contact can not be empty'){
            //   new PNotify({
            //       tittle : 'Regular notice',
            //       type :'error',
            //       text :response.message,
            //     });
            // }
            // if(response.message == 'country can not be empty'){
            //   new PNotify({
            //       tittle : 'Regular notice',
            //       type :'error',
            //       text :response.message,
            //     });
            // }


            if(response.message == 'This Supplier Already Exist'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'error',
                  text :response.message,
                });
            }
            if(response.message == 'supplier added Sucessfully'){
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.message,
                });
            }


                $http({
                     method: 'GET',
                     url: '/allsupplierController',
                     }).success(function (response) {
                    $scope.suplierDetails = response.result1.reverse();
                    $scope.currentPageSupplier = 0;
                   $scope.pageSizeSupplier = 10;
                   $scope.numberOfPagesSupplier=function(){
                     return Math.ceil($scope.suplierDetails.length/$scope.pageSizeSupplier);
                   }


                   }).error(function (response) {
                    console.log('err',response)
                      new PNotify({
                         tittle : 'Regular notice',
                         type :'error',
                         text :response.reason,
                       });
                  });
                  $scope.supplierName = null;
                  $scope.supplierEmail = null;
                  $scope.superlierCountry = "?";
                  // $scope.superlierRegion = null;
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
    $scope.superlierCountry = "?";
    // $scope.superlierRegion = null;
    $scope.suplierContact = null;
  };

  $http({
       method: 'GET',
       url: '/allsupplierController',
       }).success(function (response) {
         $scope.suplierDetails = response.result1.reverse();
         $scope.currentPageSupplier = 0;
        $scope.pageSizeSupplier = 10;
        $scope.numberOfPagesSupplier=function(){
          return Math.ceil($scope.suplierDetails.length/$scope.pageSizeSupplier);
        }

     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.reason,
         });
    });

    $scope.editSupplier = function(suplier){
      // alert(suplier._id)
      var btn66 = document.getElementById("addbtn12345");
      btn66.style.display ="none";
      var btn77 = document.getElementById("resetbtn12345");
      btn77.style.display ="none";
      var btn88 = document.getElementById('savebtn12345');
      btn88.style.display =  "block";
      btn88.style.float = "right";

      var cancelSupplierbtnshow = document.getElementById('cancelSupplierbtn');
      cancelSupplierbtnshow.style.display = "block"
      cancelSupplierbtnshow.style.float = "right"


      $scope.cancelSupplier = function(){
        $scope.supplierName = null;
        $scope.supplierEmail = null;
        $scope.superlierCountry = "?";
        // $scope.superlierRegion = null;
        $scope.suplierContact = null;
        btn66.style.display ="block";
        btn66.style.float="right"
        btn77.style.display ="block";
        btn77.style.float="right"
        btn88.style.display ="none";
        cancelSupplierbtnshow.style.display = "none"
      }

      $http({
           method: 'GET',
           url: '/supplier/'+suplier._id,
           }).success(function (response) {
             //console.log(response)
             $("label").addClass("active")
             $scope.supplierName = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.supplierName));
             $scope.supplierEmail = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.email));
             // $scope.superlierCountry = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.country));
             // $scope.superlierRegion = response.result.sector;
             $scope.superlierCountry = response.result.country;
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
             // "sector":$scope.superlierRegion,
             "contact":$scope.suplierContact,
           };

         $http({
              method: 'PUT',
              url: '/supplier/'+suplier._id,
              data: $scope.supupdatedata ,
              }).success(function (response) {
                //console.log(response)
                 if(response.message == 'Name can not be empty'){
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
                      $scope.supplierName = null;
                      $scope.supplierEmail = null;
                      $scope.superlierCountry = "?";
                      // $scope.superlierRegion = null;
                      $scope.suplierContact = null;
                      btn66.style.display ="block";
                      btn66.style.float="right"
                      btn77.style.display ="block";
                      btn77.style.float="right"
                      btn88.style.display ="none";
                      cancelSupplierbtn.style.display = "none"
            }

                      $http({
                           method: 'GET',
                           url: '/allsupplierController',
                           }).success(function (response) {
                             $scope.suplierDetails = response.result1.reverse();
                             $scope.currentPageSupplier = 0;
                            $scope.pageSizeSupplier = 10;
                            $scope.numberOfPagesSupplier=function(){
                              return Math.ceil($scope.suplierDetails.length/$scope.pageSizeSupplier);
                            }
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
    $scope.deleteSupplier = function(suplier){
      var deleteconfirmsupplierdata = confirm("Are you sure want to delete supplierdata?");
  if(deleteconfirmsupplierdata){
  $http({
            method: 'DELETE',
            url: '/supplier/'+suplier._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({
                tittle : 'Regular notice',
                type :'success',
                text :response.message
              });
                var addbtn66 = document.getElementById("addbtn12345");
          addbtn66.style.display ="block";
          addbtn66.style.float = "right";

          var resetbtn77 = document.getElementById("resetbtn12345");
          resetbtn77.style.display ="block";
          addbtn66.style.float = "right";

          var savebtn88 = document.getElementById('savebtn12345');
          savebtn88.style.display =  "none";

          var cancelSupplierbtnhide = document.getElementById('cancelSupplierbtn');
          cancelSupplierbtnhide.style.display = "none"
              $http({
                    method: 'GET',
                    url: '/allsupplierController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                  $scope.suplierDetails = response.result1.reverse();
                  $scope.currentPageSupplier = 0;
                 $scope.pageSizeSupplier = 10;
                 $scope.numberOfPagesSupplier=function(){
                   return Math.ceil($scope.suplierDetails.length/$scope.pageSizeSupplier);
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
      }//if
}


  /*end supplier*/
  /* ==============================================*/

  /*============== createCountryCurrency========================*/

  $scope.hideclearFiltersearchcountrylist = function(){
    var clearfiltersearchcountrylist = document.getElementById('clearfiltersearchcountrylist');
     clearfiltersearchcountrylist.style.display = "none";
   };
   $scope.searchcountrylist1;
   $scope.searchcountrylistfilter = function(){
     $scope.searchcountrylist = encodeHtmlEntity(addslashes($scope.searchcountrylist1));
     var clearfiltersearchcountrylist1 = document.getElementById('clearfiltersearchcountrylist');
     clearfiltersearchcountrylist1.style.display = "block";
   };
   $scope.clearFiltersearchcountrylist = function(){
     $scope.searchcountrylist1 = null;
     $scope.searchcountrylist = null;
     var clearfiltersearchcountrylist2 = document.getElementById('clearfiltersearchcountrylist');
     clearfiltersearchcountrylist2.style.display = "none";
   };


     // List Country Currency
    $scope.countrycurrencylist;

     $http({
         method: 'GET',
         url: '/countrycurrencylist',
        headers: {'Content-Type': 'application/json'
         }
         }).success(function (response) {
        $scope.countrycurrencylist = response.result.reverse();

         $scope.currentPage = 0;
         $scope.pageSize = 10;
        $scope.numberOfPages=function(){
           return Math.ceil($scope.countrycurrencylist.length/$scope.pageSize);
         }

       }).error(function (response) {
          new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response,
           });
      });


     $scope.countryName = "";
     $scope.currencyName = "";

    // Create country currency
    $scope.createCountryCurrency = function(){

      $scope.currencydata = {
        "countryName": encodeHtmlEntity(addslashes($scope.countryName)) ,
        "currencyName":encodeHtmlEntity(addslashes($scope.currencyName))
      };

    $http({
         method: 'POST',
         url: '/countrycurrencylist',
         data: $scope.currencydata ,
        headers: {'Content-Type': 'application/json'
         }
         }).success(function (response) {

             new PNotify({
                 tittle : 'Regular notice',
                 type :'success',
                 text :response.result,
               });

            $http({
               method: 'GET',
               url: '/countrycurrencylist',
              headers: {'Content-Type': 'application/json'
               }
               }).success(function (response) {
              $scope.countrycurrencylist = response.result.reverse();
               $scope.currentPage = 0;
               $scope.pageSize = 10;
              $scope.numberOfPages=function(){
                 return Math.ceil($scope.countrycurrencylist.length/$scope.pageSize);
               }
             }).error(function (response) {
                new PNotify({
                   tittle : 'Regular notice',
                   type :'error',
                   text :response,
                 });
            });

              $scope.countryName = null;
              $scope.currencyName = null;

       }).error(function (response) {
          new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response,
           });
      });


    }//fun
    $scope.resetCountryCurrency = function(){
      $scope.countryName = null;
      $scope.currencyName = null;

    }

$scope.deletecountrycurrency = function(country){
  $http({
            method: 'DELETE',
            url: '/countrycurrencylist/'+country._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
                if(response.message == 'You can not delete country,its use somewhere else'){
                new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response.message
               });
              }
              if(response.message == 'CountrycurrencyList deleted successfully'){
                new PNotify({
                 tittle : 'Regular notice',
                 type :'success',
                 text :response.message
               });
               $http({
                     method: 'GET',
                     url: '/countrycurrencylist',
                    headers: {'Content-Type': 'application/json'
                     }
                 }).success(function (response) {

                    $scope.countrycurrencylist = response.result.reverse();
                    $scope.currentPage = 0;
                    $scope.pageSize = 10;
                   $scope.numberOfPages=function(){
                      return Math.ceil($scope.countrycurrencylist.length/$scope.pageSize);
                    }

                   }).error(function (response) {
                      new PNotify({
                         tittle : 'Regular notice',
                         type :'error',
                         text :response,
                       });
                  });
             }//if
            }).error(function (response) {
             new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response,
              });
          });
}//fun

// Edit country currency

$scope.editcountrycurrency = function(country){
  var btn76 = document.getElementById("addbtn12345678");
  btn76.style.display ="none";
  var btn77 = document.getElementById("resetbtn12345678");
  btn77.style.display ="none";
  var btn78 = document.getElementById('savebtn12345678');
  btn78.style.display =  "block";
  btn78.style.float = "right";

    var cancelCountryCurrencybtn = document.getElementById('cancelCountryCurrencybtn');
  cancelCountryCurrencybtn.style.display = "block";
  cancelCountryCurrencybtn.style.float = "right";

$scope.cancelCountryCurrency = function(){

  $scope.countryName = null;
  $scope.currencyName = null;
  btn76.style.display ="block";
  btn76.style.float="right"
  btn77.style.display ="block";
  btn77.style.float="right"
  btn78.style.display ="none";
  cancelCountryCurrencybtn.style.display = "none";
}


  $http({
       method: 'GET',
       url: '/countrycurrencylist/'+country._id,
       }).success(function (response) {

         $("label").addClass("active")

       $scope.countryName  = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.countryName));
       $scope.currencyName = $filter('decodeHtmlEntity')($filter('stripslashes')(response.result.currencyName));

     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });

  $scope.updateCountryCurrency = function() {

     $scope.currencydata = {
      "countryName": encodeHtmlEntity(addslashes($scope.countryName)) ,
      "currencyName":encodeHtmlEntity(addslashes($scope.currencyName))
    };

    $http({
         method: 'PUT',
         url: '/countrycurrencylist/'+country._id,
         data: $scope.currencydata,
        headers: {'Content-Type': 'application/json'

         }
         }).success(function (response) {
             new PNotify({
                 tittle : 'Regular notice',
                 type :'success',
                 text :response.message,
               });
               $scope.countryName = null;
               $scope.currencyName = null;
               btn76.style.display ="block";
               btn76.style.float="right"
               btn77.style.display ="block";
               btn77.style.float="right"
               btn78.style.display ="none";
               cancelCountryCurrencybtn.style.display = "none";
               $http({
                    method: 'GET',
                    url: '/countrycurrencylist',
                    headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.countrycurrencylist = response.result.reverse();

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

  // Country currency function end

  $("html, body").animate({ scrollTop: 0 }, "slow");
};//edit fun

  /*==================end createCountryCurrency====================*/

   /*==============================*/

   $("a").unbind("click").bind("click", function(){
     setTimeout(function () {


       $('select').material_select();
       $('.caret').text("");
   }, 1000);
   });

   $scope.adminlogout = function(){
    $window.localStorage.removeItem('userInfo-token');
    window.location.href= "/#/admin";

     $window.location.reload();
    // $location.path('/admin');
  }


$scope.$watch("supbranchID", function(newValue, oldValue) {
           $timeout(function() {

               //$("#consecutivo").val(newValue);
               //$("#consecutivo").material_select();

              // console.log( $scope.supbranchid);
               $scope.supbranchID = newValue;
              $("#iuy").material_select();
              $('.caret').text("");
              $("#iuy").val(newValue);


           }, 0);
       });

       $scope.$watch("country", function(newValue, oldValue) {
                  $timeout(function() {

                    $scope.country = newValue;
                     $("#cot").material_select();
                     $('.caret').text("");
                      $("#cot").val(newValue);

                    }, 0);



       });
              $scope.$watch("superCountry", function(newValue, oldValue) {
                         $timeout(function() {

                           $scope.superCountry = newValue;
                            $("#supcot").material_select();
                            $('.caret').text("");
                            $("#supcot").val(newValue);
                         }, 0);
                     });
                     $scope.$watch("tellerbranch", function(newValue, oldValue) {
                                $timeout(function() {

                                  $scope.tellerbranch = newValue;
                                   $("#tid").material_select();
                                   $('.caret').text("");
                                   $("#tid").val(newValue);


                                }, 0);
                            });
                            $scope.$watch("tellersupervisor", function(newValue, oldValue) {
                                       $timeout(function() {

                                         $scope.tellersupervisor = newValue;
                                          $("#tsup").material_select();
                                          $('.caret').text("");
                                          $("#tsup").val(newValue);


                                       }, 0);
                                   });
                 $scope.$watch("controllerBranch", function(newValue, oldValue) {
                            $timeout(function() {

                              $scope.controllerBranch = newValue;
                               $("#conbranch").material_select();
                               $('.caret').text("");
                               $("#conbranch").val(newValue);


                            }, 0);
                        });
              $scope.$watch("controllercountry", function(newValue, oldValue) {
                         $timeout(function() {

                           $scope.controllercountry = newValue;
                            $("#concountry").material_select();
                            $('.caret').text("");
                            $("#concountry").val(newValue);


                         }, 0);
                     });
             $scope.$watch("countrylimit", function(newValue, oldValue) {
                        $timeout(function() {

                          $scope.countrylimit = newValue;
                           $("#conlimit").material_select();
                           $('.caret').text("");
                           $("#conlimit").val(newValue);


                        }, 0);
                    });

                    $scope.$watch("tariffcountry", function(newValue, oldValue) {
                               $timeout(function() {

                                 $scope.tariffcountry = newValue;
                                  $("#tarifcont").material_select();
                                  $('.caret').text("");
                                  $("#tarifcont").val(newValue);


                               }, 0);
                           });

                 $scope.$watch("tariffbranchid", function(newValue, oldValue) {
                            $timeout(function() {

                              $scope.tariffbranchid = newValue;
                               $("#tarifbran").material_select();
                               $('.caret').text("");
                               $("#tarifbran").val(newValue);


                            }, 0);
                        });

             $scope.$watch("comisionbranchid", function(newValue, oldValue) {
                        $timeout(function() {

                          $scope.comisionbranchid = newValue;
                           $("#comisonbranch").material_select();
                           $('.caret').text("");
                           $("#comisonbranch").val(newValue);


                        }, 0);
                    });
  $scope.$watch("workdays", function(newValue, oldValue) {
         $timeout(function() {

           $scope.workdays = newValue;
            $("#days").material_select();
            $('.caret').text("");
            $("#days").val(newValue);


         }, 0);
       });

  $scope.$watch("superdays", function(newValue, oldValue) {
       $timeout(function() {

         $scope.superdays = newValue;
          $("#superworkday").material_select();
          $('.caret').text("");
          $("#superworkday").val(newValue);


       }, 0);
   });

    $scope.$watch("controllerdays", function(newValue, oldValue) {
       $timeout(function() {

         $scope.controllerdays = newValue;
          $("#controldays").material_select();
          $('.caret').text("");
          $("#controldays").val(newValue);


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

/*change*/
   var el = document.querySelector('input.number');
    el.addEventListener('keyup', function(event) {
      if (event.which >= 37 && event.which <= 40) return;

      this.value = this.value.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

/*change*/
   var el = document.querySelector('input.number1');
    el.addEventListener('keyup', function(event) {
      if (event.which >= 37 && event.which <= 40) return;

      this.value = this.value.replace(/\D/g, '')
        .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });

  var el = document.querySelector('input.number3');
     el.addEventListener('keyup', function(event) {
       if (event.which >= 37 && event.which <= 40) return;

       this.value = this.value.replace(/\D/g, '')
         .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
     });

   var el = document.querySelector('input.number4');
      el.addEventListener('keyup', function(event) {
        if (event.which >= 37 && event.which <= 40) return;

        this.value = this.value.replace(/\D/g, '')
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
      });
      var el = document.querySelector('input.number5');
       el.addEventListener('keyup', function(event) {
         if (event.which >= 37 && event.which <= 40) return;

         this.value = this.value.replace(/\D/g, '')
           .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
       });


    //*====================================================*/
      /*==================tellerid from teller ====================*/
  $http({
       method: 'GET',
       url: '/getallteller',
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
       $scope.telleriddetails = response.result.reverse();
       console.log("iddd",$scope.telleriddetails[0]._id);
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });
/*===============================*/
    /*report search*/
$scope.searchuserType ;
$scope.serachname ;
$scope.serachcountry ;
$scope.serachemail ;
$scope.serachmobile;
$scope.serachstartDate ;
$scope.serachendDate;
$scope.serachminAmount;
$scope.serachmaxAmount;
$scope.searchstatus;
$scope.serachtellerid;
$scope.serachbranchID;

$scope.searchingTransaction = function(){
   $scope.searchtel = "+" +$scope.serachmobile;
   $scope.searchreportdata = {
     "startDate":$scope.serachstartDate,
     "endDate":$scope.serachendDate,
     "minAmount":$scope.serachminAmount,
     "maxAmount":$scope.serachmaxAmount,
     "tellerID":$scope.serachtellerid,
     "country":$scope.serachcountry,
     "branchID":$scope.serachbranchID,
     "status":$scope.searchstatus,
     "mobile":$scope.serachmobile,
     "userType":$scope.searchuserType,
     "email":$scope.serachemail,
     "name":encodeHtmlEntity(addslashes($scope.serachname))
   }
   console.log('searcdata',$scope.searchreportdata)
   $http({
         method: 'POST',
         url: '/searchTransaction',
         data: $scope.searchreportdata,
        headers: {'Content-Type': 'application/json'
         }
         }).success(function (response) {
              $scope.searchreport1 = response.result;
           console.log('l',$scope.searchreport1.length)
           console.log('t',$scope.searchreport1)
           console.log(typeof($scope.searchreport1))


var other = []; // your other array...

$scope.searchreport1.map(n => {
   return {
       transactionNumber:   n.transactionNumber,
       country:             $filter('decodeHtmlEntity')($filter('stripslashes')(n.country)),
       currency:            $filter('decodeHtmlEntity')($filter('stripslashes')(n.currency)),
       amount :             n.amount,
       fees:                n.fees,
       tax :                n.tax,
       totalAmount :        n.totalAmount,
       beneficiaryRecieve : n.beneficiaryRecieve,
       remittername :       $filter('decodeHtmlEntity')($filter('stripslashes')(n.remittername)),
      remittersurName:      $filter('decodeHtmlEntity')($filter('stripslashes')(n.remittersurName)),
      remitteremail:        n.remitteremail,
      remitteraddress :     $filter('decodeHtmlEntity')($filter('stripslashes')(n.remitteraddress)),
      remittermobile:       n.remittermobile,
      remitteridType:       $filter('decodeHtmlEntity')($filter('stripslashes')(n.remitteridType)),
      remitteridNo :        $filter('decodeHtmlEntity')($filter('stripslashes')(n.remitteridNo)),
      issueCountry:         $filter('decodeHtmlEntity')($filter('stripslashes')(n.issueCountry)),
      remitteramount :      n.remitteramount,
      remittanceMode:       n.remittanceMode,
      beneficiaryname :     $filter('decodeHtmlEntity')($filter('stripslashes')(n.beneficiaryname)),
      beneficiarysurName:   $filter('decodeHtmlEntity')($filter('stripslashes')(n.beneficiarysurName)),
      beneficiaryemail :    n.beneficiaryemail,
      beneficiaryaddress:   $filter('decodeHtmlEntity')($filter('stripslashes')(n.beneficiaryaddress)),
      beneficiarymobile:    n.beneficiarymobile,
      beneficiaryidType :   $filter('decodeHtmlEntity')($filter('stripslashes')(n.beneficiaryidType)),
      beneficiaryidNo:      $filter('decodeHtmlEntity')($filter('stripslashes')(n.beneficiaryidNo)),
      bissueCountry :       $filter('decodeHtmlEntity')($filter('stripslashes')(n.bissueCountry)),
      beneficiaryamount:    n.beneficiaryamount,
      status :              n.status,
      branchID :            $filter('decodeHtmlEntity')($filter('stripslashes')(n.branchID)),
      tellerID :            n.tellerID.tellerID,
      bexpDate :            $filter('date')(n.bexpDate, "dd-MM-yyyy"),
      bissueDate :          $filter('date')(n.bissueDate, "dd-MM-yyyy"),
      expDate :             $filter('date')(n.expDate, "dd-MM-yyyy"),
      issueDate :           $filter('date')(n.issueDate, "dd-MM-yyyy"),
      transactionDate :     $filter('date')(n.transactionDate, "dd-MM-yyyy")
   }
}).forEach(item => other.push(item));


$scope.searchreport = other;
console.log($scope.searchreport)
$(".hidereport").hide();
$(".searchreportdetail").show();

         }).error(function (response) {
            new PNotify({
               tittle : 'Regular notice',
               type :'error',
               text :response,
             });
      });
 }//function

 $scope.cancelsearch = function(){

   $(".hidereport").show();
   $(".searchreportdetail").hide();

  $scope.searchuserType =null;
   $scope.serachname = null ;
   $scope.serachcountry = null ;
   $scope.serachemail = null ;
   $scope.serachmobile = null;
   $scope.serachstartDate = null ;
   $scope.serachendDate = null;
   $scope.serachminAmount = null;
   $scope.serachmaxAmount = null;
   $scope.searchstatus = null;
   $scope.serachtellerid = null;
   $scope.serachbranchID = null;


 }

 $scope.$watch("searchuserType", function(newValue, oldValue) {
      $timeout(function() {

        $scope.searchuserType = newValue;
         $("#searchuser").material_select();
         $('.caret').text("");
         $("#searchuser").val(newValue);


      }, 0);
  });
   $scope.$watch("searchstatus", function(newValue, oldValue) {
       $timeout(function() {

         $scope.searchstatus = newValue;
          $("#searchstatus1").material_select();
          $('.caret').text("");
          $("#searchstatus1").val(newValue);


       }, 0);
   });
   $scope.$watch("serachcountry", function(newValue, oldValue) {
        $timeout(function() {

          $scope.serachcountry = newValue;
           $("#serachcountry1").material_select();
           $('.caret').text("");
           $("#serachcountry1").val(newValue);


        }, 0);
    });
     $scope.$watch("serachtellerid", function(newValue, oldValue) {
         $timeout(function() {

           $scope.serachtellerid = newValue;
            $("#serachtellerid1").material_select();
            $('.caret').text("");
            $("#serachtellerid1").val(newValue);


         }, 0);
     });
        $scope.$watch("serachbranchID", function(newValue, oldValue) {
          $timeout(function() {

            $scope.serachbranchID = newValue;
             $("#serachbranchID1").material_select();
             $('.caret').text("");
             $("#serachbranchID1").val(newValue);


          }, 0);
      });
    $scope.printReport = function(table2){
        var printContents = document.getElementById(table2).innerHTML;
          var originalContents = document.body.innerHTML;
          document.body.innerHTML = printContents;
          window.print();
           window.location.reload();
          document.body.innerHTML = originalContents;
      }

 $scope.getDataHeader = function(){
   return ["TransactionNumber","Country","Currency","TransferAmount","Fees","Tax","TotalAmount","BeneficiaryRecieve",
            "Remittername","RemitterSurname","RemitterEmail","RemitterAddress","Remittermobile","RemitteridType",
            "RemitteridNo","RemitterIDissueCountry","RemitterAmount","RemittanceMode","Beneficiaryname","BeneficiarysurName",
            "BeneficiaryEmail","BeneficiaryAddress","Beneficiarymobile","BeneficiaryidType","BeneficiaryidNo","BeneficiaryissueCountry",
            "BeneficiarygetAmount","Status","BranchID","TellerID","BeneficiaryexpDate","BeneficiaryissueDate","RemitterexpDate",
            "RemitterissueDate","TransactionDate"
     ]
 };

$(document).ready(function(){
  $( function() {
     $( "#datepicker" ).datepicker({ dateFormat: 'yy-mm-dd' });
   } );
});
$(document).ready(function(){
$( function() {
   $( "#datepicker1" ).datepicker({ dateFormat: 'yy-mm-dd' });
 } );
});

}//else



}]);
