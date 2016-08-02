angular.module('asch').service('postSerivice', function($http) {
   this.post = function (data){
       var req = {
           method: 'post',
           url: '{{postApi}}',
           headers: {'magic': '15a3b1d6','version':''},
           data: {
               transaction:data
           }
       }
       return $http(req);
   }
});
