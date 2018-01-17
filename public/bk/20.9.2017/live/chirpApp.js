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



var HtmlEntities = function() {};

HtmlEntities.map = {
    //"'": "&apos;",
    "<": "&lt;",
    ">": "&gt;",
   // " ": "&nbsp;",
    "¡": "&iexcl;",
    "¢": "&cent;",
    "£": "&pound;",
    "¤": "&curren;",
    "¥": "&yen;",
    "¦": "&brvbar;",
    "§": "&sect;",
    "¨": "&uml;",
    "©": "&copy;",
    "ª": "&ordf;",
    "«": "&laquo;",
    "¬": "&not;",
    "®": "&reg;",
    "¯": "&macr;",
    "°": "&deg;",
    "±": "&plusmn;",
    "²": "&sup2;",
    "³": "&sup3;",
    "´": "&acute;",
    "µ": "&micro;",
    "¶": "&para;",
    "·": "&middot;",
    "¸": "&cedil;",
    "¹": "&sup1;",
    "º": "&ordm;",
    "»": "&raquo;",
    "¼": "&frac14;",
    "½": "&frac12;",
    "¾": "&frac34;",
    "¿": "&iquest;",
    "À": "&Agrave;",
    "Á": "&Aacute;",
    "Â": "&Acirc;",
    "Ã": "&Atilde;",
    "Ä": "&Auml;",
    "Å": "&Aring;",
    "Æ": "&AElig;",
    "Ç": "&Ccedil;",
    "È": "&Egrave;",
    "É": "&Eacute;",
    "Ê": "&Ecirc;",
    "Ë": "&Euml;",
    "Ì": "&Igrave;",
    "Í": "&Iacute;",
    "Î": "&Icirc;",
    "Ï": "&Iuml;",
    "Ð": "&ETH;",
    "Ñ": "&Ntilde;",
    "Ò": "&Ograve;",
    "Ó": "&Oacute;",
    "Ô": "&Ocirc;",
    "Õ": "&Otilde;",
    "Ö": "&Ouml;",
    "×": "&times;",
    "Ø": "&Oslash;",
    "Ù": "&Ugrave;",
    "Ú": "&Uacute;",
    "Û": "&Ucirc;",
    "Ü": "&Uuml;",
    "Ý": "&Yacute;",
    "Þ": "&THORN;",
    "ß": "&szlig;",
    "à": "&agrave;",
    "á": "&aacute;",
    "â": "&acirc;",
    "ã": "&atilde;",
    "ä": "&auml;",
    "å": "&aring;",
    "æ": "&aelig;",
    "ç": "&ccedil;",
    "è": "&egrave;",
    "é": "&eacute;",
    "ê": "&ecirc;",
    "ë": "&euml;",
    "ì": "&igrave;",
    "í": "&iacute;",
    "î": "&icirc;",
    "ï": "&iuml;",
    "ð": "&eth;",
    "ñ": "&ntilde;",
    "ò": "&ograve;",
    "ó": "&oacute;",
    "ô": "&ocirc;",
    "õ": "&otilde;",
    "ö": "&ouml;",
    "÷": "&divide;",
    "ø": "&oslash;",
    "ù": "&ugrave;",
    "ú": "&uacute;",
    "û": "&ucirc;",
    "ü": "&uuml;",
    "ý": "&yacute;",
    "þ": "&thorn;",
    "ÿ": "&yuml;",
    "Œ": "&OElig;",
    "œ": "&oelig;",
    "Š": "&Scaron;",
    "š": "&scaron;",
    "Ÿ": "&Yuml;",
    "ƒ": "&fnof;",
    "ˆ": "&circ;",
    "˜": "&tilde;",
    "Α": "&Alpha;",
    "Β": "&Beta;",
    "Γ": "&Gamma;",
    "Δ": "&Delta;",
    "Ε": "&Epsilon;",
    "Ζ": "&Zeta;",
    "Η": "&Eta;",
    "Θ": "&Theta;",
    "Ι": "&Iota;",
    "Κ": "&Kappa;",
    "Λ": "&Lambda;",
    "Μ": "&Mu;",
    "Ν": "&Nu;",
    "Ξ": "&Xi;",
    "Ο": "&Omicron;",
    "Π": "&Pi;",
    "Ρ": "&Rho;",
    "Σ": "&Sigma;",
    "Τ": "&Tau;",
    "Υ": "&Upsilon;",
    "Φ": "&Phi;",
    "Χ": "&Chi;",
    "Ψ": "&Psi;",
    "Ω": "&Omega;",
    "α": "&alpha;",
    "β": "&beta;",
    "γ": "&gamma;",
    "δ": "&delta;",
    "ε": "&epsilon;",
    "ζ": "&zeta;",
    "η": "&eta;",
    "θ": "&theta;",
    "ι": "&iota;",
    "κ": "&kappa;",
    "λ": "&lambda;",
    "μ": "&mu;",
    "ν": "&nu;",
    "ξ": "&xi;",
    "ο": "&omicron;",
    "π": "&pi;",
    "ρ": "&rho;",
    "ς": "&sigmaf;",
    "σ": "&sigma;",
    "τ": "&tau;",
    "υ": "&upsilon;",
    "φ": "&phi;",
    "χ": "&chi;",
    "ψ": "&psi;",
    "ω": "&omega;",
    "ϑ": "&thetasym;",
    "ϒ": "&Upsih;",
    "ϖ": "&piv;",
    "–": "&ndash;",
    "—": "&mdash;",
    "‘": "&lsquo;",
    "’": "&rsquo;",
    "‚": "&sbquo;",
    "“": "&ldquo;",
    "”": "&rdquo;",
    "„": "&bdquo;",
    "†": "&dagger;",
    "‡": "&Dagger;",
    "•": "&bull;",
    "…": "&hellip;",
    "‰": "&permil;",
    "′": "&prime;",
    "″": "&Prime;",
    "‹": "&lsaquo;",
    "›": "&rsaquo;",
    "‾": "&oline;",
    "⁄": "&frasl;",
    "€": "&euro;",
    "ℑ": "&image;",
    "℘": "&weierp;",
    "ℜ": "&real;",
    "™": "&trade;",
    "ℵ": "&alefsym;",
    "←": "&larr;",
    "↑": "&uarr;",
    "→": "&rarr;",
    "↓": "&darr;",
    "↔": "&harr;",
    "↵": "&crarr;",
    "⇐": "&lArr;",
    "⇑": "&UArr;",
    "⇒": "&rArr;",
    "⇓": "&dArr;",
    "⇔": "&hArr;",
    "∀": "&forall;",
    "∂": "&part;",
    "∃": "&exist;",
    "∅": "&empty;",
    "∇": "&nabla;",
    "∈": "&isin;",
    "∉": "&notin;",
    "∋": "&ni;",
    "∏": "&prod;",
    "∑": "&sum;",
    "−": "&minus;",
    "∗": "&lowast;",
    "√": "&radic;",
    "∝": "&prop;",
    "∞": "&infin;",
    "∠": "&ang;",
    "∧": "&and;",
    "∨": "&or;",
    "∩": "&cap;",
    "∪": "&cup;",
    "∫": "&int;",
    "∴": "&there4;",
    "∼": "&sim;",
    "≅": "&cong;",
    "≈": "&asymp;",
    "≠": "&ne;",
    "≡": "&equiv;",
    "≤": "&le;",
    "≥": "&ge;",
    "⊂": "&sub;",
    "⊃": "&sup;",
    "⊄": "&nsub;",
    "⊆": "&sube;",
    "⊇": "&supe;",
    "⊕": "&oplus;",
    "⊗": "&otimes;",
    "⊥": "&perp;",
    "⋅": "&sdot;",
    "⌈": "&lceil;",
    "⌉": "&rceil;",
    "⌊": "&lfloor;",
    "⌋": "&rfloor;",
    "⟨": "&lang;",
    "⟩": "&rang;",
    "◊": "&loz;",
    "♠": "&spades;",
    "♣": "&clubs;",
  };

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

app.filter('startFrom', function() {
    return function(input, start) {
        start = +start; //parse to int
        return input.slice(start);
    }
});

app.filter('stripslashes', function () {
        return function (str) {
            str = str.replace(/\\'/g, '\'');
            str = str.replace(/\\"/g, '"');
            str = str.replace(/\\0/g, '\0');
            str = str.replace(/\\\\/g, '\\');
           
            return str;
        };
});

app.filter('decodeHtmlEntity', function () {
   return function(string) {
    var entityMap = HtmlEntities.map;
    for (var key in entityMap) {
        var entity = entityMap[key];
        var regex = new RegExp(entity, 'g');
        string = string.replace(regex, key);
    }
    string = string.replace(/&quot;/g, '"');
    string = string.replace(/&amp;/g, '&');
    return string;

}
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
