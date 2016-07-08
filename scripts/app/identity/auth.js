(function () {
    'use strict';

    function auth($http, $q, identity) {
        return {
            register: function (data) {
                var deferred = $q.defer();

                var user = new Parse.User();
                user.set("username", data.username);
                user.set("password", data.password);
                user.set("email", data.email);

                user.signUp(null, {
                    success: function (user) {
                        deferred.resolve(user);
                    },
                    error: function (user, error) {
                        deferred.reject(error);
                    }
                });

                return deferred.promise;
            },
            login: function (user) {
                var deferred = $q.defer();

                Parse.User.logIn(user.username, user.password, {
                    success: function (data) {
                        deferred.resolve(data);
                    },
                    error: function (user, error) {
                        deferred.reject(error);
                    }
                });

                return deferred.promise;
            },
            logout: function () {
                var deferred = $q.defer();

                Parse.User.logOut().then(function (){
                    deferred.resolve();
                });

                return deferred.promise;
            },
            isAuthenticated: function () {
                if (identity.isAuthenticated()) {
                    return true;
                }
                else {
                    return $q.reject('not authorized');
                }
            }
        }
    }

    angular.module('twitchTools.services')
            .factory('auth', ['$http', '$q', 'identity', auth]);
}());