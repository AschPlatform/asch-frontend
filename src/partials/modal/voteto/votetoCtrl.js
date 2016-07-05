angular.module('asch').controller('votetoCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {

    $rootScope.votetoinfo = false;
    // $scope.$on('headCancel', function (d,data) {
    //     $scope.headCancelData = data;
    // });
    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.votetoinfo = false;
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
/**
 * Created by zenking on 16/7/3.
 */
