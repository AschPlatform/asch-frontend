angular.module('webrrc').config(function($routeProvider) {
	
	$routeProvider.when('/personal',{
		templateUrl:'partials/personal/index.html'
	});
	$routeProvider.when('/home',{
		templateUrl:'partials/home/index.html'
	});

	$routeProvider.when('/application', {
		templateUrl: 'partials/application/index.html'
	});

	$routeProvider.when('/blockchain', {
		templateUrl: 'partials/blockchain/index.html'
	});

	$routeProvider.when('/blockforging', {
		templateUrl: 'partials/blockforging/index.html'
	});

	// $routeProvider.when('/tips', {
	// 	templateUrl: 'partials/tips/tips.html'
	// });

	$routeProvider.when('/', {
		templateUrl: 'partials/home/index.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/'
	});
});
