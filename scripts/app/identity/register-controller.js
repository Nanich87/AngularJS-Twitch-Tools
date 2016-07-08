(function () {
    'use strict';

    function RegisterController($scope, $location, $rootScope, identity, notifier, auth) {
        $rootScope.title = 'Twitch Tools: Register';

        if (identity.isAuthenticated()) {
            $location.path('/');
        }

        $scope.signup = function (data) {
            auth.register(data)
                .then(function (user) {
                    notifier.success('Registration successful!');
                    $location.path('home');
                }, function (error) {
                    notifier.error("Error: " + error.code + " " + error.message);
                });
        };
    }

    angular.module('twitchTools.controllers')
           .controller('RegisterController', ['$scope', '$location', '$rootScope', 'identity', 'notifier', 'auth', RegisterController]);
}());