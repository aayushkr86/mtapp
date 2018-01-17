
app.controller('tellerLoginController',['$scope','$base64','$http','$window', '$location','$filter', function($scope,$base64,$http,$window,$location,$filter){
  $scope.tokendata = $window.localStorage.getItem('userInfo');
 if(!$scope.tokendata){
      $window.location.href= "/";
  } else{

  $scope.email = "";
 $scope.password = "";
 $scope.tellerID = "";
 $scope.phoneNumbr = /^\+?\d{2}[- ]?\d{5}[- ]?\d{5}$/;

 $scope.sub = function(){
  //  console.log($scope.email,$scope.password,$scope.supervisorID);
  var date = new Date();
  $scope.ddMMyyyy = $filter('date')(new Date(), 'HH:mm');

   $scope.mail = $base64.encode($scope.email);
   $scope.pass = $base64.encode($scope.password);
   $scope.id = $base64.encode($scope.tellerID);

   $http({
				method: 'POST',
				url: '/tellerLogin',
				data: {
						email: $scope.mail,
						password: $scope.pass,
            tellerID:$scope.id,
            logintime:$scope.ddMMyyyy
				},
				 headers: {'Content-Type': 'application/json'}
		}).success(function (response) {
          if(response.message === 'Teller1 Login OK!' || response.message === 'Teller Login OK!'){
            $window.localStorage.setItem('userInfo-token', response.token);
            //console.log($window.sessionStorage)
            $window.location.reload();
            $window.location.href= "/#/tellerdashboard";
          // $location.path("/tellerdashboard");

          }
          if(response.message === 'Wrong Password'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,

              });
          }
          if(response.message === 'User does not exist'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message === 'This System is not registerd'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,
              });
          }
          if(response.message1 === 'not login time'){
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
 }
/*==== forgot ===*/
$scope.tellermail ;
$scope.tellerphone;
 $scope.forgotpass = function(){
   $scope.forgotdata = {
     "email":$scope.tellermail,
     "phone":$scope.tellerphone
   }
   $http({
        method: 'POST',
        url: '/tellerForgot',
        data: $scope.forgotdata,
        }).success(function (response) {
          new PNotify({
              tittle : 'Regular notice',
              type :'success',
              text :response.result,
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
