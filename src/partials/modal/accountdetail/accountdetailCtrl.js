
angular.module('asch').controller('accountdetailCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {

    $rootScope.accountdetailinfo = false;

    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.accountdetailinfo = false;
    };
    $rootScope.$on('accountdetail', function(d,data) {
        $scope.address = data.address || data.generatorId ||data.senderId || data.recipientId;
        apiService.accountdetail({
            address:$scope.address
        }).success(function (res) {
            if(res.success==true){
                $rootScope.accountdetailinfo = true;
                $rootScope.isBodyMask = true;
                $scope.account = res.account;
            };
        }).error(function () {
            toastError('服务器错误!');
        })

    });
});

