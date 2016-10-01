var app = angular.module('asch', ['ngRoute', 'ui.bootstrap','ngTable', 'ipCookie', 'pascalprecht.translate'], function($httpProvider) {
    // Use x-www-form-urlencoded Content-Type
   // $httpProvider.defaults.headers.post['Origin'] = '*';
    $httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
    $httpProvider.defaults.headers.put['Content-Type'] = 'application/json';
});

app.config(['$translateProvider', function($translateProvider) {
    for (var lang in window.Translations) {
        $translateProvider.translations(lang, window.Translations[lang]);
    }
    $translateProvider.preferredLanguage('zh-cn');
    $translateProvider.useSanitizeValueStrategy(null);
}]);