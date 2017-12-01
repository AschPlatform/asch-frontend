angular.module('asch').service('nodeService', function ($http) {
    
    function AschServer(url){
        this.timer = null;

        this.failedCount =0;
        this.serverUrl = url;
        this.registerTimestamp = 0;
        this.state = "unknown";
        this.version = "";
        this.blockHeight = 0;
        this.blockTimestamp = 0;
        this.responseTime = 9999999;
        this.serverTimestamp = 0; 

        function checkFailed(server){
            server.failedCount ++;
            if (server.failedCount >=3){
                unregisterServer(server.serverUrl);
            }

            server.state= "failed";
            server.version = "unknown";
            server.responseTime = Date.now() - this.requestTimestamp;
        };

        this.checkServerStatus = function(){
            var server = this;

            server.state= "pending";
            server.requestTimestamp = Date.now();
            
            $http.get(server.serverUrl+"/api/blocks/getStatus", {timeout:3000}).success(function(res, status){  
                if (status != 200){
                    checkFailed(server);
                }     

                server.failedCount = 0;
                server.version = "1.3.4";
                server.state="success";
                server.blockHeight = res.height;
                server.blockTimestamp = 3324;
                server.responseTime = Date.now() - server.requestTimestamp;
                server.serverTimestamp = Date.now(); 
            }).error(function(res){
                checkFailed(server);
            });
        };

        this.isHealthy = function(){
            //响应时间小于3秒，且区块落后不超过6块

            return this.responseTime <= 1000 * 3 &&
            true; //(this.serverTimestamp - this.blockTimestamp) <= 10000 * 6 ;
        }
    
        this.isServerAvalible = function(){
            //版本不低于1.3.4,且是健康的节点
            return /*this.version >= "1.3.4" && */ this.state=="success" && this.isHealthy();
        }

        this.startCheckStatus = function(){
            this.timer = setInterval(this.checkServerStatus.bind(this), 10* 1000);
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

        if (server1.blockHeight != server2.blockHeight){
            return server1.blockHeight > server2.blockHeight  ? 1 : -1;
        }

        if (server1.responseTime != server2.responseTime){
            return server1.responseTime > server2.responseTime  ? 1 : -1;
        }

        return 0;
    }
    
    var servers = new Array();
    var originalServer = null;
    var currentServer = null;

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
            console.debug("unregister server " +serverUrl);
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

    function getSeeds(){
        return ['http://mainnet.asch.cn', 'http://mainnet.asch.so'];
    }
 

    function getPeers(seedServerUrl, onSuccess, onFailed){
        $http.get(seedServerUrl+"/api/peers?limit=100").success(function(res){
            if (!res.success){
                onFailed();
                return;
            }

            //种子节点也作为服务节点对待
            registerServer(seedServerUrl);
            angular.forEach(res.peers, function(node){
                //状态为2是正常
                if (node.state != 2) return;
          
                var serverUrl = "http://" + node.ip + ":" + node.port;
                registerServer(serverUrl);
            });
            onSuccess();
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
        if (depth >5) return;
        //加入当前服务器
        if (depth == 1){
            if (serverUrl != null){
                var server = registerServer(serverUrl);
                if (originalServer == null){
                    originalServer = server;
                }
            }
        }

        var idx = parseInt( Math.random() * getSeeds().length, 10 );
        getPeers(getSeeds()[idx], function(){
            console.debug("find server success " + servers.length);
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

