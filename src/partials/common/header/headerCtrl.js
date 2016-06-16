angular.module('asch').controller('headerCtrl', function($scope, $rootScope, apiService, ipCookie, $window, $location) {
   $rootScope.blockStatus = true;
    $scope.blockClick = function () {
        
            $rootScope.blockStatus = !$rootScope.blockStatus;
            //alert(1)
       
   
   }
    $scope.init = function () {

   }
});