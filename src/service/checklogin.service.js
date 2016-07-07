angular.module('asch').service('checkloginservice', function($http, $rootScope,$location,$window,ipCookie) {
// var checklogin = function () {
//         if(ipCookie('userSecret')){
//             $window.location.href = '/'
//         }
//  };
//     return checklogin;
    if(!$rootScope.isLogin){
        $window.location.href = '#/login'
    }
});
