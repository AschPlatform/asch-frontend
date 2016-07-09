angular.module('asch').controller('payCtrl', function($scope, $rootScope, apiService, ipCookie, $http,$window,userService) {
    $rootScope.active = 'pay';
    $rootScope.userlogin = true;
   

   $scope.sent=$rootScope.useraddress;
   $scope.fee='0.1  XAS';
   // $scope.amount=;
    $scope.sentMsg = function () {
        var transaction = AschJS.transaction.createTransaction($scope.collect, $scope.amount, userService.setsecret,  $scope.sendpasswoed);
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
