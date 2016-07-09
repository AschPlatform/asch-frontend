// angular.module('asch').config(['$compileProvider', function ($compileProvider) {
// 	$compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
// }]);

angular.module('asch').controller('loginCtrl', function($scope, $rootScope, apiService, ipCookie, $window, $location,userService) {
	$rootScope.userlogin = false;
	 $rootScope.register = true;
	 $rootScope.creatpwd = false;
	 $rootScope.checkpwd = false;
	 $rootScope.homedata = {};
	$scope.newuser = function () {
		$rootScope.register = false;
		$rootScope.creatpwd = true;
		$rootScope.checkpwd = false;
		var code = new Mnemonic(Mnemonic.Words.ENGLISH);
		$scope.newsecret=code.toString();
		newpublicKey = AschJS.crypto.getKeys($scope.newsecret).publicKey;
		$rootScope.newpublicKey=newpublicKey
	};

	// if(userService.setsecret){
	// 			$scope.secret =userService.setsecret;
	// } else {
	// 	$scope.secret = '';
	// }
	//默认保持登录
	$scope.saveLogin =true;
	//读取cookie
	// if(ipCookie('userSecret')){
	// 	if($scope.saveLogin){
	// 		$scope.secret =ipCookie('userSecret');
	// 	} else {
	// 		$scope.secret='';
	// 	}
	// };
	// 取消默认保持状态清楚cookie
	// $scope.saveLoginChange = function () {
	// 	$scope.saveLogin =!$scope.saveLogin;
	// 	//}
	// 	//console.log($scope.saveLogin)
	// 	if(!$scope.saveLogin){
    //
	// 		$scope.secret =ipCookie('userSecret');
	// 	}
	// 	else {
	//
	// 		$scope.secret =ipCookie('userSecret');
	// 	}
	// }
	$scope.backto = function () {
		$rootScope.register = true;
		$rootScope.creatpwd = false;
		$rootScope.checkpwd = false;
	};
	$scope.close = function () {
		$rootScope.register = true;
		$rootScope.creatpwd = false;
		$rootScope.checkpwd = false;
	}
	//确认
	$scope.lastcheck = function () {
		if($scope.newsecret == $scope.lastsecret){
			apiService.homeloginin({
				publicKey: newpublicKey
			}).success(function(res) {
				$rootScope.homedata = res;
				if(res.success==true){
					userService.setData($scope.newsecret,res.account.address,newpublicKey,res.account.balance,res.account.secondPublicKey);
					// console.log(userService.setsecret)
					// ipCookie('userSecret',$scope.newsecret);
					// $rootScope.useraddress=res.account.address;
					// $rootScope.userbalance=res.account.balance;
					$rootScope.userpublickey=res.account.secondPublicKey;
					// 是否登录的全局变量
					$rootScope.isLogin = true;
					$location.path('/home');
				}
			}).error(function(res) {
				toastError(res.error);
			});
		} else {
			toastError('您输入的主密码不一致')
		}
	}
	$scope.saveTxt = function (filename) {
		var text = $scope.newsecret;
		txt = 'secret:'+'\r\n'+text + '\r\n\r\n' +'address:'+ '\r\n'+address+'\r\n';
		console.log($scope.newsecret)
		var link = document.createElement("a");
		link.setAttribute("target","_blank");
		if(Blob !== undefined) {
			var blob = new Blob([txt], {type: "text/plain"});
			link.setAttribute("href", URL.createObjectURL(blob));
		} else {
			link.setAttribute("href","data:text/plain," + encodeURIComponent(txt));
		}
		link.setAttribute("download",filename);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		$scope.saveCookie();
	}
	// $scope.saveCookie = function () {
	// 	ipCookie('userSecret',$scope.secret);
	// 	//console.log(ipCookie('userSecret'));
	//}
	//登录
	$scope.registerin = function () {
		var publicKey = AschJS.crypto.getKeys($scope.secret).publicKey;
		    $rootScope.publickey = publicKey;
			apiService.homeloginin({
				publicKey: publicKey
			}).success(function(res) {
				$rootScope.homedata = res;
				if(res.success==true){
					userService.setData($scope.secret,res.account.address,publicKey,res.account.balance,res.account.secondPublicKey)
					// 是否登录的全局变量
					$rootScope.isLogin = true;
					// $rootScope.useraddress=res.account.address;
					// $rootScope.userbalance=res.account.balance;
					$rootScope.userpublickey=res.account.secondPublicKey;
					//$rootScope.publickey=res.account.publicKey;
					$location.path('/home');
				} else{
					toastError('服务器错误!');
				}
			}).error(function(res) {
				toastError('服务器错误!');
			})
	}
	//下一步登录
	$scope.nextStep = function () {
		$rootScope.register = false;
		$rootScope.creatpwd = false;
		$rootScope.checkpwd = true;
	}
});
