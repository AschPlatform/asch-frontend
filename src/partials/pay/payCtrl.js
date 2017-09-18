angular.module('asch').controller('payCtrl', function ($scope, $rootScope, $filter, apiService, ipCookie, $http, $window, userService, postSerivice, $translate) {
    $rootScope.active = 'pay';
    $rootScope.userlogin = true;


    $scope.isSendSuccess = true;
    $scope.userService = userService;
    $scope.sent = userService.address;
    $scope.fee = '0.1';
    // $scope.amount=;
    $scope.calculateFee = function () {
        if ($scope.amount && Number($scope.amount) > 0) {
            var amount = parseFloat(($scope.amount * 100000000).toFixed(0));
            var fee = AschJS.transaction.calculateFee(amount);
            $scope.fee = $filter('xasFilter')(fee);
        }
    }
    $scope.sentMsg = function () {
        $scope.isSendSuccess = false;
        var isAddress = /^[0-9]{1,21}$/g;
        var transaction;
        if (!$scope.fromto) {
            toastError($translate.instant('ERR_NO_RECIPIENT_ADDRESS'));
            $scope.isSendSuccess = true;
            return false;
        }
        // if (!isAddress.test($scope.fromto)) {
            //     toastError($translate.instant('ERR_RECIPIENT_ADDRESS_FORMAT'));
            //     return false;
            // }
        if ($scope.fromto == userService.address) {
            toastError($translate.instant('ERR_RECIPIENT_EQUAL_SENDER'));
            $scope.isSendSuccess = true;
            return false;
        }
        if (!$scope.amount || Number($scope.amount) <= 0) {
            toastError($translate.instant('ERR_AMOUNT_INVALID'));
            $scope.isSendSuccess = true;
            return false;
        }
        var amount = parseFloat(($scope.amount * 100000000).toFixed(0));
        var fee = 10000000;
        
        if (userService.secondPublicKey && !$scope.secondPassword) {
            toastError($translate.instant('ERR_NO_SECND_PASSWORD'));
            $scope.isSendSuccess = true;
            return false;
        }
        if (!userService.secondPublicKey) {
            $scope.secondPassword = '';
        }
        var message = $scope.message
        if (message && message.length > 256) {
            $scope.isSendSuccess = true;
            return toastError($translate.instant('ERR_INVALID_REMARK'));
        }
        if(!$rootScope.currencyName){
            if (amount + fee > userService.balance) {
                toastError($translate.instant('ERR_BALANCE_NOT_ENOUGH'));
                $scope.isSendSuccess = true;
                return false;
            }
            transaction = AschJS.transaction.createTransaction(String($scope.fromto), amount, message, userService.secret, $scope.secondPassword);
        } else {
            amount = ($scope.amount*Math.pow(10, $rootScope.precision)).toFixed(0);
            transaction = AschJS.uia.createTransfer(String($rootScope.currencyName), amount, String($scope.fromto), message, userService.secret, $scope.secondPassword)
        }
        postSerivice.post(transaction).success(function (res) {
            if (res.success == true) {
                $scope.isSendSuccess = true;
                $scope.passwordsure = true;
                $scope.fromto = '';
                $scope.amount = '';
                $scope.secondPassword = '';
                toast($translate.instant('INF_TRANSFER_SUCCESS'));
            } else {
                $scope.isSendSuccess = true;
                toastError(res.error)
            };
        }).error(function (res) {
            $scope.isSendSuccess = true;
            toastError($translate.instant('ERR_SERVER_ERROR'));
        });
    }
});
