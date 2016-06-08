angular.module('webrrc').controller('headerCtrl', function($scope, $rootScope, apiService, ipCookie, $window, $location) {
   $scope.init = function () {
       if( !$rootScope.userInfo ) {
           var cookie_userInfo = ipCookie( 'rrc_user' );
           if( !cookie_userInfo ) {
               $location.path( '/login' );
               return;
           }
           //$rootScope.userInfo = JSON.parse( cookie_userInfo );
       }
   }
});