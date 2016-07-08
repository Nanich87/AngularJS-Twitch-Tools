(function () {
    'use strict';

    function channelCheckDirective() {
        return {
            restrict: 'A',
            templateUrl: 'views/channel/channel-check-directive.html'
        }
    }

    angular.module('twitchTools.directives')
           .directive('channelCheckDirective', [channelCheckDirective])
}());