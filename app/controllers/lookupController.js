;(function() {
    angular.module('main').controller('lookupController', function($scope, $modal, $log, service, blockUI) {

        $scope.value = '';
        $scope.valueString = '';

        $scope.open = function(size) {
            var modalInstance = $modal.open({
                templateUrl: 'app/views/lookupModal.html',
                controller: 'lookupModalController',
                size: size,
                resolve: {
                    getItems: function() {
                        return (new service()).$getAll;
                    },
                    selectedItem: function() {
                        return $scope.value
                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.value = selectedItem;
                $scope.valueString = selectedItem.FirstName + ' ' + selectedItem.LastName;
            }, function() {
                // Modal dismissed
            });
        };
    });
})();