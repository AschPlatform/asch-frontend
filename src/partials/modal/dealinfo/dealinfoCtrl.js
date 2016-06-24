/**
 * Created by zenking on 16/6/21.
 */
/**
 * Created by zenking on 16/6/19.
 */
angular.module('asch').controller('dealinfoCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {

    $rootScope.dealdetailinfo = false;
    // $scope.$on('headCancel', function (d,data) {
    //     $scope.headCancelData = data;
    // });
    $scope.CloseDealinfo = function () {
        $rootScope.isBodyMask = false;
        $rootScope.dealdetailinfo = false;
    };
    $scope.init = function(params) {
     
    };


});
