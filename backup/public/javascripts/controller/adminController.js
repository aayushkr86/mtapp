app.controller('adminController',['$location','$timeout','$base64','$http','$window','$scope','$translate', function($location,$timeout,$base64,$http,$window,$scope,$translate){

   $scope.admindata = $window.localStorage.getItem('userInfo-token');
   if($scope.admindata == 'undefined' || $scope.admindata == '' || $scope.admindata == null){
     // new PNotify({
     //     tittle : 'Regular notice',
     //     type :'error',
     //     text :'You are not logged in. Please login again',

     //   });
       $window.location.reload();
      $window.location.href= "/#/admin";
      }
   else{
     $scope.decoded = jwt_decode($scope.admindata);
      /*validation*/
      $scope.phoneNumbr = /^\+?\d{2,3}[- ]?\d{5}[- ]?\d{5}$/;
      $scope. usernamepattern = /^[a-zA-Z ]{2,30}$/;
       $scope.address = /^[a-zA-Z, -,0-9,`,~,!,@,#,$,%,^,&,*,(,),°]{5,200}$/;
      // $scope.emailpattern = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,64}/;
      $scope.workingpattern = /^[0-9]{1,2}$/;
      $scope.workingdays =  /^[a-z A-Z, ]{2,100}$/;
      $scope.branchpattern = /^[a-zA-Z,0-9]{2,20}$/;
      $scope.payementpattern = /^[0-9,]{2,10}$/;
      $scope.controllerpayementpattern = /^[0-9]{3,10}$/;
      $scope.telnumber = /^\+?\d{2}[- ]?\d{3}[- ]?\d{5}$/;
      $scope.phoneNumberpattern = /^[0-9]{10,15}/;

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
      if (next.$$route.controller != "adminController") {
        $window.location.reload();
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





   setTimeout(function(){
     $('#dtable2').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     } );
     $(".dataTables_filter").css("float", "left");
      }, 1000);

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


   setTimeout(function(){
     $('#dtable3').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     } );
   }, 1000);

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


   setTimeout(function(){
     $('#dtable4').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     } );
   }, 1000);
   setTimeout(function(){
     $('#dtable5').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     } );
   }, 1000);
   setTimeout(function(){
     $('#dtable666').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     } );
      }, 1000);


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

   setTimeout(function(){
     $('#dtable7').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     } );


   },3000);
   /*change*/
 //   $(document).ready(function () {
 //    function pageLoad(sender, args) {
 //            if (args.get_isPartialLoad()) {

 // $('#dtable8888').DataTable({
 //            stateSave: true,
 //            stateDuration: -1
 //    });
 //    $('#dtable8888').addClass("table table-hover");
 //            }
 //        }
 //   });
   /*chNAge*/
   setTimeout(function(){
     $('#dtable8888').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     } );
   }, 1000);
   setTimeout(function(){
     $('#dtable9').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     } );
   }, 1000);
   setTimeout(function(){
     $('#dtable10').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     } );
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

        $http({
             method: 'GET',
             url: '/supervisiorController',
            headers: {'Content-Type': 'application/json'
             }
             }).success(function (response) {
               $scope.supervisiorDetails = response.result;

           }).error(function (response) {
              new PNotify({
                 tittle : 'Regular notice',
                 type :'error',
                 text :response,
               });
          });

   /*Branch*/
     /* get all data from database*/
     $http({
          method: 'GET',
          url: '/branchController',
         headers: {'Content-Type': 'application/json'
          }
          }).success(function (response) {

         $scope.branchdata = response.result;
         $scope.branchdata1 = $scope.branchdata;

      var supervisiorDetailsarray = $.map($scope.supervisiorDetails , function(value, index) {
       return [value];
       });

       var supervisoridmyArray = [];
       for(var i=0;i<supervisiorDetailsarray.length;i++){
         supervisoridmyArray.push(supervisiorDetailsarray[i].branchID);
       }
       // console.log("All array"+ $scope.branchdata1);

       // console.log('Assigned ',supervisoridmyArray);



      var branchIDArray =[];
      for(i=0;i<$scope.branchdata1.length;i++){
        if($.inArray($scope.branchdata1[i].branchID,supervisoridmyArray ) == -1){
           branchIDArray.push($scope.branchdata1[i].branchID);
         }
       }
       $scope.branchdata2 = branchIDArray;
      console.log('branch',$scope.branchdata2)

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

     $scope.abc = $scope.workdays
     $scope.branch = $base64.encode($scope.branchID);
     $scope.countr = $base64.encode($scope.country);
     $scope.full = $base64.encode($scope.fullName);
     $scope.Add1 = $base64.encode($scope.Address1);
     $scope.Add2= $base64.encode($scope.Address2);
     $scope.phone = $base64.encode($scope.contact);
     $scope.mail = $base64.encode($scope.email);
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
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.message,
                });
                $http({
                     method: 'GET',
                     url: '/branchController',
                    headers: {'Content-Type': 'application/json'
                     }
                 }).success(function (response) {

                    $scope.branchdata = response.result;
                    $scope.selectedBranch=$scope.branchdata[0];

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

   };//fun


   /*reset branch data*/
   $scope.resetBranch = function(){
      $scope.branchID = null;
      $scope.country = null;
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
  var btn2 = document.getElementById("resetbtn");
  btn2.style.display ="none";
  var btn4 = document.getElementById('savebtn');
  btn4.style.display =  "block";
  btn4.style.float = "right";

  $scope.branchid = branch._id;
  $http({
       method: 'GET',
       url: '/branch/'+branch._id,
       }).success(function (response) {

         $("label").addClass("active")
         $scope.branchID = response.result.branchID;
         $scope.country = response.result.country;
         $scope.fullName = response.result.fullName;
         $scope.contact = response.result.contact;
         $scope.Address1 = response.result.Address1;
         $scope.Address2 = response.result.Address2;
         $scope.email = response.result.email;
         $scope.paymentLimit1 = response.result.paymentLimit;
         $scope.telephone1 = response.result.telephone;
         $scope.hoursOfWorkDaily = response.result.hoursOfWorkDaily;
         $scope.workdays = response.result.workdays;
         $scope.telephone = $scope.telephone1.slice(1);
        $scope.b = $scope.paymentLimit1.toLocaleString();
        $scope.paymentLimit = $scope.b; //Prateek
        console.log('lll',$scope.paymentLimit)
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
    $scope.branch = $base64.encode($scope.branchID);
    $scope.countr = $base64.encode($scope.country);
    $scope.full = $base64.encode($scope.fullName);
    $scope.Add1 = $base64.encode($scope.Address1);
    $scope.Add2= $base64.encode($scope.Address2);
    $scope.phone = $base64.encode($scope.contact);
    $scope.mail = $base64.encode($scope.email);
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
             new PNotify({
                 tittle : 'Regular notice',
                 type :'success',
                 text :response.message,
               });
               $scope.branchID = null;
               $scope.country = null;
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
                   $scope.branchdata = response.result;
                   $scope.selectedBranch=$scope.branchdata[0];
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
  $http({
            method: 'DELETE',
            url: '/branchController/'+branch._id,
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
                    url: '/branchController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.branchdata = response.result;
                   $scope.selectedBranch=$scope.branchdata[0];

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








   /*==============================================================================*/

   /*supervisior*/

   $scope.supbranchID="";
   $scope.superEmail = "";
   $scope.superName = "";
   $scope.superPhone = "";
   $scope.superAddress = "";
   $scope.superCountry = "";
   $scope.superHours = "";
   $scope.superdays = "";

   $scope.createSupervisior = function(){

     $scope.phone1 = "+"+$scope.superPhone;
     $scope.superday = $scope.superdays;
     $scope.branchid = $base64.encode($scope.supbranchID);
     // $scope.country = $base64.encode($scope.superCountry);
     $scope.full = $base64.encode($scope.superName);
     $scope.Address = $base64.encode($scope.superAddress);
     $scope.phone = $base64.encode($scope.phone1);
     $scope.email = $base64.encode($scope.superEmail);
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
     };

     $http({
          method: 'POST',
          url: '/supervisiorController',
          data: $scope.superRecord,
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
                     url: '/supervisiorController',
                    headers: {'Content-Type': 'application/json'
                     }
                     }).success(function (response) {
                       $scope.supervisiorDetails = response.result;
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
   };


   /*get supervisior data from database*/
    $http({
       method: 'GET',
       url: '/supervisiorController',
       headers: {'Content-Type': 'application/json'
        }
        }).success(function (response) {
          $scope.supervisiorDetails = response.result;

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
       var btn6 = document.getElementById("addbtn1");
       btn6.style.display ="none";
       var btn7 = document.getElementById("resetbtn1");
       btn7.style.display ="none";
       var btn8 = document.getElementById('savebtn1');
       btn8.style.display =  "block";
       btn8.style.float = "right";
       //console.log($scope.branchdata);


      // alert(superv._id)
      $http({
           method: 'GET',
           url: '/supervisor/'+superv._id,
           }).success(function (response) {

             $("label").addClass("active")
             $scope.supbranchID= response.result.branchID;
             $scope.superEmail =  response.result.email;
             $scope.superName =  response.result.name;

             $scope.superPhone1 =  response.result.phone;
             $scope.superAddress =  response.result.address;
             // $scope.superCountry =  response.result.country;
             $scope.superHours =  response.result.hoursOfWorkDaily;
             $scope.superdays =  response.result.workdays;
             $scope.superPhone = $scope.superPhone1.slice(1);

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
          $scope.phone1 = "+"+$scope.superPhone;
          $scope.superRecord ={
            "branchID": $scope.supbranchID,
            "name":$scope.superName,
            "email": $scope.superEmail,
            "phone": $scope.phone1,
            "address":$scope.superAddress,
            // "country":$scope.superCountry,
            "hoursOfWorkDaily":$scope.superHours,
            "workdays":$scope.superdays
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
                     // $scope.superCountry = null;
                     $scope.superHours = null;
                     $scope.superdays = null;
                     btn6.style.display ="block";
                     btn6.style.float="right"
                     btn7.style.display ="block";
                     btn7.style.float="right"
                     btn8.style.display ="none";
                     $http({
                          method: 'GET',
                          url: '/supervisiorController',
                         headers: {'Content-Type': 'application/json'
                          }
                          }).success(function (response) {
                            $scope.supervisiorDetails = response.result;
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
  $http({
            method: 'DELETE',
            url: '/supervisiorController/'+superv._id,
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
                    url: '/supervisiorController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.supervisiorDetails = response.result;

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

     $scope.branchid = $base64.encode($scope.tellerbranch);
     $scope.supervisiorid = $base64.encode($scope.tellersupervisor);
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
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.result,
                });
                $http({
                     method: 'GET',
                     url: '/tellerIDController',
                    headers: {'Content-Type': 'application/json'
                     }
                     }).success(function (response) {
                     $scope.telleriddata = response.result;
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
     $scope.tellerbranch = null;
     $scope.tellersupervisor = null;
     $scope.tellerlimit = null;

   }

   $http({
        method: 'GET',
        url: '/tellerIDController',
       headers: {'Content-Type': 'application/json'
        }
        }).success(function (response) {
        $scope.telleriddata = response.result;
        // console.log($scope.telleriddata[0].supervisiorID.supervisiorID)
      }).error(function (response) {
         new PNotify({
            tittle : 'Regular notice',
            type :'error',
            text :response,
          });
     });

     $scope.editTeller = function(tellerid){
      $("#tellersuper").hide();
      //  alert(tellerid._id)
      var btn10 = document.getElementById("addbtn2");
      btn10.style.display ="none";
      var btn11 = document.getElementById("resetbtn2");
      btn11.style.display ="none";
      var btn12 = document.getElementById('savebtn2');
      btn12.style.display =  "block";
      btn12.style.float = "right";
      $http({
           method: 'GET',
           url: '/tellerID/'+tellerid._id,
           }).success(function (response) {
             console.log(response)
             $("label").addClass("active")
             $scope.tellerbranch = response.result.branchID;
             $scope.tellersupervisor = response.result.tellerID;
             $scope.tellerlimit1 = response.result.paymentLimit;
             $scope.bc = $scope.tellerlimit1.toLocaleString();
             $scope.tellerlimit = $scope.bc; //Prateek
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
            "branchID": $scope.tellerbranch,
            "tellerID":$scope.tellersupervisor,
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
                     $scope.tellerbranch = null;
                     $scope.tellersupervisor = null;
                     $scope.tellerlimit = null;
                     btn10.style.display ="block";
                     btn10.style.float="right"
                     btn11.style.display ="block";
                     btn11.style.float="right"
                     btn12.style.display ="none";
                     $http({
                          method: 'GET',
                          url: '/tellerIDController',
                         headers: {'Content-Type': 'application/json'
                          }
                          }).success(function (response) {
                          $scope.telleriddata = response.result;
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
  $http({
            method: 'DELETE',
            url: '/tellerID/'+tellerid._id,
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
                    url: '/tellerIDController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.telleriddata = response.result;

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

   /*end teller*/

   /*==============================================================================*/

   /*create controller*/
   /*==============================================================================*/
   $scope.controllerBranch = "";
   $scope.controlleremail = "";
   $scope.controllerename = "";
   $scope.controllerphone = "";
   $scope.controlleraddress = "";
   // $scope.controllercountry = "";
   $scope.controllerhours = "";
   $scope.controllerdays ="";

   $scope.createController = function(){
    $scope.cphone1 = "+"+$scope.controllerphone;
     $scope.cday = $scope.controllerdays;
     $scope.cbranch = $base64.encode($scope.controllerBranch);
     $scope.cemail = $base64.encode($scope.controlleremail);
     $scope.cname = $base64.encode($scope.controllerename);
     $scope.cphone = $base64.encode($scope.cphone1);
     $scope.caddress = $base64.encode($scope.controlleraddress);
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
              new PNotify({
                  tittle : 'Regular notice',
                  type :'success',
                  text :response.result,
                });
                $http({
                     method: 'GET',
                     url: '/controller',
                    headers: {'Content-Type': 'application/json'
                     }
                     }).success(function (response) {
                       $scope.controllerDetails = response.result;

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
   $scope.resetController = function(){
     $scope.controllerBranch = null;
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
          $scope.controllerDetails = response.result;

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

      $http({
        method: 'GET',
        url: '/controller/'+control._id,
        }).success(function (response) {
          console.log(response.result)
          $("label").addClass("active")
          $scope.controllerBranch = response.result.branchID;
          $scope.controlleremail = response.result.email;
          $scope.controllerename = response.result.name;
          $scope.controllerphone1 = response.result.phone;
          $scope.controlleraddress = response.result.address;
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
       $scope.cday =$scope.controllerdays;
       $scope.cbranch = $scope.controllerBranch;
       $scope.cemail = $scope.controlleremail;
       $scope.cname = $scope.controllerename;
       $scope.cphone = "+"+$scope.controllerphone;
       // $scope.cphone = $scope.controllerphone;
        $scope.caddress = $scope.controlleraddress;
       $scope.ccountry = $scope.controllercountry;
       $scope.chours = $scope.controllerhours;

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
       console.log('putdata',$scope.controllerupdateRecord)
       $http({
            method: 'PUT',
            url: '/controller/'+control._id,
            data: $scope.controllerupdateRecord,
            }).success(function (response) {
              console.log('putcontroller',response)
                new PNotify({
                    tittle : 'Regular notice',
                    type :'success',
                    text :response.message,
                  });
                  $scope.controllerBranch = null;
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
                  $http({
                       method: 'GET',
                       url: '/controller',
                      headers: {'Content-Type': 'application/json'
                       }
                       }).success(function (response) {
                         $scope.controllerDetails = response.result;

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
  $http({
            method: 'DELETE',
            url: '/controller/'+control._id,
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
                    url: '/controller',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.controllerDetails = response.result;

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
   /*end controller*/
   /*==============================================================================*/

   /*country*/
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
                console.log('ccc',response)
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
          $scope.countrylimitDetails = response.result;
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
            $scope.monthlylimit = $scope.cl;
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
      $scope.countryupdateRecord ={
        "countryName" : $scope.countrylimit,
        "currency" :  $scope.currency,
        "paymentLimit" :$scope.monthlylimit,
        "region" : $scope.region,
      };
      $http({
           method: 'PUT',
           url: '/country/'+country._id,
           data:$scope.countryupdateRecord,
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
                 btn21.style.display ="block";
                 btn21.style.float="right"
                 btn22.style.display ="block";
                 btn22.style.float="right"
                 btn23.style.display ="none";
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

 }; //editnfun
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
                 $scope.kyctransaction = response.result;
                 console.log('kyc',$scope.kyctransaction)
                 // console.log('kyc',$scope.kyctransaction[0].tellerID.tellerID)
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

   /*Remitter*/
   /*==============================================================================*/
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

   /*end Remitter*/
   /*==============================================================================*/
   /*Beneficiary*/
   /*==============================================================================*/
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
          $scope.transactiondata = response.result1;
       //    $scope.result = response.result;
       //   $scope.transactionDetails = $base64.decode(response.result);
       //   // console.log($scope.branchdetail);
       //  $scope.transactiondata = JSON.parse($scope.transactionDetails);
        console.log($scope.transactiondata);

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
           "country":$scope.tariffcountry,
           "currency":$scope.tariffcurrency,
           "minAmount":$scope.tariffmin,
           "maxAmount":$scope.tariffmax,
           "tax":$scope.tax,
           "tariff":$scope.tariff,
           // "tariffExclude":$scope.tariffexclude,
           "branchID":$scope.tariffbranchid
          };
          $http({
               method: 'POST',
               url: '/tariffController',
               data: $scope.tariffdata1 ,
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
                     // $scope.tariffexclude = null;
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
     // $scope.tariffexclude = null;
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
          // $scope.tariffexclude = response.result.tariffExclude;
          $scope.tariffbranchid = response.result.branchID;
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
             // "tariffExclude":$scope.tariffexclude,
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
                 // $scope.tariffexclude = null;
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
   /*supplier*/
  /* ==============================================*/
  setTimeout(function(){
    $('#dtable22').DataTable( {
        dom: 'Bfrtip',
        buttons: [

        ]
    });
    $(".dataTables_filter").css("float", "left");
  }, 3000);
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
  // $scope.superlierRegion = "";
  $scope.suplierContact = "";

  $scope.addSupplier = function(){

    $scope.supliername = $base64.encode($scope.supplierName);
    $scope.suplieremail = $base64.encode($scope.supplierEmail);
    $scope.supliercountry = $base64.encode($scope.superlierCountry);
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
    $scope.superlierCountry = null;
    // $scope.superlierRegion = null;
    $scope.suplierContact = null;
  };

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

    $scope.editSupplier = function(suplier){
      // alert(suplier._id)
      var btn66 = document.getElementById("addbtn12345");
      btn66.style.display ="none";
      var btn77 = document.getElementById("resetbtn12345");
      btn77.style.display ="none";
      var btn88 = document.getElementById('savebtn12345');
      btn88.style.display =  "block";
      btn88.style.float = "right";
      $http({
           method: 'GET',
           url: '/supplier/'+suplier._id,
           }).success(function (response) {
             console.log(response)
             $("label").addClass("active")
             $scope.supplierName = response.result.supplierName;
             $scope.supplierEmail = response.result.email;
             $scope.superlierCountry = response.result.country;
             // $scope.superlierRegion = response.result.sector;
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
                console.log(response)
                  new PNotify({
                      tittle : 'Regular notice',
                      type :'success',
                      text :response.message,
                    });
                      $scope.supplierName = null;
                      $scope.supplierEmail = null;
                      $scope.superlierCountry = null;
                      // $scope.superlierRegion = null;
                      $scope.suplierContact = null;
                      btn66.style.display ="block";
                      btn66.style.float="right"
                      btn77.style.display ="block";
                      btn77.style.float="right"
                      btn88.style.display ="none";
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
    $scope.deleteSupplier = function(suplier){
  $http({
            method: 'DELETE',
            url: '/supplier/'+suplier._id,
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
                    url: '/allsupplierController',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                  $scope.suplierDetails = response.result1;

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


  /*end supplier*/
  /* ==============================================*/

  /*============== createCountryCurrency========================*/
    $http({
       method: 'GET',
       url: '/countrycurrencylist',
      headers: {'Content-Type': 'application/json'
       }
       }).success(function (response) {
      $scope.countrycurrencylist = response.result;

     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });

     $scope.countryName = "";
     $scope.currencyName = "";
    $scope.createCountryCurrency = function(){
    $scope.currencydata = {
      "countryName":$scope.countryName ,
      "currencyName":$scope.currencyName
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
              $scope.countrycurrencylist = response.result;

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
               new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message
              });
              $http({
                    method: 'GET',
                    url: '/countrycurrencylist',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.countrycurrencylist = response.result;

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
$scope.editcountrycurrency = function(country){
  var btn76 = document.getElementById("addbtn12345678");
  btn76.style.display ="none";
  var btn77 = document.getElementById("resetbtn12345678");
  btn77.style.display ="none";
  var btn78 = document.getElementById('savebtn12345678');
  btn78.style.display =  "block";
  btn78.style.float = "right";


  $http({
       method: 'GET',
       url: '/countrycurrencylist/'+country._id,
       }).success(function (response) {

         $("label").addClass("active")

       $scope.countryName = response.result.countryName;
      $scope.currencyName = response.result.currencyName;
     }).error(function (response) {
        new PNotify({
           tittle : 'Regular notice',
           type :'error',
           text :response,
         });
    });

  $scope.updateSupplier = function() {
     $scope.currencydata = {
      "countryName":$scope.countryName ,
      "currencyName":$scope.currencyName
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
               $http({
                    method: 'GET',
                    url: '/countrycurrencylist',
                   headers: {'Content-Type': 'application/json'
                    }
                }).success(function (response) {

                   $scope.countrycurrencylist = response.result;

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
    // $window.location.reload();
    $location.path('/admin');
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

                      //$("#consecutivo").val(newValue);
                      //$("#consecutivo").material_select();

                     // console.log( $scope.supbranchid);
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


             setTimeout(function(){

                $('#dtable').DataTable({
                    dom: 'Bfrtip',
                   buttons: []
                });

             },1000)

   setTimeout(function(){
     $('#dtable1').DataTable( {
         dom: 'Bfrtip',
         buttons: [

         ]
     });
      $(".dataTables_filter").css("float", "left");
     }, 1000);

   setTimeout(function(){
      $('#dtable445').DataTable( {
          dom: 'Bfrtip',
          buttons: [

          ]
      } );
      $(".dataTables_filter").css("float", "left");
  },1500);


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

}//else



}]);
