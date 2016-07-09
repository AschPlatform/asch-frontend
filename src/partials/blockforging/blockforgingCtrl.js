angular.module('asch').controller('blockforgingCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$window,NgTableParams,userService) {
	$rootScope.active = 'blockforging';
	$rootScope.userlogin = true;
	//设置基本像素
	document.documentElement.style.fontSize = document.documentElement.clientWidth/20 + "px";
	// 设置  进度条
	$scope.setInfo = function () {
		// $('.allMoney .pagea.circle').circleProgress({
		// 	emptyFill: '#e97a28'
		// });
		// $('.pagea.circle').circleProgress({
		// 	value: 0
		// })

		// setTimeout(function(){
		// 	$('.rank .pagea.circle').circleProgress({
		// 		value: 0.8,
		// 		fill: {
		// 			gradient: ['#3276c3']
		// 		}
		// 	}).on('circle-animation-progress', function(event, progress) {
		// 		var deg=progress*360;
		// 	});
		// 	$('.output .pagea.circle').circleProgress({
		// 		value: 0.8,
		// 		fill: {
		// 			gradient: ['#31b948']
		// 		}
		// 	}).on('circle-animation-progress', function(event, progress) {
		// 		var deg=progress*360;
		// 	});
		// 	$('.depiao .pagea.circle').circleProgress({
		// 		value: 0.8,
		// 		fill: {
		// 			gradient: ['#644ec3']
		// 		}
		// 	}).on('circle-animation-progress', function(event, progress) {
		// 		var deg=progress*360;
		// 	});
		// },1000)

	}
	$scope.assigneeShowInfo = function () {
		$rootScope.assigneeinfo = true;
		$rootScope.isBodyMask = true;

	}
	console.log(userService)
	$scope.init = function() {

		apiService.blockforging({
			publicKey:userService.publicKey
		}).success(function (res) {
			if(res.success == true){
				$scope.delegate = res.delegate
			};
		}).error(function (res) {

		});

		$scope.blockforgingtableparams = new NgTableParams({
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
					generatorPublicKey:userService.publicKey,
					limit: params.count(),
					orderBy: 'height:desc',
					offset: (params.page() - 1) * params.count()
				}).success(function(res) {
					params.total(res.count);
					$defer.resolve(res.blocks);
				}).error(function(res) {
					toastError('服务器错误！');
				});
			}
		});

	};


});
