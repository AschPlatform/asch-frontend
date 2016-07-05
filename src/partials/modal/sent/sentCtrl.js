/**
 * Created by zenking on 16/7/3.
 */
/**
 * Created by zenking on 16/7/2.
 */
angular.module('asch').controller('sentCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {

    $rootScope.sentinfo = false;
    // $scope.$on('headCancel', function (d,data) {
    //     $scope.headCancelData = data;
    // });
    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.sentinfo = false;
    };

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
