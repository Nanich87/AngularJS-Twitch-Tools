(function () {
    'use strict';

    function config($routeProvider, $locationProvider) {

        var CONTROLLER_VIEW_MODEL_NAME = 'vm';

        $locationProvider.html5Mode(true);

        $routeProvider
                .when('/', {
                    templateUrl: 'views/home/home.html',
                    controller: 'HomeController',
                    controllerAs: CONTROLLER_VIEW_MODEL_NAME
                })
                .when('/channel/:name/:videoType', {
                    templateUrl: 'views/channel/channel.html',
                    controller: 'ChannelController',
                    controllerAs: CONTROLLER_VIEW_MODEL_NAME
                })
                .when('/unauthorized', {
                    template: '<h1 class="text-center">YOU ARE NOT AUTHORIZED!</h1>'
                })
                .when('/home', {
                    redirectTo: '/'
                })
                .when('/register', {
                    templateUrl: 'views/identity/register.html',
                    controller: 'RegisterController'
                })
                .when('/multitwitch', {
                    templateUrl: 'views/multitwitch/multitwitch.html',
                    controller: 'MultiTwitchController'
                })
                .when('/download/:video', {
                    templateUrl: 'views/download/download.html',
                    controller: 'DownloadController',
                    controllerAs: CONTROLLER_VIEW_MODEL_NAME
                })
                .when('/live/:channel', {
                    templateUrl: 'views/live/live.html',
                    controller: 'LiveController',
                    controllerAs: CONTROLLER_VIEW_MODEL_NAME
                })
                .when('/play/:video', {
                    templateUrl: 'views/play/play.html',
                    controller: 'PlayController',
                    controllerAs: CONTROLLER_VIEW_MODEL_NAME
                })
                .otherwise({redirectTo: '/'});
    }

    function run($http, $cookies, $rootScope, $location) {
        $rootScope.$on('$routeChangeError', function (ev, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        });
    }
    ;

    angular.module('twitchTools.services', []);
    angular.module('twitchTools.directives', []);
    angular.module('twitchTools.controllers', ['twitchTools.services']);

    angular.module('twitchTools', ['angular-loading-bar', 'ngRoute', 'ngCookies', 'twitchTools.controllers', 'twitchTools.directives'])
            .config(['$routeProvider', '$locationProvider', config])
            .value('toastr', toastr)
            .constant('twitchApiBaseUrl', 'https://api.twitch.tv/')
            .constant('twitchToolsBaseUrl', 'http://twitchtools.sixeightone.eu/')
            .constant('baseServiceUrl', 'http://spa2014.bgcoder.com')
            .run(['$http', '$cookies', '$rootScope', '$location', run]);
}());