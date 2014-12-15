;(function() {
    angular.module('main').controller('employeesControllerL', function($scope, $modal, $log, service, blockUI, $location) {

        (new service()).$getAll({res: 'Employees'}).then(function(data) {
            $scope.gridData = data.value;
        });

        $scope.redirectToEdit = function(rowItem) {
            $location.path('/Employees/' + rowItem.entity.EmployeeID);
        };

    });
})();
