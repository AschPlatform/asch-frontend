angular.module('asch').controller('reduceaclCtrl', function ($scope, $rootScope, apiService, ipCookie, $location, $window, NgTableParams, userService,postSerivice, $translate) {
    $rootScope.userlogin = true;

        console.log(  $rootScope.reduceACL)

    $scope.sub = function () {
        var currency = $scope.moneyName;
        var flag = $rootScope.reduceACL.acl;
        var operator = '-'; // '+'表示增加， ‘-’表示删除
        var list = [];

        var trs = AschJS.uia.createAcl(currency, operator, flag, list, userService.secret, $scope.secondPassword)
        postSerivice.writeoff(trs).success(function (res) {
            if (res.success == true) {
                $scope.secondPassword = '';
                toast($translate.instant('INF_TRANSFER_SUCCESS'));
            } else {
                toastError(res.error)
            };
        }).error(function (res) {
            toastError($translate.instant('ERR_SERVER_ERROR'));
        });
    };
    $scope.init= function () {
        
    }
});
