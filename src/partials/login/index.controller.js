angular.module('webrrc').controller('loginCtrl', function($scope, $rootScope, apiService, ipCookie, $window, $location) {

	$rootScope.hideSideBar = true;

	$scope.appKey = 'fb371c48e9a9b2a1174ed729ae888513';
	$scope.qrToken;
	$scope.qrcodeString = '';


	$scope.init = function () {
		apiService.getQRCode( { 'appKey': $scope.appKey } ).success( function( data ) {

			var tmpObj = {};

			$scope.loaded = true;

			if( data.error.returnCode != 0 ) {
				toastError( '获取二维码失败' );
				return;
			}

			$scope.qrToken = tmpObj.content = data.data.token;

			tmpObj.type = 'webLogin';

			$scope.qrcodeString = JSON.stringify( tmpObj );

			jQuery('#qrcode').qrcode({width: 280,height: 280,text: $scope.qrcodeString });

			getQRCodeStatus();
		} );
	};

	function getQRCodeStatus() {
		apiService.getQRCodeStatus( {
			'appKey': $scope.appKey,
			'token': $scope.qrToken
		} ).success( function( resData ) {
			if( resData.error.returnCode != 0 && resData.error.returnCode != 2) {
				getQRCodeStatus();
			} else if(resData.error.returnCode == 2) {
				//$window.location.hash = '#/login';
				$window.location.reload();
			} else {
				$scope.loginToken = resData.data.loginToken;
				//通过接口 获取用户信息 并且放入rootScope的userInfo里
				apiService.getInfo(
					{ 'login_token': $scope.loginToken }
				).success(function (data) {
					$rootScope.userInfo = data.data;
					 ipCookie(
						 'rrc_user',
						 JSON.stringify( $rootScope.userInfo ),
						 { expires: 1 }
					 );
					//跳转页面至任务管理页面
					$rootScope.hideSideBar = false;
					$window.location.href = '#/taskAdmin';
				});
			}
		} )
	}
	/*function getQRCodeStatus() {
		//通过接口 获取用户信息 并且放入rootScope的userInfo里
		apiService.getInfo(
			{'admin_member_id' : $location.search().admin_member_id}
		).success(function (data) {
			$rootScope.userInfo = data.data;
			ipCookie(
				'rrc_user',
				JSON.stringify( $rootScope.userInfo ),
				{ expires: 1 }
			);
			//跳转页面至任务管理页面
			$rootScope.hideSideBar = false;
			$window.location.href = '#/taskAdmin?admin_member_id=' + $location.search().admin_member_id;

		});
	}
	var flag = $location.search().quit;
	if (!flag) {
		getQRCodeStatus();
	}*/

});
