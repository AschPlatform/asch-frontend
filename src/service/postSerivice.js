angular.module('asch').service('postSerivice', function($http) {
   this.post = function (data){
       var req = {
           method: 'post',
           url: 'http://192.168.1.104:4096/peer/transactions',
           headers: {'magic': '43194d2b','version':''},
           data: {
               transaction:data
           }
       }
       return $http(req);
   }
});
