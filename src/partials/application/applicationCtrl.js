angular.module('asch').controller('applicationCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$window) {
	$rootScope.active = 'application';
	$rootScope.userlogin = true;
	$scope.newapplication = true;
	$scope.installed = false;
	$scope.newapplicationchange = function () {
		$scope.newapplication = true;
		$scope.installed = false;

	}
	$scope.installedchange = function () {
		$scope.newapplication = false;
		$scope.installed = true;
	};

});
