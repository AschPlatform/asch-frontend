/**
 * Created by zenking on 16/6/19.
 */
angular.module('asch').controller('blockhignCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {

    $rootScope.blockhigninfo = false;
    // $scope.$on('headCancel', function (d,data) {
    //     $scope.headCancelData = data;
    // });
    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.blockhigninfo = false;
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
