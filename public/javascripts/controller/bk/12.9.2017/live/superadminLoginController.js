app.controller('superadminLoginController',['$scope','$base64','$http','$window','$rootScope','$location','$auth',
 function($scope,$base64,$http,$window,$rootScope,$location,$auth){
  
 $scope.tokendata = $window.localStorage.getItem('userInfo');
 if(!$scope.tokendata){
      $window.location.href= "/";
  } else{

  $scope.email = "";
 $scope.password = "";

$scope.passwordpattern = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;

 $scope.sub = function(){
   $scope.email = $base64.encode($scope.email);
   $scope.password = $base64.encode($scope.password);
  //  console.log($scope.mail,$scope.pass);
   //
   $http({
 			method: 'POST',
 			url: '/superAdminLogin',
 			data: {
 					email: $scope.email,
 					password: $scope.password
 			},
 			 headers: {'Content-Type': 'application/json'}
 	}).success(function (response) {
 				console.log(response.result);
          if(response.message === 'Login OK!'){
            var token = response.token;
            
          $window.localStorage.setItem('userInfo-token', response.token);
           $window.location.reload();
          $location.path('/adminDashboard');
          }
          if(response.result === 'Wrong Password'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.result,

              });
          }
          if(response.result === 'User does not exist'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.result,
              });
          }
 	}).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
 	});
 }
$scope.adminemail;
$scope.newpass;
$scope.confirmpass;
 $scope.forgotadmin = function(){
     $scope.adminemail,

   $scope.forgotdata = {
     "newPassword":$scope.newpass,
     "confirmPassword":$scope.confirmpass
   }
   $http({
        method: 'PUT',
        url: '/forgot/'+$scope.adminemail,
        data: $scope.forgotdata,
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
 $scope.home = function(){
      $window.location.reload();
            $location.path('/');
       // $window.location.href= "/#/";
 }

}//else
}]);
