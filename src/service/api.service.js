angular.module('asch').service('apiService', function($http, $rootScope,$location) {

	function json2url(json) {
		var arr = [];
		var str = '';
		for (var i in json) {
			str = i + '=' + json[i];
			arr.push(str);
		}
		return arr.join('&');
	};
	function fetch(url, data, method,headers) {
		var cb = function(res) {
			// if (res.error.returnCode == '10007') {
			// 	window.setTimeout( function(){
			// 		toastError('您没有权限访问,请重新登录');
			// 		window.location.href = '#/login';
			// 		return;
			// 	}, 200 );
			// }
		};
		// if (data) {
		// 	data.from = 'asch';
		//
		// }
		method = method.toLowerCase();
		if (method == 'get') {
			var params = json2url(data);
			return $http.get(url + '?' + params).success(function(res) {
				cb(res);
			});
		} else {
			//console.log(url,data)
			if(headers){
				var req = {
					method: 'POST',
					url: url,
					headers: {'magic': '43194d2b','version':''},
					data: {
						transaction:data
					}
				}
				return $http(req).success(function(res) {
					cb(res);
				});
			}  else{
				return $http.post(url, data).success(function(res) {
					cb(res);
				});
			}

		}
	}

	this.loginin = function(params) {
		return fetch('http://192.168.1.104:4096/api/accounts', params, 'get');
	};
	this.homeloginin = function(params) {
		return fetch('http://192.168.1.104:4096/api/accounts/open2', params, 'post');
	};
	//账户请求
	this.account = function(params) {
		return fetch('{{accountApi}}', params, 'post');
	};
	//交易请求
	this.transactions = function(params) {
		return fetch('http://192.168.1.104:4096/api/transactions', params, 'get');
	};
	//获取受托人
	this.delegates = function(params) {
		return fetch('http://192.168.1.104:4096/api/delegates', params, 'post');
	};
	//获取投票列表
	this.accounts = function(params) {
		return fetch('http://192.168.1.104:4096/api/accounts/delegates', params, 'get');
	};
	//获取最新区块
	this.blocks = function(params) {
		return fetch('http://192.168.1.104:4096/api/blocks', params, 'get');
	};
	//支付模块
	this.pay = function(params) {
		return fetch('{{payApi}}', params, 'post');
	};
	//受托人模块
	this.blockforging = function(params) {
		return fetch('http://192.168.1.104:4096/api/delegates/get', params, 'get');
	};
	// 入围候选人
   this.letinvote = function (params) {
	   return fetch('http://192.168.1.104:4096/api/delegates', params, 'get');
   }
	// 二级密码设置
   this.password = function (params) {
	   return fetch('http://192.168.1.104:4096/api/delegates', params, 'post');
   }
});
