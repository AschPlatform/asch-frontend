angular.module('asch').service('postSerivice', function($http) {
   this.post = function (data){
       var req = {
           method: 'post',
           url: '{{postApi}}',
           headers: {'magic': '594fe0f3','version':''},
           data: {
               transaction:data
           }
       }
       return $http(req);
   }
});
