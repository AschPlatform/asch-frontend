angular.module('asch').controller('voteCtrl', function($scope, $rootScope, apiService, ipCookie, $location,$window,NgTableParams,userService) {
    $rootScope.active = 'vote';
    $rootScope.userlogin = true;
   $scope.letin = true;
   $scope.hosting = false;
   $scope.mgvotecord = false;
    $scope.letinchange = function () {
        $scope.letin = true;
        $scope.hosting = false;
        $scope.mgvotecord = false;
        $scope.tableparams = new NgTableParams({
            page: 1,
            count: 20,
            sorting: {
                height: 'desc'
            }
        }, {
            total: 0,
            counts: [],
            getData: function($defer,params) {
                //console.log($defer)
               // console.log(params)
                apiService.letinvote({
                    address:userService.address,
                    orderBy: 'rate:asc',
                    limit: params.count(),
                    offset: (params.page() - 1) * params.count()
                }).success(function(res) {
                    //  $scope.res =res;
                    // params.data=res.delegates;
                    params.total(res.totalCount);
                    $scope.delegateCount = res.totalCount;
                    // return res.delegates;
                    $defer.resolve(res.delegates);
                }).error(function(res) {
                    toastError('服务器错误！');
                });
            }
        });
    }
    // $scope.hostingchange = function () {
    //     $scope.letin = false;
    //     $scope.hosting = true;
    //     $scope.mgvotecord = false;
    //     $scope.tableparams1 = new NgTableParams({
    //         page: 1,
    //         count: 20,
    //         sorting: {
    //             height: 'desc'
    //         }
    //     }, {
    //         total: 0,
    //         counts: [],
    //         getData: function($defer,params) {
    //             apiService.letinvote({
    //                 address:'',
    //                 orderBy: 'rate:asc',
    //                 limit: params.count(),
    //                 offset: (params.page() - 1) * params.count()
    //             }).success(function(res) {
    //                 //  $scope.res =res;
    //                 // params.data=res.delegates;
    //                 params.total(res.totalCount);
    //                 // return res.delegates;
    //                 $defer.resolve(res.delegates);
    //             }).error(function(res) {
    //                 toastError('服务器错误！');
    //             });
    //         }
    //     });
    // }
    $scope.mgvotecordchange = function () {
        $scope.letin = false;
        $scope.hosting = false;
        $scope.mgvotecord = true;
        $scope.tableparams2 = new NgTableParams({
            page: 1,
            count: 20,
            sorting: {
                height: 'desc'
            }
        }, {
            total: 0,
            counts: [],
            getData: function($defer,params) {
                apiService.accounts({
                    address:userService.address,
                    orderBy: 'rate:asc',
                    limit: params.count(),
                    offset: (params.page() - 1) * params.count()
                }).success(function(res) {
                    //  $scope.res =res;
                    // params.data=res.delegates;
                    params.total(res.totalCount);
                    $scope.myvoteCount = res.delegates.length;
                    // return res.delegates;
                    $defer.resolve(res.delegates);
                }).error(function(res) {
                    toastError('服务器错误！');
                });
            }
        });
    };
    if($scope.letin){
        $scope.tableparams = new NgTableParams({
            page: 1,
            count: 20,
            sorting: {
                height: 'desc'
            }
        }, {
            total: 0,
            counts: [],
            getData: function($defer,params) {
                apiService.letinvote({
                    address:userService.address,
                    orderBy: 'rate:asc',
                    limit: params.count(),
                    offset: (params.page() - 1) * params.count()
                }).success(function(res) {
                    //  $scope.res =res;
                    // params.data=res.delegates;
                    params.total(res.totalCount);
                    $scope.delegateCount = res.totalCount;
                    // return res.delegates;
                    $defer.resolve(res.delegates);
                }).error(function(res) {
                    toastError('服务器错误！');
                });
            }
        });
    }
    //$scope.tableparams.reload();
    //$scope.tableparams.settings().$scope = $scope;
    //$rootScope.checkobj = {};
    $scope.checkitem = function (i) {
        if($scope.letin){
            var key = i.username;
            if(!$rootScope.checkobj[key]){
                $rootScope.checkobj[key] = i;
                // console.log($rootScope.checkobj)
            } else{
                delete $rootScope.checkobj[key];
                //  console.log($rootScope.checkobj)
            }
        } ;
       
        
    }
    $scope.checkitem2 = function (i) {
        if($scope.mgvotecord){
            var key = i.username;
            if(!$rootScope.coedobj[key]){
                $rootScope.coedobj[key] = i;
                // console.log($rootScope.checkobj)
            } else{
                delete $rootScope.coedobj[key];
                //  console.log($rootScope.checkobj)
            }
        }
    }

    //投票的函数
    $scope.votetoShowInfo = function () {
        if($scope.mgvotecord){
            var deletevoteContent = [];
            var showdelusername = {};

            angular.forEach($rootScope.coedobj, function(data,index,array){
                deletevoteContent.push('-'+data.publicKey);
                showdelusername[data.username]={
                    "username":data.username,
                    "address":data.address
                }
            });
            if(deletevoteContent.length==0){
                toastError('请选择一位受托人');
                return;
            } else if(deletevoteContent.length>33){
                toastError('一次删除至多33位候选人')
            }  else {
                $rootScope.deletevotetoinfo = true;
                $rootScope.isBodyMask = true;
                $rootScope.showdelusername = showdelusername;
                $rootScope.deletevoteContent = deletevoteContent;
                console.log($rootScope.showdelusername)
            }
        }
        if($scope.letin){
            var voteContent = [];
            var showusername = {};

            angular.forEach($rootScope.checkobj, function(data,index,array){
                voteContent.push('+'+data.publicKey);
                showusername[data.username]={
                    "username":data.username,
                    "address":data.address
                }
            });
            if(voteContent.length==0){
                toastError('请选择至少一位受托人');
                return;
            } else if(voteContent.length>33){
                toastError('一次投票至多33位候选人')
            }  else {
                $rootScope.votetoinfo = true;
                $rootScope.isBodyMask = true;
                $rootScope.showusername = showusername;
                $rootScope.voteContent = voteContent;
                console.log($rootScope.showusername)
            }
        }



      //  var transaction = AschJS.delegate.createDelegate((password, userName, user.secondPassword || undefined));





    }


});
