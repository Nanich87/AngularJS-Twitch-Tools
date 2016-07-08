(function () {
    'use strict';

    function streamsFeaturedDirective() {
        return {
            restrict: 'A',
            templateUrl: 'views/streams/streams-featured-directive.html'
        }
    }

    angular.module('twitchTools.directives')
           .directive('streamsFeaturedDirective', [streamsFeaturedDirective])
}());