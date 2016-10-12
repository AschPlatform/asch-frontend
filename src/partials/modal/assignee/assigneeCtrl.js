/**
 * Created by zenking on 16/7/2.
 */
angular.module('asch').controller('assigneeCtrl', function ($scope, $rootScope, apiService, ipCookie, $location, $http, userService, postSerivice, $translate) {

    $rootScope.assigneeinfo = false;
    $scope.userService = userService;
    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.assigneeinfo = false;
    };
    $scope.nextstep = function () {
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        var usernamereg = /^[a-z0-9!@$&_.]{2,}$/;
        var isAddress = /^[0-9]{1,21}$/g;
        if (!$scope.userName) {
            toastError($translate.instant('ERR_DELEGATE_NAME_EMPTY'));
            return;
        }
        if (isAddress.test($scope.userName)) {
            toastError($translate.instant('ERR_DELEGATE_NAME_ADDRESS'));
            return;
        }
        if (!usernamereg.test($scope.userName)) {
            toastError($translate.instant('ERR_DELEGATE_NAME_FORMAT'));
            return;
        }
        $scope.secondpassword = $scope.secondpassword || undefined;
        if (userService.secondPublicKey) {
            if (reg.test($scope.secondpassword)) {

                var transaction = AschJS.delegate.createDelegate(userService.secret, $scope.userName, $scope.secondpassword)
                postSerivice.post(transaction).success(function (res) {
                    if (res.success == true) {
                        $scope.Close()
                        toast($translate.instant('INF_REGISTER_SUCCESS'));
                        $scope.userName = '';
                    } else {
                        toastError(res.error)
                    };
                }).error(function (res) {
                    toast($translate.instant('ERR_SERVER_ERROR'));
                });
            } else {
                toast($translate.instant('ERR_SECOND_PASSWORD_FORMAT'));
            }
        } else {
            var transaction = AschJS.delegate.createDelegate(userService.secret, $scope.userName)
            postSerivice.post(transaction).success(function (res) {
                if (res.success == true) {
                    $scope.Close()
                    $scope.userName = '';
                    toast($translate.instant('INF_REGISTER_SUCCESS'));
                } else {
                    toastError(res.error)
                };
            }).error(function (res) {
                toast($translate.instant('ERR_SERVER_ERROR'));
            });
        }
    };
});
