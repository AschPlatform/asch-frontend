/**
 * Created by zenking on 2017/1/6.
 */
angular.module('asch').controller('assetCtrl', function ($scope, $rootScope, apiService, ipCookie, $location, $window, NgTableParams,userService,postSerivice, $translate) {
    $rootScope.active = 'asset';
    $rootScope.userlogin = true;
    $rootScope.isBodyMask = false;
    $scope.init = function () {

    };
    $scope.assetprofile = true;
    $scope.newapplication = false;
    $scope.installed = false;
    $scope.myAssets = false;
    $scope.operationRecord = false;
    $scope.assetprofilechange = function () {
        $scope.assetprofile = true;
        $scope.newapplication = false;
        $scope.installed = false;
        $scope.myAssets = false;
        $scope.operationRecord = false;
        $scope.blockchaintableparams = new NgTableParams({
            page: 1,
            count: 20,
            sorting: {
                height: 'desc'
            }
        }, {
            total: 0,
            getData: function ($defer, params) {
                apiService.assets({
                    limit: params.count(),
                    orderBy: 'height:desc',
                    offset: (params.page() - 1) * params.count()
                }).success(function (res) {
                    //  $scope.res =res;
                    // params.data=res.delegates;
                    params.total(res.count);
                    // return res.delegates;
                    $defer.resolve(res.assets);

                }).error(function (res) {
                    toastError($translate.instant('ERR_SERVER_ERROR'));
                });
            }
        });
    }
    $scope.newapplicationchange = function () {
        $scope.newapplication = true;
        $scope.assetprofile = false;
        $scope.installed = false;
        $scope.myAssets = false;
        $scope.operationRecord = false;
        $scope.applist = new NgTableParams({
            page: 1,
            count: 20,
            sorting: {
                height: 'desc'
            }
        }, {
            total: 0,
            counts: [],
            getData: function ($defer, params) {
                apiService.appList({
                    limit: params.count(),
                    offset: (params.page() - 1) * params.count()
                }).success(function (res) {

                    params.total(res.count);
                    $defer.resolve(res.dapps);
                }).error(function (res) {
                    toastError($translate.instant('ERR_SERVER_ERROR'));
                });
            }
        });
    }
    $scope.assetprofilechange();
    $scope.installedchange = function () {
        $scope.assetprofile = false;
        $scope.newapplication = false;
        $scope.installed = true;
        $scope.myAssets = false;
        $scope.operationRecord = false;

    };
    $scope.myAssetschange = function () {
        $scope.assetprofile = false;
        $scope.newapplication = false;
        $scope.installed = false;
        $scope.myAssets = true;
        $scope.operationRecord = false;
        $scope.myAss = new NgTableParams({
            page: 1,
            count: 20,
        }, {
            total: 0,
            counts: [],
            getData: function ($defer) {
                apiService.assets({
                }).success(function (res) {
                    $defer.resolve(res.assets);
                }).error(function (res) {
                    toastError($translate.instant('ERR_SERVER_ERROR'));
                });
            }
        });

    };
    $scope.operationRecordchange = function () {
        $scope.assetprofile = false;
        $scope.newapplication = false;
        $scope.installed = false;
        $scope.myAssets = false;
        $scope.operationRecord = true;

    };
    $scope.sub = function () {

    };
    //myWriteOff
    $scope.myWriteOff = function (i) {
        $scope.moneyName = i.name
        $rootScope.isBodyMask = true;
        $scope.myAss.writeoff = true;
    };
    $scope.writeoff_submit = function () {
        var currency = $scope.moneyName;
        var flagType = 2;
        var flag =1;
        if (!userService.secondPublicKey) {
            $scope.secondPassword = '';
        }
        //console.log(currency, flagType, flag,userService.secret, $scope.secondPassword)
        var transaction = AschJS.uia.createFlags(currency, flagType, flag,userService.secret, $scope.secondPassword);
        postSerivice.writeoff(transaction).success(function (res) {
            if (res.success == true) {
                $scope.secondPassword = '';
                $scope.myAss.writeoff = false;
                $rootScope.isBodyMask = false;
                toast($translate.instant('INF_TRANSFER_SUCCESS'));
            } else {
                toastError(res.error)
            };
        }).error(function (res) {
            toastError($translate.instant('ERR_SERVER_ERROR'));
        });
    }
    $scope.writeoffClose = function () {
        $rootScope.isBodyMask = false;
        $scope.myAss.writeoff = false;
    };
    // // 发行
    $scope.myPublish = function (i) {
        $scope.myAss.publish = true;
        $scope.myPublishmoneyName = i.name;
        $rootScope.isBodyMask = true;
    };
    $scope.publish_submit = function () {
        $scope.myAss.publish = false;
        $rootScope.isBodyMask = false;
        if(!$scope.myPublishmoneyName){
            return ;
        }
        var trs = AschJS.uia.createIssue($scope.myPublishmoneyName, $scope.amount, userService.secret, $scope.secondPassword);
        postSerivice.writeoff(trs).success(function (res) {
            if (res.success == true) {
                $scope.secondPassword = '';
                $scope.myAss.publish = false;
                $rootScope.isBodyMask = false;
                toast($translate.instant('INF_TRANSFER_SUCCESS'));
            } else {
                toastError(res.error)
            };
        }).error(function (res) {
            toastError($translate.instant('ERR_SERVER_ERROR'));
        });
    }
    $scope.publishClose = function () {
        $rootScope.isBodyMask = false;
        $scope.myAss.publish = false;
    };
    $scope.models = [
        { value: 0, name: '黑名单模式' },
        { value: 1, name: '白名单模式' }
    ];
    $scope.mymodel = $scope.models[1];

    // 设置
    $scope.mySettings = function (i) {
        $scope.moneyName = i.name
        $scope.myAss.set = true;
        $rootScope.isBodyMask = true;
    };
    $scope.settings_submit = function () {
        $scope.myAss.set = false;
        $rootScope.isBodyMask = false;
        console.log($scope.mymodel)
        var currency = $scope.moneyName;
        var flagType = 1;
        var flag = $scope.mymodel.value;
        var trs = AschJS.uia.createFlags(currency, flagType, flag, userService.secret, $scope.secondPassword);
        postSerivice.writeoff(trs).success(function (res) {
            if (res.success == true) {
                $scope.secondPassword = '';
                $scope.myAss.set = false;
                $rootScope.isBodyMask = false;
                toast($translate.instant('INF_TRANSFER_SUCCESS'));
            } else {
                toastError(res.error)
            };
        }).error(function (res) {
            toastError($translate.instant('ERR_SERVER_ERROR'));
        });
    };
    $scope.settingsClose = function () {
        $rootScope.isBodyMask = false;
        $scope.myAss.set = false;
    };
    // $scope.publishClose = function () {
    //     $rootScope.isBodyMask = false;
    //     $scope.myAss.settings = false;
    // };
    // +ACL
    $scope.myAddPlus = function (i) {

        $rootScope.addACL = i;
        $location.path('/add-acl');

    //     var currency = $scope.moneyName;
    //     var flagType = 1;
    //     var flag = $scope.mymodel.value;
    //     var operator = '+'; // '+'表示增加， ‘-’表示删除
    //     var list = [];
    //
    //     var trs = AschJS.uia.createAcl(currency, operator, flag, list, userService.secret, $scope.secondPassword)
    //     postSerivice.writeoff(trs).success(function (res) {
    //         if (res.success == true) {
    //             $scope.secondPassword = '';
    //             $scope.myAss.set = false;
    //             $rootScope.isBodyMask = false;
    //             toast($translate.instant('INF_TRANSFER_SUCCESS'));
    //         } else {
    //             toastError(res.error)
    //         };
    //     }).error(function (res) {
    //         toastError($translate.instant('ERR_SERVER_ERROR'));
    //     });
    // };

};
    // //-ACL
    $scope.myreduceACL = function (i) {
        $rootScope.reduceACL = i;
        $location.path('/reduce-acl');
    //     $scope.myAss.remove = true;
//     var currency = $scope.moneyName;
//     var flagType = 1;
//     var flag = $scope.mymodel.value;
//     var operator = '-'; // '+'表示增加， ‘-’表示删除
//     var list = [];
//
//     var trs = AschJS.uia.createAcl(currency, operator, flag, list, userService.secret, $scope.secondPassword)
//     postSerivice.writeoff(trs).success(function (res) {
//         if (res.success == true) {
//             $scope.secondPassword = '';
//             $scope.myAss.set = false;
//             $rootScope.isBodyMask = false;
//             toast($translate.instant('INF_TRANSFER_SUCCESS'));
//         } else {
//             toastError(res.error)
//         };
//     }).error(function (res) {
//         toastError($translate.instant('ERR_SERVER_ERROR'));
//     });
};

// };
    // 转账
    $scope.myTranstion = function () {
        $location.path('/pay');
    }
});
