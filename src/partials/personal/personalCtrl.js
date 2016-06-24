angular.module('asch').controller('personalCtrl', function($scope, $rootScope, apiService, ipCookie) {
	$rootScope.active = 'personal';
	$rootScope.userlogin = true;
	//下拉菜单隐藏
	// 账单默认显示
	$scope.accountInfo  = true;
	$scope.passwordInfo  = false;
	
	$scope.accountchange = function () {
		$scope.accountInfo = true;
		$scope.passwordInfo  = !$scope.accountInfo;
	}
	$scope.passwordchange = function () {
		$scope.accountInfo = false;
		$scope.passwordInfo  = !$scope.accountInfo;
	}
	
	$scope.init = function() {
		
	};
});

