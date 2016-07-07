angular.module('asch').controller('blockchainCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$window) {
	$rootScope.active = 'blockchain';
	$rootScope.userlogin = true;
	if(!$rootScope.isLogin){
		$window.location.href = '#/login'
	}
	$scope.showhignInfo = function () {
		$rootScope.blockhigninfo = true;
		$rootScope.isBodyMask = true;
		// $scope.headCancelData = {
		//
		// };
		// $scope.$broadcast('headCancel', $scope.headCancelData);// 向子级传递数据

	}
	$scope.showdealInfo = function () {
		$rootScope.dealdetailinfo = true;
		$rootScope.isBodyMask = true;
	}
	
	var  params = {
		orderBy: '',
		limit: '',
		offset: '',
		height: ''
	};
	$scope.init = function(params) {
		apiService.blocks(params).success(function(res) {
			if(res.success='true'){
				$scope.blocks=res.blocks;
			};

		}).error(function(err) {
			toastError('服务器错误！');
		});
	};


});
