;(function() {
    // Please note that $modalInstance represents a modal window (instance) dependency.
    // It is not the same as the $modal service used above.
    angular.module('main').controller('lookupModalController', function($scope, $modalInstance, getItems, selectedItem, blockUI) {

        $scope.items = [];

        var block = blockUI.instances.get('block');
        block.start();
        getItems({res: 'Employees'}).then(function(data) {
            $scope.items = data.value;
            block.stop();
        });

        $scope.selected = {
            item: selectedItem
        };

        $scope.ok = function() {
            $modalInstance.close($scope.selected.item);
        };

        $scope.cancel = function() {
            $modalInstance.dismiss('cancel');
        };
    });
})();
