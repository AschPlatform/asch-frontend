var app = angular.module('asch', ['ngRoute', 'ui.bootstrap', 'ngTable', 'ipCookie', 'pascalprecht.translate', 'ja.qr']);

app.factory("httpInterceptor", ["$q", "$injector", function($q, $injector) {
    return {
        "request": function(req){
            //console.debug("request:"+req.url);
            return req;
        },
        "response": function(res){
            //console.debug(res);
            return res;
        },
        "requestError": function(req){
            //todo: request error
            console.log(req);
            return $q.reject(req); 
        },
        "responseError": function(response) {
            if (response.status == 408) {
                //todo: timeout
                //nodeService.getCurrentServer.state = "timeout";
                console.log(response);
            }
            return $q.reject(response); 
        }
    };
}]);


app.config(function ($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
    // $httpProvider.defaults.headers.post['Origin'] = '*';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
    
    //intercept http request and response
    $httpProvider.interceptors.push('httpInterceptor'); 
});




app.config(function ($translateProvider) {
    var browserLang = navigator.browserLanguage ? navigator.browserLanguage : navigator.language;
    var defaultLang = 'en-us';
    if (browserLang && browserLang.indexOf('zh') > -1) {
        defaultLang = 'zh-cn';
    }
    console.log(browserLang, defaultLang);
    for (var lang in window.Translations) {
        $translateProvider.translations(lang, window.Translations[lang]);
    }
    $translateProvider.preferredLanguage(defaultLang);
    $translateProvider.useSanitizeValueStrategy(null);
});