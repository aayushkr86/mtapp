app.controller('firstpageController',['$scope','$http','$window',
function($scope,$http,$window){
  $scope.Username;
  $scope.Password;
 $scope.first = function(){
   $http({
       method: 'POST',
       url: '/firstpage',
       data: {
           username: $scope.Username,
           password: $scope.Password
       },
     // 	 headers: {'Content-Type': 'application/json'}
    }).success(function (response) {
      if(response.message === 'Access Granted'){
        $window.localStorage.setItem('userInfo', response.token);
          $window.location.href= "/#/home";
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
 }//fun

}])
