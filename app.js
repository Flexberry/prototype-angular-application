var ajax = breeze.config.initializeAdapterInstance('ajax', 'angular');
breeze.config.initializeAdapterInstance('modelLibrary', 'backingStore', true);
breeze.config.initializeAdapterInstance('dataService', 'odata', true);

OData.defaultHttpClient.enableJsonpCallback = true;

var app = angular.module('components', ['ngResource', 'ngRoute', 'ui.bootstrap', 'blockUI']);

app.config(function(blockUIConfig) {
    // Disable automatically blocking of the user interface
    blockUIConfig.autoBlock = false;
});

app.factory('service', function ($resource) {
    var dataService = new breeze.DataService({
        serviceName: 'http://services.odata.org/V4/Northwind/Northwind.svc',
        hasServerMetadata: false,
        useJsonp: false
    });
    var manager = new breeze.EntityManager({ dataService: dataService });
    return manager;
});

app.controller('lookupController', function ($scope, $modal, $log, service, blockUI) {

    $scope.value = '';
    $scope.valueString = '';

    $scope.open = function (size) {
        var modalInstance = $modal.open({
            templateUrl: 'lookupModal.html',
            controller: 'lookupModalController',
            size: size,
            resolve: {
                getItems: function() {
                    return function() {
                        var query = new breeze.EntityQuery()
                            .from('Employees');
                        return service.executeQuery(query);
                    };
                },
                selectedItem: function() {
                    return $scope.value
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.value = selectedItem;
            $scope.valueString = selectedItem.FirstName + ' ' + selectedItem.LastName;
        }, function () {
            // Modal dismissed
        });
    };
});

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.
app.controller('lookupModalController', function ($scope, $modalInstance, getItems, selectedItem, blockUI) {

    $scope.items = [];

    var block = blockUI.instances.get('block');
    block.start();
    getItems().then(function(data) {
        $scope.items = data.httpResponse.data.value.results;
        block.stop();
        $scope.$apply();
    }).fail(function(e) {
        alert(e);
    });

    $scope.selected = {
        item: selectedItem
    };

    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };
});

app.directive('lookup', function () {
    return {
        restrict: 'E',
        link: function (scope, element, attrs) {
            scope.attrs = attrs;
        },
        templateUrl: 'lookup.html'
    }
});

angular.module('ExampleLookupApp', ['components']);
