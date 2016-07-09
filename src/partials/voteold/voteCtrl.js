angular.module('asch').controller('voteCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$window) {
    $rootScope.active = 'vote';
    $rootScope.userlogin = true;

    if(!$rootScope.isLogin){
        $window.location.href = '#/login'
    }
    $scope.assigneeShowInfo = function () {
        $rootScope.assigneeinfo = true;
        $rootScope.isBodyMask = true;
        // $scope.headCancelData = {
        //
        // };
        // $scope.$broadcast('headCancel', $scope.headCancelData);// 向子级传递数据

    } 
    $scope.votetoShowInfo = function () {
        $rootScope.votetoinfo = true;
        $rootScope.isBodyMask = true;
        // $scope.headCancelData = {
        //
        // };
        // $scope.$broadcast('headCancel', $scope.headCancelData);// 向子级传递数据

    }

    $scope.init = function(params) {
        //入围受托人接口
        apiService.delegates(params).success(function(res) {
            if(res.success='true'){
               $scope.voteList=res.delegates;
                //console.log($scope.voteList)
            };
        }).error(function(err) {
            toastError('服务器错误！');
        });
        //  候选候选人接口 参数不一样
        apiService.delegates(params).success(function(res) {
            if(res.success='true'){
                $scope.voteList2=res.delegates;
                console.log($scope.voteList2)
            };
        }).error(function(err) {
            toastError('服务器错误！');
        });
        // 获取我的投票接口
        apiService.accounts(params).success(function(res) {
            if(res.success='true'){
                $scope.myvotelist=res.delegates;
                console.log($scope.myvotelist)
            };
        }).error(function(err) {
            toastError('服务器错误！');
        });
    };
});
