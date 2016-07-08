(function () {
    'use strict';

    function ChannelController($cookieStore, $routeParams, $scope, $rootScope, channel, notifier) {
        var vm = this;

        var DEFAULT_VIDEO_LIMIT = 12;

        var channelName = $routeParams.name;

        vm.channel = {
            exists: false,
            name: null
        }

        // Video Filter

        $scope.sortType = 'views';
        $scope.sortReverse = false;
        $scope.searchVideo = '';

        $scope.showVideoFilter = ($cookieStore.get('channel_showVideoFilter') === 'true') ? true : false;
        $scope.toggleVideoFilterVisibility = function () {
            if ($scope.showVideoFilter) {
                $scope.showVideoFilter = false;
                $cookieStore.put('channel_showVideoFilter', 'false');
            } else {
                $scope.showVideoFilter = true;
                $cookieStore.put('channel_showVideoFilter', 'true');
            }
        }

        // Video Pagination

        vm.prevPage = function () {
            if (vm.request.page == 1) {
                return;
            }

            vm.request.page--;
            vm.filterVideos();
        }

        vm.nextPage = function () {
            if (!vm.videos || vm.videos.length == 0) {
                return;
            }

            vm.request.page++;
            vm.filterVideos();
        }

        // Video Filtering

        vm.request = {
            page: 1,
            limit: getVideoLimit(),
            broadcasts: $routeParams.videoType === 'broadcasts' ? true : false
        }

        vm.filterVideos = function () {
            channel.getVideos(channelName, vm.request)
                   .then(function getResponse(data) {
                       vm.videos = data.videos;
                       vm.videoCount = data._total;
                   });
        }

        // Channel Details

        channel.getDetails(channelName)
               .then(function getResponse(data) {
                   vm.channel.exists = true;
                   vm.channel.name = data.name;

                   vm.sectionTitle = data.display_name;

                   $rootScope.title = 'Channel: ' + data.display_name;

                   vm.filterVideos();
               }, function getError(error) {
                   vm.sectionTitle = error.statusText;
               });

        // Events

        $scope.$watch('vm.request.limit', function () {
            if (!angular.isNumber(vm.request.limit) || vm.request.limit < 1) {
                vm.request.limit = DEFAULT_VIDEO_LIMIT;

                $cookieStore.put('channel_videoLimit', DEFAULT_VIDEO_LIMIT);

                toastr.error('Invalid limit!');

                return;
            }

            $cookieStore.put('channel_videoLimit', vm.request.limit);

            vm.filterVideos();
        });

        $scope.$watch('vm.request.page', function () {
            if (!angular.isNumber(vm.request.page) || vm.request.page < 1) {
                vm.request.page = 1;

                toastr.error('Invalid page!');

                return;
            }

            vm.filterVideos();
        });

        // Helpers

        function getVideoLimit() {
            if (!isInt($cookieStore.get('channel_videoLimit')) || parseInt($cookieStore.get('channel_videoLimit')) < 0) {
                return DEFAULT_VIDEO_LIMIT;
            }

            return parseInt($cookieStore.get('channel_videoLimit'));
        }

        function isInt(value) {
            if (isNaN(value)) {
                return false;
            }

            var x = parseFloat(value);

            return (x | 0) === x;
        }
    }

    angular.module('twitchTools.controllers')
           .controller('ChannelController', ['$cookieStore', '$routeParams', '$scope', '$rootScope', 'channel', 'notifier', ChannelController]);
}());