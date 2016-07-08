(function () {
    'use strict';

    function LiveController($routeParams, $rootScope, streams) {
        var vm = this;

        vm.channel = {
            name: null,
            status: null
        }

        streams.getStream($routeParams.channel)
               .then(function getResponse(data) {
                   if (data.stream != null) {
                       vm.title = data.stream.channel.display_name + ' is playing ' + data.stream.game;
                       vm.channel.name = data.stream.channel.name;

                       $rootScope.title = 'Live: ' + data.stream.channel.display_name;

                       swfobject.embedSWF("//www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf",
                                            "twitch-player",
                                            "640",
                                            "400",
                                            "11",
                                            null,
                                            {
                                                channel: data.stream.channel.name,
                                                embed: 1,
                                                auto_play: "true"
                                            },
                                            {
                                                allowScriptAccess: "always",
                                                allowFullScreen: "true"
                                            });

                       vm.channel.status = 'online';
                   } else {
                       vm.channel.status = 'offline';
                   }
               }, function getError(error) {
                   vm.channel.status = 'error';
               });
    }

    angular.module('twitchTools.controllers')
           .controller('LiveController', ['$routeParams', '$rootScope', 'streams', LiveController]);
}());