// angular.module('asch').config(['$compileProvider', function ($compileProvider) {
// 	$compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
// }]);

angular.module('asch').controller('loginCtrl', function($scope, $rootScope, apiService, ipCookie, $window, $location) {
	$rootScope.userlogin = false;
	 $rootScope.register = true;
	 $rootScope.creatpwd = false;
	 $rootScope.checkpwd = false;
	 $rootScope.homedata = {};

	//密码生成
	var code = new Mnemonic(Mnemonic.Words.ENGLISH);
	//$scope.secret=code.toString();
	$scope.newuser = function () {
		$rootScope.register = false;
		$rootScope.creatpwd = true;
		$rootScope.checkpwd = false;
		$scope.newsecret=code.toString();
	};
	//默认保持登录
	$scope.saveLogin =true;
	//读取cookie
	if(ipCookie('userSecret')){
		if($scope.saveLogin){
			$scope.secret =ipCookie('userSecret');
		} else {
			$scope.secret='';
		}
	};
	// 取消默认保持状态清楚cookie
	$scope.saveLoginChange = function () {
		$scope.saveLogin =!$scope.saveLogin;
		//}
		//console.log($scope.saveLogin)
		if(!$scope.saveLogin){

			$scope.secret =ipCookie('userSecret');
		}
		else {
			ipCookie('userSecret','');
			$scope.secret =ipCookie('userSecret');
		}
	}
	// //确认下一步
	// $scope.checkstep = function () {
	// 	$rootScope.register = false;
	// 	$rootScope.creatpwd = false;
	// 	$rootScope.checkpwd = true;
	// };
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
	$scope.saveTxt = function (filename) {
		var text = $scope.newsecret;
		console.log($scope.newsecret)
		var link = document.createElement("a");
		link.setAttribute("target","_blank");
		if(Blob !== undefined) {
			var blob = new Blob([text], {type: "text/plain"});
			link.setAttribute("href", URL.createObjectURL(blob));
		} else {
			link.setAttribute("href","data:text/plain," + encodeURIComponent(text));
		}
		link.setAttribute("download",filename);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		$scope.saveCookie();
	}
	$scope.saveCookie = function () {
		ipCookie('userSecret',$scope.secret);
		console.log(ipCookie('userSecret'));
	}
	//登录
	$scope.registerin = function () {
		//$location.path('/home').replace();
		if($scope.secret ==ipCookie('userSecret')){
			// 放在localstroge secret
			apiService.loginin({
				secret: $scope.secret
			}).success(function(res) {
				$rootScope.homedata = res;
				if(res.success='true'){
					$window.location.href = '#/home'
				}
			}).error(function(res) {
				toastError(res.error);
			});
		} else{
			toastError('账户不存在,清新注册');
		}


	}


	//下一步登录
	$scope.nextStep = function () {
		$rootScope.register = false;
		$rootScope.creatpwd = false;
		$rootScope.checkpwd = true;
		apiService.loginin({
			secret: $scope.secret
		}).success(function(res) {
			$rootScope.homedata = res;
			if(res.success='true'){
				ipCookie('userSecret',$scope.newsecret);
				console.log(ipCookie('userSecret'))
				$window.location.href = '#/home'
			}
		}).error(function(res) {
			toastError(res.error);
		});
	}
});
