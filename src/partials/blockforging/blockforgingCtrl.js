angular.module('asch').controller('blockforgingCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$window,NgTableParams) {
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
	$scope.init = function() {

		apiService.blockforging({
			publicKey:$rootScope.publickey
		}).success(function (res) {
			if(res.success='true'){
				$scope.delegate = res.delegate
			};
		}).error(function (res) {

		});
		// apiService.blocks({
		// 	publicKey:$rootScope.publickey
		// }).success(function (res) {
		// 	if(res.success='true'){
		// 		$scope.blocks=res.blocks;
		// 	};
		// }).error(function (res) {
        //
		// });
////////////////ng-table
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
				//console.log($defer)
				// console.log(params)
				apiService.blocks({
					generatorPublicKey:$rootScope.publickey,
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
