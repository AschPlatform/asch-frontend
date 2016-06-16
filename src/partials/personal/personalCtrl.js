angular.module('asch').controller('personalCtrl', function($scope, $rootScope, apiService, ipCookie) {
	$rootScope.active = 'personal';
	$rootScope.userlogin = true;
	//下拉菜单隐藏
	$rootScope.blockStatus = false;
	$scope.init = function() {
		
	};
});

