;(function() {
    angular.module('main').directive('wolv', function() {
        return {
            restrict: 'E',
            templateUrl: 'app/views/wolv.html',
            controller: 'wolvController'
        }
    });
})();
