angular.module('asch').controller('blockchainCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$window,NgTableParams) {
	$rootScope.active = 'blockchain';
	$rootScope.userlogin = true;
	$rootScope.showdealInfo = function (i) {
		$rootScope.blockdetailinfo = false;
		$rootScope.accountdetailinfo = false;
		$scope.i=i;
		$rootScope.$broadcast('jiaoyi',$scope.i)
	}
	$rootScope.showdetailInfo = function (i) {
		$rootScope.accountdetailinfo = false;
		$rootScope.dealdetailinfo = false;
		$scope.i=i;
		$rootScope.$broadcast('detail',$scope.i)
	}
	$rootScope.showaccountdetailInfo = function (i) {
		$rootScope.blockdetailinfo = false;
		$rootScope.dealdetailinfo = false;
		$scope.i=i;
		$rootScope.$broadcast('accountdetail',$scope.i)
	}
	
	$scope.init = function() {
		$scope.blockchaintableparams = new NgTableParams({
			page: 1,
			count: 20,
			sorting: {
				height: 'desc'
			}
		}, {
			total: 0,
			counts: [],
			getData: function($defer,params) {
				apiService.blocks({
					limit: params.count(),
					orderBy: 'height:desc',
					offset: (params.page() - 1) * params.count()
				}).success(function(res) {
					//  $scope.res =res;
					// params.data=res.delegates;
					params.total(res.count);
					// return res.delegates;
					$defer.resolve(res.blocks);
				}).error(function(res) {
					toastError('服务器错误！');
				});
			}
		});
	};
	


});
