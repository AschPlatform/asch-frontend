angular.module('webrrc').filter('parseNum', function() {
	return function(input,arg) {
		if (!input) {
			return '0';
		}
		if (input > 9999) {
			return Math.floor(input / 10000) + '万';
		}else {
			return input;
		}
	};
});
