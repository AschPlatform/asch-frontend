angular.module('asch').service('postSerivice', function ($http) {
    this.post = function (data) {
        var req = {
            method: 'post',
            url: '{{postApi}}',
            headers: { 'magic': '{{magic}}', 'version': '' },
            data: {
                transaction: data
            }
        }
        return $http(req);
    }
    this.retryPostImp = function(funcCreate, timeAdjust, cb) {
        let trs = funcCreate()
        this.post(trs).success(function(res){
            if (/Invalid transaction timestamps/.test(res.error)) {
                console.log('检测到需要被调教时间', timeAdjust)
                this.retryPostImp(funcCreate, timeAdjust + 5, cb);
            } else {
                console.log('正常过')
                cb(null, res);
            }
        }).error(function(res){
            var err = 1;
            cb(err, res);
        })
    }
    this.retryPost = function (funcCreate, cb) {
        this.retryPostImp(funcCreate, 5, cb)
    }
    this.writeoff = function (data) {
        var req = {
            method: 'post',
            url: '{{postApi}}',
            headers: { 'magic': '{{magic}}', 'version': '' },
            data: {
                transaction: data
            }
        }
        return $http(req);
    }
});