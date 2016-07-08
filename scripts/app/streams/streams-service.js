(function () {
    'use strict';

    function streamService(data, twitchApiBaseUrl) {

        var streamsRequestUrl = 'kraken/streams/';

        function getFeaturedStreams(limit) {
            return data.get(twitchApiBaseUrl + streamsRequestUrl + 'featured', { limit: limit });
        }

        function getSummary(game) {
            return data.get(twitchApiBaseUrl + streamsRequestUrl + 'summary', { game: game });
        }

        function getStream(channel) {
            return data.get(twitchApiBaseUrl + streamsRequestUrl + channel);
        }

        return {
            getFeaturedStreams: getFeaturedStreams,
            getSummary: getSummary,
            getStream: getStream
        }
    }

    angular.module('twitchTools.services')
           .factory('streams', ['data', 'twitchApiBaseUrl', streamService])
}());