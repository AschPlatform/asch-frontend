/**
 * Created by zenking on 16/7/2.
 */
angular.module('asch').controller('assigneeCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$http,userService) {

    $rootScope.assigneeinfo = false;
    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.assigneeinfo = false;
    };
    $scope.nextstep = function() {
        var reg =/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        var usernamereg =  /^[a-z0-9!@$&_.]{2,}$/g;
        // if(usernamereg.test($scope.userName)){
        //     console.log('受托人名称格式不正确!');
        //     // return ;
        // }
        $scope.secondpassword = $scope.secondpassword || undefined;
        if($rootScope.userpublickey){
            if(reg.test($scope.secondpassword)){
    
                var transaction = AschJS.delegate.createDelegate(userService.setsecret, $scope.userName,$scope.secondpassword)
                $http({
                    method: 'POST',
                    url:'{{passwordApi}}',
                    headers: {'magic': '43194d2b','version':''},
                    data:transaction
                }).success( function(res) {
                        if(res.success='true'){
                            $rootScope.checkobj = {}
                            $rootScope.coedobj = {}
                            console.log($rootScope.checkobj);
                            $scope.Close()
                            toast('注册成功!')
                        };
                    })
                    .error( function(res) {
                        toastError(res.error);
                    });
            }else{
                toastError('支付密码输入格式不正确!');
            }
        } else {
    
                var transaction = AschJS.delegate.createDelegate(userService.setsecret, $scope.userName,$scope.secondpassword)
                $http({
                    method: 'POST',
                    url:'{{passwordApi}}',
                    headers: {'magic': '43194d2b','version':''},
                    data:transaction
                }).success( function(res) {
                        if(res.success='true'){
                            $rootScope.checkobj = {}
                            $rootScope.coedobj = {}
                            console.log($rootScope.checkobj);
                            $scope.Close()
                            toast('注册成功!')
                        };
                    })
                    .error( function(res) {
                        toastError(res.error);
                    });
    
        }
    
   };


});
