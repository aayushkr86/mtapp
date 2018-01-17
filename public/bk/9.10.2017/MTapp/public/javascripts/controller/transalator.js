app.controller('transalator', ['$location', '$timeout', '$base64', '$http', '$window', '$scope', '$translate', function($location, $timeout, $base64, $http, $window, $scope, $translate) {
  $scope.changeLanguage = function(langKey) {
    $translate.use(langKey);
  };
}])