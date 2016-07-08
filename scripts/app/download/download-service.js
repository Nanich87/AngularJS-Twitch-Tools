(function () {
    'use strict';

    function downloadService(data, twitchApiBaseUrl) {

        function getVideoLink(video) {
            var videoType = video.substring(0, 1);
            var request = videoType === 'v'
                ? 'api/vods/' + video.substring(1) + '/access_token?as3=t'
                : 'api/videos/' + video;

            return data.jsonp(twitchApiBaseUrl + request, { dataType: 'jsonp', contentType: 'application/json' });
        }

        return {
            getVideoLink: getVideoLink
        }
    }

    angular.module('twitchTools.services')
           .factory('download', ['data', 'twitchApiBaseUrl', downloadService])
}());