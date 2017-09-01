// 召唤之前本地进行二级密码判断
angular.module('asch').controller('setpsdCtrl', function ($scope, $rootScope, apiService, ipCookie, $window, $http, userService, postSerivice, $translate) {
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
        $rootScope.setpsd = false;
        $rootScope.isBodyMask = false;
    };
    // 设置二级密码  弹出框只具有设置功能
    $scope.setPassWord = function () {
		var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
		if (!$scope.secondpassword || !$scope.confirmPassword) {
			return toastError($translate.instant('ERR_NO_SECND_PASSWORD'));;
		}
		var secondPwd = $scope.secondpassword.trim();
		var confirmPwd = $scope.confirmPassword.trim();
		if (secondPwd != confirmPwd) {
			toastError($translate.instant('ERR_TWO_INPUTS_NOT_EQUAL'));
		} else if (!reg.test(secondPwd)) {
			toastError($translate.instant('ERR_PASSWORD_INVALID_FORMAT'));
		} else if (reg.test(secondPwd) && reg.test(confirmPwd) && secondPwd == confirmPwd) {
			var transaction = AschJS.signature.createSignature(userService.secret, $scope.secondpassword);
			postSerivice.post(transaction).success(function (res) {
				if (res.success == true) {
					$scope.passwordsure = true;
					toast($translate.instant('INF_SECND_PASSWORD_SET_SUCCESS'));
					$rootScope.setpsd = false;
					$rootScope.isBodyMask = false;
				} else {
					toastError(res.error)
				};
			}).error(function (res) {
				toastError($translate.instant('ERR_SERVER_ERROR'));
			});
		}
	}
}); 