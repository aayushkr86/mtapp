
app.controller('controllerLoginController',['$scope','$base64','$http','$window', function($scope,$base64,$http,$window){
  $scope.tokendata = $window.localStorage.getItem('userInfo');
 if(!$scope.tokendata){
      $window.location.href= "/";
  } else{

  $scope.email = "";
 $scope.password = "";
 $scope.controllerID = "";

 $scope.sub = function(){
  //  console.log($scope.email,$scope.password,$scope.supervisorID);

   $scope.mail = $base64.encode($scope.email);
   $scope.pass = $base64.encode($scope.password);
   $scope.id = $base64.encode($scope.controllerID);
  console.log($scope.mail,$scope.pass,$scope.id);

   $http({
				method: 'POST',
				url: '/controllerLogin',
				data: {
						email: $scope.mail,
						password: $scope.pass,
            controllerID:$scope.id
				},
				 headers: {'Content-Type': 'application/json'}
		}).success(function (response) {
          if(response.message === 'Controller1 Login OK!' || response.message === 'Controller Login OK!'){
            $window.localStorage.setItem('userInfo-token', response.token);
            
            
            $window.location.href= "/#/ControllerDashboard";
            $window.location.reload();
          }
          if(response.message === 'Wrong Password'){
            new PNotify({
                tittle : 'Regular notice',
                type :'error',
                text :response.message,

              });
          }
          if(response.message === 'Controller does not exist'){
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

		}).error(function (response) {
      new PNotify({
         tittle : 'Regular notice',
         type :'error',
         text :response,
       });
		});
 }

 $scope.controlleremail;
 $scope.changepass = function (){
   // alert($scope.superemail)
   $scope.forgotdata = {
     "email":$scope.controlleremail,
   }
   $http({
        method: 'POST',
        url: '/controllersendchangepassmail',
        data: $scope.forgotdata,
        }).success(function (response) {
          new PNotify({
              tittle : 'Regular notice',
              type :'success',
              text :"Password Reset link  sent in your Email.",
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
     $window.location.href= "/#/";
       $window.location.reload();
 }
}//else
}]);
