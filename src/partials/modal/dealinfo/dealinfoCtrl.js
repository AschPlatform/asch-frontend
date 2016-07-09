
angular.module('asch').controller('dealinfoCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {

    $rootScope.dealdetailinfo = false;
    $scope.CloseDealinfo = function () {
        $rootScope.isBodyMask = false;
        $rootScope.dealdetailinfo = false;
    };
    $rootScope.$on('jiaoyi', function(d,data) {

        $scope.blockId = data.id;
        apiService.transactions({
            blockId:$scope.blockId
        }).success(function (res) {
            if(res.success==true){
                $rootScope.dealdetailinfo = true;
                $rootScope.isBodyMask = true;
                // if(res.transactions.length>20){
                //     $scope.transactions=res.transactions.slice(0,20)
                // } else {
                    $scope.transactions=res.transactions 
               // }
                
            };
        }).error(function () {
            toastError('服务器错误!');
        })

    });
});
