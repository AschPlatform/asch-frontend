angular.module('asch').controller('blockforgingCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {
	$rootScope.active = 'blockforging';
	$rootScope.userlogin = true;
	$rootScope.blockStatus = false;

	
	$scope.init = function(params) {
		// window.location.href = '#/login';
		
		apiService.taskAdmin(params).success(function(res) {
			

		}).error(function(err) {
			toastError('服务器错误！');
		});
	};


});
