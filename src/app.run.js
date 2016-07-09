angular.module('asch').run(function($rootScope, $location, ipCookie, apiService, $window,userService) {
    $rootScope.isBodyMask = false;
    $rootScope.userlogin = false;
    $rootScope.checkobj = {};
    $rootScope.coedobj = {};
    $rootScope.$on('$routeChangeStart',function (r,n,x) {
        console.log('监听路由跳转')
        console.log(r,n,x)
        console.log(userService.secret)
        if(!userService.secret){
            
            $window.location.href = '#/login'
        }
    })
});
