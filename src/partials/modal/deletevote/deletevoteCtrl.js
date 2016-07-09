angular.module('asch').controller('deletevoteCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$http,userService,postSerivice) {

    $rootScope.deletevotetoinfo = false;

    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.deletevotetoinfo = false;
    };

    $scope.checkvoteto = function(params) {
        var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        $scope.secondpassword = $scope.secondpassword || undefined;
        if(userService.secondPublicKey){
            if(reg.test($scope.secondpassword)){
                var transaction = AschJS.vote.createVote(userService.secret, $rootScope.deletevoteContent,$scope.secondpassword)
                postSerivice.post(transaction).success(function(res) {
                    if(res.success==true){
                        $rootScope.coedobj = {}
                        $rootScope.checkobj = {}
                        // console.log($rootScope.checkobj);
                        $scope.Close()
                        toast('删除成功!')
                    } else{
                        toastError(res.error)
                    };
                }).error( function(res) {
                    toastError('服务器错误!');
                });
            }else{
                toastError('支付密码输入格式不正确!');
            }
        }else {
            var transaction = AschJS.vote.createVote(userService.secret, $rootScope.deletevoteContent,$scope.secondpassword)
            postSerivice.post(transaction).success(function(res) {
                if(res.success==true){
                    $rootScope.coedobj = {}
                    $rootScope.checkobj = {}
                    console.log($rootScope.coedobj)
                    // console.log($rootScope.checkobj);
                    $scope.Close()
                    toast('删除成功!')
                } else{
                    toastError(res.error)
                };
            }).error( function(res) {
                toastError('服务器错误!');
            });


        }

    };


});
