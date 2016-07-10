angular.module('asch').service('postSerivice', function($http) {
   this.post = function (data){
       var req = {
           method: 'post',
           url: '{{postApi}}',
           headers: {'magic': '43194d2b','version':''},
           data: {
               transaction:data
           }
       }
       return $http(req);
   }
});
