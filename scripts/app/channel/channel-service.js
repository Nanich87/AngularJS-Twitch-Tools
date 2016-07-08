(function () {
    'use strict';

    function channelService(data, twitchApiBaseUrl, twitchToolsBaseUrl) {

        var channelsRequestUrl = 'kraken/channels/';
        var videosRequestUrl = 'kraken/videos/';

        function getStreamUrl(channel) {
            var requestUrl = 'stream.php?channel=' + channel.toLowerCase();

            return data.get(twitchToolsBaseUrl + requestUrl, { dataType: 'text', contentType: 'text/html' });
        }

        function getVideos(channel, filter) {
            var offset = (filter.page - 1) * filter.limit;
            var broadcasts = filter.broadcasts;

            return data.get(twitchApiBaseUrl + channelsRequestUrl + channel + '/videos', {
                broadcasts: broadcasts,
                offset: offset,
                limit: filter.limit
            });
        }

        function getDetails(channel) {
            return data.get(twitchApiBaseUrl + channelsRequestUrl + channel);
        }

        function getVideoDetails(video) {
            return data.get(twitchApiBaseUrl + videosRequestUrl + video);
        }

        return {
            getDetails: getDetails,
            getVideos: getVideos,
            getVideoDetails: getVideoDetails,
            getStreamUrl: getStreamUrl
        }
    }

    angular.module('twitchTools.services')
           .factory('channel', ['data', 'twitchApiBaseUrl', 'twitchToolsBaseUrl', channelService])
}());