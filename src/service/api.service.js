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
	function fetch(url, data, method) {
		var cb = function(res) {
			// if (res.error.returnCode == '10007') {
			// 	window.setTimeout( function(){
			// 		toastError('您没有权限访问,请重新登录');
			// 		window.location.href = '#/login';
			// 		return;
			// 	}, 200 );
			// }
		};
		if (data) {
			data.from = 'asch';
			/*/!*上线要删掉*!/
			data.admin_member_id = $location.search().admin_member_id;
			/!*-------*!/*/
		}
		method = method.toLowerCase();
		if (method == 'get') {
			var params = json2url(data);
			return $http.get(url + '?' + params).success(function(res) {
				cb(res);
			});
		} else {
			return $http.post(url, data, {withCredentials: true}).success(function(res) {
				cb(res);
			});
		}
	}

	this.financeAnalyze = function(params) {
		return fetch('{{financeAnalyzeApi}}', params, 'post');
	};
	this.OdvAnalyze = function(params) {
		return fetch('{{odvAnalyzeApi}}', params, 'post');
	};
	// 催收员模块,初始化init
	this.odvAdmin = function(params) {
		return fetch('{{odvAdminApi}}', params, 'post');
	};
	// 催收员详细信息
	this.getInfo = function(params) {
		return fetch('{{DocollectorGetInfoApi}}', params, 'post');
	};
	//催收员展示
	this.getDetail = function(params) {
		return fetch('{{DocollectorGetInfoApi}}', params, 'post');
	};
	// 催收员审核模块--区域，城市催收经理审核
	this.audit = function(params) {
		return fetch('{{DocollectorAuditApi}}', params, 'post');
	};
	// 催收员审核模块--省级总监审核
	this.auditApply = function(params) {
		return fetch('{{DocollectorAuditApplyApi}}', params, 'post');
	};
	// 催收员禁用列表模块
	this.banOperate = function(params) {
		return fetch('{{DocollectorBanListApi}}', params, 'post');
	};
	//催收员 禁用模块
	this.banOroder = function(params) {
		return fetch('{{DocollectorBanApi}}', params, 'post');
	};
	// 催收员启用模块
	this.cancelBanOperate = function(params) {
		return fetch('{{DocollectorCancelBanApi}}', params, 'post');
	};
	// 审核催收员禁用模块
	this.ban = function(params) {
		return fetch('{{banApi}}', params, 'post');
	};
	// 审核催收员启用模块
	this.enable = function(params) {
		return fetch('{{enableApi}}', params, 'post');
	};
	// 催收员历史作业修改区域
	this.areahistory = function(params) {
		return fetch('{{areahistoryApi}}', params, 'post');
	};
	// 催收任务列表
	this.taskAdmin = function(params) {
		return fetch('{{taskAdminApi}}', params, 'post');
	};
	// 催收记录模块
	this.CollectorRecord = function(params) {
		return fetch('{{CollectorRecordApi}}', params, 'post');
	};
	// 催收任务 催收任务详情
	this.collectorTaskDetail = function(params) {
		return fetch('{{collectorTaskDetailApi}}', params, 'post');
	};
	// 催收任务详情模块
	this.CollectorDetail = function(params) {
		return fetch('{{CollectorDetailApi}}', params, 'post');
	};
	// 申请取消催收任务操作
	this.applycanceltask = function(params) {
		return fetch('{{applycanceltaskApi}}', params, 'post');
	};
	// 催收任务 债务人详情
	this.TaskdebtDetail = function(params) {
		return fetch('{{TaskdebtDetailApi}}', params, 'post');
	};

	// 城市催收经理 城市催收经理列表
	this.cityManagerAdmin = function(params) {
		return fetch('{{cityManagerAdminApi}}', params, 'post')
	};
	// 省级总监管理 省级总监列表
	this.provinceDirectorAdmin = function(params){
		return fetch('{{provinceDirectorAdminApi}}',params,'post');
	};

	//催收任务 移出催收任务
	this.removeTask = function(params) {
		return fetch('{{removeTaskApi}}', params, 'post');
	};

	//催收任务 审核取消
	this.rejectcanceltask = function(params) {
		return fetch('{{rejectcanceltaskApi}}', params, 'post');
	};

	//催收任务 总部取消
	this.canceltask = function(params) {
		return fetch('{{canceltaskApi}}', params, 'post');
	};

	//催收任务 总部退还保证金
	this.returnMoney = function(params) {
		return fetch('{{returnMoneyApi}}', params, 'post');
	};

	//催收任务 审核取消同意
	this.agreeCancelTask = function(params) {
		return fetch('{{agreeCancelTaskApi}}', params, 'post');
	};
	// 催收经理管理  催收经理管理页面的区域经理和城市经理的展示
	this.managerList = function(params) {
		return fetch('{{managerListApi}}', params, 'post');
	};
	//结算
	this.reward = function(params) {
		return fetch('{{rewardApi}}', params, 'post');
	};
	//	创建城市催收经理
	this.submitManager = function(params) {
		return fetch('{{submitManagerApi}}', params, 'post');
	};
	//个人信息
	this.info = function(params) {
		return fetch('{{infoApi}}', params, 'post');
	};
	//区域/城市经理分配情况
	this.assignment = function(params) {
		return fetch('{{assignmentApi}}', params, 'post');
	};
	// 搜索显示区域和城市催收经理列表
	this.search = function(params) {
		return fetch('{{searchApi}}', params, 'post');
	};
	//退出接口
	this.kickout = function(params) {
		return fetch('{{kickoutApi}}', params, 'post');
	};

	//获取二维码接口
	this.getQRCode = function(params) {
		return fetch('{{getQRCodeApi}}', params, 'post');
	};

	//获取二维码登陆状态
	this.getQRCodeStatus = function(params) {
		return fetch('{{getQRCodeStatusApi}}', params, 'post');
	};
	//登录获取个人信息
	this.getInfo = function(params) {
		return fetch('{{loginInfoApi}}', params, 'post');
	};
	//为区域/城市分配催收经理
	this.assign = function(params) {
		return fetch('{{assignApi}}', params, 'post');
	};
	//通过催收任务查看催收员信息
	this.collectorInfoOfTask = function(params) {
		return fetch('{{collectorInfoOfTaskApi}}', params, 'post');
	};
	//终止催收
	this.collectorCancelTask = function(params) {
		return fetch('{{collectorCancelTaskApi}}', params, 'post');
	};
	//审核终止催收
	this.auditCancelTask = function(params) {
		return fetch('{{auditCancelTaskApi}}', params, 'post');
	}
});
