(function () {
    'use strict';

    angular.module('twitchTools.services')
           .factory('notifier', ['toastr', function (toastr) {
               return {
                   success: function (message) {
                       toastr.success(message);
                   },
                   error: function (message) {
                       toastr.error(message);
                   }
               }
           }])
}());