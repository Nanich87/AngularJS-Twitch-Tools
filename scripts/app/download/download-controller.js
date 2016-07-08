(function () {
    'use strict';

    function DownloadController($routeParams, $rootScope, channel, download) {
        var vm = this;

        vm.showPanel = false;

        vm.video = {
            status: null,
            details: {
                game: null,
                title: null,
                preview: null,
                views: null,
                id: null,
            }
        }

        channel.getVideoDetails($routeParams.video)
               .then(function getResponse(data) {
                   vm.video.details.game = data.game;
                   vm.video.details.title = (data.game == null ? '' : data.game) + ' ' + data.title;
                   vm.video.details.preview = data.preview;
                   vm.video.details.views = data.views;
                   vm.video.details.id = data._id;

                   $rootScope.title = 'Download: ' + data.title;

                   download.getVideoLink($routeParams.video)
                           .then(function getResponse(data) {
                               if (angular.isDefined(data.chunks) && angular.isDefined(data.chunks.live)) {
                                   vm.live = data.chunks.live;
                               } else if (angular.isDefined(data.token) && angular.isDefined(data.sig)) {
                                   vm.playlist = 'http://usher.justin.tv/vod/' + $routeParams.video.substring(1) + '?nauthsig=' + data.sig + '&nauth=' + encodeURIComponent(data.token);
                               }

                               vm.video.status = 'found';
                           }, function getError(error) {
                               vm.video.status = 'not found';
                           });
               }, function getError(error) {
                   vm.video.status = 'not found';
               });
    }

    angular.module('twitchTools.controllers')
           .controller('DownloadController', ['$routeParams', '$rootScope', 'channel', 'download', DownloadController]);
}());