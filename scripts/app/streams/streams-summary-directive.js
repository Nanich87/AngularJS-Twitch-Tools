(function () {
    'use strict';

    function streamsSummaryDirective() {
        return {
            restrict: 'A',
            templateUrl: 'views/streams/streams-summary-directive.html'
        }
    }

    angular.module('twitchTools.directives')
           .directive('streamsSummaryDirective', [streamsSummaryDirective])
}());