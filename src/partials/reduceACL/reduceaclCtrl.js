angular.module('asch').controller('reduceaclCtrl', function ($scope, $rootScope, apiService, ipCookie, $location, $window, NgTableParams, userService,postSerivice, $translate) {
    $rootScope.userlogin = true;
    console.log(1)
    $scope.comfirmDialog = false;
    $scope.updateAcl = function () {
        var currency = $scope.reduceACL.name;
        var flag = $rootScope.reduceACL.acl;
        var operator = '-'; // '+'表示增加， ‘-’表示删除
        var list = [];

        $scope.reduceacltrs = AschJS.uia.createAcl(currency, operator, flag, list, userService.secret, $scope.secondPassword);
        $scope.comfirmDialog = true;
        $rootScope.isBodyMask = true;
    };
    $scope.comfirmDialogClose = function () {
        $rootScope.isBodyMask = false;
        $scope.comfirmDialog = false;
    };
    $scope.comfirmSub = function () {
        var trs = $scope.reduceacltrs;
        postSerivice.post(trs).success(function (res) {
            if (res.success == true) {
                toast($translate.instant('INF_REGISTER_SUCCESS'));
                $scope.comfirmDialogClose();
            } else {
                toastError(res.error)
            };
        }).error(function (res) {
            toastError($translate.instant('ERR_SERVER_ERROR'));
        });
    }
    $scope.init= function () {
        $scope.listparams = new NgTableParams({
            page: 1,
            count: 20,
            sorting: {
                height: 'desc'
            }
        }, {
            total: 0,
            counts: [],
            getData: function ($defer, params) {
                apiService.assetAcl({
                    address: userService.address,
                    orderBy: 'rate:asc',
                    limit: params.count(),
                    offset: (params.page() - 1) * params.count()
                }).success(function (res) {
                    //  $scope.res =res;
                    // params.data=res.delegates;
                    params.total(res.list);

                    // return res.delegates;
                    $defer.resolve(res.list);
                }).error(function (res) {
                    toastError($translate.instant('ERR_SERVER_ERROR'));
                });
            }
        });
    }
});
