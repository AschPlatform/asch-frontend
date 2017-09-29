angular.module('asch').controller('qrCtrl', function ($scope, $rootScope) {
    $scope.string = $rootScope.qrcode

    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.qrcode = false;
    };
});