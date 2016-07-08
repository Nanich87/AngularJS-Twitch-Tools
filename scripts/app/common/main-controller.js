(function () {
    'use strict';

    function MainController($location, $scope, identity) {
        var vm = this;

        $scope.isActive = function (viewLocation) {
            return viewLocation === $location.path();
        };
    }

    angular.module('twitchTools')
           .controller('MainController', ['$location', '$scope', 'identity', MainController]);
}());