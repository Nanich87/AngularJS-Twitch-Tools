(function () {
    'use strict';

    function LoginController($scope, $location, auth, notifier, identity) {
        $scope.identity = identity;
        
        $scope.login = function (user) {
            auth.login(user)
                .then(function (data){
                    notifier.success('You have successfully logged in!');
                }, function (error){
                    notifier.error("Error: " + error.code + " " + error.message);
                });
        };

        $scope.logout = function () {
            auth.logout()
                .then(function () {
                    $scope.user.username = '';
                    $scope.user.password = '';

                    notifier.success('You have successfully logged out!');
                });
        };
    }

    angular.module('twitchTools.controllers')
            .controller('LoginController', ['$scope', '$location', 'auth', 'notifier', 'identity', LoginController]);
}());