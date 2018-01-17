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


     /*teller*/
     /*============================================*/

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



$http({
     method: 'GET',
     url: '/remitterbybranchController/'+$scope.logtokendata.branchID,
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

$http({
     method: 'GET',
     url: '/tariffControllerbybranch/'+$scope.logtokendata.branchID,
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
$scope.controllerloginid = $scope.logtokendata.id;
$http({
    method: 'GET',
    url: '/getsupplierbyController/'+$scope.controllerloginid,
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
 }//else

}])
