(function () {
    'use strict';

    function channelVideosDirective() {
        return {
            restrict: 'A',
            templateUrl: 'views/channel/channel-videos-directive.html'
        }
    }

    angular.module('twitchTools.directives')
           .directive('channelVideosDirective', [channelVideosDirective])
}());