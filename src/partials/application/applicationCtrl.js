angular.module('asch').controller('applicationCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {
	$rootScope.active = 'application';
	$rootScope.userlogin = true;

	

	
	$scope.init = function(params) {
		// window.location.href = '#/login';
		
	};


});
