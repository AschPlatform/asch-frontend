angular.module('asch').filter('typeFilter', function ($filter) {
    return function (value) {
        var type = '';
        if (value == '0') {
            type = $filter('translate')('TRS_TYPE_TRANSFER');
        } else if (value == '1') {
            type = $filter('translate')('TRS_TYPE_SECOND_PASSWORD');
        } else if (value == '2') {
            type = $filter('translate')('TRS_TYPE_DELEGATE');
        } else if (value == '3') {
            type = $filter('translate')('TRS_TYPE_VOTE');
        } else if (value == '4') {
            type = $filter('translate')('TRS_TYPE_MULTISIGNATURE');
        } else if (value == '5') {
            type = $filter('translate')('TRS_TYPE_DAPP');
        } else if (value == '6') {
            type = $filter('translate')('TRS_TYPE_DEPOSIT');
        } else if (value == '7') {
            type = $filter('translate')('TRS_TYPE_WITHDRAWAL');
        }
        return type;
    }
});
