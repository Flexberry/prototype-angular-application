;(function() {
    angular.module('main').controller('customersControllerL', function($scope, $modal, $log, service, blockUI, $location) {

        (new service()).$getAll({res: 'Customers'}).then(function(data) {
            $scope.gridData = data.value;
        });

        $scope.redirectToEdit = function(rowItem) {
            $location.path('/Customers/' + rowItem.entity.CustomerID);
        };

    });
})();
