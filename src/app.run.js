angular.module('asch').run(function ($rootScope, $location, ipCookie, apiService, $window, userService) {
    $rootScope.isBodyMask = false;
    $rootScope.userlogin = false;
    $rootScope.checkobj = {};
    $rootScope.coedobj = {};
    $rootScope.$on('$routeChangeStart', function (r, n, x) {
        if (!userService.secret) {
            $location.path('/login');
        }
    });
});
