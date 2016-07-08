(function () {
    'use strict';

    function data($http, $q, authorization) {

        function get(url, params) {
            var defered = $q.defer();

            var headers = authorization.getAuthorizationHeader();

            $http.get(url, { params: params, headers: headers })
                 .then(function (response) {
                     defered.resolve(response.data);
                 }, function (err) {
                     defered.reject(err);
                 });

            return defered.promise;
        }

        function jsonp(url, params) {
            var defered = $q.defer();

            var headers = authorization.getAuthorizationHeader();

            $.ajax({
                url: url,
                method: 'GET',
                contentType: params.contentType,
                dataType: params.dataType,
                success: function (result) {
                    defered.resolve(result);
                },
                error: function (error) {
                    defered.reject(error);
                }
            });


            return defered.promise;
        }

        function post(url, data) {
            var defered = $q.defer();

            var headers = authorization.getAuthorizationHeader();

            $http.post(url, data, { headers: headers })
                 .then(function (response) {
                     defered.resolve(response.data);
                 }, function (err) {
                     defered.reject(err);
                 });

            return defered.promise;
        }

        return {
            get: get,
            post: post,
            jsonp: jsonp
        }
    }

    angular.module('twitchTools.services')
           .factory('data', ['$http', '$q', 'authorization', data]);
}());