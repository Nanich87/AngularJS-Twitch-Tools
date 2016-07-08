(function () {
    'use strict';

    function MultiTwitchController($routeParams, streams) {
        var vm = this;

    }

    angular.module('twitchTools.controllers')
           .controller('MultiTwitchController', ['$routeParams', 'streams', MultiTwitchController]);
}());