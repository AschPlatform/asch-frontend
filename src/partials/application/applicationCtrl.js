angular.module('asch').controller('applicationCtrl', function ($scope, $rootScope, apiService, ipCookie, $location, $window, NgTableParams, userService, $translate, postSerivice) {
	$rootScope.active = 'application';
	$rootScope.userlogin = true;
	$scope.newapplication = true;
	$scope.installed = false;
  $scope.isShowBalance = false;
	$scope.currencys = [
    { key: '0', value: 'XAS' }
  ]

  // 由于设置二级密码的bug 导致这里要刷新一下userService
  $scope.init = function (params) {
    apiService.account({
      address: userService.address
    }).success(function (res) {
      if (res.success == true) {
        userService.update(res.account, res.latestBlock);
        $scope.userService = userService;
      };
    }).error(function (res) {
      toastError(res.error);
    });
  };
	// gossip beauty morning churn jaguar wine skull poem economy final increase prepare
	$scope.newapplicationchange = function () {
		$scope.newapplication = true;
		$scope.installed = false;
		$scope.applist = new NgTableParams({
			page: 1,
			count: 20,
			sorting: {
				height: 'desc'
			}
		}, {
				total: 0,
				counts: [],
				getData: function ($defer, params) {
					apiService.appList({
						limit: params.count(),
						offset: (params.page() - 1) * params.count()
					}).success(function (res) {
						params.total(res.count);
						$defer.resolve(res.dapps);
					}).error(function (res) {
						toastError($translate.instant('ERR_SERVER_ERROR'));
					});
				}
			});
	}
	$scope.newapplicationchange();
	$scope.installedchange = function () {
		$scope.newapplication = false;
		$scope.installed = true;

		$scope.appinstalled = new NgTableParams({
			page: 1,
			count: 20,
		}, {
				total: 0,
				counts: [],
				getData: function ($defer) {
					apiService.appInstalled({
					}).success(function (res) {
						$defer.resolve(res.dapps);
					}).error(function (res) {
						toastError($translate.instant('ERR_SERVER_ERROR'));
					});
				}
			});
	};
	$scope.depositDapp = function(dapp) {
		$scope.depositedDapp = dapp;
	};
	$scope.showBalance = function(dapp){
    console.log('show balance')
		apiService.appBalance({
			appId: dapp.transactionId,
			address: userService.address
		}).success(function (balancesRes) {
      console.log('balancesRes', balancesRes)
			if (!balancesRes.balances) {
				$scope.showBalances = balancesRes.balances;
				return;
			}
      if (balancesRes.balances.length == 0) {
        toastError($translate.instant('ERR_NO_BALANCE'));
        return;
      }
     
			for (var i = 0; i < balancesRes.balances.length; i ++){
				var balance = balancesRes.balances[i]
				if (balance.currency == 'XAS') {
					balance.quantityShow = 100000000;
				}	else {
					apiService.assetApi({
						name: 'asch.' + balance.currency
					}).success(function (assetsRes) {
						balance.quantityShow = assetsRes.asset.quantityShow;
					}).error(function(res){
						toastError($translate.instant('ERR_SERVER_ERROR'));
					})
				}
			}
			$scope.showBalances = balancesRes.balances;
      var tableHeight = $scope.showBalances.length > 4 ? 370 : ($scope.showBalances.length + 1 ) * 70 + 20
      $scope.tableStyle = {
        height: tableHeight + 'px',
        top: 'calc(50% - ' + tableHeight / 2  + 'px)'
      }
      if ($scope.showBalances.length > 4) {
        $scope.tableStyle['overflow-y'] = 'scroll';
      }
      $scope.isShowBalance = true;
		}).error(function (res) {
			toastError($translate.instant('ERR_SERVER_ERROR'));
		})
	};
	$scope.closeShowBalance = function() {
    $scope.isShowBalance = false;
		$scope.showBalances = [];
	};
	$scope.closeDeposit = function() {
		$scope.depositedDapp = null;
		$scope.amount = 0;
		$scope.secondPassword = '';
	};
	$scope.sentMsg = function () {
    var transaction;
    if (!$scope.depositedDapp) {
        toastError($translate.instant('ERR_NO_RECIPIENT_ADDRESS'));
        return false;
    }
    if ($scope.depositedDapp.transactionId == userService.address) {
        toastError($translate.instant('ERR_RECIPIENT_EQUAL_SENDER'));
        return false;
    }
    if (!$scope.amount || Number($scope.amount) <= 0) {
        toastError($translate.instant('ERR_AMOUNT_INVALID'));
        return false;
    }
    var amount = parseFloat(($scope.amount * 100000000).toFixed(0));
    var fee = 10000000;
    if (amount + fee > userService.balance) {
        toastError($translate.instant('ERR_BALANCE_NOT_ENOUGH'));
        return false;
    }
  
    
    if (userService.secondPublicKey && !$scope.secondPassword) {
        toastError($translate.instant('ERR_NO_SECND_PASSWORD'));
        return false;
    }
    if (!userService.secondPublicKey) {
        $scope.secondPassword = '';
    }
    var transaction = AschJS.transfer.createInTransfer($scope.depositedDapp.transactionId, $scope.currency.value, amount, userService.secret, $scope.secondPassword);
    postSerivice.post(transaction).success(function (res) {
       if (res.success == true) {
            $scope.passwordsure = true;
            $scope.amount = '';
            $scope.secondPassword = '';
            $scope.depositedDapp = null;
            toast($translate.instant('INF_TRANSFER_SUCCESS'));
        } else {
            toastError(res.error)
        };
    }).error(function (res) {
        toastError($translate.instant('ERR_SERVER_ERROR'));
    });
   }
});
