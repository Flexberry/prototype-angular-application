;(function() {
    angular.module('main').controller('employeesControllerE', function($scope, $modal, $log, service, blockUI, $routeParams) {
        blockUI.start();
        (new service()).$query({res: 'Employees', key: $routeParams.id}).then(function(data) {
            $scope.obj = data;
            blockUI.stop();
        });
    });
})();
