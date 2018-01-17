/*ananda sir*/
// var app = angular.module('chirpApp',["ngRoute",'base64','oc.lazyLoad','ngCookies','satellizer']);
//
// app.factory('sessionInjector', function($window) {
//   var sessionInjector = {
//       request: function(config) {
//               config.headers['Authorization'] = 'Bearer'+ $window.sessionStorage.getItem('userInfo-token');
//           return config;
//       }
//   };
//   return sessionInjector;
// });
/*============*/
var app = angular.module('chirpApp',["ngRoute",'base64','oc.lazyLoad','ngCookies','satellizer','pascalprecht.translate']);
app.factory('sessionInjector', function($window) {
  var sessionInjector = {
      request: function(config) {
              config.headers['Authorization'] = 'Bearer '+ $window.localStorage.getItem('userInfo-token');
          return config;
      }
  };
  return sessionInjector;
});

/* chnage*/
app.config(['$translateProvider', function($translateProvider) {
  // add translation tables
  console.log("add translation tables", translationsEN);
  console.log("add translation tables", translationsDE);
  $translateProvider.translations('en', translationsEN);
  $translateProvider.translations('de', translationsDE);
  $translateProvider.preferredLanguage('en');
  $translateProvider.fallbackLanguage('en');
}]);
/*change*/
//route
  app.config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {

  $httpProvider.interceptors.push('sessionInjector');


  $routeProvider.when('/login', {
	      controller: 'loginController',
        templateUrl: 'login.html'

    });
     $routeProvider.when('/', {
          controller: 'firstpageController',
          templateUrl: 'firstpage.html'

      });
    $routeProvider.when('/home', {
  	      controller: 'homeController',
          templateUrl: 'home.html',
          resolve: {
            lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
               return $ocLazyLoad.load({files: ['/assets/css/dropdown.css',
               '/assets/vendor/animate/animate.min.css','/assets/vendor/simple-line-icons/css/simple-line-icons.min.css','/assets/vendor/owl.carousel/assets/owl.carousel.min.css','/assets/vendor/owl.carousel/assets/owl.theme.default.min.css','/assets/vendor/magnific-popup/magnific-popup.min.css','/assets/css/theme.css','/assets/css/theme-elements.css','/assets/vendor/rs-plugin/css/settings.css','/assets/vendor/rs-plugin/css/layers.css','/assets/vendor/rs-plugin/css/navigation.css','/assets/css/demos/skin-app-landing.css','/assets/css/demos/app-landing.css','/assets/css/custom.css'
             ]});
            }]
         }

      });
      $routeProvider.when('/admin', {
           controller: 'superadminLoginController',
           templateUrl: 'superadminLogin.html',
           resolve: {
             lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load({files: ['/assets/css/styles.css',
                '/assets/css/style.css']});
             }]
          }

       });
       $routeProvider.when('/super', {
             controller: 'supervisorLoginController',
             templateUrl: 'supervisorLogin.html',
             resolve: {
               lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                  return $ocLazyLoad.load({files: ['/assets/css/styles.css','/assets/css/style.css']});
               }]
            }

         });
         $routeProvider.when('/controllerLogin', {
               controller: 'controllerLoginController',
               templateUrl: 'controllerLogin.html',
               resolve: {
                 lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                    return $ocLazyLoad.load({files: ['/assets/css/styles.css','/assets/css/style.css']});
                 }]
              }

           });
           $routeProvider.when('/teller', {
                 controller: 'tellerLoginController',
                 templateUrl: 'tellerLogin.html',
                 resolve: {
                   lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                      return $ocLazyLoad.load({files: ['/assets/css/styles.css','/assets/css/style.css']});
                   }]
                }

             });
             $routeProvider.when('/adminDashboard', {
                   controller: 'adminController',
                   templateUrl: 'superadmin.html',
                   resolve: {
                     lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                        return $ocLazyLoad.load({files: ['/assets/css/style.css','/assets/css/materialize.css',
                      '/assets/css/editable-table.css','/assets/css/mob.css'
                    ]});
                     }]
                  }

               });
               $routeProvider.when('/superdashboard', {
                     controller: 'supervisorController',
                     templateUrl: 'supervisor.html',
                     resolve: {
                       lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                          return $ocLazyLoad.load({files: ['/assets/css/style.css','/assets/css/materialize.css',
                        '/assets/css/editable-table.css','/assets/css/mob.css','/assets/js1/editable-table.js',
                      '/assets/js/materialize.min.js','/assets/js/custom.js']});
                       }]
                    }

                 });
                 $routeProvider.when('/ControllerDashboard', {
                       controller: 'controlController',
                       templateUrl: 'controller.html',
                       resolve: {
                         lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                            return $ocLazyLoad.load({files: ['/assets/css/style.css','/assets/css/materialize.css',
                          '/assets/css/editable-table.css','/assets/css/mob.css','/assets/js1/editable-table.js',
                        '/assets/js/materialize.min.js','/assets/js/custom.js']});
                         }]
                      }

                   });
                   $routeProvider.when('/tellerdashboard', {
                         controller: 'tellerController',
                         templateUrl: 'Teller.html',
                         resolve: {
                           lazy: ['$ocLazyLoad', function ($ocLazyLoad) {
                              return $ocLazyLoad.load({files: ['/assets/css/style.css','/assets/css/materialize.css',
                            '/assets/css/editable-table.css','/assets/css/mob.css','/assets/js1/editable-table.js',
                          '/assets/js/materialize.min.js','/assets/js/custom.js']});
                           }]
                        }

                     });
                     $routeProvider.when('/faq', {
                       controller: 'faqController',
                       templateUrl: 'index123.html',             

                    });
                    $routeProvider.when('/demo', {
                    controller: 'transalator',
                    templateUrl: 'demo.html',
                    resolve: {
                      lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                        return $ocLazyLoad.load({ files: ['https://cdnjs.cloudflare.com/ajax/libs/angular.js/1.5.5/angular.js', 'https://cdn.rawgit.com/angular-translate/bower-angular-translate/2.15.2/angular-translate.js', '/assets/js/script.js'] });
                      }]
                    }
                  });
                    $routeProvider.otherwise({ redirectTo: '/'});

  // $locationProvider.html5Mode(true)
}]);
