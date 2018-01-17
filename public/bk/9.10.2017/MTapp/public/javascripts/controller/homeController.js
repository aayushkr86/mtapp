app.controller('homeController', ['$scope','$location','$window',function($scope,$location,$window){
  $scope.tokendata = $window.localStorage.getItem('userInfo');
  console.log($scope.tokendata);
  if(!$scope.tokendata){
    // new PNotify({
    //     tittle : 'Regular notice',
    //     type :'error',
    //     text :'You have not permission access this site. Please login again',
    //
    //   });
      // $window.location.reload();
      $window.location.href= "/";
  } else{

setTimeout(function(){
  // caraosel
      (function($) {

    	'use strict';

    	if ($.isFunction($.fn['themePluginCarousel'])) {

    		$(function() {
    			$('[data-plugin-carousel]:not(.manual), .owl-carousel:not(.manual)').each(function() {
    				var $this = $(this),
    					opts;

    				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
    				if (pluginOptions)
    					opts = pluginOptions;

    				$this.themePluginCarousel(opts);
    			});
    		});

    	}

    }).apply(this, [jQuery]);

//end


// Counter
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginCounter'])) {

		$(function() {
			$('[data-plugin-counter]:not(.manual), .counters [data-to]').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginCounter(opts);
			});
		});

	}

}).apply(this, [jQuery]);


// Animate
(function($) {

	'use strict';

	if ($.isFunction($.fn['themePluginAnimate'])) {

		$(function() {
			$('[data-appear-animation]').each(function() {
				var $this = $(this),
					opts;

				var pluginOptions = theme.fn.getOptions($this.data('plugin-options'));
				if (pluginOptions)
					opts = pluginOptions;

				$this.themePluginAnimate(opts);
			});
		});

	}

}).apply(this, [jQuery]);


$( ".content-visible" ).accordion({
  animate: 200
});


},0);


  } //else

}]);
