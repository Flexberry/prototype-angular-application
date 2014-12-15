;(function() {
    angular.module('main').controller('wolvController', function($scope, $modal, $log, service, blockUI, $location) {
        $scope.gridOptions = {
            data: 'gridData',
            multiSelect: false,
            afterSelectionChange: function(rowItem, event) {
                // define it in "<resourceName>controllerL":
                if (typeof $scope.redirectToEdit === 'function') {
                    $scope.redirectToEdit(rowItem);
                }
            }
        };
    });
})();
