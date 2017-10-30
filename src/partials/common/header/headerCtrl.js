angular.module('asch').controller('headerCtrl', function($scope, $rootScope, apiService, ipCookie, $window, $location) {
   
    $scope.init = function () {

   }

   $rootScope.goPay = function () {
       $rootScope.currencyName = '';
       $location.path('/pay');
   }
   $scope.quitout = function () {
     $window.location.href = '#/login';
   }
});

// angular.module('asch').controller('exitCtrl', function($scope) {
//   $scope.quitout = function () {
//     $window.location.href = '#/login'
//   }
// });
// angular.module.controller('exitCtrl', function($scope, $rootScope, $window) {
//   $rootScope.active = 'personal';
//   $scope.quitout = function () {
//     $window.location.href = '#/login'
//   }
// });
