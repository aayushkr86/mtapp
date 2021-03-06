app.controller('supervisorController',['$location','$timeout','$scope','$base64','$http','$window','$anchorScroll','$translate', function($location,$timeout,$scope,$base64,$http,$window,$anchorScroll,$translate){
 $scope.logdata = $window.localStorage.getItem('userInfo-token');
 if($scope.logdata == 'undefined' || $scope.logdata == '' || $scope.logdata == null){
   // new PNotify({
   //     tittle : 'Regular notice',
   //     type :'error',
   //     text :'You are not logged in. Please login again',

   //   });
     $window.location.reload();
      $window.location.href= "/#/super";
    }
 else{
   $scope.tokendata = jwt_decode($scope.logdata);
   $scope.supervisorid = $scope.tokendata.id;
   console.log('id',$scope.supervisorid)


     $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{5}[- ]?\d{5}$/;
      $scope. usernamepattern = /^[a-zA-Z ]{2,30}$/;
      $scope. address = /^[a-zA-Z, -,0-9]{5,200}$/;
      // $scope.emailpattern = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}/;
      $scope.workingpattern = /^[0-9]{1,2}$/;
      $scope.workingdays =  /^[a-zA-Z,]{2,100}$/;
      $scope.branchpattern = /^[a-zA-Z,0-9]{2,20}$/;
      $scope.payementpattern = /^[0-9,]{3,10}$/;
      $scope.controllerpayementpattern = /^[0-9]{3,10}$/;
      $scope.telnumber = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
      $scope.transactionnumberpattern = /^[0-9]{12,12}$/;
       $scope.phoneNumberpattern = /^[0-9]{10,15}/;

       /*===translator====*/
/*bahar*/
        $scope.$on('$routeChangeStart', function(scope, next, current) {
      if (next.$$route.controller != "supervisorController") {
        $window.location.reload();
        $window.location.href = "/#/superdashboard";
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
     var btn10 = document.getElementById('savebtn2');
     btn10.style.display =  "none"
     var btn16 = document.getElementById('savebtn5');
     btn16.style.display =  "none"
     var btn19 = document.getElementById('savebtn6');
     btn19.style.display =  "none"
    //  var btn9 = document.getElementById('savebtn2');
    //  btn9.style.display =  "none"
    //  var btn15 = document.getElementById('savebtn3');
    //  btn15.style.display =  "none"
    //  var btn20 = document.getElementById('savebtn4');
    //  btn15.style.display =  "none"
    //  var btn25 = document.getElementById('savebtn5');
    //  btn25.style.display =  "none"
    //  var btn30 = document.getElementById('savebtn6');
    //  btn30.style.display =  "none"

   }
   setTimeout(function(){
     $('#dtable21').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     } );

     $('.dropdown-button').unbind();
     $('.dropdown-button').dropdown();
     $(".dataTables_filter").css("float", "left");
   },1000);  //set timeout


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
        url: '/tellerbysuper/'+$scope.supervisorid,
        }).success(function (response) {
       $scope.tellerDetails = response.result;
       console.log('tellerdeatils',$scope.tellerDetails)

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





    $scope.tellerid = "";
    $scope.telleremail = "";
    $scope.tellername = "";
    $scope.tellerlimit = "";
    $scope.tellercontact = "";
    $scope.logintime = "";
    $scope.logouttime ="";
    $scope.telleraddress;

    $scope.createTeller = function (){
      $scope.getvalue1();
     $scope.tellerlimit = $scope.arr1;
      $scope.tel1 = "+" +$scope.tellercontact;
      $scope.tellerbranch = $base64.encode($scope.branchID);
      $scope.tellerID = $base64.encode($scope.tellerid);
      $scope.tellerEmail = $base64.encode($scope.telleremail);
      $scope.tellerpaylimit = $base64.encode($scope.tellerlimit);
      $scope.tellerphone = $base64.encode($scope.tel1);
      $scope.tellersup = $base64.encode($scope.supervisorid);

      $scope.telleradddata = {
            "branchID": $scope.tellerbranch,
            "tellerID" :$scope.tellerID,
            "name":$scope.tellername,
            "email": $scope.tellerEmail,
            "phone": $scope.tellerphone,
            "address":$scope.telleraddress,
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
                 new PNotify({
                     tittle : 'Regular notice',
                     type :'success',
                     text :response.result,
                   });
                   $http({
                       method: 'GET',
                       url: '/tellerbysuper/'+$scope.supervisorid,
                    }).success(function (response) {
                     $scope.tellerDetails = response.result;
                     console.log('tellerdeatils1',$scope.tellerDetails)

                      }).error(function (response) {
                         new PNotify({
                            tittle : 'Regular notice',
                            type :'error',
                            text :response.reason,
                          });
                     });
                     $scope.tellerid = null;
                     $scope.telleremail = null;
                     $scope.tellername = null;
                     $scope.tellerlimit = null;
                     $scope.tellercontact = null;
                     $scope.logintime = null;
                     $scope.logouttime = null;
                     $scope.telleraddress = null;

           }).error(function (response) {
            console.log(response)
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response.reason.errmsg,
               });
          });

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
    /*get tellerDetails*/
    $http({
           method: 'GET',
           url: '/tellerbysuper/'+$scope.supervisorid,
        }).success(function (response) {
         $scope.tellerDetails = response.result;
         console.log('tellerdeatils1',$scope.tellerDetails)
       }).error(function (response) {
          new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response.reason,
           });
      });
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
      $http({
           method: 'GET',
           url: '/teller/'+tellerinfo._id,
           }).success(function (response) {

             $("label").addClass("active")
             $scope.tellerid = response.result.tellerID;
             $scope.telleremail = response.result.email;
             $scope.tellername = response.result.name;
             // $scope.tellerlimit = response.result.paymentLimit;
             $scope.tellercontact1 = response.result.phone;
            
             $scope.telleraddress = response.result.address;
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
           "name":$scope.tellername,
           "email": $scope.telleremail ,
           "phone": $scope.tel1,
           "address":$scope.telleraddress,
           "paymentLimit":$scope.tellerlimit,
           "_superVisior":$scope.tellersup,
           "logintime":$scope.logintime,
          "logouttime":$scope.logouttime
         };
         $http({
              method: 'PUT',
              url: '/tellerController/'+tellerinfo._id,
              data: $scope.tellerupdatedata,
              }).success(function (response) {
                console.log(response)
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
                    $http({
                       method: 'GET',
                       url: '/tellerbysuper/'+$scope.supervisorid,
                    }).success(function (response) {
                     $scope.tellerDetails = response.result;
                     console.log('tellerdeatils1',$scope.tellerDetails)
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
     $http({
          method: 'DELETE',
          url: '/tellerController/'+tellerinfo._id,
         headers: {'Content-Type': 'application/json'
          }
          }).success(function (response) {
            console.log('ssss',response)
             new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response.message
            });
           $http({
                 method: 'GET',
                 url: '/tellerbysuper/'+$scope.supervisorid,
              }).success(function (response) {
               $scope.tellerDetails = response.result;
               console.log('tellerdeatils1',$scope.tellerDetails)

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
/*delete*/
/*active*/
  $scope.telleractiveCheck = function(tellerinfo){
    //alert(tellerid._id)
    $(".enabletellerid, .disabletellerid").unbind("click");
    $(document).on("click", ".enabletellerid, .disabletellerid", function(){

       var $this = $(this);
       if($this.hasClass('enabletellerid')){
       $this.text('Disable');

       $http({
         method : "PUT",
         url : '/tellerStatusEdit/'+tellerinfo._id,
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
           url : '/tellerStatusEdit/'+tellerinfo._id,
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
/*end active*/

  /* end teller
  =============================================================
  */
  /*supplier*/
  /* ==============================================*/
  setTimeout(function(){
    $('#dtable22').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    });
    $(".dataTables_filter").css("float", "left");
  }, 1000);
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
  setTimeout(function(){
    $('#dtable24').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    } );
     $(".dataTables_filter").css("float", "left");
  },1000);
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
           console.log(response);
           if(response.data.message == 'Blacklisted done'){
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
             if(response.data.message == 'Remitter amount has less than country paymentlimit'){
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
     url: '/beneficiaryController',
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.beneficiaryDetails = response.result;
      // console.log('benef',$scope.beneficiaryDetails);
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response.reason,
       });
  });

  setTimeout(function(){
    $('#dtable100').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    } );
     $(".dataTables_filter").css("float", "left");
  }, 1000);
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
        if(response.data.message == 'Blacklisted done'){
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
          if(response.data.message == 'Beneficiary amount has less than country paymentlimit'){
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
  setTimeout(function(){
    $('#dtable23').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    } );
     $(".dataTables_filter").css("float", "left");
  },1000);


  $http({
       method: 'GET',
       url: '/remitterController',
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
         $scope.remitterDetails = response.result;
        // console.log('remitt',$scope.remitterDetails);
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
  setTimeout(function(){
    $('#dtable25').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    } );
     $(".dataTables_filter").css("float", "left");
  },1000);
  /*get transactiondata*/
  $http({
       method: 'GET',
       url: '/allTransaction',
       }).success(function (response) {
         $scope.transactionDetails = response.result1;
         console.log('trans',$scope.transactionDetails)

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

  setTimeout(function(){
    $('#dtable40').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    } );
     $(".dataTables_filter").css("float", "left");
  }, 1000);
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
   $scope.countryname = $base64.encode($scope.countrylimit);
   $scope.countrycurrency = $base64.encode($scope.currency);
   $scope.paylimit = $base64.encode($scope.monthlylimit);
   $scope.countryregion = $base64.encode($scope.region);

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
                 new PNotify({
                     tittle : 'Regular notice',
                     type :'success',
                     text :response.message,
                   });
                   $http({
                        method: 'GET',
                        url: '/countryController',
                       headers: {'Content-Type': 'application/json'
                        }
                        }).success(function (response) {
                          $scope.countrylimitDetails = response.result;
                      }).error(function (response) {
                         new PNotify({
                            tittle : 'Regular notice',
                            type :'error',
                            text :response,
                          });
                     });
                     $scope.countrylimit = null;
                     $scope.currency = null;
                     $scope.monthlylimit = null;
                     $scope.region = null;
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
         $scope.countrylimitDetails = response.result;
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
     $http({
          method: 'GET',
          url: '/country/'+country._id,
          }).success(function (response) {
            console.log(response)
            $("label").addClass("active")
            $scope.countrylimit = response.result.countryName;
            $scope.currency = response.result.currency;
            $scope.monthlylimit1 = response.result.paymentLimit;
            $scope.region = response.result.region;
            $scope.cl = $scope.monthlylimit1.toLocaleString();
            $scope.monthlylimit = $scope.cl; //Prateek
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
           "countryName" : $scope.countrylimit,
           "currency" :  $scope.currency,
           "paymentLimit" :$scope.monthlylimit,
           "region" : $scope.region,
         };
       $http({
            method: 'PUT',
            url: '/country/'+country._id,
            data: $scope.countryupdateRecord,
            }).success(function (response) {
                new PNotify({
                    tittle : 'Regular notice',
                    type :'success',
                    text :response.message,
                  });
                  $scope.countrylimit = null;
                  $scope.currency = null;
                  $scope.monthlylimit = null;
                  $scope.region = null;
                  btn11.style.display ="block";
                  btn11.style.float="right"
                  btn12.style.display ="block";
                  btn12.style.float="right"
                  btn13.style.display ="none";
                  $http({
                       method: 'GET',
                       url: '/countryController',
                      headers: {'Content-Type': 'application/json'
                       }
                       }).success(function (response) {
                         $scope.countrylimitDetails = response.result;
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
  $http({
            method: 'DELETE',
            url: '/country/'+country._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message
              });
              $http({
                    method: 'GET',
                    url: '/countryController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.countrylimitDetails = response.result;

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

 }//fun
  /*end country*/
  /*==============================================================================*/
  /*controller*/
  /*===============================================*/
  setTimeout(function(){
    $('#dtable30').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    } );
     $(".dataTables_filter").css("float", "left");
  }, 1000);

  $http({
       method: 'GET',
       url: '/controller'
       }).success(function (response) {
        $scope.controllerDetails = response.result;
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response.reason.errmsg,
         });
    });

  /*end controller*/
  /*==============================================================================*/


  /*tariff*/
  /*==============================================================================*/
  setTimeout(function(){
    $('#dtable26').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    } );
     $(".dataTables_filter").css("float", "left");
  }, 1000);

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
  $scope.tariffbranchid = "";
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
          "country":$scope.tariffcountry,
          "currency":$scope.tariffcurrency,
          "minAmount":$scope.tariffmin,
          "maxAmount":$scope.tariffmax,
          "tax":$scope.tax,
          "tariff":$scope.tariff,
          "tariffExclude":$scope.tariffexclude,
          "branchID":$scope.tariffbranchid
         };
         $http({
              method: 'POST',
              url: '/tariffController',
              data: $scope.tariffdata2 ,
             headers: {'Content-Type': 'application/json'
              }
              }).success(function (response) {
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
                    $scope.tariffbranchid = null;
                    $http({
                         method: 'GET',
                         url: '/tariffController',
                        headers: {'Content-Type': 'application/json'
                         }
                         }).success(function (response) {
                           $scope.tariffdata = response.result;
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
    $scope.tariffbranchid = null;
  };
  $http({
       method: 'GET',
       url: '/tariffController',
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
         $scope.tariffdata = response.result;
        //  console.log($scope.tariffdata);
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
  $http({
       method: 'GET',
       url: '/tariffController/'+tariff._id,
       }).success(function (response) {
         console.log(response)
         $("label").addClass("active")
         $scope.tariffcountry = response.result.country;
         $scope.tariffcurrency = response.result.currency;
         $scope.tariffmin1 = response.result.minAmount;
         $scope.tariffmax1 = response.result.maxAmount;
         $scope.tariff = response.result.tariff;
         $scope.tax =response.result.tax;
         $scope.tariffexclude = response.result.tariffExclude;
         $scope.tariffbranchid = response.result.branchID;
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
            "country":$scope.tariffcountry,
            "currency":$scope.tariffcurrency,
            "minAmount":$scope.tariffmin,
            "maxAmount":$scope.tariffmax,
            "tax":$scope.tax,
            "tariff":$scope.tariff,
            "tariffExclude":$scope.tariffexclude,
            "branchID":$scope.tariffbranchid
           };
     $http({
          method: 'PUT',
          url: '/tariffController/'+tariff._id,
          data: $scope.tariffupdatedata,
          }).success(function (response) {
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
                $scope.tariffbranchid = null;
                btn26.style.display ="block";
                btn26.style.float="right"
                btn27.style.display ="block";
                btn27.style.float="right"
                btn28.style.display ="none";
                $http({
                     method: 'GET',
                     url: '/tariffController',
                    headers: {'Content-Type': 'application/json'
                     }
                     }).success(function (response) {
                       $scope.tariffdata = response.result;
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


   }
   $("html, body").animate({ scrollTop: 0 }, "slow");
  }//edit
$scope.deleteTariff = function(tariff){
    $http({
            method: 'DELETE',
            url: '/tariffController/'+tariff._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message
              });
              $http({
                    method: 'GET',
                    url: '/tariffController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                  $scope.tariffdata = response.result;

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

}//fun
  /*end tariff*/
  /*==============================================================================*/




  /*comission*/
  /*==============================================================================*/
  setTimeout(function(){
    $('#dtable99').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    } );
     $(".dataTables_filter").css("float", "left");
  }, 1000);
  $http({
       method: 'GET',
       url: '/branchController',
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
      $scope.branchdata = response.result;
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
  $scope.comisionbranchid = "";

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
             new PNotify({
                 tittle : 'Regular notice',
                 type :'success',
                 text :response.result,
               });
               $http({
                    method: 'GET',
                    url: '/comissionController',
                   headers: {'Content-Type': 'application/json'
                    }
                    }).success(function (response) {
                      $scope.comissiondata = response.result;
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
    $scope.comisionbranchid = null;
  };
  $http({
       method: 'GET',
       url: '/comissionController',
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
         $scope.comissiondata = response.result;
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
                    $scope.comisionbranchid = null;
                    btn31.style.display ="block";
                    btn31.style.float="right"
                    btn32.style.display ="block";
                    btn32.style.float="right"
                    btn33.style.display ="none";
                    $http({
                         method: 'GET',
                         url: '/comissionController',
                        headers: {'Content-Type': 'application/json'
                         }
                         }).success(function (response) {
                           $scope.comissiondata = response.result;
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
  $http({
            method: 'DELETE',
            url: '/comissionController/'+comision._id,
           headers: {'Content-Type': 'application/json'
            }
            }).success(function (response) {
               new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message
              });
              $http({
                    method: 'GET',
                    url: '/comissionController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.comissiondata = response.result;

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
  /*end comission*/
  /*==============================================================================*/
  /*reimburement*/
  /*==============================================================================*/
  setTimeout(function(){
    $('#dtable105').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    } );
     $(".dataTables_filter").css("float", "left");
  }, 1000);
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
  $window.location.reload();
  $location.path('/super');
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


 }//else


}])
