angular.module('asch').controller('homeCtrl',function($scope, $rootScope, apiService, $http,ipCookie, $location, $interval) {
	$rootScope.active = 'home';
	$rootScope.userlogin = true;
	//$scope.$pagination = $('.pagination >li').closest('.active').children().html();


	$scope.acceptShowInfo = function (i) {
		$rootScope.acceptinfo = true;
		$rootScope.isBodyMask = true;
	}
	
	$scope.init = function(params) {
		apiService.loginin({
			secret: '从cookie中读取'
		}).success(function(res) {
			//$rootScope.homedata = res;
			if(res.success='true'){
				// 余额显示
				Account(res.address);
				//console.log(ngTableParams)
				//if($rootScope.active == '/home'){
					var timer = $interval(function(){
						Account(res.address);
					},10000);
				//}

				// 最新价易展示
				transactions('0','','')

			};
			
		}).error(function(res) {
			toastError(res.error);
		});
	};
    // 账号请求函数
	function Account(address) {
		apiService.account({
			address:address
		}).success(function (res) {
			if(res.success='true'){
				//console.log('account'+ res.account.balance)
				$scope.balance=res.account.balance
			};
		}).error(function (res) {
			toastError(res.error);
		})

	}
	// 获取最新交易
	function transactions(limit,recipientId,senderPublicKey) {
		var params = {
			limit:limit,
			recipientId:recipientId,
			senderPublicKey:senderPublicKey,
			orderBy:'t_timestamp:desc'
		};
		apiService.transactions(params).success(function (res) {
			if(res.success='true'){
            
				console.log(res.transactions)
				$scope.transactions=res.transactions
			};
		}).error(function (res) {
			toastError();
		})
		
	}

});
