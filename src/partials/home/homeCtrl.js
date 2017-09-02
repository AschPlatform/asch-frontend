angular.module('asch').controller('homeCtrl', function ($scope, $rootScope, apiService, $http, ipCookie, $location, $interval, NgTableParams, $window, userService, $translate) {
	$rootScope.active = 'home';
	$rootScope.userlogin = true;
	$scope.acceptShowInfo = function (i) {
		$rootScope.acceptinfo = true;
		$rootScope.isBodyMask = true;
	}

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
				jiaoyi(userService.address, userService.publicKey);
				jiaoyiylb(userService.address);
				console.log($scope.userService);
				console.log($rootScope.homedata);
			};

		}).error(function (res) {
			toastError(res.error);
		});
		apiService.uiaBalanceApi(userService.address,'absorb.YLB').success(function (res) {
			$scope.ylbAsset = res.balance || {};
			$scope.ylbAsset.balanceShow = Number($scope.ylbAsset.balanceShow || 0);
			// console.log('1');
			console.log(res);
		}).error(function (res) {
			
		});
		apiService.myBalances({
			address: userService.address
		}).success(function (res) {
			$scope.xasAsset = res;
			console.log($scope.xasAsset);
		});
	};
	// 交易ngtable版

	function jiaoyi(recipientId, senderPublicKey) {

		$scope.hometableparams = new NgTableParams({
			page: 1,
			count: 20,
			sorting: {
				height: 'desc'
			}
		}, {
				total: 0,
				counts: [],
				getData: function ($defer, params) {
					console.log("jiaoyi?")
					apiService.transactions({
						recipientId: recipientId,
						senderPublicKey: userService.publicKey,
						orderBy: 't_timestamp:desc',
						limit: params.count(),
						offset: (params.page() - 1) * params.count()
					}).success(function (res) {
						console.log(res);
						if (res.success == true) {
							params.total(res.count);
							$defer.resolve(res.transactions);
						} else {
							toastError(res.error);
						}

					}).error(function (res) {
						toastError($translate.instant('ERR_SERVER_ERROR'));
					});
				}
			});
	}

	// 引力波交易获取
	function jiaoyiylb(address) {
		
				$scope.ylbtable = new NgTableParams({
					page: 1,
					count: 20,
					sorting: {
						height: 'desc'
					}
				}, {
						total: 0,
						counts: [],
						getData: function ($defer, params) {
							console.log("jiaoyi?")
							apiService.uiaTransferApi(address).success(function (res) {
								console.log(res);
								if (res.success == true) {
									params.total(res.count);
									$defer.resolve(res.transactions);
								} else {
									toastError(res.error);
								}
		
							}).error(function (res) {
								toastError($translate.instant('ERR_SERVER_ERROR'));
							});
						}
					});
			}
});
