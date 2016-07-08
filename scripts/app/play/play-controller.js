(function () {
    'use strict';

    function PlayController($routeParams, $rootScope, channel) {
        var vm = this;

        vm.video = {
            title: null,
            status: null
        }

        channel.getVideoDetails($routeParams.video)
               .then(function getResponse(data) {
                   vm.video.title = data.title;

                   $rootScope.title = 'Play: ' + data.title;

                   swfobject.embedSWF("//www-cdn.jtvnw.net/swflibs/TwitchPlayer.swf",
                                      "twitch-player",
                                      "640",
                                      "400",
                                      "11",
                                      null,
                                      {
                                          videoId: $routeParams.video,
                                          embed: 1,
                                          auto_play: "true"
                                      },
                                      {
                                          allowScriptAccess: "always",
                                          allowFullScreen: "true"
                                      });

                   vm.video.status = 'found';
               }, function getError(error) {
                   vm.video.status = 'not found';
               });
    }

    angular.module('twitchTools.controllers')
           .controller('PlayController', ['$routeParams', '$rootScope', 'channel', PlayController]);
}());