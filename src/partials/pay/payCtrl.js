angular.module('asch').controller('payCtrl', function($scope, $rootScope, apiService, ipCookie, $http,$window,userService,postSerivice) {
    $rootScope.active = 'pay';
    $rootScope.userlogin = true;
   

   $scope.sent=userService.address;
   $scope.fee='0.1';
   // $scope.amount=;

    $scope.sentMsg = function () {
        var isAddress = /^[0-9]{1,21}$/g;
        if (!$scope.amount || Number($scope.amount) <= 0) {
            toastError('发送金额输入不正确!');
            return false;
        }
        if( $scope.amount*100000000>userService.balance){
            toastError('余额不足!');
            return false;
        }
        if(!isAddress.test($scope.fromto)){
            toastError('接收地址格式不正确!');
            return false;
        }
        if (userService.secondPublicKey && !$scope.sendpasswoed) {
            toastError('必须输入二级密码!');
            return false;
        }
        var transaction = AschJS.transaction.createTransaction(String($scope.fromto), $scope.amount*100000000, userService.secret,  $scope.sendpasswoed);
        postSerivice.post(transaction).success(function(res) {
            if(res.success==true){
                $scope.passwordsure = true;
                $scope.fromto = '';
                $scope.amount = '';
                toast('支付成功!')
            } else {
                toastError(res.error)
            };
        }).error( function(res) {
            toastError('服务器错误!');
        });
    }
});
