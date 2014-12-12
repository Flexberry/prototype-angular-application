;(function() {
    angular.module('main').controller('editformController', function($scope, $modal, $log, service, blockUI, $routeParams) {
        blockUI.start();
        (new service()).$query({key: $routeParams.id}).then(function(data) {
            $scope.obj = data;
            blockUI.stop();
        });
    });
})();
