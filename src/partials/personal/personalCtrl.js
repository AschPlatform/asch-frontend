angular.module('asch').controller('personalCtrl', function($scope, $rootScope, apiService, ipCookie,$window) {
	$rootScope.active = 'personal';
	$rootScope.userlogin = true;
	//下拉菜单隐藏
	// 账单默认显示
	$scope.accountInfo  = true;
	$scope.passwordInfo  = false;
	$scope.quitout = function () {
		$window.location.href = '/'
	}
	$scope.accountchange = function () {
		$scope.accountInfo = true;
		$scope.passwordInfo  = !$scope.accountInfo;
	}
	$scope.passwordchange = function () {
		$scope.accountInfo = false;
		$scope.passwordInfo  = !$scope.accountInfo;
	}
	
	$scope.init = function() {
		Account()
	};
	//个人中心账户信息
	function Account(address) {
		apiService.account({
			address:address
		}).success(function (res) {
			if(res.success='true'){
				//console.log('account'+ res.account.balance)
				$scope.accountinfo=res.account
			};
		}).error(function (res) {
			toastError(res.error);
		})

	}
});

