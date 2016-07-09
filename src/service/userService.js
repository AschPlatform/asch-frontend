angular.module('asch').service('userService', function() {
    this.setData = function (secret,address, publicKey, balance,secondPublicKey) {
        this.secret = secret;
        this.address = address;
        this.publicKey = publicKey;
        this.balance = balance ;
        this.secondPublicKey = secondPublicKey ;
    }
});
