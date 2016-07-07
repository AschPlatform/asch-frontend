angular.module('asch').controller('payCtrl', function($scope, $rootScope, apiService, ipCookie, $http,$window) {
    $rootScope.active = 'pay';
    $rootScope.userlogin = true;
    //判断是否登录 退出
    if(!$rootScope.isLogin){
        $window.location.href = '#/login'
    }

   $scope.sent=$rootScope.useraddress;
   $scope.fee='0.1  XAS';
   // $scope.amount=;
    $scope.sentMsg = function () {
        var transaction = AschJS.transaction.createTransaction($scope.collect, $scope.amount, ipCookie('userSecret'),  $scope.sendpasswoed);
        $http({
            method: 'POST',
            url:'{{payApi}}',
            headers: {'magic': '43194d2b','version':''},
            data:transaction
        }).success( function(res) {
                if(res.success='true'){
                    toast('支付成功!')
                };
            }).error( function(res) {
                toastError(res.error);
            });
    }
});
