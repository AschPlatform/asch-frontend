// 召唤之前本地进行仓锁判断 
angular.module('asch').controller('lockblockCtrl', function ($scope, $rootScope, apiService, ipCookie, $window, $http, userService, postSerivice, $translate) {
    // init() 本地
    $scope.init = function (params) {
		apiService.account({
			address: userService.address
		}).success(function (res) {
			if (res.success == true) {
				$scope.account = res.account;
				$scope.latestBlock = res.latestBlock;
				$scope.version = res.version;
				userService.update(res.account, res.latestBlock);
				$scope.userService = userService;
			};
		}).error(function (res) {
			toastError(res.error);
		});
    };
    // 关闭功能
    $scope.Close = function () {
        $rootScope.lockblock = false;
        $rootScope.isBodyMask = false;
    };
    // 设置仓锁  弹出框只具有设置功能
 	$scope.setPositionLock = function () {
		if (!$scope.block_number) {
			return toastError($translate.instant('ERR_POSITIONLOCK_EMPTY'));;
		}
		var lockHeight = Number($scope.block_number)
		var diffHeight = lockHeight - userService.latestBlockHeight
		console.log(lockHeight, diffHeight, userService.latestBlockHeight)
		if (diffHeight <= 0 || diffHeight >= 10000000) {
			return toastError('Invalid lock height')
		}

		if (userService.secondPublicKey && !$scope.secondpassword) {
			toastError($translate.instant('ERR_NO_SECND_PASSWORD'));
			return;
		}

		if (!userService.secondPublicKey) {
            $scope.secondPassword = '';
        }

		var transaction = AschJS.transaction.createLock(lockHeight, userService.secret, $scope.secondpassword);
		postSerivice.post(transaction).success(function (res) {
			if (res.success == true) {
				//$scope.passwordsure = true;
				toast($translate.instant('INF_POSITIONLOCK_SET_SUCCESS'));
				$rootScope.lockblock = false;
				$rootScope.isBodyMask = false;
				$location.path('/home');
			} else {
				toastError(res.error)
			};
		}).error(function (res) {
			toastError($translate.instant('ERR_SERVER_ERROR'));
		});
	}
});
