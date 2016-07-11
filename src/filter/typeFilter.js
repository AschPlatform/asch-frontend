angular.module('asch').filter('typeFilter', function () {
    return function (value) {
        var type = '';
        if(value=='0'){
            type ='转账';
        } else if(value=='1'){
            type ='设置二级密码';
        }  else if(value=='2'){
            type ='注册受托人';
        } else if(value=='3'){
            type ='投票';
        } else if(value=='4'){
            type ='多重签名';
        } else if(value=='5'){
            type ='注册Dapp';
        } else if(value=='6'){
            type ='Dapp充值';
        } else if(value=='7'){
            type ='Dapp提现';
        }
        return type;
    }
});
