angular.module('asch').controller('deletevoteCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$http,userService) {

    $rootScope.deletevotetoinfo = false;

    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.deletevotetoinfo = false;
    };

    $scope.checkvoteto = function(params) {
        var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        $scope.secondpassword = $scope.secondpassword || undefined;
        if($rootScope.userpublickey){
            if(reg.test($scope.secondpassword)){
                var transaction = AschJS.vote.createVote(userService.setsecret, $rootScope.deletevoteContent,$scope.secondpassword)
                $http({
                    method: 'POST',
                    url:'{{passwordApi}}',
                    headers: {'magic': '43194d2b','version':''},
                    data:transaction
                }).success( function(res) {
                        if(res.success='true'){
                            $rootScope.coedobj = {}
                            console.log($rootScope.coedobj);
                            $scope.Close()
                            toast('投票成功!')
                        };
                    })
                    .error( function(res) {
                        toastError(res.error);
                    });
            }else{
                toastError('支付密码输入格式不正确!');
            }
        }else {
            var transaction = AschJS.vote.createVote(userService.setsecret, $rootScope.deletevoteContent,$scope.secondpassword)
            $http({
                method: 'POST',
                url:'{{passwordApi}}',
                headers: {'magic': '43194d2b','version':''},
                data:transaction
            }).success( function(res) {
                    if(res.success='true'){
                        $rootScope.coedobj = {}
                        console.log($rootScope.coedobj);
                        $scope.Close()
                        toast('投票成功!')
                    };
                })
                .error( function(res) {
                    toastError(res.error);
                });
        }

    };


});
