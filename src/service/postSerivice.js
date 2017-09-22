angular.module('asch').service('postSerivice', function ($http, $translate) {
    let that = this;
    let countNum = 0;
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
        that.post(trs).success(function(res){
            if (/timestamp/.test(res.error)) {
                countNum = countNum + 1;
                if (countNum > 3) {
                    countNum = 0;
                    toastError($translate.instant('ADJUST_TIME_YOURSELF'));
                    return
                } else {
                    toastError($translate.instant('ADJUST_TIME'));
                    that.retryPostImp(funcCreate, timeAdjust + 5, cb);
                }
            } else if(/processed/.test(res.error)) {
                that.retryPostImp(funcCreate, timeAdjust, cb);
            } else {
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