angular.module('asch').config(function($routeProvider) {
	
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
	// $routeProvider.when('/myvote', {
	// 	templateUrl: 'partials/myvote/index.html'
	// });
	$routeProvider.when('/pay', {
		templateUrl: 'partials/pay/index.html'
	});
	$routeProvider.when('/vote', {
		templateUrl: 'partials/vote/index.html'
	});
	// $routeProvider.when('/assignee', {
	// 	templateUrl: 'partials/assignee/index.html'
	// });
	$routeProvider.when('/login', {
		templateUrl: 'partials/login/index.html'
	});

	$routeProvider.when('/', {
		templateUrl: 'partials/login/index.html'
	});

	$routeProvider.otherwise({
		redirectTo: '/'
	});
});
