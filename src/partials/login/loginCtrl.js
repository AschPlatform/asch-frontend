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
	//登录
	$scope.registerin = function () {
		//$location.path('/home').replace();
		apiService.loginin({
			secret: 'enhance gun coral like skull reform entire virus torch hunt blame category'
		}).success(function(res) {
			$rootScope.homedata = res;
			if(!!res){
				$window.location.href = '#/home'
			}
		}).error(function(err) {
			toastError('服务器错误！');
		});
		
	}

});
