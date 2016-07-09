angular.module('asch').controller('applicationCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$window) {
	$rootScope.active = 'application';
	$rootScope.userlogin = true;
	
	$scope.init = function(params) {
		// window.location.href = '#/login';
		
	};


});
