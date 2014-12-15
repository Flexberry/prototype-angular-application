;(function() {
    angular.module('main').controller('customersControllerE', function($scope, $modal, $log, service, blockUI, $routeParams) {
        blockUI.start();
        (new service()).$query({res: 'Customers', key: "'" + $routeParams.id + "'"}).then(function(data) {
            $scope.obj = data;
            blockUI.stop();
        });
    });
})();
