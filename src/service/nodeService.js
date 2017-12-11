angular.module('asch').service('nodeService', function ($http) {
    
    function AschServer(url){
        this.timer = null;

        this.failedCount = 0;
        this.serverUrl = url;
        this.registerTimestamp = Date.now();
        this.state = "unknown";
        this.serverTimestamp = 0; 
        this.responseTime = 9999999;

        this.version = "";
        this.lastBlock = null;
        this.systemLoad = null;

        function checkFailed(server){
            server.failedCount ++;
            if (server.failedCount >=3){
                unregisterServer(server.serverUrl);
            }

            server.state= "failed";
            server.version = "unknown";
            server.responseTime = Date.now() - server.requestTimestamp;
        };

        function checkSuccess(server, systemInfo){
            server.failedCount = 0;
            server.state="success";
            server.responseTime = Date.now() - server.requestTimestamp;

            server.version = systemInfo.version;
            server.serverTimestamp = systemInfo.timestamp;
            server.lastBlock = systemInfo.lastBlock;
            server.systemLoad = systemInfo.systemLoad;
        }

        this.versionNotLessThan = function(ver){
            //TODO: 
            return true; //this.version >= ver;
        }

        this.checkServerStatus = function(){
            var server = this;

            server.state= "pending";
            server.requestTimestamp = Date.now();
            
            $http.get(server.serverUrl+"/api/system/", {timeout:3000}).success(function(data, status, headers){  
                if (status != 200){
                    checkFailed(server);
                    return;
                }

                checkSuccess(server, data);

            }).error(function(data, status, headers){
                checkFailed(server);                
            });
        };

        this.updateStatus = function(responseHeaders){
            if (responseHeaders('node-status')){
                var lastBlock = JSON.parse(responseHeaders("node-status"));
                this.lastBlock = lastBlock;
                log("server status updated");
                return true;
            }
            return false;
        }

        this.isHealthy = function(){
            //响应时间小于3秒，且区块落后不超过3块，最近一分钟负载不高于0.8
            return ( this.systemLoad && this.lastBlock ) &&
                this.responseTime <= 1000 * 3 && 
                this.lastBlock.behind <= 3 && 
                this.systemLoad.loadAverage[0] / this.systemLoad.cores <= 0.8 ;
        }
    
        this.isServerAvalible = function(){
            //版本不低于1.3.4,且是健康的节点
            return this.state=="success" && this.versionNotLessThan("1.3.4") && this.isHealthy();
        }

        this.startCheckStatus = function(){
            setTimeout(this.checkServerStatus.bind(this), 10);
            this.timer = setInterval(this.checkServerStatus.bind(this), 30 * 1000);
        }

        this.stopCheckStatus = function(){
            if (this.timer != null){
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    }

    AschServer.compareServer = function(server1, server2){
        var isServer1Avalible = server1.isServerAvalible();
        var isServer2Avalible = server2.isServerAvalible();

        if (!(isServer1Avalible && isServer2Avalible))
        {
            return isServer1Avalible ? 1 : -1;
        }

        if (server1.lastBlock.height != server2.lastBlock.height){
            return server1.lastBlock.height > server2.lastBlock.height  ? 1 : -1;
        }

        if (server1.responseTime != server2.responseTime){
            return server1.responseTime > server2.responseTime  ? 1 : -1;
        }

        return 0;
    }
    
    var servers = new Array();
    var originalServer = null;
    var currentServer = null;
    var seedServers = "{{seedServers}}".split(",");

    function getSeeds(){
        return seedServers;
    } 

    function log(info){
        console.debug(info);
    }

    function registerServer(serverUrl){
        if (findServerIndex(serverUrl) < 0){
            var server = new AschServer(serverUrl);
            server.startCheckStatus();
            servers.push(server);

            return server;
        }
        return null;
     }

    function unregisterServer(serverUrl){
        var index = findServerIndex(serverUrl);
        if (index > -1){
            servers[index].stopCheckStatus();
            servers.slice(index, 1);
            log("unregister server " +serverUrl);
        }
    }

    function findServerIndex(serverUrl, serverArray){
        serverArray = serverArray || servers;
        if (serverUrl == null || serverUrl == "") {
            return -1;
        }

        for(var i=0; i<serverArray.length; i++){
            if ( serverArray[i].serverUrl == serverUrl ){
                return i;
            }
        }
        return -1;
    }

    function getPeers(seedServerUrl, onSuccess, onFailed){
        $http.get(seedServerUrl+"/api/peers?limit=100").success(function(data, status, headers){
            if (!data.success){
                onFailed();
                return;
            }

            //种子节点也作为服务节点对待
            registerServer(seedServerUrl);
            angular.forEach(data.peers, function(node){
                //状态为2是正常
                if (node.state != 2) return;
          
                var serverUrl = "http://" + node.ip + ":" + node.port;
                registerServer(serverUrl);
            });
            onSuccess();
        }, function(data, status, headers){
            onFailed();
        });        
    }

    function sortServers(serverArray){
        serverArray = serverArray || servers;
        return serverArray.sort(AschServer.compareServer);
    }

    function clearServers(){
        for(var i= servers.length -1; i>=0; i--){
            servers[i].stopCheckStatus();
            servers.slice(i, 1);
        }
    }

    function findServerFromPeers(serverUrl, depth){
        depth = depth || 1;
        if (depth > 5) return;
        //加入当前服务器
        if (depth == 1 && serverUrl != null){
            var server = registerServer(serverUrl);
            originalServer = originalServer || server;
        }

        var idx = parseInt( Math.random() * getSeeds().length, 10 );
        getPeers(getSeeds()[idx], function(){
            log("find server success " + servers.length);
        },function(){ 
            findServerFromPeers(null, depth +1); 
        });     
    }
    
    this.findServers = function (serverUrl){
        findServerFromPeers(serverUrl);
    };

    this.getSortedAvalibleServers = function(){
        var result = new Array();
        for( var i=0; i<servers.length; i++){
            var server = servers[i];
            if (server.state =="success" && server.isServerAvalible()){
                result.push(server);
            }
        }
        return sortServers(result);
    }

    this.getBestServer = function(){
        var avalibleServers = this.getSortedAvalibleServers();
        var best = avalibleServers.length == 0 ? originalServer : avalibleServers[0];

        return best;
    } 
    
    this.getCurrentServer = function(){
        if (currentServer == null){
            currentServer = this.getBestServer();
        }
        return currentServer;
    }

    this.changeServer = function(){
        if (currentServer != null){
            var avalibleServers = this.getSortedAvalibleServers();
            var index = findServerIndex(currentServer.serverUrl, avalibleServers);

            if (index != 0 && avalibleServers.length >0){
                currentServer = avalibleServers[0];
                return true ;
            }

            if (index == 0 && avalibleServers.length > 1){
                currentServer = avalibleServers[1];
                return true;
            }
            
            return false;
        }
    }

    this.getNetStatus = function(){
        return  (navigator.onLine) ? (navigator.onLine ? "online" : "offline") : "unknown";
    }
    
});

