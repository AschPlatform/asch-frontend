angular.module('asch').service('postSerivice', function ($http, $rootScope) {
    this.post = function (data) {
        var url = '{{postApi}}'
        if (url.indexOf('/') == 0) {
            url = $rootScope.selectedNode + url
        } else {
            url = url.replace('mainnet.asch.so', $rootScope.selectedNode)
        }
        if (url.indexOf('http://') == -1) {
            url = 'http://' + url
        }
        var req = {
            method: 'post',
            url: url,
            headers: { 'magic': '{{magic}}', 'version': '' },
            data: {
                transaction: data
            }
        }
        return $http(req);
    }
});