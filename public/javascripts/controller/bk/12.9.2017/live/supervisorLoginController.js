
app.controller('supervisorLoginController',['$scope','$base64','$http','$window', function($scope,$base64,$http,$window){
  $scope.tokendata = $window.localStorage.getItem('userInfo');
 if(!$scope.tokendata){
      $window.location.href= "/";
  } else{

  $scope.email = "";
 $scope.password = "";
 $scope.supervisorID = "";

 $scope.sub = function(){
   $scope.mail = $base64.encode($scope.email);
   $scope.pass = $base64.encode($scope.password);
   $scope.id = $base64.encode($scope.supervisorID);

     $http({
   			method: 'POST',
   			url: '/supervisiorLogin',
   			data: {
   					email: $scope.mail,
   					password: $scope.pass,
            supervisiorID:$scope.id
   			},
   		// 	 headers: {'Content-Type': 'application/json'}
   	 }).success(function (response) {
       if(response.message === 'Supervisior Login OK!'){
                  $window.localStorage.setItem('userInfo-token', response.token);
                  
                  $window.location.reload();
                   $window.location.href= "/#/superdashboard";
        }
       if(response.message === 'This System is not registerd'){
         new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response.message,
           });
       }
       if(response.message === "Wrong Password"){
         new PNotify({
             tittle : 'Regular notice',
             type :'error',
             text :response.message,

           });
       }
       if(response.message === 'Supervisior does not exist'){
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
  $scope.superemail;
  $scope.changepass = function (){
    // alert($scope.superemail)
    $scope.forgotdata = {
      "email":$scope.superemail,
    }
    $http({
         method: 'POST',
         url: '/supervisiorsendchangepassmail',
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
      $window.location.reload();
      $window.location.href= "/#/";
            //$location.path('/');
 }
}//else

}]);
