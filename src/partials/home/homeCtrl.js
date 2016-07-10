angular.module('asch').controller('homeCtrl',function($scope, $rootScope, apiService, $http,ipCookie, $location, $interval,NgTableParams,$window,userService) {
	$rootScope.active = 'home';
	$rootScope.userlogin = true;
	$scope.acceptShowInfo = function (i) {
		$rootScope.acceptinfo = true;
		$rootScope.isBodyMask = true;
	}
	
	$scope.init = function(params) {
		apiService.account({
			address: AschJS.crypto.getAddress(userService.publicKey)
		}).success(function(res) {
			if(res.success==true){
				$scope.account = res.account;
				$scope.latestBlock = res.latestBlock;
				$scope.version = res.version;
				// 余额显示
				//Account(res.account.address);
				//console.log(res.account.publicKey)
				//console.log(ngTableParams)
				//if($rootScope.active == '/home'){
				// 	var timer = $interval(function(){
				// 		Account(res.account.address);
				// 	},10000);
				//}

				// 最新价易展示
				//transactions('0','',res.account.publicKey)
				jiaoyi(userService.address,userService.publicKey)
			};
			
		}).error(function(res) {
			toastError(res.error);
		});
	};
   // 交易ngtable版

	function jiaoyi(recipientId,senderPublicKey) {

		$scope.hometableparams = new NgTableParams({
			page: 1,
			count: 20,
			sorting: {
				height: 'desc'
			}
		}, {
			total: 0,
			counts: [],
			getData: function($defer,params) {
				apiService.transactions({
					recipientId:recipientId,
					senderPublicKey:userService.publicKey,
					orderBy: 't_timestamp:desc',
					limit: params.count(),
					offset: (params.page() - 1) * params.count()
				}).success(function(res) {
					if(res.success==true){
						params.total(res.count);
						$defer.resolve(res.transactions);
					}else{
						toastError(res.error);
					}

				}).error(function(res) {
					toastError('服务器错误！');
				});
			}
		});
	}
});
