// angular.module('asch').config(['$compileProvider', function ($compileProvider) {
// 	$compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
// }]);

angular.module('asch').controller('loginCtrl', function($scope, $rootScope, apiService, ipCookie, $window, $location) {
	$rootScope.userlogin = false;
	 $rootScope.register = true;
	 $rootScope.creatpwd = false;
	 $rootScope.checkpwd = false;
	 $rootScope.homedata = {};
	$scope.newuser = function () {
		$rootScope.register = false;
		$rootScope.creatpwd = true;
		$rootScope.checkpwd = false;
	};
	//确认下一步
	$scope.checkstep = function () {
		$rootScope.register = false;
		$rootScope.creatpwd = false;
		$rootScope.checkpwd = true;
	};
  // 返回
	$scope.backto = function () {
		$rootScope.register = true;
		$rootScope.creatpwd = false;
		$rootScope.checkpwd = false;
	};
	//确认
	$scope.lastcheck = function () {
		$location.path('/home');
	}

	//保存密码
	// var data = $scope.secret,
	// 	blob = new Blob([data], { type: 'text/plain' }),
	// 	url = $window.URL || $window.webkitURL;
	// $scope.fileUrl = url.createObjectURL(blob);
	//登录
	$scope.registerin = function () {
		var code = new Mnemonic(Mnemonic.Words.ENGLISH);
		console.log(code.toString()); 
		
		var toId = '910549356591813508';
		var amount = 100;
		var secret = code.toString();
		var c = null;
		var transaction = AschJS.transaction.createTransaction(
			toId,
			amount * 100000000,
			secret,
			secret
		)
		console.log(transaction);
		//$location.path('/home').replace();
		
		// 放在localstroge secret
		apiService.loginin({
			secret: 'enhance gun coral like skull reform entire virus torch hunt blame category'
		}).success(function(res) {
			$rootScope.homedata = res;
			if(res.success='true'){
				$window.location.href = '#/home'
			}
		}).error(function(err) {
			toastError(res.error);
		});
		
	}

});
