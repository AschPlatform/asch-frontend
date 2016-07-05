/**
 * Created by zenking on 16/7/2.
 */
angular.module('asch').controller('assigneeCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {

    $rootScope.assigneeinfo = false;
    // $scope.$on('headCancel', function (d,data) {
    //     $scope.headCancelData = data;
    // });
    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.assigneeinfo = false;
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
