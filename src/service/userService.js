angular.module('asch').service('userService', function() {
    this.setsecret = function (secret) {
        this.secret = secret;
    };
    this.setaddress = function (address) {
        this.address = address;
    }
});
