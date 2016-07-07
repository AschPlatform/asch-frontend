angular.module('asch').controller('personalCtrl',function($scope, $rootScope, apiService, checkloginservice,ipCookie,$window,$http) {
	$rootScope.active = 'personal';
	$rootScope.userlogin = true;
	//下拉菜单隐藏
	// 账单默认显示
	$scope.accountInfo  = true;
	$scope.passwordInfo  = false;
	// checkloginservice();
	// 二级密码 $scope.secondpassword
	if(!$rootScope.isLogin){
		$window.location.href = '#/login'
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
			address:ipCookie('address')
		}).success(function (res) {
			if(res.success='true'){
				//console.log('account'+ res.account.balance)
				$scope.accountinfo=res.account
			};
		}).error(function (res) {
			toastError(res.error);
		})

	}
	//二级密码设置函数
	$scope.setPassWord = function () {
		var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
		
		if(reg.test($scope.secondpassword)){
			var transaction = AschJS.signature.createSignature(ipCookie('userSecret'), $scope.secondpassword);
			$http({
				method: 'POST',
				url:'{{passwordApi}}',
				headers: {'magic': '43194d2b','version':''},
				data:transaction
			}).success( function(res) {
					if(res.success='true'){
						$scope.passwordsure = true;
						toast('支付密码设置成功!')
					};
				})
				.error( function(res) {
					toastError(res.error);
				});
		}else{
			toastError('支付密码设置格式不正确!');
		}


	}
	// 退出函数
	$scope.quitout = function () {
		//console.log(1)
		//ipCookie('userSecret','')
	   $window.location.href = '#/login'
	}
});

