angular.module('asch').controller('payCtrl', function($scope, $rootScope, apiService, ipCookie, $location) {
    $rootScope.active = 'pay';
    $rootScope.userlogin = true;
  
    $scope.sentMsg = function () {
        
    }


    $scope.init = function(params) {
        // window.location.href = '#/login';

      
    };


});
