/**
 * Created by zenking on 16/7/2.
 */
angular.module('asch').controller('acceptCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {

    $rootScope.acceptinfo = false;
    $rootScope.sentinfo = false;
    // $scope.$on('headCancel', function (d,data) {
    //     $scope.headCancelData = data;
    // });
    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.acceptinfo = false;
    };
    $scope.sentShowInfo = function (i) {
        $rootScope.sentinfo = true;
        $rootScope.isBodyMask = true;
        $rootScope.acceptinfo = false;
    }
    $scope.init = function(params) {
        // window.location.href = '#/login';

        // apiService.taskAdmin(params).success(function(res) {
        //
        //
        // }).error(function(err) {
        //     toastError('服务器错误！');
        // });
    };


});
/**
 * Created by zenking on 16/7/3.
 */
