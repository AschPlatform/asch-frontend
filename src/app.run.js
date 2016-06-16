angular.module('asch').run(function($rootScope, $location, ipCookie, apiService, $window) {

    $rootScope.userlogin = false;
    // if( !$rootScope.userInfo ) {
    //     var cookie_userInfo = ipCookie( 'rrc_user' );
    //     if( !cookie_userInfo ) {
    //         $location.path( '/login');
    //         return;
    //     }
    //     $rootScope.userInfo = cookie_userInfo;
    // }
    //
    // $rootScope.quickLogin = function () {
    //     apiService.kickout();
    //     $rootScope.userInfo = undefined;
    //     ipCookie.remove( 'rrc_user' );
    //     $window.location.href = '#/login';
    // };
    // $rootScope.headInfo = function () {
    //     $rootScope.isBodyMask = true;
    //     $rootScope.showInfo = true;
    // };
    // $rootScope.$on('showInfo', function(d,data) {
    //     $rootScope.showInfo = data;
    // });
});
