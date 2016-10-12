angular.module('asch').controller('votetoCtrl', function ($scope, $rootScope, apiService, ipCookie, $location, $http, userService, postSerivice, $translate) {

    $rootScope.votetoinfo = false;

    $scope.Close = function () {
        $rootScope.isBodyMask = false;
        $rootScope.votetoinfo = false;
    };
    $scope.userService = userService;
    $scope.checkvoteto = function () {
        var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/;
        $scope.secondpassword = $scope.secondpassword || undefined;
        if (userService.secondPublicKey) {
            if (reg.test($scope.secondpassword)) {
                var transaction = AschJS.vote.createVote(userService.secret, $rootScope.voteContent, $scope.secondpassword);
                postSerivice.post(transaction).success(function (res) {
                    console.log(res)
                    if (res.success == true) {
                        $rootScope.checkobj = {}
                        $rootScope.coedobj = {}
                        console.log($rootScope.checkobj);
                        $scope.Close()
                        toast($translate.instant('INF_VOTE_SUCCESS'));
                    } else {
                        toastError(res.error)
                    };
                }).error(function (res) {
                    toastError($translate.instant('ERR_SERVER_ERROR'));
                });

                //
                //
                //
                // $http({
                //     method: 'POST',
                //     url:'{{passwordApi}}',
                //     headers: {'magic': '43194d2b','version':''},
                //     data:transaction
                // }).success( function(res) {
                //         if(res.success==true){
                //             $rootScope.checkobj = {}
                //             $rootScope.coedobj = {}
                //             console.log($rootScope.checkobj);
                //             $scope.Close()
                //             toast('投票成功!')
                //         };
                //     })
                //     .error( function(res) {
                //         toastError(res.error);
                //     });
            } else {
                toastError($translate.instant('ERR_SECOND_PASSWORD_FORMAT'));
            }
        } else {
            var transaction = AschJS.vote.createVote(userService.secret, $rootScope.voteContent, $scope.secondpassword)


            postSerivice.post(transaction).success(function (res) {
                if (res.success == true) {
                    $rootScope.checkobj = {}
                    $rootScope.coedobj = {}
                    // console.log($rootScope.checkobj);
                    $scope.Close()
                    $rootScope.$emit('upvoteSuccess');
                    toast('投票成功!')
                    toastError($translate.instant('ERR_SECOND_PASSWORD_FORMAT'));
                } else {
                    toastError(res.error)
                };
            }).error(function (res) {
                toastError($translate.instant('ERR_SERVER_ERROR'));
            });


            //
            //
            //
            //
            // $http({
            //     method: 'POST',
            //     url:'{{passwordApi}}',
            //     headers: {'magic': '43194d2b','version':''},
            //     data:transaction
            // }).success( function(res) {
            //         if(res.success==true){
            //             $rootScope.checkobj = {}
            //             $rootScope.coedobj = {}
            //             console.log($rootScope.checkobj);
            //             $scope.Close()
            //             toast('投票成功!')
            //         };
            //     })
            //     .error( function(res) {
            //         toastError(res.error);
            //     });
        }

    };


});
