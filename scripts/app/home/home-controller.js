(function () {
    'use strict';

    function HomeController($scope, $rootScope, streams, channel) {
        var vm = this;

        var FEATURED_STREAMS_LIMIT = 6;

        $rootScope.title = 'Twitch Tools: Home';

        // Check Channel

        vm.channelData = {
            stream: {
                status: null,
                game: null,
                viewers: null,
                preview: null,
                url: null,
                channel: {
                    name: null,
                    status: null,
                    followers: null
                }
            }
        }

        $scope.sortType = 'stream.viewers';
        $scope.sortReverse = true;
        $scope.searchVideo = '';

        vm.checkChannel = function () {
            streams.getStream(vm.channelName)
                   .then(function getResponse(streamResponse) {
                       if (streamResponse.stream != null) {
                           vm.channelData.stream.game = streamResponse.stream.game;
                           vm.channelData.stream.viewers = streamResponse.stream.viewers;
                           vm.channelData.stream.preview = streamResponse.stream.preview.medium;
                           vm.channelData.stream.channel.name = streamResponse.stream.channel.display_name;
                           vm.channelData.stream.channel.status = streamResponse.stream.channel.status;
                           vm.channelData.stream.channel.followers = streamResponse.stream.channel.followers;

                           channel.getStreamUrl(streamResponse.stream.channel.name)
                                  .then(function getResponse(url) {
                                      vm.channelData.stream.url = url;
                                      vm.channelData.stream.status = 'online';
                                  }, function getError(error) {
                                      console.log(error);
                                  });
                       } else {
                           vm.channelData.stream.status = 'offline';
                       }
                   }, function getError(error) {
                       vm.channelData.stream.status = 'offline';
                   })
        }

        // Featured streams

        vm.showFeaturedStreams = true;

        $scope.sortType = 'stream.viewers';
        $scope.sortReverse = true;
        $scope.searchStream = '';

        vm.getFeaturedStreams = function () {
            streams.getFeaturedStreams(FEATURED_STREAMS_LIMIT)
                   .then(function getResponse(data) {
                       vm.featuredStreams = data.featured;
                   }, function gerError() {
                       vm.showFeaturedStreams = false;
                   });
        }

        // Streams summary

        vm.showSummary = true;

        streams.getSummary()
               .then(function getResponse(data) {
                   vm.viewers = data.viewers;
                   vm.channels = data.channels;
               }, function getError() {
                   vm.showSummary = false;
               });
    }

    angular.module('twitchTools.controllers')
           .controller('HomeController', ['$scope', '$rootScope', 'streams', 'channel', HomeController]);
}());