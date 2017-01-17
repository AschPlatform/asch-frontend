angular.module('asch').controller('payCtrl', function ($scope, $rootScope, $filter, apiService, ipCookie, $http, $window, userService, postSerivice, $translate) {
    $rootScope.active = 'pay';
    $rootScope.userlogin = true;


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
        var isAddress = /^[0-9]{1,21}$/g;
        var transaction;
        if (!$scope.fromto) {
            toastError($translate.instant('ERR_NO_RECIPIENT_ADDRESS'));
            return false;
        }
        // if (!isAddress.test($scope.fromto)) {
        //     toastError($translate.instant('ERR_RECIPIENT_ADDRESS_FORMAT'));
        //     return false;
        // }
        if ($scope.fromto == userService.address) {
            toastError($translate.instant('ERR_RECIPIENT_EQUAL_SENDER'));
            return false;
        }
        if (!$scope.amount || Number($scope.amount) <= 0) {
            toastError($translate.instant('ERR_AMOUNT_INVALID'));
            return false;
        }
        var amount = parseFloat(($scope.amount * 100000000).toFixed(0));
        var fee = 10000000;
        if (amount + fee > userService.balance) {
            toastError($translate.instant('ERR_BALANCE_NOT_ENOUGH'));
            return false;
        }
        if (userService.secondPublicKey && !$scope.secondPassword) {
            toastError($translate.instant('ERR_NO_SECND_PASSWORD'));
            return false;
        }
        if (!userService.secondPublicKey) {
            $scope.secondPassword = '';
        }
        if(!$rootScope.currencyName){
            transaction = AschJS.transaction.createTransaction(String($scope.fromto), amount, userService.secret, $scope.secondPassword);
        } else {
            transaction = AschJS.uia.createTransfer(String($rootScope.currencyName), String(amount), String($scope.fromto), userService.secret, $scope.secondPassword)
        }
        postSerivice.post(transaction).success(function (res) {
            if (res.success == true) {
                $scope.passwordsure = true;
                $scope.fromto = '';
                $scope.amount = '';
                $scope.secondPassword = '';
                toast($translate.instant('INF_TRANSFER_SUCCESS'));
            } else {
                toastError(res.error)
            };
        }).error(function (res) {
            toastError($translate.instant('ERR_SERVER_ERROR'));
        });
    }
});
