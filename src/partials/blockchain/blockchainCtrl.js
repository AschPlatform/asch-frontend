angular.module('asch').controller('blockchainCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {
	$rootScope.active = 'blockchain';
	$rootScope.userlogin = true;
	
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
		// $scope.headCancelData = {
		//
		// };
		// $scope.$broadcast('headCancel', $scope.headCancelData);// 向子级传递数据

	}
	
	$scope.init = function(params) {
		// window.location.href = '#/login';
		
		// apiService.taskAdmin(params).success(function(res) {
		//
        //
		// }).error(function(err) {
		// 	toastError('服务器错误！');
		// });
	};


});
