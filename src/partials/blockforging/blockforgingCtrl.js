angular.module('asch').controller('blockforgingCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {
	$rootScope.active = 'blockforging';
	$rootScope.userlogin = true;
	$rootScope.blockStatus = false;
	//设置基本像素
	document.documentElement.style.fontSize = document.documentElement.clientWidth/20 + "px";
	// 设置  进度条
	$scope.setInfo = function () {
		$('.allMoney .pagea.circle').circleProgress({
			emptyFill: '#e97a28'
		});
		$('.pagea.circle').circleProgress({
			value: 0
		})

		setTimeout(function(){
			$('.rank .pagea.circle').circleProgress({
				value: 0.8,
				fill: {
					gradient: ['#3276c3']
				}
			}).on('circle-animation-progress', function(event, progress) {
				var deg=progress*360;
			});
			$('.output .pagea.circle').circleProgress({
				value: 0.8,
				fill: {
					gradient: ['#31b948']
				}
			}).on('circle-animation-progress', function(event, progress) {
				var deg=progress*360;
			});
			$('.depiao .pagea.circle').circleProgress({
				value: 0.8,
				fill: {
					gradient: ['#644ec3']
				}
			}).on('circle-animation-progress', function(event, progress) {
				var deg=progress*360;
			});
		},1000)

	}
	
	$scope.init = function(params) {
		// window.location.href = '#/login';
		$scope.setInfo();
		apiService.taskAdmin(params).success(function(res) {
			

		}).error(function(err) {
			toastError('服务器错误！');
		});
	};


});
