angular.module('asch').controller('loginCtrl', function ($scope, $rootScope, apiService, ipCookie, $window, $location, userService, $translate) {
	$rootScope.bgimg = 'earth';
	$rootScope.userlogin = false;
	// bgchange
	$rootScope.isEarth = true;
	$rootScope.isHeart = false;
	$rootScope.isEgg = false;
	$rootScope.register = true;
	$rootScope.creatpwd = false;
	$rootScope.checkpwd = false;
	$rootScope.homedata = {};
	$rootScope.selectedNode = 'mainnet.asch.so'

	$scope.languages = [
		{key: 'en-us', value: 'English'},
		{key: 'zh-cn', value: '中文简体'}
	];

	$scope.changeLanguage = function () {
		/*console.log($translate.proposedLanguage());*/
		if (!$scope.selectedLanguage) {
			var key = $translate.proposedLanguage();
			for (var i = 0; i < $scope.languages.length; ++i) {
				if ($scope.languages[i].key === key) {
					$scope.selectedLanguage = $scope.languages[i];
					break;
				}
			}
		}
		$translate.use($scope.selectedLanguage.key);
		$scope.languageIcon = '/assets/common/' + $scope.selectedLanguage.key + '.png';
	}
	$scope.changeLanguage();
	
	$scope.newuser = function () {
		$rootScope.isEarth = false;
		$rootScope.isHeart = true;
		$rootScope.isEgg = false;
		$rootScope.register = false;
		$rootScope.creatpwd = true;
		$rootScope.checkpwd = false;
		var code = new Mnemonic(Mnemonic.Words.ENGLISH);
		$scope.newsecret = code.toString();
		newpublicKey = AschJS.crypto.getKeys($scope.newsecret).publicKey;
		$rootScope.newpublicKey = newpublicKey
	};

	// if(userService.setsecret){
	// 			$scope.secret =userService.setsecret;
	// } else {
	// 	$scope.secret = '';
	// }
	//默认保持登录
	$scope.saveLogin = true;
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
		// bgimg
		$rootScope.isEgg = false;
		$rootScope.isHeart = false;
		$rootScope.isEarth = true;
	};
	$scope.close = function () {
		$rootScope.register = true;
		$rootScope.creatpwd = false;
		$rootScope.checkpwd = false;
		// bgimg
		$rootScope.isEgg = false;
		$rootScope.isHeart = false;
		$rootScope.isEarth = true;
	}
	//确认
	$scope.lastcheck = function () {
		if ($scope.newsecret == $scope.lastsecret) {
			apiService.login({
				publicKey: newpublicKey
			}).success(function (res) {
				$rootScope.homedata = res;
				if (res.success == true) {
					userService.setData($scope.newsecret, newpublicKey, res.account, res.latestBlock);
					// 是否登录的全局变量
					$rootScope.isLogin = true;
					$location.path('/home');
				}
			}).error(function (res) {
				toastError(res.error);
			});
		} else {
			toastError($translate.instant('ERR_PASSWORD_NOT_EQUAL'));
		}
	}
	$scope.saveTxt = function (filename) {
		console.log("save actived!")
		var text = $scope.newsecret.trim();
		console.log("save actived 1")
		var address = AschJS.crypto.getAddress(newpublicKey);
		console.log("save actived 2")
		txt = 'secret:' + '\r\n' + text + '\r\n\r\n' + 'address:' + '\r\n' + address + '\r\n';
		console.log("save actived 3" + txt)
		var link = document.createElement("a");
		console.log("save actived 4" + link)
		link.setAttribute("target", "_blank");
		console.log("save actived 5")
		if (Blob !== undefined) {
			console.log("save actived if 1")
			var blob = new Blob([txt], { type: "text/plain" });
			console.log("save actived if 1 2")
			link.setAttribute("href", URL.createObjectURL(blob));
			console.log("save actived if 1 3" + link)
		} else {
			console.log("save actived if 2")
			link.setAttribute("href", "data:text/plain," + encodeURIComponent(txt));
		}
		console.log("save actived after if 1")
		link.setAttribute("download", filename);
		console.log("save actived after if 2")
		document.body.appendChild(link);
		console.log("save actived after if 3")
		link.click();
		console.log("save actived after click 4")
		document.body.removeChild(link);
		console.log("save actived after end")
	}
	// $scope.saveCookie = function () {
	// 	ipCookie('userSecret',$scope.secret);
	// 	//console.log(ipCookie('userSecret'));
	//}
	//登录
	$scope.registerin = function () {
		if (!$scope.secret) {
			toastError($translate.instant('ERR_INPUT_PASSWORD'));
			return;
		}
		if (!Mnemonic.isValid($scope.secret)) {
			return toastError($translate.instant('ERR_VIOLATE_BIP39'));
		}
		var publicKey = AschJS.crypto.getKeys($scope.secret).publicKey;
		$rootScope.publickey = publicKey;
		apiService.login({
			publicKey: publicKey
		}).success(function (res) {
			$rootScope.homedata = res;
			if (res.success == true) {
				userService.setData($scope.secret, publicKey, res.account, res.latestBlock)
				// 是否登录的全局变量
				$rootScope.isLogin = true;
				$location.path('/home');
			} else {
				toastError($translate.instant('ERR_SERVER_ERROR'));
			}
		}).error(function (res) {
			toastError($translate.instant('ERR_SERVER_ERROR'));
		})
	}
	//下一步登录
	$scope.nextStep = function () {
		$rootScope.register = false;
		$rootScope.creatpwd = false;
		$rootScope.checkpwd = true;
		// bgimg
		$rootScope.isEarth = false;
		$rootScope.isHeart = false;
		$rootScope.isEgg = true;
	}
});
