;(function() {
    angular.module('main').controller('wolvController', function($scope, $modal, $log, service, blockUI, $location) {
        $scope.gridOptions = {
            data: 'gridData',
            multiSelect: false,
            afterSelectionChange: function(rowItem, event) {
                $location.path('/edit/' + rowItem.entity.EmployeeID);
            }
        };
        (new service()).$getAll().then(function(data) {
            $scope.gridData = data.value;
        });

    });
})();
