app.controller('controlController',['$scope','$base64','$http','$window','$translate', function($scope,$base64,$http,$window,$translate){

  $scope.controllogdata = $window.localStorage.getItem('userInfo-token');
  if($scope.controllogdata == 'undefined' || $scope.controllogdata == '' || $scope.controllogdata == null){
    // new PNotify({
    //     tittle : 'Regular notice',
    //     type :'error',
    //     text :'You are not logged in. Please login again',

    //   });
      $window.location.reload();
       $window.location.href= "/#/controllerLogin";
     }
  else{
     $scope.logtokendata = jwt_decode($scope.controllogdata);
     console.log($scope.logtokendata)


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
        $window.location.reload();
        $window.location.href = "/#/ControllerDashboard";
      }
    });
 /*bahar*/


     /*teller*/
     /*============================================*/
     setTimeout(function(){
       $('#dtable301').DataTable( {
           dom: 'Bfrtip',
           buttons: [

           ]
       } );
       $('.dropdown-button').unbind();
       $('.dropdown-button').dropdown();
$(".dataTables_filter").css("float", "left");
     },1000);
     /*get tellerDetails*/
     $http({
          method: 'GET',
          url: '/tellerController',
          }).success(function (response) {
         $scope.tellerDetails = response.result1;
        //  console.log($scope.tellerDetails);
        }).error(function (response) {
           new PNotify({
              tittle : 'Regular notice',
              type :'error',
              text :response.reason,
            });
       });

/*============= end teller ============================================*/

/*============= Report ============================================*/
setTimeout(function(){
  $('#dtable302').DataTable( {
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
       

   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response.reason,
       });
  });

/*============= end Report ============================================*/
/*=============  country ============================================*/
setTimeout(function(){
  $('#dtable303').DataTable( {
      dom: 'Bfrtip',
      buttons: [

      ]
  } );
  $(".dataTables_filter").css("float", "left");
},1000);
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
/*============= end country ============================================*/

/*============= transaction ============================================*/
setTimeout(function(){
  $('#dtable304').DataTable( {
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


/*============= end transaction ============================================*/

/*============= tariff ============================================*/
setTimeout(function(){
  $('#dtable305').DataTable( {
      dom: 'Bfrtip',
      buttons: [

      ]
  } );
  $(".dataTables_filter").css("float", "left");
},1000);

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

/*============= end tariff ============================================*/

/*============= end comission ============================================*/
setTimeout(function(){
  $('#dtable306').DataTable( {
      dom: 'Bfrtip',
      buttons: [

      ]
  } );
  $(".dataTables_filter").css("float", "left");
},1000);

$http({
     method: 'GET',
     url: '/comissionController',
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.comissiondata1 = response.result;
       console.log('com',$scope.comissiondata1);
   }).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
  });

/*============= end comission ============================================*/
/*============= Remitter ============================================*/
setTimeout(function(){
  $('#dtable307').DataTable( {
      dom: 'Bfrtip',
      buttons: [

      ]
  } );
  $(".dataTables_filter").css("float", "left");
},1000);
/*============= end Remitter ============================================*/

/* =========== beneficiary =====================================*/
setTimeout(function(){
  $('#dtable308').DataTable( {
      dom: 'Bfrtip',
      buttons: [

      ]
  } );
  $(".dataTables_filter").css("float", "left");
},1000);

$http({
     method: 'GET',
     url: '/beneficiaryController',
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.beneficiaryDetails1 = response.result;
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
setTimeout(function(){
  $('#dtable147').DataTable( {
      dom: 'Bfrtip',
      buttons: [

      ]
  } );
  $(".dataTables_filter").css("float", "left");
},1000);

$scope.data = {
 "status": "ReimbursedApproved"
};
$http({
     method: 'POST',
     url: '/getreimbursetransaction',
     data:$scope.data,
    headers: {'Content-Type': 'application/json'
     }
     }).success(function (response) {
       $scope.reimburesementTransaction = response.result;
       console.log('rem',$scope.reimburesementTransaction);
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
  $window.location.reload();
  $location.path('/controllerLogin');
}
  }//else

}])
